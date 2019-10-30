# Unit Testing Lab 1: Shallow Rendering with Enzyme

## Objectives

- [ ] Install Enzyme
- [ ] Create Your First Shallow Component Tests
- [ ] Refactor Tests

## Steps

> This lab is designed to start with the code after finishing:
>
> **Lab 25: Redux with React**

### Install Enzyme

1. **Open** a `command prompt` (Windows) or `terminal` (Mac).
1. Change the **current directory** to `working\keeptrack`.
1. **Run** _one_ of the following sets of commands:

   #### npm

   ```shell
   npm i enzyme enzyme-adapter-react-16
   ```

   #### Yarn

   ```shell
   yarn add enzyme enzyme-adapter-react-16
   ```

1. Create the file `src\setupTests.js`
1. Add the following code to configure enzyme.

   #### `src\setupTests.js`

   ```js
   import { configure } from 'enzyme';
   import Adapter from 'enzyme-adapter-react-16';

   configure({ adapter: new Adapter() });
   ```

1. **Run** _one_ of the following commands to run the tests:

   #### npm

   ```shell
   npm test
   ```

   #### Yarn

   ```shell
   yarn test
   ```

1. Press `a` to run all tests.
2. Verify the test created by Create React App passes.

   ```shell
   PASS  src/App.test.js
   ```

### Create Your First Component Test

1. Create the file `src\home\HomePage.test.js`.
1. Add a test to verify the component shallow renders without crashing.

   #### `src\home\HomePage.test.js`

   ```js
   import React from 'react';
   import { shallow, ShallowWrapper } from 'enzyme';
   import HomePage from './HomePage';

   test('renders without crashing', () => {
     let wrapper;
     wrapper = shallow(<HomePage />);
     expect(wrapper).toBeDefined();
   });
   ```

1. Verify the test passes.

   ```shell
   PASS  src/home/HomePage.test.js
   ```

1. Add a test to verify the component renders a title tag.

   #### `src\home\HomePage.test.js`

   ```js
   // ...
   test('renders title tag', () => {
     let wrapper;
     wrapper = shallow(<HomePage />);
     expect(wrapper.exists('h2')).toBeTruthy();
   });
   ```

1. Verify the test passes.
   ```shell
   PASS  src/home/HomePage.test.js
   ```
1. Add a test to verify the component renders a title.

   #### `src\home\HomePage.test.js`

   ```js
   // ...
   test('renders title', () => {
     let wrapper;
     wrapper = shallow(<HomePage />);
     expect(wrapper.find('h2').text()).toBe('Home');
   });
   ```

1. Verify the test passes.
   ```shell
   PASS  src/home/HomePage.test.js
   ```

### Refactor Tests

1. Remove repitition by adding a `describe` block and `beforeEach` and `afterEach` functions.

   #### `src\home\HomePage.test.js`

   ```js
   import React from 'react';
   import { shallow, ShallowWrapper } from 'enzyme';
   import HomePage from './HomePage';

   describe('<HomePage />', () => {
     let wrapper;

     beforeEach(() => {
       wrapper = shallow(<HomePage />);
     });

     test('renders without crashing', () => {
       expect(wrapper).toBeDefined();
     });

     test('renders title tag', () => {
       expect(wrapper.exists('h2')).toBeTruthy();
     });

     test('renders title', () => {
       expect(wrapper.find('h2').text()).toBe('Home');
     });
   });
   ```

1. Verify all the tests of the `HomePage` still pass.
   ```shell
   PASS  src/home/HomePage.test.js
   ```

---

### &#10004; You have completed Lab Unit Testing Lab 1
