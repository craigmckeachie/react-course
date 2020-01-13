# Appendix A3: ECMAScript 6 (ES6)

![ Logo](./assets/es-ecmascript-logo.png)

<div style="page-break-after: always;"></div>

## Contents

- [Appendix A3: ECMAScript 6 (ES6)](#appendix-a3-ecmascript-6-es6)
  - [Contents](#contents)
  - [Classes](#classes)
    - [Constructors](#constructors)
    - [Methods](#methods)
      - [If using `Babel` compiler:](#if-using-babel-compiler)
      - [If using TypeScript (`tsc`) compiler:](#if-using-typescript-tsc-compiler)
    - [Class Fields](#class-fields)
  - [Scope (var, let, const)](#scope-var-let-const)
    - [var](#var)
    - [let](#let)
    - [const](#const)
  - [Arrow Functions](#arrow-functions)
    - [Function](#function)
    - [Arrow function](#arrow-function)
  - [Modules](#modules)
    - [First Module](#first-module)
    - [Another Module](#another-module)
  - [Template Literals](#template-literals)
  - [Default, Rest, Spread](#default-rest-spread)
    - [Default](#default)
    - [Rest](#rest)
    - [Spread](#spread)
  - [Destructuring](#destructuring)
    - [Objects](#objects)
    - [Arrays](#arrays)
  - [Optional Parameters](#optional-parameters)
  - [Object.assign()](#objectassign)
  - [Object Initializer](#object-initializer)
  - [Resources](#resources)

<div style="page-break-after: always;"></div>

## Classes

### Constructors

1.  Code:

```js
class Person {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }
}

let person = new Person('Ron', 'Swanson');
console.log(person.first + ' ' + person.last);
```

2.  Result:

```zsh
Ron Swanson
```

### Methods

1.  Code:

#### If using `Babel` compiler:

```js
class Person {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }
  getFullName() {
    return this.first + ' ' + this.last;
  }
}

let person = new Person('Ron', 'Swanson');
console.log(person.getFullName());
```

#### If using TypeScript (`tsc`) compiler:

```ts
class Person {
  first;
  last;
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }
  getFullName() {
    return this.first + ' ' + this.last;
  }
}

let person = new Person('Ron', 'Swanson');
console.log(person.getFullName());
```

1.  Result:

```zsh
Ron Swanson
```

<div style="page-break-after: always;"></div>

### Class Fields

Class Fields are only a stage-3 proposal so you need to install an additional [plugin](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) to use them.

The proposed feature of class fields is commonly used in React projects and is included in `Create React App`'s default configuration.

> [Class field declarations for JavaScript](https://github.com/tc39/proposal-class-fields)

1. This propsed feature is available in TypeScript without any additional configuration but **if you are using Babel** as your compiler you will need to 1. Install the plugin below.

   ```
   npm install --save-dev @babel/plugin-proposal-class-properties
   ```

2. Configure the plugin

   ```
   plugins: ["@babel/plugin-proposal-class-properties"]
   ```

3. Code:

```js
class Person {
  first;
  last;
}

let person = new Person();
person.first = 'Tom';
person.last = 'Haverford';

console.log(person.first + ' ' + person.last);
```

2.  Result:

```zsh
Craig McKeachie
```

<div style="page-break-after: always;"></div>

## Scope (var, let, const)

### var

1.  Code

```js
var numbers = [1, 2, 3, 4];

for (var counter = 0; counter < numbers.length; counter++) {
  console.log(numbers[counter]);
}

console.log('at end: ' + counter);
```

2.  Result

```zsh
1
2
3
4
at end: 4
```

<div style="page-break-after: always;"></div>

### let

1.  Code

```js
let numbers = [1, 2, 3, 4];

for (let counter = 0; counter < numbers.length; counter++) {
  console.log(numbers[counter]);
}

console.log('at end: ' + counter);
```

2. Result

```sh
console.log('at end: ' + counter);
                         ^

ReferenceError: counter is not defined
```

### const

1.  Code

```js
const a = 1;
a = 2;
```

2.  Result

```zsh
Error: "a" is read-only
```

<div style="page-break-after: always;"></div>

## Arrow Functions

1.  Code

### Function

```js
let numbers = [1, 2, 3, 4];
//verbose
numbers.forEach(function(n) {
  console.log(n);
});
```

2.  Result

```zsh
1
2
3
4
```

### Arrow function

1.  Code

```js
let numbers = [1, 2, 3, 4];
numbers.forEach(n => console.log(n));
```

2.  Result

```zsh
1
2
3
4
```

<div style="page-break-after: always;"></div>

## Modules

### First Module

1.  Create file `src\my-module.[js|ts]`
2.  Add the following code to `src\my-module.[js|ts]`

```js
export function myFunction() {
  return 'myFunction was run.';
}
```

3.  Code in `program.[js|ts]`

- Auto import doesn't work in JavaScript, you need to use TypeScript

```js
import { myFunction } from './my-module';
console.log(myFunction());
```

1.  Result

```
myFunction was run.
```

<div style="page-break-after: always;"></div>

### Another Module

1.  Code in `my-module.[js|ts]`

```js
//my-module.js
export function myFunction() {
  return 'myFunction was run.';
}

function myPrivateFunction() {
  return 'myPrivateFunction was run.';
}

let myObject = {
  myName: "I can access myObject's name",
  myMethod: function() {
    return 'myMethod on myObject is running.';
  }
};

export { myObject };

export const myPrimitive = 55;

export class MyClass {
  myClassMethod() {
    return 'myClassMethod on myClass is running.';
  }
}
```

2.  Code in `program.[js|ts]`

```js
import { myFunction, myObject, myPrimitive, MyClass } from './my-module';

console.log(myFunction());

console.log(myObject.myName);
console.log(myObject.myMethod());

console.log(myPrimitive);

let myClass = new MyClass();
console.log(myClass.myClassMethod());
```

<div style="page-break-after: always;"></div>

3.  Result

```
myFunction was run.
I can access myObject's name
myMethod on myObject is running.
55
myClassMethod on myClass is running.
```

<div style="page-break-after: always;"></div>

## Template Literals

1.  Code

```js
let verb = 'ate';
let noun = 'food';
let sentence = `I ${verb} ${noun}. 
I enjoyed it.`;
console.log(sentence);
```

2.  Result

```zsh
I ate food.
I enjoyed it.
```

<div style="page-break-after: always;"></div>

## Default, Rest, Spread

### Default

1.  Code

```js
function add(x, y = 2) {
  return x + y;
}

console.log(add(1, 1) === 2);
console.log(add(1) === 3);
```

2.  Result

```
true
true
```

### Rest

1.  Code

```js
function printArguments(a, b, ...theArguments) {
  console.log('a:', a);
  console.log('b:', b);
  for (let argument of theArguments) {
    console.log(argument);
  }
}

printArguments('a', 'b', 'c', 'd');
```

2.  Result

```
a: a
b: b
c
```

<div style="page-break-after: always;"></div>

### Spread

1.  Code

```js
function add(x, y, z) {
  return x + y + z;
}

// Pass each elem of array as argument
console.log(add(...[1, 2, 3]));
```

2.  Result

```sh
6
```

<div style="page-break-after: always;"></div>

## Destructuring

### Objects

1.  Code

```js
let person = {
  first: 'Thomas',
  last: 'Edison',
  age: 5,
  twitter: '@tom'
};

let { first, last } = person;
console.log(first);
console.log(last);
```

2.  Result

```
Thomas
Edison
```

<div style="page-break-after: always;"></div>

Assignment is left to right with an object literal.

1.  Code

```js
let person = {
  first: 'Thomas',
  last: 'Edison',
  age: 5,
  twitter: '@tom'
};

let { first: firstName, last: lastName } = person;
console.log(firstName);
console.log(lastName);
```

2.  Result

```
Thomas
Edison
```

<div style="page-break-after: always;"></div>

### Arrays

1.  Code

```js
let numbers = [1, 2, 3];

let [a, b, c] = numbers;
console.log(a);
console.log(b);
console.log(c);
```

2.  Result

```
1
2
3
```

If you don't need an item just skip that item in the assignment.

1.  Code

```js
let numbers = [1, 2, 3];

let [, b, c] = numbers;
// console.log(a);
console.log(b);
console.log(c);
```

2.  Result

```
2
3
```

<div style="page-break-after: always;"></div>

## Optional Parameters

1.  Code

```js
function buildName(first: string, last: string, middle?: string) {
  if (middle) {
    return `${first} ${middle} ${last}`;
  } else {
    return `${first} ${last}`;
  }
}

console.log(buildName('Craig', 'McKeachie'));
console.log(buildName('Craig', 'McKeachie', 'D.'));
```

2.  Result

```
Craig McKeachie
Craig D. McKeachie
```

<div style="page-break-after: always;"></div>

## Object.assign()

1.  **If** you are **using** the **TypeScript** compiler (`tsc`), you will need to update your TypeScript configuration as shown below before doing this excercise.

```diff
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */,
    "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
+    "lib": [
+      "dom",
+      "es2015"
    ]
    ...
  }
```

> The `es2015` adds `.assign` on the base JavaScript type of `object`. The `dom` also has to be added to use `console.log` which worked previously because is the default lab included with TypeScript.

2.  Code

```js
let o1 = { a: 1, b: 1, c: 1 };
let o2 = { b: 2, c: 2 };
let o3 = { c: 3 };

let obj = Object.assign({}, o1, o2, o3);
console.log(obj);
```

2.  Result

```
{ a: 1, b: 2, c: 3 }
```

<div style="page-break-after: always;"></div>

## Object Initializer

1.  Code

```js
export {}; //this line only necessary when using TypeScript
const name = 'Leslie';

const user = {
  name: name
};

console.log('user ', user.name);

const user1 = {
  name
};

console.log('user1 ', user.name);
```

> [More Information on why export is necessary when using TypeScript](https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files)

2.  Result

```
user  Leslie
user1  Leslie
```

<div style="page-break-after: always;"></div>

## Resources

- [ES6 Features](http://es6-features.org)
- [Learn ES2015/6](https://babeljs.io/docs/en/learn)
- [How to Learn ES6](https://medium.com/javascript-scene/how-to-learn-es6-47d9a1ac2620)
