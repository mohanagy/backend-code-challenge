import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiInteger from 'chai-integer';
import app from '../src/app';
import { parseCsvFile } from '../src/helpers/parseCsv';
import { parseQuery, checkAddress } from '../src/helpers/stores';

// Configure chai
chai.use(chaiHttp);
chai.use(chaiInteger);
chai.should();
const { expect } = chai;
describe('test store collection to check the nearest store for address', () => {
  describe('check if route "GET api/v1/closest" exists', () => {
    it('should return 404 if the route is not exists', (done) => {
      chai.request(app)
        .get('/api/v1/closest')
        .end((err, res) => {
          res.should.not.have.status(404);
          done();
        });
    });
  });
  describe('check endpoint parameters', () => {
    it('should accept 3 parameters with values  ', (done) => {
      chai.request(app)
        .get('/api/v1/closest?zip&&address&&unit')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should have at least one of [zip,address] ', (done) => {
      chai.request(app)
        .get('/api/v1/closest?zip=10003')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should accept units parameter as optional', (done) => {
      chai.request(app)
        .get('/api/v1/closest?zip=10003')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should accept one of this values[mi,km] as value for units', (done) => {
      chai.request(app)
        .get('/api/v1/closest?zip=10003&units=m')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should URI encoded value of address', (done) => {
      chai.request(app)
        .get('/api/v1/closest?address=NY,new york city')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should not accept empty values', (done) => {
      chai.request(app)
        .get('/api/v1/closest?address= ')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should not accept other one of this parameters [address,zip,units]  ', (done) => {
      chai.request(app)
        .get('/api/v1/closest?name=NY')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('test app', () => {
    it('app should handle error and send to sentry', (done) => {
      chai.request(app)
        .get('/api/v1/error?error=error')
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
  describe('test nearest endpoint functionality', () => {
    it('parseCsvFile should parse csv file to json', (done) => {
      parseCsvFile().then((data) => {
        expect(data).to.be.an('array');
        done();
      });
    });
    it('expect data has lat and long', (done) => {
      parseCsvFile().then((data) => {
        expect(data[0]).to.have.property('Latitude');
        expect(data[0]).to.have.property('Longitude');
        done();
      });
    });
    it('parseQuery should parse request query and return object with requested props', (done) => {
      const requestQuery = {
        zip: 10003,
        address: 'NY, new York',
        units: 'mi',
        name: 'Mohammed',
        family: 'Naji'
      };
      const query = parseQuery(requestQuery);
      expect(query).to.have.all.keys('zip', 'address', 'units');
      done();
    });
    it('checkAddress should check address and return object details', (done) => {
      const requestQuery = {
        zip: 10003,
        address: 'NY, new York',
        units: 'mi',
        name: 'Mohammed',
        family: 'Naji'
      };
      const query = parseQuery(requestQuery);
      checkAddress(query.address).then((address) => {
        expect(address).to.be.a('object');
        expect(address).to.have.any.keys('latitude', 'longitude');
        done();
      });
    });
  });
  describe('test endpoint result', () => {
    it('the endpoint should return one object', (done) => {
      chai.request(app)
        .get('/api/v1/closest?zip=10003')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.all.keys('result');
          res.body.result.should.be.a('object');
          const keys = [
            'Store Name', 'Store Location', 'Address', 'City',
            'Zip Code', 'State', 'Latitude', 'Longitude', 'County', 'distance'];
          res.body.result.should.have.all.keys(...keys);
          done();
        });
    });
  });
});
