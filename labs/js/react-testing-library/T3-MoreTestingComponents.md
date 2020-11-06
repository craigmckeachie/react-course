# Testing Lab 3: More Component Testing

## Objectives

- [ ] Test Setup
- [ ] Testing a Prop
- [ ] Testing a Function Prop
- [ ] Taking a Snapshot

## Steps

### Test Setup

1. **Create** the **directory** `src\projects\__tests__`.
1. **Create** the **file** `src\projects\__tests__\ProjectCard-test.js`.
1. **Add** the **setup** code below to test the component.

   #### `src\projects\__tests__\ProjectCard-test.js`

   ```js
   import { render, screen } from '@testing-library/react';
   import React from 'react';
   import { Project } from '../Project';
   import ProjectCard from '../ProjectCard';

   describe('<ProjectCard />', () => {
     let project;
     let handleEdit;
     beforeEach(() => {
       project = new Project({
         id: 1,
         name: 'Mission Impossible',
         description: 'This is really difficult',
         budget: 100,
       });
       handleEdit = jest.fn();
       render(<ProjectCard project={project} onEdit={handleEdit} />);
     });

     it('renders without crashing', () => {
       expect(screen).toBeDefined();
     });
   });
   ```

1. Verify the test fails.

   ```shell
   FAIL src/projects/__tests__/ProjectCard-test.js
   Invariant failed: You should not use <Link> outside a <Router>
   ```

1. Wrap the component in a `MemoryRouter`.

   ```diff
   import { render, screen } from '@testing-library/react';
   import React from 'react';
   + import { MemoryRouter } from 'react-router-dom';
   import { Project } from '../Project';
   import ProjectCard from '../ProjectCard';

   describe('<ProjectCard />', () => {
     let project;
     let handleEdit;
     beforeEach(() => {
       project = new Project({
         id: 1,
         name: 'Mission Impossible',
         description: 'This is really difficult',
         budget: 100,
       });
       handleEdit = jest.fn();
       render(
   +      <MemoryRouter>
           <ProjectCard project={project} onEdit={handleEdit} />
   +      </MemoryRouter>
       );
     });

     it('renders without crashing', () => {
       expect(screen).toBeDefined();
     });
   });
   ```

   > `<MemoryRouter>` - a `<Router>` that keeps the history of your "URL" in memory (does not read or write to the address bar). Useful in tests and non-browser environments like React Native.

1. Verify the initial test now passes.
   ```shell
   PASS  src/projects/__tests__/ProjectCard-test.js
   ```

### Testing a Prop

1. Open a command-prompt or terminal and run the following command to install `user-event` from the core testing library behind React testing library.

   ```
   npm install --save-dev @testing-library/user-event @testing-library/dom
   ```

1. **Test** that the project **property renders correctly**.

   #### `src\projects\__tests__\ProjectCard-test.js`

   ```diff
   ...

   describe('<ProjectCard />', () => {
     let project;
     let handleEdit;
     beforeEach(() => {
       project = new Project({
         id: 1,
         name: 'Mission Impossible',
         description: 'This is really difficult',
         budget: 100,
       });
       handleEdit = jest.fn();
       render(
         <MemoryRouter>
           <ProjectCard project={project} onEdit={handleEdit} />
         </MemoryRouter>
       );
     });

     it('renders without crashing', () => {
       expect(screen).toBeDefined();
     });

   +  it('renders project properly', () => {
   +    expect(screen.getByRole('heading')).toHaveTextContent(project.name);
   +    // screen.debug(document);
   +    screen.getByText(/this is really difficult\.\.\./i);
   +    screen.getByText(/budget : 100/i);
   +  });
   });
   ```

1. **Verify** the **test passes**.
   ```shell
   PASS  src/projects/__tests__/ProjectCard-test.js
   ```

### Testing a Function Prop

1. Open a command-prompt or terminal and run the following command to install `user-event` from the core testing library behind React testing library.

```
npm install --save-dev @testing-library/user-event @testing-library/dom
```

1. **Test** that the **handler prop** is called when edit is clicked.

   #### `src\projects\__tests__\ProjectCard-test.js`

   ```diff
   import { render, screen } from '@testing-library/react';
   import React from 'react';
   import { MemoryRouter } from 'react-router-dom';
   import { Project } from '../Project';
   import ProjectCard from '../ProjectCard';
   + import userEvent from '@testing-library/user-event';


   describe('<ProjectCard />', () => {
     let project;
     let handleEdit;
     beforeEach(() => {
       project = new Project({
         id: 1,
         name: 'Mission Impossible',
         description: 'This is really difficult',
         budget: 100,
       });
       handleEdit = jest.fn();
       render(
         <MemoryRouter>
           <ProjectCard project={project} onEdit={handleEdit} />
         </MemoryRouter>
       );
     });

     ...

   +  it('handler called when edit clicked', () => {
   +    // this query works screen.getByText(/edit/i)
   +    // but using role is better
   +    userEvent.click(
   +      screen.getByRole('button')
   +    );
   +    expect(handleEdit).toBeCalledTimes(1);
   +    expect(handleEdit).toBeCalledWith(project);
   +  });

   });

   ```

1. **Verify** the **test passes**.
   ```shell
   PASS  src/projects/__tests__/ProjectCard-test.js
   ```

### Taking a Snapshot

1. **Take** a **snapshot** of the component.

   #### `src\projects\__tests__\ProjectCard-test.js`

   ```diff
   import { render, screen } from '@testing-library/react';
   import React from 'react';
   import { MemoryRouter } from 'react-router-dom';
   import { Project } from '../Project';
   import ProjectCard from '../ProjectCard';
   import userEvent from '@testing-library/user-event';
   + import renderer from 'react-test-renderer';

   describe('<ProjectCard />', () => {
     let project;
     let handleEdit;
     beforeEach(() => {
       ...
     });

   ...

   +  test('snapshot', () => {
   +    const tree = renderer
   +      .create(
   +        <MemoryRouter>
   +          <ProjectCard project={project} onEdit={handleEdit} />
   +        </MemoryRouter>
   +      )
   +      .toJSON();
   +    expect(tree).toMatchSnapshot();
   +  });
   });

   ```

2. **Verify** the **snapshot** is taken.
   ```shell
   ✓ 1 snapshot written
   ```

---

### &#10004; You have completed Testing Lab 3
