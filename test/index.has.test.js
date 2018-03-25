const assert = require('chai').assert;
const dotGuard = require('../src/index'); 

describe('dotGuard has', () => {

  describe('when passed a string', () => {
    it('should return true if property exists at top level', () => {
      const testObj = { val: 'value' };

      const result = dotGuard.has(testObj, 'val');

      assert.strictEqual(result, true);
    });

    it('should return true if property exists even if set to undefined', () => {
      const testObj = { val: undefined };

      const result = dotGuard.has(testObj, 'val');

      assert.strictEqual(result, true);
    });

    it('should return true if property exists even if set to null', () => {
      const testObj = { val: null };

      const result = dotGuard.has(testObj, 'val');

      assert.strictEqual(result, true);
    });

    it('should return true if property exists even if set to 0', () => {
      const testObj = { val: 0 };

      const result = dotGuard.has(testObj, 'val');

      assert.strictEqual(result, true);
    });

    it('should return false if property does not exist at top level', () => {
      const testObj = { value: 'value' };

      const result = dotGuard.has(testObj, 'val');

      assert.strictEqual(result, false);
    });

    it('should return true if property exist at a further level', () => {
      const testObj = { level2: { deepVal: 'value' } };

      const result = dotGuard.has(testObj, 'level2.deepVal');

      assert.strictEqual(result, true);
    });

    it('should return true if property exist as undefined at a further level', () => {
      const testObj = { level2: { deepVal: undefined } };

      const result = dotGuard.has(testObj, 'level2.deepVal');

      assert.strictEqual(result, true);
    });

    it('should return false if the path passed is incorrect', () => {
      const testObj = { level2: { deepVal: undefined } };

      const result = dotGuard.has(testObj, 'level2.fake');

      assert.strictEqual(result, false);
    });

    it('should return false if the path goes too deep', () => {
      const testObj = { level2: { deepVal: undefined } };

      const result = dotGuard.has(testObj, 'level2.deepVal.tooDeepVal');

      assert.strictEqual(result, false);
    });

    it('should work correctly identify props on functions', () => {
      const testObj = () => undefined;
      testObj.testProp = { foo: 'bar' };

      const result = dotGuard.has(testObj, 'testProp.foo');

      assert.strictEqual(result, true);
    });
  });

  describe('when passed an array', () => {
    it('should return true if property exists at top level', () => {
      const testObj = { val: 'value' };

      const result = dotGuard.has(testObj, ['val']);

      assert.strictEqual(result, true);
    });

    it('should return true if property exists even if set to undefined', () => {
      const testObj = { val: undefined };

      const result = dotGuard.has(testObj, ['val']);

      assert.strictEqual(result, true);
    });

    it('should return true if property exists even if set to null', () => {
      const testObj = { val: null };

      const result = dotGuard.has(testObj, ['val']);

      assert.strictEqual(result, true);
    });

    it('should return true if property exists even if set to 0', () => {
      const testObj = { val: 0 };

      const result = dotGuard.has(testObj, ['val']);

      assert.strictEqual(result, true);
    });

    it('should return false if property does not exist at top level', () => {
      const testObj = { value: 'value' };

      const result = dotGuard.has(testObj, ['val']);

      assert.strictEqual(result, false);
    });

    it('should return true if property exist at a further level', () => {
      const testObj = { level2: { deepVal: 'value' } };

      const result = dotGuard.has(testObj, ['level2', 'deepVal']);

      assert.strictEqual(result, true);
    });

    it('should return true if property exist as undefined at a further level', () => {
      const testObj = { level2: { deepVal: undefined } };

      const result = dotGuard.has(testObj, 'level2.deepVal');

      assert.strictEqual(result, true);
    });

    it('should return false if the path passed is incorrect', () => {
      const testObj = { level2: { deepVal: undefined } };

      const result = dotGuard.has(testObj, ['level2', 'fake']);

      assert.strictEqual(result, false);
    });

    it('should return false if the path goes too deep', () => {
      const testObj = { level2: { deepVal: undefined } };

      const result = dotGuard.has(testObj, ['level2', 'deepVal', 'tooDeepVal']);

      assert.strictEqual(result, false);
    });

    it('should work correctly identify props on functions', () => {
      const testObj = () => undefined;
      testObj.testProp = { foo: 'bar' };

      const result = dotGuard.has(testObj, ['testProp', 'foo']);

      assert.strictEqual(result, true);
    });

    it('should cope with object keys containing the dot (.) character', () => {
      const testObj = { 'foo.bar': { bar: undefined } };

      const result = dotGuard.has(testObj, ['foo.bar', 'bar']);

      assert.strictEqual(result, true);
    });
  });
});
