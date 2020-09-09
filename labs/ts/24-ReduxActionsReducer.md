# Lab 24: Redux | Actions and Reducer

## Objectives

- [ ] Define types: actions types, action interfaces, and state
- [ ] Create action creator functions
- [ ] Implement a reducer
- [ ] Configure the project reducer and state

## Steps

### Define types: actions types, action interfaces, and state

1. **Create** the **directory** `src\projects\state`.
2. **Create** the **file** `src\projects\state\projectTypes.ts`.
3. **Define** the **project** `actions types`, `action interfaces`, and `state`.

   #### `src\projects\state\projectTypes.ts`

   ```ts
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

   interface LoadProjectsRequest {
     type: typeof LOAD_PROJECTS_REQUEST;
   }

   interface LoadProjectsSuccess {
     type: typeof LOAD_PROJECTS_SUCCESS;
     payload: { projects: Project[]; page: number };
   }

   interface LoadProjectsFailure {
     type: typeof LOAD_PROJECTS_FAILURE;
     payload: { message: string };
   }

   interface SaveProjectRequest {
     type: typeof SAVE_PROJECT_REQUEST;
   }

   interface SaveProjectSuccess {
     type: typeof SAVE_PROJECT_SUCCESS;
     payload: Project;
   }

   interface SaveProjectFailure {
     type: typeof SAVE_PROJECT_FAILURE;
     payload: { message: string };
   }

   interface DeleteProjectRequest {
     type: typeof DELETE_PROJECT_REQUEST;
   }

   interface DeleteProjectSuccess {
     type: typeof DELETE_PROJECT_SUCCESS;
     payload: Project;
   }

   interface DeleteProjectFailure {
     type: typeof DELETE_PROJECT_FAILURE;
     payload: { message: string };
   }

   export type ProjectActionTypes =
     | LoadProjectsRequest
     | LoadProjectsSuccess
     | LoadProjectsFailure
     | SaveProjectRequest
     | SaveProjectSuccess
     | SaveProjectFailure
     | DeleteProjectRequest
     | DeleteProjectSuccess
     | DeleteProjectFailure;

   export interface ProjectState {
     loading: boolean;
     projects: Project[];
     error: string | undefined;
     page: number;
   }
   ```

### Create action creator functions

1. **Create** the **file** `src\projects\state\projectActions.ts`.
2. **Define** your **action** **creator** functions and return a `ThunkAction` (`function`) instead of just an `Action` (`object`) to handle the asyncronous nature of the HTTP calls happening.

   #### `src\projects\state\projectActions.ts`

   ```ts
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
     ProjectState,
   } from './projectTypes';

   //action creators
   export function loadProjects(
     page: number
   ): ThunkAction<void, ProjectState, null, Action<string>> {
     return (dispatch: any) => {
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

   export function saveProject(
     project: Project
   ): ThunkAction<void, ProjectState, null, Action<string>> {
     return (dispatch: any) => {
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

1. **Create** the **file** `src\projects\state\projectReducer.ts`.
2. **Define** your **reducer** function.
   `src\projects\state\projectReducer.ts`

```ts
import {
  ProjectActionTypes,
  LOAD_PROJECTS_REQUEST,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  SAVE_PROJECT_REQUEST,
  SAVE_PROJECT_SUCCESS,
  SAVE_PROJECT_FAILURE,
  ProjectState,
} from './projectTypes';
import { Project } from '../Project';

export const initialProjectState: ProjectState = {
  projects: [],
  loading: false,
  error: undefined,
  page: 1,
};

export function projectReducer(
  state = initialProjectState,
  action: ProjectActionTypes
) {
  switch (action.type) {
    case LOAD_PROJECTS_REQUEST:
      return { ...state, loading: true, error: '' };
    case LOAD_PROJECTS_SUCCESS:
      let projects: Project[];
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
          projects: state.projects.map((project: Project) => {
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
          (project: Project) => project.id !== action.payload.id
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

- update state.ts

1. **Open** the **file** `src\state.ts`.
2. **Configure** the `projectReducer` and `ProjectState`.

   #### `src\state.ts`

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

   export interface AppState {
   +  projectState: ProjectState;
   }

   export const initialAppState: AppState = {
   +  projectState: initialProjectState
   };

   export const store = configureStore(initialAppState);
   ```

3. **Verify** the application **compiles**.

> In the next lab we will connect our Redux code to our React application.

---

### &#10004; You have completed Lab 24
