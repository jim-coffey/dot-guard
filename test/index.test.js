const assert = require('assert');
const dotGuard = require('../src/index'); 

describe('dotGuard', () => {
  it('has should exist as a function', () => {
    assert.equal(typeof dotGuard.has, 'function');
  });

  it('get should exist as a function', () => {
    assert.equal(typeof dotGuard.get, 'function');
  });

  it('set should exist as a function', () => {
    assert.equal(typeof dotGuard.set, 'function');
  });

  it('del should exist as a function', () => {
    assert.equal(typeof dotGuard.del, 'function');
  });

  it('dgHas should exist as an alias for has', () => {
    assert.equal(typeof dotGuard.dgHas, 'function');
  });

  it('dgGet should exist as an alias for get', () => {
    assert.equal(typeof dotGuard.dgGet, 'function');
  });

  it('dgSet should exist as an alias for set', () => {
    assert.equal(typeof dotGuard.dgSet, 'function');
  });

  it('dgDel should exist as an alias for del', () => {
    assert.equal(typeof dotGuard.dgDel, 'function');
  });
});
