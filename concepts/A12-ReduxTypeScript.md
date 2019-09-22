# Appendix A12: Redux with TypeScript

## Benefits
TypeScript has the potential to bring the following benefits to a Redux application:

1. Type safety for reducers, state and action creators
1. Easy refactoring of typed code
1. A superior developer experience in a team environment


## Installing
To get all the benefits of types you should install the type definition file for the React Redux library.  The other libraries (Redux and Redux Thunk) install with their type definitions and React Redux will likely do the same in the near future.
```
npm install --save-dev @types/react-redux
```

## Usage

Each of the following sections demonstrates how TypeScript can be used with the various parts of Redux.
> [Click here for  the full source code for a small but complete example of Redux being used with TypeScript](https://github.com/craigmckeachie/r16_hello-redux).

## State

```ts
export interface StoreState {
  name: string;
  enthusiasmLevel: number;
}
```

or

```ts
export interface ProjectState {
  loading: boolean;
  projects: Project[];
  error: string | undefined;
  page: number;
}

export interface AppState {
  projectState: ProjectState;
}
```

## Actions & Action Creators

```ts
export const INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM';
export type INCREMENT_ENTHUSIASM = typeof INCREMENT_ENTHUSIASM;

export interface IncrementEnthusiasm {
  type: INCREMENT_ENTHUSIASM;
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm;

export function incrementEnthusiasm(): IncrementEnthusiasm {
  return {
    type: INCREMENT_ENTHUSIASM
  };
}

```

```ts
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
...
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


```


## Reducers

```ts
export function reducer(
  state: StoreState = initialState,
  action: EnthusiasmAction
): StoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return {
        ...state,
        enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1)
      };
  }
  return state;
}
```

```ts
export function projectReducer(
  state = initialProjectState,
  action: ProjectActionTypes
) {
  switch (action.type) {
    case DELETE_PROJECT_REQUEST:
      return { ...state };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(
          (project: Project) => project.id !== action.payload.id
        )
      };
    case DELETE_PROJECT_FAILURE:
      return { ...state, error: action.payload.message };
    default:
      return state;
  }
}


```

## Connect (React Redux)

```ts
export function mapStateToProps({ enthusiasmLevel, name }: StoreState) {
  return {
    enthusiasmLevel,
    name
  };
}

export function mapDispatchToProps(dispatch: Dispatch<EnthusiasmAction>) {
  return {
    onIncrement: () => dispatch(incrementEnthusiasm()),
    onDecrement: () => dispatch(decrementEnthusiasm())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello);
```

```ts
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

## Redux Thunk

```ts
export function loadProjects(
  page: number
): ThunkAction<void, ProjectState, null, Action<string>> {
  return (dispatch: any) => {
    dispatch({ type: LOAD_PROJECTS_REQUEST });
    return projectAPI
      .get(page)
      .then(data => {
        dispatch({
          type: LOAD_PROJECTS_SUCCESS,
          payload: { projects: data, page }
        });
      })
      .catch(error => {
        dispatch({ type: LOAD_PROJECTS_FAILURE, payload: error });
      });
  };
}
```


## Resources

- [How to Use TypeScript with React & Redux](https://medium.com/@rossbulat/how-to-use-typescript-with-react-and-redux-a118b1e02b76)
- [Microsoft Tutorial on React & Redux using TypeScript](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter)
- [Redux with TypeScript](https://redux.js.org/recipes/usage-with-typescript)
- [Redux Thunk with TypeScript](https://redux.js.org/recipes/usage-with-typescript#usage-with-redux-thunk)
