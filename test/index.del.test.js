const assert = require('chai').assert;
const dgDel = require('../src/index').dgDel;

describe('dotGuard del', () => {
  describe('when passed a string', () => {
    it('should delete properties from the object', () => {
      const testObj = { foo: { bar: { val: 'value'} } };
      const expectedObj = { foo: { bar: {} } };

      dgDel(testObj, 'foo.bar.val');

      assert.deepEqual(testObj, expectedObj);
    });

    it('should delete whole branches of properties if required', () => {
      const testObj = { foo: { bar: { val: 'value'} } };
      const expectedObj = { foo: {} };

      dgDel(testObj, 'foo.bar');

      assert.deepEqual(testObj, expectedObj);
    });

    it('should return undefined if it succeeds', () => {
      const testObj = { foo: { bar: { val: 'value'} } };
      const expectedObj = { foo: {} };

      const result = dgDel(testObj, 'foo.bar');

      assert.strictEqual(result, undefined);
    });

    it('should return the original object if it does not succeed', () => {
      const testObj = { foo: { bar: { val: 'value'} } };
      const expectedObj = { foo: { bar: { val: 'value'} } };

      const result = dgDel(testObj, 'foo.baz');

      assert.deepEqual(testObj, expectedObj);
    });

    it('should not mutate the object if it does not succeed', () => {
      const testObj = { foo: { bar: { val: 'value'} } };
      const expectedObj = { foo: { bar: { val: 'value'} } };

      dgDel(testObj, 'foo.baz');

      assert.deepEqual(testObj, expectedObj);
    });
  });

  describe('when passed a string', () => {
    it('should delete properties from the object', () => {
      const testObj = { foo: { bar: { val: 'value'} } };
      const expectedObj = { foo: { bar: {} } };

      dgDel(testObj, ['foo', 'bar', 'val']);

      assert.deepEqual(testObj, expectedObj);
    });

    it('should delete whole branches of properties if required', () => {
      const testObj = { foo: { bar: { val: 'value'} } };
      const expectedObj = { foo: {} };

      dgDel(testObj, ['foo', 'bar']);

      assert.deepEqual(testObj, expectedObj);
    });

    it('should return undefined if it succeeds', () => {
      const testObj = { foo: { bar: { val: 'value'} } };
      const expectedObj = { foo: {} };

      const result = dgDel(testObj, ['foo', 'bar']);

      assert.strictEqual(result, undefined);
    });

    it('should return the original object if it does not succeed', () => {
      const testObj = { foo: { bar: { val: 'value'} } };
      const expectedObj = { foo: { bar: { val: 'value'} } };

      const result = dgDel(testObj, ['foo', 'baz']);

      assert.deepEqual(testObj, expectedObj);
    });

    it('should not mutate the object if it does not succeed', () => {
      const testObj = { foo: { bar: { val: 'value'} } };
      const expectedObj = { foo: { bar: { val: 'value'} } };

      dgDel(testObj, ['foo', 'baz']);

      assert.deepEqual(testObj, expectedObj);
    });
  });
});
