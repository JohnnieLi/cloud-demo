const expect = require('chai').expect;
const request = require('supertest')
const db = require('../../../app/db/index')
const app = require('../../../app/app.js');

describe('Retrieve a message - [GET] - /v1/messages/:id', () => {
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
  
    it('OK, retrieve message with no result', (done) => {
      request(app).get('/v1/messages/xxx')
        .then((res) => {
          let responseBody = res.body;
          let result = responseBody.result;
          expect(result).to.equal(undefined);
          done();
        })
        .catch((err) => done(err));
    });
  
    
    it('OK, retrieve one message', (done) => {
      request(app).post('/v1/messages')
        .send({ body: 'Message test'})
        .then((res) => {
            let savedResponseBody = res.body;
            let savedResult = savedResponseBody.result;
          request(app).get(`/v1/messages/${savedResult._id}`)
            .then((res) => {
              let responseBody = res.body;
              let result = responseBody.result;
              expect(result._id).to.equal(savedResult._id);
              done();
            })
        })
        .catch((err) => done(err));
    });
  })