# Unit Testing Lab 4: Container Components

## Objectives

- [ ] Export the Unconnected Container Component
- [ ] Test the Container Component

## Steps

### Export the Unconnected Container Component

1. Export the container component before wrapping it.

   #### `src\projects\ProjectsPage.tsx`

   ```diff
   ...
   class ProjectsPage extends React.Component<any> {
   ...
   }

   // export default ProjectsPage;
   + export { ProjectsPage as UnconnectedProjectsPage };

   // React Redux (connect)---------------
   function mapStateToProps(state: AppState): ProjectState {
   return {
       ...state.projectState
   };
   }

   const mapDispatchToProps = {
   onLoad: loadProjects,
   onSave: saveProject
   };

   export default connect(
   mapStateToProps,
   mapDispatchToProps
   )(ProjectsPage);
   ```

### Test the Container Component

2. **Create** the **file** `src\projects\__tests__\ProjectsPage-test.tsx`.
3. **Add** the **setup** code below to test the component.

   #### `src\projects\__tests__\ProjectsPage-test.tsx`

   ```ts
   import React from 'react';
   import { ShallowWrapper, shallow } from 'enzyme';
   import { UnconnectedProjectsPage } from '../ProjectsPage';
   import { MOCK_PROJECTS } from '../MockProjects';
   import { ProjectListProps } from '../ProjectList';

   describe('<ProjectsPage>', () => {
     let wrapper: ShallowWrapper;
     let onLoadMock = jest.fn();
     beforeEach(() => {
       wrapper = shallow(
         <UnconnectedProjectsPage
           onLoad={onLoadMock}
           projects={MOCK_PROJECTS}
           page={1}
         />
       );
     });

     test('renders without crashing', () => {
       expect(wrapper).toBeDefined();
     });
   });
   ```

1) **Test** that onLoad is called with a page number when the component is created.

   #### `src\projects\__tests__\ProjectsPage-test.tsx`

   ```ts
   ...
   test('onLoad should be called with page number', () => {
       const pageNumber = 1;
       expect(onLoadMock).toBeCalledWith(pageNumber);
   });
   ```

1) **Test** that the `ProjectList` is rendered inside the `Projectspage`.

   #### `src\projects\__tests__\ProjectsPage-test.tsx`

   ```ts
   ...
   test('renders <ProjectList />', () => {
       let projectListWrapper = wrapper.find('ProjectList');
       expect(projectListWrapper.length).toBe(1);
       expect((projectListWrapper.props() as ProjectListProps).projects).toBe(
       MOCK_PROJECTS
       );
   });
   ```

1. **Test** that an error is displayed when one occurs.

   #### `src\projects\__tests__\ProjectsPage-test.tsx`

   ```ts
   ...
   test('error displays', () => {
       wrapper.setProps({ error: 'Fail' });
       expect(wrapper.find('div.error').text()).toContain('Fail');
   });

   ```

1. **Test** that the loading indicator is displayed.

   #### `src\projects\__tests__\ProjectsPage-test.tsx`

   ```ts
   ...
   test('loading indicator displays', () => {
       wrapper.setProps({ loading: true });
       const spinnerWrapper = wrapper.find('span.spinner');
       expect(spinnerWrapper.exists()).toBeTruthy();
   });

   ```

1. **Test** that the pagination works.

   #### `src\projects\__tests__\ProjectsPage-test.tsx`

   ```ts
   ...
   test('When clicking more records...onLoad should be called with next page number', () => {
       const moreButton = wrapper.findWhere(
       element => element.type() === 'button' && element.text() === 'More...'
       );
       expect(moreButton.exists()).toBeTruthy();
       moreButton.simulate('click');
       expect(onLoadMock).toBeCalledWith(2);
   });
   ```

1. **Take** a snapshot.

   #### `src\projects\__tests__\ProjectsPage-test.tsx`

   ```ts
   ...
   test('renders without crashing', () => {
       expect(wrapper).toBeDefined();
   });
   ```

---

### &#10004; You have completed Unit Testing Lab 4
