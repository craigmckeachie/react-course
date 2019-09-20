# TypeScript

![TypeScript Logo](./assets/ts-logo.png)

<div style="page-break-after: always;"></div>

## Contents

- [TypeScript](#typescript)
  - [Contents](#contents)
  - [Setup (TypeScript)](#setup-typescript)
    - [Create Project](#create-project)
    - [Install TypeScript](#install-typescript)
    - [Configure TypeScript](#configure-typescript)
    - [Setting the Compiler Strictness](#setting-the-compiler-strictness)
    - [Run TypeScript](#run-typescript)
  - [Type Annotations](#type-annotations)
  - [Classes](#classes)
    - [Fields](#fields)
    - [Parameter Properties](#parameter-properties)
    - [Member visibility (public, private, protected)](#member-visibility-public-private-protected)
  - [Automatically Import Modules](#automatically-import-modules)
  - [Nullable Parameters](#nullable-parameters)
  - [Interfaces](#interfaces)
  - [Other Language Features](#other-language-features)
  - [Resources](#resources)

<div style="page-break-after: always;"></div>

## Setup (TypeScript)

### Create Project

```
mkdir typescriptdemo
cd typescriptdemo
code . //opens Visual Studio Code
```

### Install TypeScript

In a command-prompt or terminal

```
npm init -y
npm install typescript@3.1.6 --save-dev
```

<div style="page-break-after: always;"></div>

### Configure TypeScript

1.  Open a `command-prompt` or `terminal`.

2.  Set the `current` directory to `typescriptdemo`.

3.  Run the command:

```sh
npx tsc --init
```

- This creates a `tsconfig.json` file with the default command line options.

- Documentation for all TypeScript _[compiler options are available here.](https://www.typescriptlang.org/docs/handbook/compiler-options.html)_

<div style="page-break-after: always;"></div>

### Setting the Compiler Strictness

1. Open `tsconfig.json` and change the `strict` setting from `true` to `false`

   ```json
   /* Strict Type-Checking Options */
   "strict": false,
   "noEmitOnError": true,
   ...
   ```

   #### --strict

   > Enabling --strict enables --noImplicitAny, --noImplicitThis, --alwaysStrict, --strictBindCallApply, --strictNullChecks, --strictFunctionTypes and --strictPropertyInitialization.

   #### --strictNullChecks

   > In strict null checking mode, the null and undefined values are not in the domain of every type and are only assignable to themselves and any (the one exception being that undefined is also assignable to void).

   > The default setting for the compiler option `--noEmitOnError` is false so output is emitted even if errors were reported. For more information on why this is the default behavior see: https://github.com/Microsoft/TypeScript/issues/828

<div style="page-break-after: always;"></div>

### Run TypeScript

1. Create file `program.ts`
2. Code:

   ```js
   function greeter(name) {
     console.log('Hi ' + name);
   }
   greeter('Ben');
   ```

3. Run the command
   ```
    npx tsc -w
   ```
4. Open _another_ (a new) command-prompt or terminal in the `typescriptdemo` directory.

- In VS Code: View> Integrated Terminal
  - Click the + or the split terminal icon

11. Run the command: `node program.js`
12. Result:

    ```
    Hi Ben
    ```

<div style="page-break-after: always;"></div>

## Type Annotations

1.  Code:

    ```js
    function greeter(name: string) {
      console.log('Hi ' + name);
    }
    greeter(1);
    ```

    > Notice that the `greeter` function can be autocompleted in your editor. This is possible because of the static typing in TypeScript.

2.  Result:

    ```zsh
    program.ts(4,9): error TS2345: Argument of type '1' is not assignable to parameter of type 'string'.
    ```

3.  Change the code to pass a string again
    ```js
    greeter('Ben');
    ```
4.  Result:

    ```zsh
    Hi Ben
    ```

<div style="page-break-after: always;"></div>

## Classes

### Fields

1.  Code:

    ```js
    class Person {
      first: string;
      last: string;
    }

    let person = new Person();
    person.first = 'Craig';
    person.last = 'McKeachie';

    console.log(person.first + ' ' + person.last);
    ```

2.  Result:

    ```zsh
    Craig McKeachie
    ```

> Class field declarations for JavaScript
> https://github.com/tc39/proposal-class-fields

<div style="page-break-after: always;"></div>

1.  Code:

### Parameter Properties

1.  Code:

    - Instead of this (don't bother typing this out):

    ```js
    class Person {
      first: string;
      last: string;

      constructor(first: string, last: string) {
        this.first = first;
        this.last = last;
      }
    }

    let person = new Person('Craig', 'McKeachie');
    console.log(person.first + ' ' + person.last);
    ```

    - You can do this:

    ```js
    class Person {

        constructor(public first: string,public last: string) {
        }
    }

    let person = new Person("Craig", "McKeachie");
    console.log(person.first + ' ' + person.last);
    ```

1.  Result:

    ```zsh
    Craig McKeachie
    ```

### Member visibility (public, private, protected)

Members are public by default but you can explicitly make them public, private, or protected.

1. Code

   ```js
   class Person {
   // first: string; //this line and the next are the same
   public first: string = 'Leslie';
   private last: string = 'Nope';
   }

   let person = new Person();
   console.log(person.first, person.last);
   ```

2. Result

   ```
   program.ts:8:34 - error TS2341: Property 'last' is private and only accessible within class 'Person'.

   8 console.log(person.first, person.last);
   ```

   > While protected class members are accessible from the descendant’s code, they are not accessible on the class instance.

<div style="page-break-after: always;"></div>

## Automatically Import Modules

1.  Create file `my-module.ts`
2.  Add the following code to `my-module.ts`

    ```js
    export function myFunction() {
      return 'myFunction was run.';
    }
    ```

3.  Code in `program.ts`

- Try not typing the first line in the code block below..just type the second

  ```js
  import { myFunction } from './my-module';
  console.log(myFunction());
  ```

- Notice how editor can automatically import the module

4.  Result

    ```
    myFunction was run.
    ```

<div style="page-break-after: always;"></div>

## Nullable Parameters

1.  Code

```ts
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

## Interfaces

1.  Code

    ```ts
    interface Person {
      first: string;
      last: string;
    }

    let bert = { first: 'Bert', last: 'Macklin' };
    let person = bert as Person;
    console.log(person.first, person.last);
    ```

2.  Result

    ```
    Bert Macklin
    ```

3.  Open `program.js` and notice how the interface was compiled away by typescript.

> Since they compile away interfaces are a great choice to use in React for data structures that represent models or entities in your application.

## Other Language Features

There are numerous other language features TypeScript provides that you are probably used to from working in other statically typed languages such as `Java` and `C#`. Below is a list of some of the most commonly used language features.

- Enums
- Generics
- Abstract Classes
- Decorators

You can use these language features in your own application code but the React library doesn't use any of these features in their APIs as they support coding in `JavaScript` or `TypeScript`.

## Resources

- [TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/content/docs/getting-started.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- [TypeScript Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [ECMAScript Compatibility Chart](https://kangax.github.io/compat-table/es6/)
