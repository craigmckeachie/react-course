# Testing Lab 9: API Tests

## Objectives

- [ ] Test the API

## Steps

### Test the API

1. Create the file `src\projects\__tests__\projectAPI-test.js`.
1. Add the following code to test the updating of a project.

   #### `src\projects\__tests__\projectAPI-test.js`

   ```js
   import { MOCK_PROJECTS } from '../MockProjects';
   import { projectAPI } from '../projectAPI';

   describe('projectAPI', () => {
     test('should return records', () => {
       const response = new Response(undefined, {
         status: 200,
         statusText: 'OK',
       });
       response.json = () => Promise.resolve(MOCK_PROJECTS);
       jest
         .spyOn(window, 'fetch')
         .mockImplementation(() => Promise.resolve(response));

       return projectAPI
         .get()
         .then((data) => expect(data).toEqual(MOCK_PROJECTS));
     });
   });
   ```

1. Verify the test passes.

   ```shell
    PASS  src/projects/__tests__/projectAPI-test.js
   ```

---

### &#10004; You have completed Lab 9
