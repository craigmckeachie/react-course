# Unit Testing Lab 4: Nested Components

## Objectives

- [ ] Test Setup
- [ ] Testing `ProjectCard` Renders
- [ ] Testing `ProjectForm` Renders
- [ ] Taking a Snapshot

## Steps

### Test Setup

1. **Create** the **file** `src\projects\__tests__\ProjectList-test.tsx`.
1. **Add** the **setup** code below to test the component.

   #### `src\projects\__tests__\ProjectCardList-test.tsx`

   ```ts
   import React from 'react';
   import { ShallowWrapper, shallow } from 'enzyme';
   import ProjectList from '../ProjectList';
   import { Project } from '../Project';
   import { MOCK_PROJECTS } from '../MockProjects';

   describe('<ProjectList />', () => {
     let wrapper: ShallowWrapper;
     let mockProjects: Project[];
     let handleSave: jest.Mock;

     beforeEach(() => {
       mockProjects = MOCK_PROJECTS;
       wrapper = shallow(
         <ProjectList projects={mockProjects} onSave={handleSave} />
       );
     });

     test('renders without crashing', () => {
       expect(wrapper).toBeDefined();
     });
   });
   ```

### Testing ProjectCard Renders

1. **Test** that the `ProjectCard` **renders** correctly.

   #### `src\projects\__tests__\ProjectList-test.tsx`

   ```diff
   import React from 'react';
   import { ShallowWrapper, shallow } from 'enzyme';
   import ProjectList from '../ProjectList';
   import { Project } from '../Project';
   import { MOCK_PROJECTS } from '../MockProjects';

   describe('<ProjectList />', () => {
   let wrapper: ShallowWrapper;
   let mockProjects: Project[];
   let handleSave: jest.Mock;

   beforeEach(() => {
       mockProjects = MOCK_PROJECTS;
       wrapper = shallow(
       <ProjectList projects={mockProjects} onSave={handleSave} />
       );
   });

   test('renders without crashing', () => {
       expect(wrapper).toBeDefined();
   });

   +  test('renders <ProjectCard/>s', () => {
   +    const projectCardWrapper = wrapper.find('ProjectCard');
   +    expect(projectCardWrapper.length).toBe(mockProjects.length);
   +  });
   });
   ```

### Testing ProjectForm Renders

1. **Test** that the **handler prop** is called when edit is clicked.

   #### `src\projects\__tests__\ProjectList-test.tsx`

   ```diff
   import React from 'react';
   import { ShallowWrapper, shallow } from 'enzyme';
   import ProjectList from '../ProjectList';
   import { Project } from '../Project';
   import { MOCK_PROJECTS } from '../MockProjects';

   describe('<ProjectList />', () => {
   let wrapper: ShallowWrapper;
   let mockProjects: Project[];
   let handleSave: jest.Mock;

   beforeEach(() => {
       mockProjects = MOCK_PROJECTS;
       wrapper = shallow(
       <ProjectList projects={mockProjects} onSave={handleSave} />
       );
   });

   test('renders without crashing', () => {
       expect(wrapper).toBeDefined();
   });

   test('renders <ProjectCard/>s', () => {
       const projectCardWrapper = wrapper.find('ProjectCard');
       expect(projectCardWrapper.length).toBe(mockProjects.length);
   });

   +  test('render <ProjectForm> for editingProject', () => {
   +    wrapper.setState({ editingProject: mockProjects[2] });
   +    expect(wrapper.find('Connect(ProjectForm)').length).toBe(1);
   +  });

   });
   ```

### Taking a Snapshot

1. **Take** a **snapshot** of the component.

   #### `src\projects\__tests__\ProjectList-test.tsx`

   ```diff
   import React from 'react';
   import { ShallowWrapper, shallow } from 'enzyme';
   import ProjectList from '../ProjectList';
   import { Project } from '../Project';
   import { MOCK_PROJECTS } from '../MockProjects';
   + import renderer from 'react-test-renderer';

   describe('<ProjectList />', () => {
   let wrapper: ShallowWrapper;
   let mockProjects: Project[];
   let handleSave: jest.Mock;

   beforeEach(() => {
       mockProjects = MOCK_PROJECTS;
       wrapper = shallow(
       <ProjectList projects={mockProjects} onSave={handleSave} />
       );
   });

   test('renders without crashing', () => {
       expect(wrapper).toBeDefined();
   });

   test('renders <ProjectCard/>s', () => {
       const projectCardWrapper = wrapper.find('ProjectCard');
       expect(projectCardWrapper.length).toBe(mockProjects.length);
   });

   test('render <ProjectForm> for editingProject', () => {
       wrapper.setState({ editingProject: mockProjects[2] });
       expect(wrapper.find('Connect(ProjectForm)').length).toBe(1);
   });

   + test('snapshot', () => {
   +   const tree = renderer
   +     .create(
   +       <MemoryRouter>
   +         <ProjectList projects={mockProjects} onSave={handleSave} />
   +       </MemoryRouter>
   +     )
   +     .toJSON();
   +
   +   expect(tree).toMatchSnapshot();
   + });
   });
   ```

1. **Open** the generated snapshot **file** `src/projects/__tests__/__snapshots__/ProjectList-test.tsx.snap`.
1. Notice the output is not only the HTML from `ProjectList` but also `ProjectCard`. It is not shallow and therefore is not a unit test because it is testing more than one component.

#### `src/projects/__tests__/__snapshots__/ProjectList-test.tsx.snap`

```

```

1. We could mock the child components as follows.

1. Mocking breaks are existing tests.

   > We would like the snapshot to be shallow. We can achieve this by installing and registering a better serializer for enzyme's `ShallowWRapper`

1. **Open** a `command prompt` (Windows) or `terminal` (Mac).
1. Change the **current directory** to `working\keeptrack`.
1. **Run** _one_ of the following commands:

   #### npm

   ```
    npm install --save-dev enzyme-to-json
   ```

   #### Yarn

   ```
   yarn add --save-dev enzyme-to-json
   ```

1. Configure Jest to use the new serializer.

   #### `package.json`

   ```diff
   {
   ...
   "devDependencies": {
       "@types/enzyme": "~3.10.3",
       "@types/react-redux": "~7.1.2",
       "@types/react-test-renderer": "~16.9.0",
       "@types/redux-mock-store": "~1.0.1",
       "enzyme-to-json": "~3.4.2",
       "redux-mock-store": "~1.5.3"
   },
   +  "jest": {
   +    "snapshotSerializers": ["enzyme-to-json/serializer"]
   +  }
   }
   ```

1. Stop `npm test` (`Ctrl+C`) and start it again (`npm test`) so the new configuration is picked up.
1. Now take a snapshot of enzyme's shallow wrapper instead of the entire component tree.

   #### `src\projects\__tests__\ProjectList-test.tsx`

   ```diff
   import React from 'react';
   import { ShallowWrapper, shallow } from 'enzyme';
   import ProjectList from '../ProjectList';
   import { Project } from '../Project';
   import { MOCK_PROJECTS } from '../MockProjects';
   - import renderer from 'react-test-renderer';

   describe('<ProjectList />', () => {
   let wrapper: ShallowWrapper;
   let mockProjects: Project[];
   let handleSave: jest.Mock;

   beforeEach(() => {
       mockProjects = MOCK_PROJECTS;
       wrapper = shallow(
       <ProjectList projects={mockProjects} onSave={handleSave} />
       );
   });

   test('renders without crashing', () => {
       expect(wrapper).toBeDefined();
   });

   test('renders <ProjectCard/>s', () => {
       const projectCardWrapper = wrapper.find('ProjectCard');
       expect(projectCardWrapper.length).toBe(mockProjects.length);
   });

   test('render <ProjectForm> for editingProject', () => {
       wrapper.setState({ editingProject: mockProjects[2] });
       expect(wrapper.find('Connect(ProjectForm)').length).toBe(1);
   });

   -  test('snapshot', () => {
   -    const tree = renderer
   -      .create(
   -        <MemoryRouter>
   -          <ProjectList projects={mockProjects} onSave={handleSave} />
   -        </MemoryRouter>
   -      )
   -      .toJSON();
   -
   -    expect(tree).toMatchSnapshot();
   -  });

   +  test('snapshot', () => {
   +    expect(wrapper).toMatchSnapshot();
   +  });
   });
   ```

1. **Open** the generated snapshot **file** `src/projects/__tests__/__snapshots__/ProjectList-test.tsx.snap`.
1. Notice the output is only the HTML from `ProjectList` and `ProjectCard` is just rendered as a tag. It is shallow and therefore is now a unit test because it is testing only one component.

#### `src/projects/__tests__/__snapshots__/ProjectList-test.tsx.snap`

```

```

---

### &#10004; You have completed Unit Testing Lab 4
