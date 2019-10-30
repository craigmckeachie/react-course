# Unit Testing Lab 8: Reducer Tests

## Objectives

- [ ] Test a Reducer

## Steps

### Test a Reducer

1. Create the file `src\projects\state\__tests__\projectReducer-test.js`
1. Add the following code to test the updating of a project.

   #### `src\projects\state\__tests__\projectReducer-test.js`

   ```js
   import { projectReducer, initialProjectState } from '../projectReducer';
   import { SAVE_PROJECT_SUCCESS } from '../projectTypes';
   import { Project } from '../../Project';
   import { MOCK_PROJECTS } from '../../MockProjects';
   describe('project reducer', () => {
     test('should update an existing project', () => {
       const project = MOCK_PROJECTS[0];
       const updatedProject = Object.assign(new Project(), project, {
         name: project.name + ' updated'
       });
       const currentState = { ...initialProjectState, projects: [project] };
       const updatedState = {
         ...initialProjectState,
         projects: [updatedProject]
       };
       expect(
         projectReducer(currentState, {
           type: SAVE_PROJECT_SUCCESS,
           payload: updatedProject
         })
       ).toEqual(updatedState);
     });
   });
   ```

1. Verify the test passes.

   ```shell
   PASS  src/projects/state/__tests__/projectReducer-test.js
   ```

---

### &#10004; You have completed Lab 8
