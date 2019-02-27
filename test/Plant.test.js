const app = require('../App');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');


chai.use(chaiHttp);

describe('TESTING FOR PLANT', function () {
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
})