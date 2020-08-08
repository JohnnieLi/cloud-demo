const expect = require('chai').expect;
const request = require('supertest')
const db = require('../../../app/db/index')
const app = require('../../../app/app.js');

describe('Create a message - [POST] - /v1/messages', () => {
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
  
    it('OK, creating new message', (done) => {
        request(app).post('/v1/messages')
        .send({ body: 'Message test'})
        .then((res) => {
            let responseBody = res.body;
            let result = responseBody.result;
            expect(result).to.contain.property('_id');
            expect(result).to.contain.property('createdAt');
            done();
        })
        .catch((err) => done(err));
    });
  
    
    it('OK, creating a new Palindrome message ', (done) => {
        request(app).post('/v1/messages')
        .send({ body: 'Level'})
        .then((res) => {
            let responseBody = res.body;
            let result = responseBody.result;
            expect(result).to.contain.property('_id');
            expect(result).to.contain.property('createdAt');
            expect(result.isPalindrome).to.equal(true);
            done();
        })
        .catch((err) => done(err));
    });


    it('OK, creating new message for bad request', (done) => {
        request(app).post('/v1/messages')
        .send({others: 'Message test'})
        .then((res) => {
            expect(res.status).to.equal(400);
            done();
        })
        .catch((err) => done(err));
    });
  })