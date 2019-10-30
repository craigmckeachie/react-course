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

1. Verify the initial test passes.
   ```shell
    ✓ renders without crashing
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

1. Verify the test passes.
   ```shell
    ✓ renders <ProjectCard/>s
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

1. Verify the test passes.

   ```shell
    ✓ render <ProjectForm> for editingProject
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
   + import { MemoryRouter } from 'react-router-dom';
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
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`<ProjectList /> snapshot 1`] = `
<div
  className="row"
>
  <div
    className="cols-sm"
  >
    <div
      className="card"
    >
      <img
        alt="Johnson - Kutch"
        src="/assets/placeimg_500_300_arch4.jpg"
      />
      <section
        className="section dark"
      >
        <a
          href="/projects/1"
          onClick={[Function]}
        >
          <h5
            className="strong"
          >
            <strong>
              Johnson - Kutch
            </strong>
          </h5>
          <p>
            Fully-configurable intermediate framework. Ullam occaecati l...
          </p>
        </a>
        <p>
          Budget :
          54,637
        </p>
        <button
          className="bordered"
          onClick={[Function]}
        >
          <span
            className="icon-edit "
          />
          Edit
        </button>
      </section>
    </div>
  </div>
```

1. We could mock the child components as follows.

   #### `src\projects\__tests__\ProjectList-test.tsx`

   ```diff
   import React from 'react';
   import { ShallowWrapper, shallow } from 'enzyme';
   import ProjectList from '../ProjectList';
   import { Project } from '../Project';
   import { MOCK_PROJECTS } from '../MockProjects';
   import { MemoryRouter } from 'react-router-dom';
   import renderer from 'react-test-renderer';

   + jest.mock('../ProjectCard', () => () => 'ProjectCard');
   ```

1. Mocking breaks our existing test of that component.

   ```
   <ProjectList /> › renders <ProjectCard/>s

       expect(received).toBe(expected) // Object.is equality

       Expected: 6
       Received: 0

       27 |   test('renders <ProjectCard/>s', () => {
       28 |     const projectCardWrapper = wrapper.find('ProjectCard');
       > 29 |     expect(projectCardWrapper.length).toBe(mockProjects.length);
           |                                       ^
       30 |   });
       31 |
       32 |   test('render <ProjectForm> for editingProject', () => {

       at Object.toBe (src/projects/__tests__/ProjectList-test.tsx:29:39)
   ```

1. Remove the mock as we want to take a different approach.

#### `src\projects\__tests__\ProjectList-test.tsx`

```diff
import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import ProjectList from '../ProjectList';
import { Project } from '../Project';
import { MOCK_PROJECTS } from '../MockProjects';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

- jest.mock('../ProjectCard', () => () => 'ProjectCard');
```

> We would like the snapshot to be shallow. We can achieve this by installing and registering a better serializer for enzyme's `ShallowWrapper`

1. **Open** a `command prompt` (Windows) or `terminal` (Mac).
1. Change the **current directory** to `working\keeptrack`.
1. **Run** _one_ of the following commands:

   #### npm

   ```shell
    npm install --save-dev enzyme-to-json
   ```

   #### Yarn

   ```shell
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
       "enzyme-to-json": "~3.4.2"
   },
   +  "jest": {
   +    "snapshotSerializers": ["enzyme-to-json/serializer"]
   +  }
   }
   ```

1. Stop by typing `q` and start it again (`npm test`) so the new configuration is picked up.
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

1. You should see the error below.

   ```
   1 snapshot obsolete from 1 test suite. To remove it, press `u`.
   ```

1. Press `u` to update the snapshot.

1. **Open** the generated snapshot **file** `src/projects/__tests__/__snapshots__/ProjectList-test.tsx.snap`.
1. Notice the output is only the HTML from `ProjectList` and `ProjectCard` is just rendered as a tag. It is shallow and therefore is now a unit test because it is testing only one component.

   #### `src/projects/__tests__/__snapshots__/ProjectList-test.tsx.snap`

   ```
   // Jest Snapshot v1, https://goo.gl/fbAQLP

   exports[`<ProjectList /> snapshot 1`] = `
   <div
   className="row"
   >
   <div
       className="cols-sm"
       key="1"
   >
       <ProjectCard
       onEdit={[Function]}
       project={
           Project {
           "budget": 54637,
           "contractSignedOn": "2013-08-04T22:39:41.473Z",
           "contractTypeId": 3,
           "description": "Fully-configurable intermediate framework. Ullam occaecati libero laudantium nihil voluptas omnis.",
           "id": 1,
           "imageUrl": "/assets/placeimg_500_300_arch4.jpg",
           "isActive": false,
           "name": "Johnson - Kutch",
           }
       }
       />
   </div>
   <div
       className="cols-sm"
       key="2"
   >
       <ProjectCard
       onEdit={[Function]}
       project={
           Project {
           "budget": 91638,
           "contractSignedOn": "2012-08-06T21:21:31.419Z",
           "contractTypeId": 4,
           "description": "Centralized interactive application. Exercitationem nulla ut ipsam vero quasi enim quos doloribus voluptatibus.",
           "id": 2,
           "imageUrl": "/assets/placeimg_500_300_arch1.jpg",
           "isActive": true,
           "name": "Wisozk Group",
           }
       }
       />
   </div>
   <div
       className="cols-sm"
       key="3"
   >
       <ProjectCard
       onEdit={[Function]}
       project={
           Project {
           "budget": 29729,
           "contractSignedOn": "2016-06-26T18:24:01.706Z",
           "contractTypeId": 6,
           "description": "Re-contextualized dynamic moratorium. Aut nulla soluta numquam qui dolor architecto et facere dolores.",
           "id": 3,
           "imageUrl": "/assets/placeimg_500_300_arch12.jpg",
           "isActive": true,
           "name": "Denesik LLC",
           }
       }
       />
   </div>
   <div
       className="cols-sm"
       key="4"
   >
       <ProjectCard
       onEdit={[Function]}
       project={
           Project {
           "budget": 45660,
           "contractSignedOn": "2013-05-26T01:10:42.344Z",
           "contractTypeId": 4,
           "description": "Innovative 6th generation model. Perferendis libero qui iusto et ullam cum sint molestias vel.",
           "id": 4,
           "imageUrl": "/assets/placeimg_500_300_arch5.jpg",
           "isActive": true,
           "name": "Purdy, Keeling and Smitham",
           }
       }
       />
   </div>
   ...
   </div>

   ```

---

### &#10004; You have completed Unit Testing Lab 4


