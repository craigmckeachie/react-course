# Unit Testing Lab 2: Snapshot Tests

## Objectives

- [ ] Install React's Test Renderer
- [ ] Create Your First Snapshot Test

## Steps

### Install React's Test Renderer

1. **Open** a `command prompt` (Windows) or `terminal` (Mac).
1. Change the **current directory** to `working\keeptrack`.
1. **Run** _one_ of the following sets of commands:

   #### npm

   ```shell
   npm i react-test-renderer
   ```

   #### Yarn

   ```shell
   yarn add react-test-renderer
   ```

### Create Your First Snapshot Test

1. Add a snapshot test for the component.

#### `src\home\HomePage.test.js`

```diff
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import HomePage from './HomePage';
+ import renderer from 'react-test-renderer';

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

+  test('snapshot', () => {
+    const tree = renderer.create(<HomePage />).toJSON();
+    expect(tree).toMatchSnapshot();
+  });

});
```

1. Verify the snapshot is created.

   ```shell
    › 1 snapshot written.
   ```
1. **Open** `src\home\__snapshots__\HomePage.test.js.snap` and review the contents.

---

### &#10004; You have completed Unit Testing Lab 2
