# Appendix A2: Compiler Setup

- [Appendix A2: Compiler Setup](#appendix-a2-compiler-setup)
  - [How It Works](#how-it-works)
  - [Setup (Babel)](#setup-babel)
    - [Create Project](#create-project)
    - [Install Babel](#install-babel)
    - [Run Babel](#run-babel)
  - [Setup (TypeScript)](#setup-typescript)
    - [Create Project](#create-project-1)
    - [Install TypeScript](#install-typescript)
    - [Configure TypeScript](#configure-typescript)
    - [Setting the Compiler Strictness](#setting-the-compiler-strictness)
    - [Run TypeScript](#run-typescript)


## How It Works

- TypeScript or Babel provides a compiler:
  -  `tsc` (TypeScript compiler)
  -  `babel`  (Babel compiler)
-  Compiles 
   - newer language features written in TypeScript or `ES2015` and beyond 
   -  to earlier versions of JavaScript (commonly `ES5`) that are supported in web browsers (where the application will be running)
- The compilation is often more specificaly referred to as **transpilation**.
  - Transpilation refers to a specific kind of compilation, source code to source code. 
  - We traditionally think about compilers as transforming source code to bytecode.


- To see this in action:
  - Visit: [Babel REPL](https://babeljs.io/repl)
    - or
  - Visit: [TypeScript Playground](https://www.typescriptlang.org/play/)

## Setup (Babel)

### Create Project

```
mkdir esdemos
cd esdemos
code . //opens Visual Studio Code
```

### Install Babel

1. Open a command-prompt or terminal
2. Change directory to `esdemos`
3. Run these commands to install `babel` packages:

   ```
   npm init -y
   npm install --save-dev @babel/core @babel/cli @babel/preset-env
   npm install --save @babel/polyfill core-js@3
   ```

4. Create a config file named `.babelrc` in the root of your project with this content:

   ```json
   {
     "presets": [
       [
         "@babel/preset-env",
         {
           "useBuiltIns": "usage",
           "corejs": 3,
           "targets": {
             "node": "10"
           }
         }
       ]
     ]
   }
   ```

> `targets` refers to the target environment your code will run in; in our use case it will be `node` (not a browser)

<div style="page-break-after: always;"></div>

### Run Babel

1.  Create file `src\program.js`
2.  Add the following code:

```js
const greeting = 'hello';
console.log(greeting);
```

3. Open a `command-prompt` or `terminal`.
4. Set the `current` directory to `esdemos`.
5. Run this command to compile all your code from the `src` directory to `lib`:

```
npx babel src --watch --out-dir lib
```

> `npx` allows you to run local packages and is available in npm 5.2 or higher. For more information see [this article](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)

<div style="page-break-after: always;"></div>

6.  Open _another_ (a new) command-prompt or terminal in the `esdemos` directory.

- In VS Code: View> Integrated Terminal
  - Click the + or the split terminal icon

7. Run the command:

```
node ./lib/program.js
```

8. Result:

```
hello
```

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