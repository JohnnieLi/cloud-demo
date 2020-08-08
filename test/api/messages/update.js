const expect = require('chai').expect;
const request = require('supertest')
const db = require('../../../app/db/index')
const app = require('../../../app/app.js');

describe('Update a message - [PUT] -  /v1/messages/:id', () => {
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
  
    it('OK, update an non-exist message', (done) => {
      request(app).put('/v1/messages/XXX')
        .send({ body: 'Message test'})
        .then((res) => {
          let responseBody = res.body;
          let result = responseBody.result;
          expect(result).to.equal(undefined);
          done();
        })
        .catch((err) => done(err));
    });
  
    it('OK, update an message for bad request', (done) => {
        request(app).put('/v1/messages/XXX')
          .send({other: 'Message test'})
          .then((res) => {
            let responseBody = res.body;
            expect(responseBody.message).to.equal("missing body params");
            expect(res.status).to.equal(400);
            done();
          })
          .catch((err) => done(err));
      });


    it('OK, update one message', (done) => {
        request(app).post('/v1/messages')
            .send({ body: 'Message test'})
            .then((res) => {
                let savedResponseBody = res.body;
                let savedResult = savedResponseBody.result;
            request(app).put(`/v1/messages/${savedResult._id}`)
                .send({ body: 'Message test updated'})
                .then((res) => {
                let responseBody = res.body;
                let result = responseBody.result;
                expect(result).to.equal(1);
                done();
                })
            })
            .catch((err) => done(err));
        });
  })