const expect = require('chai').expect;
const request = require('supertest')
const db = require('../../../app/db/index')
const app = require('../../../app/app.js');

describe('List messages - [GET] -  /v1/messages', () => {
    before((done) => {
        db.mockConnect()
        .then(() => done())
        .catch((err) => done(err));
    })
  
    after((done) => {
        db.close()
        .then(() => done())
        .catch((err) => done(err));
    })
  
    it('OK, listing messages has no message', (done) => {
      request(app).get('/v1/messages')
        .then((res) => {
          let responseBody = res.body;
          let result = responseBody.result;
          expect(result.length).to.equal(0);
          done();
        })
        .catch((err) => done(err));
    });
  

    it('OK, listing messages has 1 message', (done) => {
      request(app).post('/v1/messages')
        .send({ body: 'Message test'})
        .then((res) => {
          request(app).get('/v1/messages')
            .then((res) => {
              let responseBody = res.body;
              let result = responseBody.result;
              expect(result.length).to.equal(1);
              done();
            })
        })
        .catch((err) => done(err));
    });


    it('OK, listing messages with pagination', (done) => {
      request(app).get('/v1/messages?page=1&size=10')
        .then((res) => {
          let responseBody = res.body;
          let result = responseBody.result;
          expect(result).to.contain.property('docs');
          expect(result).to.contain.property('totalDocs');
          expect(result.page).to.equal(1);
          expect(result.limit).to.equal(10);
          done();
        })
        .catch((err) => done(err));
    });
  })