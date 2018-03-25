# Dot Guard [![CircleCI Build Status](https://circleci.com/gh/jim-coffey/dot-guard.svg?style=shield&circle-token=6bab114128c8b52fcd6282665f5658af247b4e63)](https://circleci.com/gh/jim-coffey/dot-guard) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/circleci/circleci-docs/master/LICENSE)

Safely access properites of an object via dot notation without worrying about `cannot read property 'x' of undefined` errors.

* `get` - retrieve value of a property
* `set` - set value of a property
* `has` - check for existence of property
* `del` - delete a property

All functions require minimum parameters of object, and propPath. (Set also requires a 'value' to set the property to).

Typical usage :

`dotGuard.get({ foo: { bar: { val: 42 } } }, 'foo.bar.val');` would return `42`.

`dotGuard.get({ foo: { bar: { val: 42 }  }, 'foo.baz.val');` would return `undefined`.

The propPath to the object property can be passed as a string, or an array of strings depending on requirements.
1. `'prop1.prop2.prop3'`
2. `['prop1', 'prop2', 'prop3']`

N.B. passing `propPath` as an array of strings, allows use of dot (`.`) in property keys e.g. `['prop.one', 'prop.two']`

Err... don't pass an array, unless you've been decorating it with properties!



## Requiring / Importing

Both formats below are supported :

* `var dotGuard = require('guard-dot');                        // dotGuard.get(...)`
* `import { dgGet, dgSet, dgHas, dgDel } from 'guard-dot';    // dgGet(...)`



## dotGuard.get / dgGet

`dotGuard.get(obj, propPath[, fallBack])`

Parameters :
* `obj` : object you wish to retrieve value from e.g. `{ foo: { bar: 3 } }`
* `propPath` : string OR array of poperties to traverse e.g. `'foo.bar'` OR `['foo', 'bar']`
* `fallBack` : [optional] default value to return if the value can not be retrieved from the object

```
import dotGuard from 'guard-dot';

dotGuard.get({ car: { make: 'Mercedes' } }, 'car.make')
//>> 'Mercedes'

dotGuard.get({ car: { make: 'Mercedes' } }, 'car.manufacturer);
//>> undefined

dotGuard.get({ car: { make: 'Mercedes' } }, 'car.model', 'Trabant')
//>> 'trabant'

dotGuard.get({ 'car.info': { make: 'Mercedes', model: 'C-class' } }, ['car.info', 'model']);
//>> 'C-class'
```

Returns value of `fallBack`, or `undefined` if parameters passed are invalid, or it fails.



## dotGuard.set / dgSet

`dotGuard.set(obj, propPath, value)`

Will overwrite a pre-existing value, or create a path to a new value.

Parameters :
* `obj` : object you wish to set value on e.g. `{ foo: { bar: 3 } }`
* `propPath` : string OR array of poperties to traverse e.g. `'foo.bar'` OR `['foo', 'bar']`
* `value` : default value to return if the value can not be retrieved from the object

```
import { dgSet } from 'guard-dot';

let obj;

obj = {};
dgSet(obj, 'foo.bar', 42);
console.log(obj);
//>> { foo: { bar: 42 } }

obj = { prop1: {} };
dgSet(obj, ['prop1', 'prop2'], 42);
console.log(obj);
//>> { prop1: { prop2: 42 } }

obj = { key1: 0 }
dgSet(obj, 'key1', 42);
console.log(obj);
//>> { key1: 42 }

obj = 'wibble';
const result = dgSet(obj, 'key1', 'val1');
console.log(result);
//>> 'wibble'
```

Returns original object passed, if parameters are invalid.



## dotGuard.has / dgHas

Checks for existence of a property and returns a boolean.

Can be used in conjunction with `dgGet` to distinguish between a non-existant property, and a property that exists with a value of `undefined`.

`dotGuard.has(obj, propPath)`

Parameters :
* `obj` : object you wish to has value on e.g. `{ foo: { bar: 3 } }`
* `propPath` : string OR array of poperties to traverse e.g. `'foo.bar'` OR `['foo', 'bar']`
* `value` : default value to return if the value can not be retrieved from the object

```
const dgHas = require('guard-dot').dgHas;

const obj = { foo: { bar: {} } };

dgHas(obj, 'foo.bar');
//>> true

dgHas(obj, 'foo.bar.prop');
//>> false
```

Returns boolean false if parameters passed are invalid, or it fails.



## dotGuard.del / dgDel

`dotGuard.del(obj, propPath, value)`

Parameters :
* `obj` : object you wish to del value on e.g. `{ foo: { bar: 3 } }`
* `propPath` : string OR array of poperties to traverse e.g. `'foo.bar'` OR `['foo', 'bar']`

```
import { dgDel } from 'guard-dot';

const obj = { prop1: { prop2: { prop3: 42 } } };

dgDel(obj, 'prop1.prop2.prop3');
console.log(obj);
//>> { prop1: { props2 {} } }

dgDel(obj, 'prop1.prop2');
console.log(obj);
//>> { prop1: {} }

const result = dgDel(obj, 'prop1.prop2');
console.log(result);
//>> { prop1: {} }
console.log(obj);
//>> { prop1: {} }
```

Returns original object passed, if parameters are invalid.
