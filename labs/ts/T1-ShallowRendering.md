# Unit Testing Lab 1: Shallow Rendering with Enzyme

## Objectives

- [ ] Install Enzyme
- [ ] Create Your First Shallow Component Tests
- [ ] Refactor Tests

## Steps

### Install Enzyme

1. **Open** a `command prompt` (Windows) or `terminal` (Mac).
1. Change the **current directory** to `working\keeptrack`.
1. **Run** _one_ of the following sets of commands:

   #### npm

   ```
   npm i enzyme enzyme-adapter-react-16
   npm i @types/enzyme --save-dev
   ```

   #### Yarn

   ```
   yarn add enzyme enzyme-adapter-react-16
   yarn add @types/enzyme --save-dev
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

---

### &#10004; You have completed Lab Unit Testing Lab 1
