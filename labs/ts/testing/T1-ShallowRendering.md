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
   npm i @types/enzyme @types/enzyme-adapter-react-16 --save-dev
   ```

   #### Yarn

   ```shell
   yarn add enzyme enzyme-adapter-react-16
   yarn add @types/enzyme @types/enzyme-adapter-react-16 --save-dev
   ```

1. Create the file `src\setupTests.ts`
1. Add the following code to configure enzyme.

   #### `src\setupTests.ts`

   ```ts
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
1. Verify the test created by Create React App fails.

   ```shell
   FAIL  src/App.test.tsx
   Unable to find an element with the text: /learn react/i.
   ```

1. Open the file `src/App.test.tsx`
1. Remove the current test code and add the following enzyme test.

   ```tsx
   // import React from 'react';
   // import { render } from '@testing-library/react';
   // import App from './App';

   // test('renders learn react link', () => {
   //   const { getByText } = render(<App />);
   //   const linkElement = getByText(/learn react/i);
   //   expect(linkElement).toBeInTheDocument();
   // });

   import React from 'react';
   import ReactDOM from 'react-dom';
   import App from './App';

   it('renders without crashing', () => {
     const div = document.createElement('div');
     ReactDOM.render(<App />, div);
     ReactDOM.unmountComponentAtNode(div);
   });
   ```

1. Verify the test now passes.

   ```
   PASS  src/App.test.tsx
   ```

### Create Your First Component Test

1. Create the file `src\home\HomePage.test.tsx`.
1. Add a test to verify the component shallow renders without crashing.

   #### `src\home\HomePage.test.tsx`

   ```ts
   import React from 'react';
   import { shallow, ShallowWrapper } from 'enzyme';
   import HomePage from './HomePage';

   test('renders without crashing', () => {
     let wrapper: ShallowWrapper;
     wrapper = shallow(<HomePage />);
     expect(wrapper).toBeDefined();
   });
   ```

1. Verify the test passes.

   ```shell
   PASS  src/home/HomePage.test.tsx
   ```

1. Add a test to verify the component renders a title tag.

   #### `src\home\HomePage.test.tsx`

   ```ts
   // ...
   test('renders title tag', () => {
     let wrapper: ShallowWrapper;
     wrapper = shallow(<HomePage />);
     expect(wrapper.exists('h2')).toBeTruthy();
   });
   ```

1. Verify the test passes.
   ```shell
   PASS  src/home/HomePage.test.tsx
   ```
1. Add a test to verify the component renders a title.

   #### `src\home\HomePage.test.tsx`

   ```ts
   // ...
   test('renders title', () => {
     let wrapper: ShallowWrapper;
     wrapper = shallow(<HomePage />);
     expect(wrapper.find('h2').text()).toBe('Home');
   });
   ```

1. Verify the test passes.
   ```shell
   PASS  src/home/HomePage.test.tsx
   ```

### Refactor Tests

1. Remove repitition by adding a `describe` block and `beforeEach` and `afterEach` functions.

   #### `src\home\HomePage.test.tsx`

   ```ts
   import React from 'react';
   import { shallow, ShallowWrapper } from 'enzyme';
   import HomePage from './HomePage';

   describe('<HomePage />', () => {
     let wrapper: ShallowWrapper;

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
   PASS  src/home/HomePage.test.tsx
   ```

---

### &#10004; You have completed Lab Unit Testing Lab 1
