# Unit Testing Lab 3: Testing Props

## Objectives

- [ ] Test Setup
- [ ] Testing a Prop
- [ ] Testing a Function Prop
- [ ] Taking a Snapshot

## Steps

### Test Setup

1. **Create** the **directory** `src\projects\__tests__\__tests__`.
2. **Create** the **file** `src\projects\__tests__\ProjectCard-test.tsx`.
3. **Add** the **setup** code below to test the component.

   #### `src\projects\__tests__\ProjectCard-test.tsx`

   ```ts
   import { ShallowWrapper, shallow } from 'enzyme';
   import ProjectCard from '../ProjectCard';
   import React from 'react';
   import { Project } from '../Project';

   describe('<ProjectCard />', () => {
     let wrapper: ShallowWrapper;
     let project: Project;
     let handleEdit: jest.Mock;

     beforeEach(() => {
       project = new Project({
         id: 1,
         name: 'Mission Impossible',
         description: 'This is really difficult',
         budget: 100
       });
       handleEdit = jest.fn();
       wrapper = shallow(<ProjectCard project={project} onEdit={handleEdit} />);
     });

     test('renders without crashing', () => {
       expect(wrapper).toBeDefined();
     });
   });
   ```

### Testing a Prop

1. **Test** that the project **prop renders correctly**.

   #### `src\projects\__tests__\ProjectCard-test.tsx`

   ```diff
   import { ShallowWrapper, shallow } from 'enzyme';
   import ProjectCard from '../ProjectCard';
   import React from 'react';
   import { Project } from '../Project';

   describe('<ProjectCard />', () => {
   let wrapper: ShallowWrapper;
   let project: Project;
   let handleEdit: jest.Mock;

   beforeEach(() => {
       project = new Project({
       id: 1,
       name: 'Mission Impossible',
       description: 'This is really difficult',
       budget: 100
       });
       handleEdit = jest.fn();
       wrapper = shallow(<ProjectCard project={project} onEdit={handleEdit} />);
   });

   test('renders without crashing', () => {
       expect(wrapper).toBeDefined();
   });

   +  test('renders project prop properly', () => {
   +    const h5 = wrapper.find('h5');
   +    const descriptionParagraph = wrapper.find('p').first();
   +    const budgetParagraph = wrapper
   +      .find('p')
   +      .filterWhere(n => n.text().startsWith('Budget :'));
   +
   +    expect(h5.text()).toContain(project.name);
   +    expect(descriptionParagraph.text()).toEqual(project.description + '...');
   +    expect(budgetParagraph.text()).toContain('100');
   +  });

   });
   ```

### Testing a Function Prop

1. **Test** that the **handler prop** is called when edit is clicked.

   #### `src\projects\__tests__\ProjectCard-test.tsx`

   ```diff
   import { ShallowWrapper, shallow } from 'enzyme';
   import ProjectCard from '../ProjectCard';
   import React from 'react';
   import { Project } from '../Project';

   describe('<ProjectCard />', () => {
   let wrapper: ShallowWrapper;
   let project: Project;
   let handleEdit: jest.Mock;

   beforeEach(() => {
       project = new Project({
       id: 1,
       name: 'Mission Impossible',
       description: 'This is really difficult',
       budget: 100
       });
       handleEdit = jest.fn();
       wrapper = shallow(<ProjectCard project={project} onEdit={handleEdit} />);
   });

   test('renders without crashing', () => {
       expect(wrapper).toBeDefined();
   });

   test('renders project prop properly', () => {
       const h5 = wrapper.find('h5');
       const descriptionParagraph = wrapper.find('p').first();
       const budgetParagraph = wrapper
       .find('p')
       .filterWhere(n => n.text().startsWith('Budget :'));

       expect(h5.text()).toContain(project.name);
       expect(descriptionParagraph.text()).toEqual(project.description + '...');
       expect(budgetParagraph.text()).toContain('100');
   });

   +  test('handler prop called when edit clicked', () => {
   +    const editButton = wrapper.find('button');
   +    editButton.simulate('click');
   +    expect(handleEdit).toBeCalledWith(project);
   +  });

   });
   ```

### Taking a Snapshot

1. **Take** a **snapshot** of the component.
2. First try the code below without the `<MemoryRouter>` and see the error:

   ```
   Invariant failed: You should not use <Link> outside a <Router>
   ```

   > `<MemoryRouter>` - a `<Router>` that keeps the history of your "URL" in memory (does not read or write to the address bar). Useful in tests and non-browser environments like React Native.

   #### `src\projects\__tests__\ProjectCard-test.tsx`

   ```diff
   import { ShallowWrapper, shallow } from 'enzyme';
   import ProjectCard from '../ProjectCard';
   import React from 'react';
   import { Project } from '../Project';
   + import { MemoryRouter } from 'react-router-dom';

   describe('<ProjectCard />', () => {
   let wrapper: ShallowWrapper;
   let project: Project;
   let handleEdit: jest.Mock;

   beforeEach(() => {
       project = new Project({
       id: 1,
       name: 'Mission Impossible',
       description: 'This is really difficult',
       budget: 100
       });
       handleEdit = jest.fn();
       wrapper = shallow(<ProjectCard project={project} onEdit={handleEdit} />);
   });

   test('renders without crashing', () => {
       expect(wrapper).toBeDefined();
   });

   test('renders project prop properly', () => {
       const h5 = wrapper.find('h5');
       // const editButton = wrapper.find('button');
       const descriptionParagraph = wrapper.find('p').first();
       const budgetParagraph = wrapper
       .find('p')
       .filterWhere(n => n.text().startsWith('Budget :'));

       expect(h5.text()).toContain(project.name);
       expect(descriptionParagraph.text()).toEqual(project.description + '...');
       expect(budgetParagraph.text()).toContain('100');
   });

   test('handler prop called when edit clicked', () => {
       const editButton = wrapper.find('button');
       editButton.simulate('click');
       expect(handleEdit).toBeCalledWith(project);
   });

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

---

### &#10004; You have completed Unit Testing Lab 3
