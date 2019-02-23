const app = require('../App');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { clearDBUser } = require('../helpers/index.test');
const { expect } = require('chai');

chai.use(chaiHttp);

after(function (done) {
  clearDBUser(done)
})

let token = '';

describe('TESTING FOR USER', function () {
  describe('POST /users User register', function () {
    it('should return a object with status code 201', function (done) {
      let newUser = {
        email: 'user@mail.com',
        password: 'As6&7sd'
      }
      chai
        .request(app)
        .post('/users')
        .send(newUser)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('password')
          done()
        })
    })
    it ('should return a custom error message when email is empty with status code 400', function (done) {
      let newUser = {
        password: '123456'
      }
      chai
        .request(app)
        .post('/users')
        .send(newUser)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('string')
          expect(res.body).to.equal('Email must be filled')
          done()
        })
    })
    it('should return a custom error message when format email is not valid with status code 400', function (done) {
      let newUser = {
        email: 'usermail.com',
        password: '123456'
      }
      chai
        .request(app)
        .post('/users')
        .send(newUser)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('string')
          expect(res.body).to.equal('Please fill a valid email address')
          done()
        })
    })
    it('should return a custom error message when email is not unique with status code 400', function (done) {
      let newUser = {
        email: 'user@mail.com',
        password: '123456'
      }
      chai
        .request(app)
        .post('/users')
        .send(newUser)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('string')
          expect(res.body).to.equal('Email already exists!')
          done()
        })
    })
    it('should return a custom error message when password is empty with status code 400', function (done) {
      let newUser = {
        email: 'user@12mail.com',
      }
      chai
        .request(app)
        .post('/users')
        .send(newUser)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('string')
          expect(res.body).to.equal('Password must be filled!')
          done()
        })
    })
    it('should return a custom error message when password less than 6 characters with status code 400', function (done) {
      let newUser = {
        email: 'user12@mail.com',
        password: '123'
      }
      chai
        .request(app)
        .post('/users')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('string')
          expect(res.body).to.equal('Minimal input password 6 characters')
          done()
        })
    })
    it('should return a custom error message when password did not contain at least one lowercase characters', function (done) {
      let newUser = {
        email: 'user12@mail.com',
        password: '1234W#'
      }
      chai
        .request(app)
        .post('/users')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('string')
          expect(res.body).to.equal('Password must contain at least one lower case alphabet')
          done()
        })
    })
    it('should return a custom error message when password did not contain at least one uppercase character', function (done) {
      let newUser = {
        email: 'user12@mail.com',
        password: 'asd@3sds'
      }
      chai
        .request(app)
        .post('/users')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('string')
          expect(res.body).to.equal('Password must contain at least one upper case alphabet')
          done()
        })
    })
    it('should return a custom error message when password did not contain at least one number character', function (done) {
      let newUser = {
        email: 'user12312@mail.com',
        password: 'asdSS@@'
      }
      chai
        .request(app)
        .post('/users')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('string')
          expect(res.body).to.equal('Password must contain at least one number characters')
          done()
        })
    })
    it('should return a custom error message when password did not contain at least one special character', function (done) {
      let newUser = {
        email: 'user12@mail.com',
        password: 'asdaSS2'
      }
      chai
        .request(app)
        .post('/users')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('string')
          expect(res.body).to.equal('Password must contain at least one special characters')
          done()
        })
    })
  })
  describe('POST /users/login User login', function () {
    it('should return a new object with status code 200', function (done) {
      let userLogin = {
        email: 'user@mail.com',
        password: 'As6&7sd'
      }
      chai
        .request(app)
        .post('/users/login')
        .send(userLogin)
        .end(function(err, res) {
          token = res.body.token
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('token')
          expect(res.body).to.have.property('email')
          expect(res.body.token).to.be.an('string')
          expect(res.body.email).to.be.an('string')
          expect(res.body.email).to.equal(userLogin.email)
          done()
        })
    })
    it('should return a custom error message when email/password wrong with status code 400', function (done) {
      let userLogin = {
        email: 'user@mail.com',
        password: '1234567'
      }
      chai
        .request(app)
        .post('/users/login')
        .send(userLogin)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Wrong Email/Password')
          done()
        })

    })
  })
  describe('GET /users check Login User', function () {
    it('should return a new object with status code 200', function (done) {
      chai
        .request(app)
        .get('/users')
        .set('token', token)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('email')
          done()
        })
    })
  })
})