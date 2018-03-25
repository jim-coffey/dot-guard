'use strict';
/* globals bench */
const dotGuard = require('./src/');

bench('get', () => {
	const f1 = {foo: {bar: 1}};
	dotGuard.get(f1);
	f1[''] = 'foo';
	dotGuard.get(f1, '');
	dotGuard.get(f1, 'foo');
	dotGuard.get({foo: 1}, 'foo');
	dotGuard.get({foo: null}, 'foo');
	dotGuard.get({foo: undefined}, 'foo');
	dotGuard.get({foo: {bar: true}}, 'foo.bar');
	dotGuard.get({foo: {bar: {baz: true}}}, 'foo.bar.baz');
	dotGuard.get({foo: {bar: {baz: null}}}, 'foo.bar.baz');
	dotGuard.get({foo: {bar: 'a'}}, 'foo.fake');
	dotGuard.get({foo: {bar: 'a'}}, 'foo.fake.fake2');
	dotGuard.get({'\\': true}, '\\');
	dotGuard.get({'\\foo': true}, '\\foo');
	dotGuard.get({'bar\\': true}, 'bar\\');
	dotGuard.get({'foo\\bar': true}, 'foo\\bar');
	dotGuard.get({'\\.foo': true}, ['\\.foo']);
	dotGuard.get({'bar\\.': true}, ['bar\\.']);
	dotGuard.get({'foo\\.bar': true}, ['foo\\.bar']);

	const f2 = {};
	Object.defineProperty(f2, 'foo', {
		value: 'bar',
		enumerable: false
	});
	dotGuard.get(f2, 'foo');
	dotGuard.get({}, 'hasOwnProperty');

	function fn() {}
	fn.foo = {bar: 1};
	dotGuard.get(fn);
	dotGuard.get(fn, 'foo');
	dotGuard.get(fn, 'foo.bar');

	const f3 = {foo: null};
	dotGuard.get(f3, 'foo.bar');

	dotGuard.get({'foo.baz': {bar: true}}, ['foo.baz', 'bar']);
	dotGuard.get({'fo.ob.az': {bar: true}}, ['fo.ob.az', 'bar']);

	dotGuard.get(null, 'foo.bar', false);
	dotGuard.get('foo', 'foo.bar', false);
	dotGuard.get([], 'foo.bar', false);
	dotGuard.get(undefined, 'foo.bar', false);
});

bench('set', () => {
	const func = () => 'test';
	let f1 = {};

	dotGuard.set(f1, 'foo', 2);

	f1 = {foo: {bar: 1}};
	dotGuard.set(f1, 'foo.bar', 2);

	dotGuard.set(f1, 'foo.bar.baz', 3);

	dotGuard.set(f1, 'foo.bar', 'test');

	dotGuard.set(f1, 'foo.bar', null);

	dotGuard.set(f1, 'foo.bar', false);

	dotGuard.set(f1, 'foo.bar', undefined);

	dotGuard.set(f1, 'foo.fake.fake2', 'fake');

	dotGuard.set(f1, 'foo.function', func);

	function fn() {}
	dotGuard.set(fn, 'foo.bar', 1);

	f1.fn = fn;
	dotGuard.set(f1, 'fn.bar.baz', 2);

	const f2 = {foo: null};
	dotGuard.set(f2, 'foo.bar', 2);

	const f3 = {};
	dotGuard.set(f3, '', 3);

	dotGuard.set(f1, ['foo.bar', 'baz'], true);

	dotGuard.set(f1, ['fo.ob.ar', 'baz'], true);
});

bench('delete', () => {
	const func = () => 'test';
	func.foo = 'bar';

	const inner = {
		a: 'a',
		b: 'b',
		c: 'c',
		func
	};

	const f1 = {
		foo: {
			bar: {
				baz: inner
			}
		},
		top: {
			dog: 'coffey'
		}
	};

	dotGuard.del(f1, 'foo.bar.baz.c');

	dotGuard.del(f1, 'top');

	dotGuard.del(f1, 'foo.bar.baz.func.foo');

	dotGuard.del(f1, 'foo.bar.baz.func');

	dotGuard.set(f1, ['foo.bar', 'baz'], true);
	dotGuard.del(f1, ['foo.bar', 'baz']);

	const f2 = {};
	dotGuard.set(f2, ['foo', 'bar.baz'], true);
	dotGuard.del(f2, ['foo', 'bar.baz']);

	f2.dotted = {
		sub: {
			'dotted.prop': 'foo',
			other: 'prop'
		}
	};
	dotGuard.del(f2, ['dotted', 'sub', 'dotted.prop']);
});

bench('has', () => {
	const f1 = {foo: {bar: 1}};
	dotGuard.has(f1);
	dotGuard.has(f1, 'foo');
	dotGuard.has({foo: 1}, 'foo');
	dotGuard.has({foo: null}, 'foo');
	dotGuard.has({foo: undefined}, 'foo');
	dotGuard.has({foo: {bar: true}}, 'foo.bar');
	dotGuard.has({foo: {bar: {baz: true}}}, 'foo.bar.baz');
	dotGuard.has({foo: {bar: {baz: null}}}, 'foo.bar.baz');
	dotGuard.has({foo: {bar: 'a'}}, 'foo.fake.fake2');

	function fn() {}
	fn.foo = {bar: 1};
	dotGuard.has(fn);
	dotGuard.has(fn, 'foo');
	dotGuard.has(fn, 'foo.bar');

	dotGuard.has({'foo.baz': {bar: true}}, ['foo.baz', 'bar']);
	dotGuard.has({'fo.ob.az': {bar: true}}, ['fo.ob.az', 'bar']);
});
