# Unit Testing Lab 6: Testing Forms

## Objectives

- [ ] Export the Unconnected Form Component
- [ ] Test the Form Component

## Steps

### Export the Unconnected Form Component

1. **Export** the form compon**ent** before wrapping it.

   #### `src\projects\ProjectForm.tsx`

   ```diff
   ...
   class ProjectForm extends React.Component<ProjectFormProps, ProjectFormState> {
   ...
   }

   // export default ProjectForm;
   + export { ProjectForm as UnconnectedProjectForm };

    // React Redux (connect)---------------

    const mapDispatchToProps = {
      onSave: saveProject
    };

    export default connect(
      null,
      mapDispatchToProps
    )(ProjectForm);

   ```

### Test the Form Component

1. **Create** the **file** `src\projects\__tests__\ProjectForm-test.tsx`.
1. **Add** the **setup** code below to test the component.

   #### `src\projects\__tests__\ProjectForm-test.tsx`

   ```ts
   import React from 'react';
   import { ShallowWrapper, shallow, HTMLAttributes } from 'enzyme';
   import { UnconnectedProjectForm } from '../ProjectForm';
   import { Project } from '../Project';

   describe('<ProjectForm />', () => {
     let wrapper: ShallowWrapper;
     let project: Project;
     let updatedProject: Project;
     let handleSave: jest.Mock;
     let handleCancel: jest.Mock;
     let nameWrapper: ShallowWrapper<HTMLAttributes>;
     let descriptionWrapper: ShallowWrapper<HTMLAttributes>;

     beforeEach(() => {
       project = new Project({
         id: 1,
         name: 'Mission Impossible',
         description: 'This is really difficult',
         budget: 100
       });
       updatedProject = new Project({
         name: 'Ghost Protocol',
         description:
           'Blamed for a terrorist attack on the Kremlin, Ethan Hunt (Tom Cruise) and the entire IMF agency...'
       });
       handleSave = jest.fn();
       handleCancel = jest.fn();
       wrapper = shallow(
         <UnconnectedProjectForm
           project={project}
           onSave={handleSave}
           onCancel={handleCancel}
         />
       );
       nameWrapper = wrapper.find('input[name="name"]');
       descriptionWrapper = wrapper.find('textarea[name="description"]');
     });

     test('renders without crashing', () => {
       expect(wrapper).toBeDefined();
     });
   });
   ```

1. **Verify** that the intial **test passes**.

   ```shell
    PASS  src/projects/__tests__/ProjectForm-test.tsx
   ```

1. **Test** that the component **renders** the `project` **prop** properly.

   #### `src\projects\__tests__\ProjectForm-test.tsx`

   ```ts
   ...
    test('renders project prop properly', () => {
        expect(nameWrapper.props().value).toEqual(project.name);
        expect(descriptionWrapper.props().value).toEqual(project.description);
    });
   ```

1. **Test** that name and description **can be updated**.

   #### `src\projects\__tests__\ProjectForm-test.tsx`

   ```ts
   ...

    test('should allow users to update name ', () => {
        nameWrapper.simulate('change', {
        target: { type: 'text', name: 'name', value: updatedProject.name }
        });

        const updatedNameWrapper = wrapper.find('input[name="name"]');
        expect(updatedNameWrapper.props().value).toBe(updatedProject.name);
    });

    test('should allow users to update description ', () => {
        descriptionWrapper.simulate('change', {
        target: {
            type: 'textarea',
            name: 'description',
            value: updatedProject.description
        }
        });

        const updatedDescriptionWrapper = wrapper.find(
        'textarea[name="description"]'
        );
        expect(updatedDescriptionWrapper.props().value).toBe(
        updatedProject.description
        );
    });
   ```

   > Note that enzyme's `ShallowWrapper` objects are immutable and do not update when events are simulated. Because of this we need call find again on the root element's wrapper to see the updates.

   > See the following Github issue for more information: [Shallow does not rerender when props change](https://github.com/airbnb/enzyme/issues/1229).

1. **Test** that `onSave` is **called** when the `form` is **submitted**.

   #### `src\projects\__tests__\ProjectForm-test.tsx`

   ```ts
   ...

    test('should call onSave when submitted ', () => {
        const formWrapper = wrapper.find('form');
        formWrapper.simulate('submit', { preventDefault: () => {} });
        expect(handleSave).toHaveBeenCalledWith(project);
    });

   ```

1. **Test** the **validation** errors.

   #### `src\projects\__tests__\ProjectForm-test.tsx`

   ```ts
   ...

    test('should display required validation message if name not provided', () => {
        nameWrapper.simulate('change', {
        target: { type: 'text', name: 'name', value: '' }
        });

        const validationErrorWrapper = wrapper.find('div.card.error');
        expect(validationErrorWrapper.length).toBe(1);
    });

    test('should not display required validation message if name is provided', () => {
        nameWrapper.simulate('change', {
        target: { type: 'text', name: 'name', value: 'abc' }
        });

        const validationErrorWrapper = wrapper.find('div.card.error');
        expect(validationErrorWrapper.length).toBe(0);
    });

    test('should display minlength validation message if name is too short', () => {
        nameWrapper.simulate('change', {
        target: { type: 'text', name: 'name', value: 'ab' }
        });

        const validationErrorWrapper = wrapper.find('div.card.error');
        expect(validationErrorWrapper.length).toBe(1);
    });

    test('should not display minlength validation message if name is long enough', () => {
        nameWrapper.simulate('change', {
        target: { type: 'text', name: 'name', value: 'abc' }
        });

        const validationErrorWrapper = wrapper.find('div.card.error');
        expect(validationErrorWrapper.length).toBe(0);
    });
   ```
1. If you haven't already, **verify** that all the above **tests pass**.

   ```shell
    PASS  src/projects/__tests__/ProjectForm-test.tsx
   ```
---

### &#10004; You have completed Unit Testing Lab 6
