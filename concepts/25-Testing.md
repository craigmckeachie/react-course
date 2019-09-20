# Chapter 25: Testing

## Tools

### Jest

- Jest is a **JavaScript** testing framework
- Created by Facebook

Features:

- task runner
- assertion library
- mocking support
- snapshots
- isolated, paraellelized tests to maximize performance

Tools with similar scope include:

- Jasmine a JavaScript testing framework
- JUnit a Java testing framework
- NUnit a .NET testing framework

### Enzyme

- Enzyme is a **React Component** testing library
- Provides testing utilities for React
- Created by Airbnb
- Enzyme uses the React Test Utilities underneath, but is more convenient, readable, and powerful.

Features:

- renders a react component into a document
- shallow component rendering
  - doesn't render child components
- full (mount) component rendering
  - renders children: useful when
    - components interact with DOM API
    - need to test component lifecycle
- query the DOM
  - similar to jQuery
- simulates events

#### JSDOM

- JavaScript implementation of the DOM (Document object model)
- JavaScript based headless browser that can be used to create a realistic testing environment
- Enzyme's `mount` API (full rendering) requires a DOM, JSDOM is required in order to use mount
- While Jest provides browser globals such as window thanks to jsdom, they are only approximations of the real browser behavior.
- Jest is intended to be used for unit tests of your logic and your components rather than the DOM quirks.

## Syntax

- tests: test() or it()
  ```js
  test('test name', () => {
    //implement test
  });
  ```
- suites: describe()

  ```js
  describe('suite name', () => {
    test1('test1 name', () => {
      //implement test
    });

    test2('test2 name', () => {
      //implement test
    });
  });
  ```

- assertions: expect().toBe()...

  ```js
  test('test name', () => {
    expect(sum(1, 1)).toEqual(2);
  });
  ```

> [Here is the documentation for all assertion matchers](https://jestjs.io/docs/en/expect.html)

> Common question:
> What is the difference between `toBe` and `toEqual`?
>
> - `toBe()` is shallow equality
> - `toEqual()` is deep equality
> - [Here is an example](https://jestjs.io/docs/en/expect.html#toequalvalue)

- spies/mock functions: jest.fn()

  > [Jest Mock Functions Documentation](https://jestjs.io/docs/en/mock-functions)

## JavaScript Tests

https://facebook.github.io/create-react-app/docs/running-tests

1. Open the `my-app` project from the ProjectSetup lab.
2. Create the file `math.js`
3. Add the following code

```js
//math.js
export function add(a, b) {
  return a + b;
}
```

4. Create the file `math.test.js`
5. Open a command prompt or terminal in the `my-app` directory and run the tests

```js
npm test
```

6. Add the following code

```js
//math.test.js

import { add } from './math';

test('add numbers', () => {
  expect(add(1, 1)).toEqual(2);
  expect(add(2, 2)).toEqual(4);
});
```

> Be sure to include the `import` statement.

7. The test should pass.

```
Tests:      2 passed
```

8. Type `w` to show more commands.

```
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

8. Try out the various commands

## Debugging Tests

## Debugging Tests in Chrome

Add the following to the `scripts` section in your project's `package.json`

```json
"scripts": {
    "test:debug": "react-scripts --inspect-brk test --runInBand --no-cache"
  }
```

Place `debugger;` statements in any test and run:

```sh
$ npm run test:debug
```

This will start running your Jest tests, but pause before executing to allow a debugger to attach to the process.

Open the following in Chrome

```
about:inspect
```

After opening that link, the Chrome Developer Tools will be displayed. Select `inspect` on your process and a breakpoint will be set at the first line of the react script (this is done simply to give you time to open the developer tools and to prevent Jest from executing before you have time to do so). Click the button that looks like a "play" button in the upper right hand side of the screen to continue execution. When Jest executes the test that contains the debugger statement, execution will pause and you can examine the current scope and call stack.

> Note: the --runInBand cli option makes sure Jest runs test in the same process rather than spawning processes for individual tests. Normally Jest parallelizes test runs across processes but it is hard to debug many processes at the same time.

## Debugging Tests in Visual Studio Code

Debugging Jest tests is supported out of the box for [Visual Studio Code](https://code.visualstudio.com).

Use the following [`launch.json`](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) configuration file:

1. Click Debug > Start Debugging > Choose `Node` as the configuration type and add the configuration below.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug CRA Tests",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/react-scripts",
      "args": ["test", "--runInBand", "--no-cache", "--watchAll=false"],
      "cwd": "${workspaceRoot}",
      "protocol": "inspector",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Focusing and Excluding Tests

You can replace `it()` with `xit()` to temporarily exclude a test from being executed.
Similarly, `fit()` lets you focus on a specific test without running any other tests.

[Reference](https://facebook.github.io/create-react-app/docs/debugging-tests)

## Components Tests

Different ways to test:

- smoke
- shallow
- full

### Smoke

A `smoke test` just verifies that component renders without throwing.

### Shallow

Shallow testing tests a component in isolation from the child components it renders.

This requires the [`shallow()` rendering API](https://airbnb.io/enzyme/docs/api/shallow.html) from [Enzyme](https://airbnb.io/enzyme/).

1. To install it, run:

   ```sh
   npm install --save enzyme enzyme-adapter-react-16 react-test-renderer
   ```

   Alternatively you may use `yarn`:

   ```sh
   yarn add enzyme enzyme-adapter-react-16 react-test-renderer
   ```

As of Enzyme 3, you will need to install Enzyme along with an Adapter corresponding to the version of React you are using. (The examples above use the adapter for React 16.)

The adapter will also need to be configured in your [global setup file]:

1. Create the file `src/setupTests.js`

2. Add the following code:

   ```js
   // src/setupTests.js
   import { configure } from 'enzyme';
   import Adapter from 'enzyme-adapter-react-16';

   configure({ adapter: new Adapter() });
   ```

3. Stop `npm test` using `Ctrl+C`
4. Run the command `npm test` so it configures the adapter
5. Add the following test

```js
// src/App.test.js
...

//shallow
import { shallow } from 'enzyme';
test('renders without crashing', () => {
  shallow(<App />);
});
```

6. You should see an additional test passing.

### Full

For testing React components in a way that resembles the way the components are used by end users. It is well suited for unit, integration, and end-to-end testing of React components and applications.

It works more directly with DOM nodes, and therefore it's recommended to use with jest-dom for improved assertions.

1. To install `react-testing-library` and `jest-dom`, you can run:

```sh

npm install --save @testing-library/react @testing-library/jest-dom
```

Alternatively you may use `yarn`:

```sh
yarn add @testing-library/react @testing-library/jest-dom
```

2. Similar to `enzyme` you can modify a `src/setupTests.js` file to avoid boilerplate in your test files:

```js
// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import '@testing-library/react/cleanup-after-each';
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect';
```

3. Add a test using `react-testing-library` and `jest-dom` for testing that the `<App />` component renders "Learn React".

```js
// App.test.js
//full

import { render } from '@testing-library/react';

it('renders welcome message', () => {
  const { getByText } = render(<App />);
  expect(getByText('Learn React')).toBeInTheDocument();
});
```

### Snapshot

Snapshot testing is a feature of Jest that automatically generates text snapshots of your components and saves them on the disk so if the UI output changes, you get notified without manually writing any assertions on the component output. [Read more about snapshot testing](https://jestjs.io/blog/2016/07/27/jest-14.html).

Snapshot testing requires you to install the `react-test-renderer` which we already did for shallow testing.

1.  Add the following test

```js
// App.test.js
//snapshot
import renderer from 'react-test-renderer';
test('has a valid snapshot', () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
```

> Normally you wouldn't snapshot the `App` component since it contains all other components

2. Open `src/__snapshots__\App.test.js.snap`
3. Change `src/App.js`

   ```diff
   function App() {
   return (
       <div className="App">
       <header className="App-header">
   +        <h1>Welcome to React</h1>
           <img src={logo} className="App-logo" alt="logo" />
   ```

4. See the error message
   ```
    › 1 snapshot failed.
   Snapshot Summary
   › 1 snapshot failed from 1 test suite. Inspect your code changes or press `u` to update them.
   ```
5. Press `u` to update the snapshot.

## Mocking & Spies

https://jestjs.io/docs/en/mock-functions

## Async Tests

https://jestjs.io/docs/en/asynchronous
https://jestjs.io/docs/en/tutorial-async

## Reference

- [Jest: JavaScript Testing Framework](https://jestjs.io/)
- [Enzyme: JavaScript Testing Utilities for React](https://airbnb.io/enzyme/)
- [Difference Between Jest & Enzyme](https://stackoverflow.com/questions/42616576/what-is-the-difference-between-jest-and-enzyme)
- [Create React App Docs: Running Tests](https://facebook.github.io/create-react-app/docs/running-tests)
- [Create React App Docs: Debugging Tests](https://facebook.github.io/create-react-app/docs/debugging-tests)
- [Create React App Docs: Code Coverage](https://facebook.github.io/create-react-app/docs/running-tests#coverage-reporting)
- [Jest Matchers](https://jestjs.io/docs/en/expect.html)
- [Testing React Apps (with Jest)](https://jestjs.io/docs/en/tutorial-react)
- [React Documentation: Test Utilities](https://reactjs.org/docs/test-utils.html)

