const assert = require('chai').assert;
const dotGuard = require('../src/index'); 

describe('dotGuard get', () => {
  describe('when passed a string', () => {
    it('should return value from dot path', () => {
      const testObj = { foo: { bar: 1 } };
      const result = dotGuard.get(testObj, 'foo.bar');

      assert.strictEqual(result, 1);
    });

    it('should return object from dot path', () => {
      const testObj = { foo: { bar: { nestedObject: { terminus: true } } } };
      const result = dotGuard.get(testObj, 'foo.bar');

      assert.strictEqual(result, testObj.foo.bar);
    });

    it('should cope with object keys containing dashes(-)', () => {
      const testObj = { 'foo-bar': { gotit: true } };
      const result = dotGuard.get(testObj, 'foo-bar');

      assert.strictEqual(result, testObj['foo-bar']);
    });

    it('should return value when keyed on empty string', () => {
      const testObj = { foo: { bar: 1 }, '': 'foo' };
      const result = dotGuard.get(testObj, '');

      assert.strictEqual(result, 'foo');
    });

    it('should return undefined if path does not match properties', () => {
      const testObj = { foo: { bar: { val: 42 } } };
      const result = dotGuard.get(testObj, 'foo.baz.val');

      assert.strictEqual(result, undefined);
    });

    it('should return fallback value if path does not match properties', () => {
      const testObj = { foo: { bar: { val: 42 } } };
      const result = dotGuard.get(testObj, 'foo.baz.val', 'fallBack');

      assert.strictEqual(result, 'fallBack');
    });
  
    it('should return undefined if path goes through a null value', () => {
      const testObj = { foo: null };
      const result = dotGuard.get(testObj, 'foo.bar');

      assert.strictEqual(result, undefined);
    });

    it('should cope with object keys containing dashes(-)', () => {
      const testObj = { 'foo-bar': { gotit: true } };
      const result = dotGuard.get(testObj, 'foo-bar');

      assert.strictEqual(result, testObj['foo-bar']);
    });

    it('should return undefined if dot path does not exist', () => {
      const testObj = { foo: { bar: { terminus: true } } };
      const result = dotGuard.get(testObj, 'foo.bar.result');

      assert.strictEqual(result, undefined);
    });

    it('should return undefined if dot path exists and resolves to undefined', () => {
      const testObj = { foo: { bar: { terminus: undefined } } };
      const result = dotGuard.get(testObj, 'foo.bar.terminus');

      assert.strictEqual(result, undefined);
    });

    it('should return null if dot path exists and resolves to null', () => {
      const testObj = { foo: { bar: { terminus: null } } };
      const result = dotGuard.get(testObj, 'foo.bar.terminus');

      assert.strictEqual(result, null);
    });

    it('should return NaN if dot path exists and resolves to NaN', () => {
      const testObj = { foo: { bar: { terminus: NaN } } };
      const result = dotGuard.get(testObj, 'foo.bar.terminus');

      assert.strictEqual(isNaN(result), true);
    });

    it('should ignore non-enumerable properties', () => {
      const testObj = {};
      Object.defineProperty(testObj, 'foo', {
        value: 'bar',
        enumerable: false
      });
      const result = dotGuard.get(testObj, 'foo');

      assert.strictEqual(result, undefined);
    });

    it('should work with functions', () => {
      const testObj = () => undefined;
      testObj.testProp = { foo: 'bar' };

      const result = dotGuard.get(testObj, 'testProp.foo');

      assert.strictEqual(result, 'bar');
    });
  });

  describe('when passed an array', () => {
    it('should return value from dot path', () => {
      const testObj = { foo: { bar: 1 } };
      const result = dotGuard.get(testObj, ['foo', 'bar']);

      assert.strictEqual(result, 1);
    });

    it('should return object from dot path', () => {
      const testObj = { foo: { bar: { nestedObject: { terminus: true } } } };
      const result = dotGuard.get(testObj, ['foo', 'bar']);

      assert.strictEqual(result, testObj.foo.bar);
    });

    it('should cope with object keys containing dashes(-)', () => {
      const testObj = { 'foo-bar': { gotit: true } };
      const result = dotGuard.get(testObj, ['foo-bar']);

      assert.strictEqual(result, testObj['foo-bar']);
    });

    it('should return value when keyed on empty string', () => {
      const testObj = { foo: { bar: 1 }, '': 'foo' };
      const result = dotGuard.get(testObj, ['']);

      assert.strictEqual(result, 'foo');
    });

    it('should return undefined if path does not match properties', () => {
      const testObj = { foo: { bar: { val: 42 } } };
      const result = dotGuard.get(testObj, ['foo', 'baz', 'val']);

      assert.strictEqual(result, undefined);
    });

    it('should return fallback value if path does not match properties', () => {
      const testObj = { foo: { bar: { val: 42 } } };
      const result = dotGuard.get(testObj, ['foo', 'baz', 'val'], 'fallBack');

      assert.strictEqual(result, 'fallBack');
    });
  
    it('should return undefined if path goes through a null value', () => {
      const testObj = { foo: null };
      const result = dotGuard.get(testObj, ['foo', 'bar']);

      assert.strictEqual(result, undefined);
    });

    it('should cope with object keys containing dashes(-)', () => {
      const testObj = { 'foo-bar': { gotit: true } };
      const result = dotGuard.get(testObj, ['foo-bar']);

      assert.strictEqual(result, testObj['foo-bar']);
    });

    it('should return undefined if dot path does not exist', () => {
      const testObj = { foo: { bar: { terminus: true } } };
      const result = dotGuard.get(testObj, ['foo', 'bar', 'result']);

      assert.strictEqual(result, undefined);
    });

    it('should return undefined if dot path exists and resolves to undefined', () => {
      const testObj = { foo: { bar: { terminus: undefined } } };
      const result = dotGuard.get(testObj, ['foo', 'bar', 'terminus']);

      assert.strictEqual(result, undefined);
    });

    it('should return null if dot path exists and resolves to null', () => {
      const testObj = { foo: { bar: { terminus: null } } };
      const result = dotGuard.get(testObj, ['foo', 'bar', 'terminus']);

      assert.strictEqual(result, null);
    });

    it('should return NaN if dot path exists and resolves to NaN', () => {
      const testObj = { foo: { bar: { terminus: NaN } } };
      const result = dotGuard.get(testObj, ['foo', 'bar', 'terminus']);

      assert.strictEqual(isNaN(result), true);
    });

    it('should ignore non-enumerable properties', () => {
      const testObj = {};
      Object.defineProperty(testObj, 'foo', {
        value: 'bar',
        enumerable: false
      });
      const result = dotGuard.get(testObj, ['foo']);

      assert.strictEqual(result, undefined);
    });

    it('should work with functions', () => {
      const testObj = () => undefined;
      testObj.testProp = { foo: 'bar' };

      const result = dotGuard.get(testObj, ['testProp', 'foo']);

      assert.strictEqual(result, 'bar');
    });
  });
});
