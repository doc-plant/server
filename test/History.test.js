const app = require('../App');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { clearDBHistory, clearDBUser } = require('../helpers/index.test');
const { expect } = require('chai');

chai.use(chaiHttp);


before(function(done) {
  clearDBUser(done)
})

after(function (done) {
  clearDBHistory(done)
})

let token = ''
let id = ''
let historyId = ''

describe('TESTING FOR HISTORY', function () {
  
  it('should return a new user with status code 201', function (done) {
    let newUser = {
      email: 'khevin1222@mail.com',
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
      email: 'khevin1222@mail.com',
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
  describe('/POST/histories, Add new history', function () {
    it('should return a new history with status code 201', function (done) {
      let newHistory = {
        userId: id,
        image: 'https://firebasestorage.googleapis.com/v0/b/docplant-f7bfd.appspot.com/o/images%2F1550931449247?alt=media&token=f3db86bc-e64c-4b70-be3c-906a2e515b72',
        labelId: '5c7259a7fadb5e124f67d8fb',
        createdAt: new Date()
      }
      chai  
        .request(app)
        .post('/histories')
        .set('token', token)
        .send(newHistory)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('image')
          expect(res.body).to.have.property('labelId')
          expect(res.body).to.have.property('userId')
          historyId = res.body._id
          done()
        })
    })
  })
  describe('/GET/histories, get all histories', function() {
    it('should return list histories user logged in wih status code 200', function (done) {
      chai
        .request(app)
        .get('/histories')
        .set('token', token)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.have.property('userId')
          expect(res.body[0]).to.have.property('labelId')
          expect(res.body[0]).to.have.property('image')
          done()
        })
    })
  })
  describe('/GET/histories/:id, get one history', function() {
    it('should return a object with status code 200', function (done) {
      chai
        .request(app)
        .get(`/histories/${historyId}`)
        .set('token', token)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('image')
          expect(res.body).to.have.property('labelId')
          expect(res.body).to.have.property('userId')
          done()
        })
    })
  })
  describe('/DELETE/histories/:id, delete history', function() {
    it('should return a custom message when successfully deleted with status code 200', function (done) {
      chai
        .request(app)
        .delete(`/histories/${historyId}`)
        .set('token', token)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('History deleted!')
          done()
        })
    })
  })
  
})