# Lab 24: Redux | Actions and Reducer

## Objectives

- [ ] Define action types
- [ ] Create action creator functions
- [ ] Implement a reducer
- [ ] Configure the project reducer and state

## Steps

### Define action types

1. **Create** the **directory** `src\projects\state`.
2. **Create** the **file** `src\projects\state\projectTypes.js`.
3. **Define** the **project** `actions types`.

   #### `src\projects\state\projectTypes.js`

   ```js
   import { Project } from '../Project';

   //action types
   export const LOAD_PROJECTS_REQUEST = 'LOAD_PROJECTS_REQUEST';
   export const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS';
   export const LOAD_PROJECTS_FAILURE = 'LOAD_PROJECTS_FAILURE';
   export const SAVE_PROJECT_REQUEST = 'SAVE_PROJECT_REQUEST';
   export const SAVE_PROJECT_SUCCESS = 'SAVE_PROJECT_SUCCESS';
   export const SAVE_PROJECT_FAILURE = 'SAVE_PROJECT_FAILURE';
   export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';
   export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
   export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE';
   ```

### Create action creator functions

1. **Create** the **file** `src\projects\state\projectActions.js`.
2. **Define** your **action** **creator** functions and return a `ThunkAction` (`function`) instead of just an `Action` (`object`) to handle the asyncronous nature of the HTTP calls happening.

   #### `src\projects\state\projectActions.js`

   ```js
   import { Action } from 'redux';
   import { ThunkAction } from 'redux-thunk';
   import { projectAPI } from '../projectAPI';
   import { Project } from '../Project';
   import {
     LOAD_PROJECTS_REQUEST,
     LOAD_PROJECTS_SUCCESS,
     LOAD_PROJECTS_FAILURE,
     SAVE_PROJECT_REQUEST,
     SAVE_PROJECT_SUCCESS,
     SAVE_PROJECT_FAILURE,
   } from './projectTypes';

   //action creators
   export function loadProjects(page) {
     return (dispatch) => {
       dispatch({ type: LOAD_PROJECTS_REQUEST });
       return projectAPI
         .get(page)
         .then((data) => {
           dispatch({
             type: LOAD_PROJECTS_SUCCESS,
             payload: { projects: data, page },
           });
         })
         .catch((error) => {
           dispatch({ type: LOAD_PROJECTS_FAILURE, payload: error });
         });
     };
   }

   export function saveProject(project) {
     return (dispatch) => {
       dispatch({ type: SAVE_PROJECT_REQUEST });
       return projectAPI
         .put(project)
         .then((data) => {
           dispatch({ type: SAVE_PROJECT_SUCCESS, payload: data });
         })
         .catch((error) => {
           dispatch({ type: SAVE_PROJECT_FAILURE, payload: error });
         });
     };
   }
   ```

### Implement a reducer

1. **Create** the **file** `src\projects\state\projectReducer.js`.
2. **Define** your **reducer** function.
   `src\projects\state\projectReducer.js`

```js
import {
  LOAD_PROJECTS_REQUEST,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  SAVE_PROJECT_REQUEST,
  SAVE_PROJECT_SUCCESS,
  SAVE_PROJECT_FAILURE,
} from './projectTypes';
import { Project } from '../Project';

export const initialProjectState = {
  projects: [],
  loading: false,
  error: undefined,
  page: 1,
};

export function projectReducer(state = initialProjectState, action) {
  switch (action.type) {
    case LOAD_PROJECTS_REQUEST:
      return { ...state, loading: true, error: '' };
    case LOAD_PROJECTS_SUCCESS:
      let projects;
      const { page } = action.payload;
      if (page === 1) {
        projects = action.payload.projects;
      } else {
        projects = [...state.projects, ...action.payload.projects];
      }
      return {
        ...state,
        loading: false,
        page,
        projects,
        error: '',
      };
    case LOAD_PROJECTS_FAILURE:
      return { ...state, loading: false, error: action.payload.message };
    case SAVE_PROJECT_REQUEST:
      return { ...state };
    case SAVE_PROJECT_SUCCESS:
      if (action.payload.isNew) {
        return {
          ...state,
          projects: [...state.projects, action.payload],
        };
      } else {
        return {
          ...state,
          projects: state.projects.map((project) => {
            return project.id === action.payload.id
              ? Object.assign({}, project, action.payload)
              : project;
          }),
        };
      }

    case SAVE_PROJECT_FAILURE:
      return { ...state, error: action.payload.message };
    case DELETE_PROJECT_REQUEST:
      return { ...state };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload.id
        ),
      };
    case DELETE_PROJECT_FAILURE:
      return { ...state, error: action.payload.message };
    default:
      return state;
  }
}
```

### Configure the project reducer and state

- update state.js

1. **Open** the **file** `src\state.js`.
2. **Configure** the `projectReducer` and `ProjectState`.

   #### `src\state.js`

   ```diff
   import { createStore, applyMiddleware } from 'redux';
   import ReduxThunk from 'redux-thunk';
   import { composeWithDevTools } from 'redux-devtools-extension';
   import { combineReducers } from 'redux';

   + import { ProjectState } from './projects/state/projectTypes';
   + import { initialProjectState } from './projects/state/projectReducer';
   + import { projectReducer } from './projects/state/projectReducer';

   const reducer = combineReducers({
   +  projectState: projectReducer
   });

   ...


   export const initialAppState = {
   +  projectState: initialProjectState
   };

   export const store = configureStore(initialAppState);
   ```

3. **Verify** the application **compiles**.

> In the next lab we will connect our Redux code to our React application.

---

### &#10004; You have completed Lab 24
