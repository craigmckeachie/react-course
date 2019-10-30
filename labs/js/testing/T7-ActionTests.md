# Unit Testing Lab 7: Action Tests

## Objectives

- [ ] Mock the API
- [ ] Mock the Store
- [ ] Test Success and Failure

## Steps

### Mock the API

1. Create the directory `src\projects\__mocks__`.
   > `__mocks__` begins and ends with two underscores and is case-sensitive
2. Create the file `src\projects\__mocks__\projectAPI.js` to mock the `projectAPI`.

3. Mock the `get` method.

   #### `src\projects\__mocks__\projectAPI.js`

   ```js
   import { MOCK_PROJECTS } from '../MockProjects';
   const projectAPI = {
     get(page = 1, limit = 20) {
       return Promise.resolve(MOCK_PROJECTS);
     }
   };

   export { projectAPI };
   ```

### Mock the Store

1. **Open** a `command prompt` (Windows) or `terminal` (Mac).
1. Change the **current directory** to `working\keeptrack`.
1. **Run** _one_ of the following sets of commands:

   #### npm

   ```shell
    npm install redux-mock-store --save-dev
   ```

   #### Yarn

   ```shell
   yarn add redux-mock-store --save-dev
   ```

1. Create the directory `src\projects\state\__tests__`.
   > `__tests__` begins and ends with two underscores and is case-sensitive
1. Create the file `src\projects\state\__tests__\projectActions-test.js`
1. Add the test setup code including mocking the store away.

   #### `src\projects\state\__tests__\projectActions-test.js`

   ```js
   import configureMockStore from 'redux-mock-store';
   import ReduxThunk from 'redux-thunk';
   import { initialAppState } from '../../../state';
   import { loadProjects } from '../projectActions';
   import {
    LOAD_PROJECTS_REQUEST,
    LOAD_PROJECTS_SUCCESS,
    LOAD_PROJECTS_FAILURE
   } from '../projectActions';
   import { projectAPI } from '../../projectAPI';
   import { MOCK_PROJECTS } from '../../MockProjects';
   jest.mock('../../projectAPI');

   const middlewares = [ReduxThunk];
   const mockStoreCreator = configureMockStore(middlewares);

   describe('Project Actions', () => {
     let store;

     beforeEach(() => {
       store = mockStoreCreator(initialAppState);
     });
   });
   ```

> Note that the `jest.mock` replaces the actual implementation of the `projectAPI` with the mock we created in the last step. This is done by convention in Jest which replaces the implementation with the exported function or object in the `__mocks__` directory.

1. At this point, you will receive the following error:

   ```shell
   FAIL  src/projects/state/__tests__/projectActions-test.js
   ● Test suite failed to run

    Your test suite must contain at least one test.
   ```

### Test Success and Failure

1. Test that an error is returned when loading projects fails.

   #### `src/projects/state/__tests__/projectActions-test.js`

   ```diff
   import configureMockStore from 'redux-mock-store';
   import ReduxThunk from 'redux-thunk';
   import { initialAppState } from '../../../state';
   import { loadProjects } from '../projectActions';
   import {
     LOAD_PROJECTS_REQUEST,
     LOAD_PROJECTS_SUCCESS,
     LOAD_PROJECTS_FAILURE
   } from '../projectTypes';
   import { projectAPI } from '../../projectAPI';
   import { MOCK_PROJECTS } from '../../MockProjects';
   jest.mock('../../projectAPI');

   const middlewares = [ReduxThunk];
   const mockStoreCreator = configureMockStore(middlewares);

   describe('Project Actions', () => {
     let store;

     beforeEach(() => {
       store = mockStoreCreator(initialAppState);
     });

   +  test('should return error', () => {
   +    projectAPI.get = jest
   +      .fn(
   +        // leave this commented initially
   +        // projectAPI.get
   +      )
   +      .mockImplementationOnce(() => {
   +        return Promise.reject('failed');
   +      });
   +
   +    const expectedActions = [
   +      { type: LOAD_PROJECTS_REQUEST },
   +      {
   +        type: LOAD_PROJECTS_FAILURE,
   +        payload: 'failed'
   +      }
   +    ];
   +
   +    return store.dispatch(loadProjects(1)).then(() => {
   +      const actions = store.getActions();
   +      expect(actions).toEqual(expectedActions);
   +    });
   +  });

   });

   ```

1. The new test should pass.

   ```shell
    PASS  src/projects/state/__tests__/projectActions-test.js
   ```

1. Attempt to test that the projects load successfully by adding the code below.

   #### `src/projects/state/__tests__/projectActions-test.js`

   ```diff
   import configureMockStore from 'redux-mock-store';
   import ReduxThunk from 'redux-thunk';
   import { initialAppState } from '../../../state';
   import { loadProjects } from '../projectActions';
   import {
     LOAD_PROJECTS_REQUEST,
     LOAD_PROJECTS_SUCCESS,
     LOAD_PROJECTS_FAILURE
   } from '../projectTypes';
   import { projectAPI } from '../../projectAPI';
   import { MOCK_PROJECTS } from '../../MockProjects';
   jest.mock('../../projectAPI');

   const middlewares = [ReduxThunk];
   const mockStoreCreator = configureMockStore(middlewares);

   describe('Project Actions', () => {
     let store;

     beforeEach(() => {
       store = mockStoreCreator(initialAppState);
     });

     test('should return error', () => {
       projectAPI.get = jest
         .fn(
           // leave this commented initially
           // projectAPI.get
         )
         .mockImplementationOnce(() => {
           return Promise.reject('failed');
         });

       const expectedActions = [
         { type: LOAD_PROJECTS_REQUEST },
         {
           type: LOAD_PROJECTS_FAILURE,
           payload: 'failed'
         }
       ];

       return store.dispatch(loadProjects(1)).then(() => {
         const actions = store.getActions();
         expect(actions).toEqual(expectedActions);
       });
     });

   +  test('should load projects successfully', () => {
   +    const expectedActions = [
   +      { type: LOAD_PROJECTS_REQUEST },
   +      {
   +        type: LOAD_PROJECTS_SUCCESS,
   +        payload: { projects: MOCK_PROJECTS, page: 1 }
   +      }
   +    ];
   +
   +    return store.dispatch(loadProjects(1)).then(() => {
   +      const actions = store.getActions();
   +      expect(actions).toEqual(expectedActions);
   +    });
   +  });
   });
   ```

1. The **test** **fails** with the error below because no default mock implementation is set for the `get` method to revert back to after calling `mockImplementationOnce` executes once for the error test case.

   ```
   TypeError: Cannot read property 'then' of undefined
   ```

1. Uncomment the line below to set the default mock implementation back to the method defined in `src\projects\__mocks__\projectAPI.js`.

   > Be sure that projectAPI.get is inside the .fn() (`.fn(projectAPI.get)`).

   #### `src/projects/state/__tests__/projectActions-test.js`

   ```diff
   ...
   describe('Project Actions', () => {
     let store;

     beforeEach(() => {
       store = mockStoreCreator(initialAppState);
     });

     test('should return error', () => {
       projectAPI.get = jest
         .fn(
           // leave this commented initially
   -       // projectAPI.get
   +       projectAPI.get
         )
         .mockImplementationOnce(() => {
           return Promise.reject('failed');
         });

       const expectedActions = [
         { type: LOAD_PROJECTS_REQUEST },
         {
           type: LOAD_PROJECTS_FAILURE,
           payload: 'failed'
         }
       ];

       return store.dispatch(loadProjects(1)).then(() => {
         const actions = store.getActions();
         expect(actions).toEqual(expectedActions);
       });
     });

     test('should load projects successfully', () => {
       const expectedActions = [
         { type: LOAD_PROJECTS_REQUEST },
         {
           type: LOAD_PROJECTS_SUCCESS,
           payload: { projects: MOCK_PROJECTS, page: 1 }
         }
       ];

       return store.dispatch(loadProjects(1)).then(() => {
         const actions = store.getActions();
         expect(actions).toEqual(expectedActions);
       });
     });
   });
   ```

1. All tests including the `'should load projects successfully'` should now pass.

   ```shell
   PASS  src/projects/state/__tests__/projectActions-test.js
   ```

---

### &#10004; You have completed Lab 7
