const app = require('../App');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');


chai.use(chaiHttp);

describe('TESTING FOR DISEASE', function () {
  it('should return an array with status code 200', function (done) {
    chai
      .request(app)
      .get('/plants')
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        done()
      })
  })
  it('should return internal server error with status code 500', function (done) {
    let error = {
      plants: 'error'
    }
    chai
      .request(app)
      .get('/plants')
      .send(error)
      .end(function(err, res) {
        // console.log(res.body)
        done()
      })
  })
})