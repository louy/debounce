/* jshint mocha: true, expr: true */

var chai = require('chai'),
    expect = chai.expect,
    sinonChai = require('sinon-chai'),
    sinon = require('sinon'),
    debounce = require('..');

chai.use(sinonChai);

describe('debounce', function() {
  var start;

  beforeEach(function() {
    start = new Date();
  });

  it('is a function', function() {
    expect(debounce).to.be.a('function');
    expect(debounce.version).to.exist;
  });

  it('schedules timeout', function(done) {
    var timeout = 10;
    debounce('test', timeout, function() {
      expect(new Date() - start).to.be.gte(timeout).and.lte(timeout * 2);
      done();
    });
  });

  it('cancels', function(done) {
    var spy = sinon.spy(function() { return true; }), timeout = 10;

    debounce('test', timeout * 2, spy);

    setTimeout(function() {
      debounce('test');
    }, timeout);

    setTimeout(function() {
      expect(spy).to.not.be.called;
      done();
    }, timeout * 3);
  });

  it('has #isSet', function() {
    debounce('test', 10, function() {});

    expect(debounce.isSet('test')).to.equal(true);
  });

  it('schedules interval', function(done) {
    var spy = sinon.spy(function() { return true; }), timeout = 10;

    debounce('test', timeout, spy);

    setTimeout(function() {
      expect(spy).to.be.calledTwice;

      debounce('test');

      done();
    }, timeout * 3);
  });

  it('schedules interval with variable delays', function(done) {
    this.slow(100);

    var spy = sinon.spy(function() {
      ++i;
      return i > 2 ? false : timeout * 2;
    }), timeout = 10, i = 0;

    debounce('test', timeout, spy);

    setTimeout(function() {
      expect(spy).to.be.calledTwice;
      done();
    }, timeout * 4);
  });

  it('overrides (debounce)', function(done) {
    var spy = sinon.spy(), timeout = 10;

    debounce('test', timeout * 2, spy);

    setTimeout(function() {
      expect(spy).to.not.be.called;

      debounce('test', timeout, spy);
    }, timeout);

    setTimeout(function() {
      expect(spy).to.be.calledOnce;
      done();
    }, timeout * 3);
  });

  it('runs instantly', function(done) {
    var spy = sinon.spy(), timeout = 10;

    debounce('test', timeout * 2, spy);

    setTimeout(function() {
      expect(spy).to.not.be.called;

      debounce('test', true);
    }, timeout * 1);

    setTimeout(function() {
      expect(spy).to.be.calledOnce;

      done();
    }, timeout * 2);
  });
});
