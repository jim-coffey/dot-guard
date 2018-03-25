const assert = require('chai').assert;
const dotGuard = require('../src/index'); 

describe('dotGuard set', () => {
  describe('when passed a string', () => {
    it('should set a value on a dot path', () => {
      const testObj = { foo: {} };

      dotGuard.set(testObj, 'foo.bar', 'value');

      assert.strictEqual(testObj.foo.bar, 'value');
    });

    it('should set a value on a deep dot path', () => {
      const testObj = {};

      dotGuard.set(testObj, 'foo.bar.terminus', 'value');

      assert.strictEqual(testObj.foo.bar.terminus, 'value');
    });

    it('should fail gracefully if asked to set property no null object', () => {
      const testObj = { foo: null };

      dotGuard.set(testObj, 'foo.bar', true);

      assert.strictEqual(testObj.foo, null);
    });

    it('should successfully set values to undefined', () => {
      const testObj = {};
      const newVal = undefined;

      dotGuard.set(testObj, 'foo.bar.terminus', newVal);

      assert.strictEqual(testObj.foo.bar.terminus, undefined);
    });

    it('should create a key with undefined value if not passed a value', () => {
      const testObj = {};

      dotGuard.set(testObj, 'foo.bar.terminus');

      assert.strictEqual(testObj.foo.bar.terminus, undefined);
    });

    it('should reset a value already set', () => {
      const testObj = { foo: { bar: { terminus: 1} } };

      dotGuard.set(testObj, 'foo.bar.terminus', 2);

      assert.strictEqual(testObj.foo.bar.terminus, 2);
    });

    it('should not return anything if successful', () => {
      const testObj = { foo: { bar: { terminus: 1} } };

      const result = dotGuard.set(testObj, 'foo.bar.terminus', 2);

      assert.strictEqual(result, undefined);
    });

    it('should return the original object parameter if not passed an object', () => {
      const testObj = 'string';

      const result = dotGuard.set(testObj, 'foo.bar.terminus', 2);

      assert.strictEqual(result, testObj);
    });

    it('should return the original object parameter if not passed valid props', () => {
      const testObj = { foo: { bar: { terminus: 1} } };

      const result = dotGuard.set(testObj, true, 2);

      assert.strictEqual(result, testObj);
    });
  });

  describe('when passed an array', () => {
    it('should set a value on a dot path', () => {
      const testObj = { foo: {} };

      dotGuard.set(testObj, ['foo', 'bar'], 'value');

      assert.strictEqual(testObj.foo.bar, 'value');
    });

    it('should set a value on a deep dot path', () => {
      const testObj = {};

      dotGuard.set(testObj, ['foo', 'bar', 'terminus'], 'value');

      assert.strictEqual(testObj.foo.bar.terminus, 'value');
    });

    it('should fail gracefully if asked to set property no null object', () => {
      const testObj = { foo: null };

      dotGuard.set(testObj, ['foo', 'bar'], true);

      assert.strictEqual(testObj.foo, null);
    });

    it('should successfully set values to undefined', () => {
      const testObj = {};
      const newVal = undefined;

      dotGuard.set(testObj, ['foo', 'bar', 'terminus'], newVal);

      assert.strictEqual(testObj.foo.bar.terminus, undefined);
    });

    it('should create a key with undefined value if not passed a value', () => {
      const testObj = {};

      dotGuard.set(testObj, ['foo', 'bar', 'terminus']);

      assert.strictEqual(testObj.foo.bar.terminus, undefined);
    });

    it('should reset a value already set', () => {
      const testObj = { foo: { bar: { terminus: 1} } };

      dotGuard.set(testObj, ['foo', 'bar', 'terminus'], 2);

      assert.strictEqual(testObj.foo.bar.terminus, 2);
    });

    it('should not return anything if successful', () => {
      const testObj = { foo: { bar: { terminus: 1} } };

      const result = dotGuard.set(testObj, ['foo', 'bar', 'terminus'], 2);

      assert.strictEqual(result, undefined);
    });

    it('should return the original object parameter if not passed an object', () => {
      const testObj = 'string';

      const result = dotGuard.set(testObj, ['foo', 'bar', 'terminus'], 2);

      assert.strictEqual(result, testObj);
    });

    it('should return the original object parameter if not passed valid props', () => {
      const testObj = { foo: { bar: { terminus: 1} } };

      const result = dotGuard.set(testObj, true, 2);

      assert.strictEqual(result, testObj);
    });
  });
});
