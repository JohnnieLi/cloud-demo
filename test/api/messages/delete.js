const expect = require('chai').expect;
const request = require('supertest')
const db = require('../../../app/db/index')
const app = require('../../../app/app.js');

describe('Delete a message - [DELETE] - /v1/messages/:id', () => {
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
  
    it('OK, delete one message with bad request', (done) => {
        request(app).delete('/v1/messages')
          .then((res) => {
            expect(res.status).to.equal(404);
            done();
          })
          .catch((err) => done(err));
      });

    it('OK, delete one message with not found', (done) => {
      request(app).delete('/v1/messages/xxx')
        .then((res) => {
          let responseBody = res.body;
          expect(responseBody).to.contain.property('error');
          done();
        })
        .catch((err) => done(err));
    });
  
    it('OK, delete one message', (done) => {
        request(app).post('/v1/messages')
        .send({ body: 'Message test'})
        .then((res) => {
            let savedResponseBody = res.body;
            let savedResult = savedResponseBody.result;
        request(app).delete(`/v1/messages/${savedResult._id}`)
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