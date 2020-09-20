# Essential JavaScript for React

## Setup

1. Install the [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) extension in Visual Studio Code.

   1. [Click this link](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)
   2. **Click** the **green** `Install` **button**
   3. **Click** the **button** `Open Visual Studio Code`
   4. **Click** the **green** `Install` **button** inside Visual Studio Code

1. Create a directory named `demos`
1. **Open** the `demos` directory (folder) in Visual Studio Code
1. Create the file `demos\program.js`
1. Add the following code.
   ```js
   console.log('ready');
   ```
1. Run the code in `program.js` using one of these options:
   - click `Run Code` button (top right looks like a Play button) in editor title menu
   - use shortcut `Ctrl+Alt+N`
   - right click the Text Editor and then click `Run Code` in editor context menu
1. Verify the output.

   ```bash
   [Running] node ".../program.js"
   ready

   [Done] exited with code=0 in 0.053 seconds
   ```

## Scope (var, let, const)

### var

1. Code

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
numbers.forEach(function (n) {
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
numbers.forEach((n) => console.log(n));
```

2.  Result

```zsh
1
2
3
4
```

<div style="page-break-after: always;"></div>

## Array.map() method

### a. for loop

```js
const numbers = [1, 2, 3, 4, 5];
const tens = [];

for (let index = 0; index < numbers.length; index++) {
  const number = numbers[index];
  tens.push(number * 10);
}

console.log(tens);
```

### b. #array.forEach

```js
const numbers = [1, 2, 3, 4, 5];
const tens = [];

numbers.forEach(function (number) {
  tens.push(number * 10);
});

console.log(tens);
```

### c. #array.map

```js
const numbers = [1, 2, 3, 4, 5];

const tens = numbers.map(function (number) {
  return number * 10;
});

console.log(tens);
```

### d. #array.map with arrow function

```js
const numbers = [1, 2, 3, 4, 5];
const tens = numbers.map((number) => number * 10);
console.log(tens);
```

## Destructuring

### Objects

1.  Code

```js
let person = {
  first: 'Thomas',
  last: 'Edison',
  age: 5,
  twitter: '@tom',
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
  twitter: '@tom',
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

## Classes

### Constructors

1.  Code:

    #### If using `Babel` compiler:

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

    #### If using TypeScript (`tsc`) compiler:

    ```ts
    class Person {
      first;
      last;
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
  myMethod: function () {
    return 'myMethod on myObject is running.';
  },
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

## Spread

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
