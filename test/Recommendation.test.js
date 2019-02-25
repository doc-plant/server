const app = require('../App');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { clearDBRecommend, clearDBUser } = require('../helpers/index.test');
const { expect } = require('chai');

chai.use(chaiHttp);


before(function(done) {
  clearDBUser(done)
})

after(function(done) {
  clearDBRecommend(done)
})

let token = ''
let id = ''
let recommendId = ''

describe('TEST FOR RECOMMENDATION', function () {
  it('should return a new user with status code 201', function (done) {
    let newUser = {
      email: 'khevin12222@mail.com',
      password: '1sS@ss',
    }
    chai
      .request(app)
      .post('/users')
      .send(newUser)
      .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res).to.be.an('object')
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('password')
          done()
      })
  })
  it('should return a user logged in with status code 200', function (done) {
    let newUser = {
      email: 'khevin12222@mail.com',
      password: '1sS@ss',
    }
    chai
      .request(app)
      .post('/users/login')
      .send(newUser)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.be.an('object')
        expect(res.body).to.have.property('token')
        expect(res.body).to.have.property('email')
        token = res.body.token
        id = res.body._id
        done()
      })
  })
  describe('/POST/recommendations/DiseaseID, post new recommendations', function () {
    it('should return a new recommendations with status code 201', function (done) {
      let newRecommend = {
        userId: id,
        content: 'ini content',
        article: 'ini link article',
        createdAt: new Date()
      }
      chai
        .request(app)
        .post('/recommendations/5c725dd198bba613de3bf39f')
        .set('token', token)
        .send(newRecommend)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('diseaseId')
          expect(res.body).to.have.property('userId')
          expect(res.body).to.have.property('content')
          expect(res.body).to.have.property('article')
          recommendId = res.body._id
          done()
        })
    })
    it('should return internal server error with status code 500', function (done) {
      let error = 'error bos'
      chai
      .request(app)
      .post('/recommendations/5c725dd198bba63bf39f')
      .set('token', token)
      .send(error)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(500)
        done()
      })
    })
  })
  describe('/GET/recommendations/DiseaseID, get all recommendations', function () {
    it('should return a new recommendations with status code 201', function (done) {
      chai
        .request(app)
        .get('/recommendations/5c725dd198bba613de3bf39f')
        .set('token', token)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
    })
    // it('should return a new recommendations with status code 201', function (done) {
    //   chai
    //     .request(app)
    //     .get('/recommendations/5c725dd198bba61bf39f')
    //     .set('token', token)
    //     .end(function(err, res) {
    //       expect(err).to.be.null
    //       expect(res).to.have.status(500)
    //       done()
    //     })
    // })
  })
  describe('/GET/recommendations, get all recommendations history', function () {
    it('should return a new recommendations with status code 201', function (done) {
      chai
        .request(app)
        .get('/recommendations')
        .set('token', token)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
    })
  })
  describe('/DELETE/recommendations/recommendId, delete recommendations history', function () {
    it('should return a new recommendations with status code 201', function (done) {
      chai
        .request(app)
        .delete(`/recommendations/${recommendId}`)
        .set('token', token)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Successfully delete recommendation')
          done()
        })
    })
  })
})