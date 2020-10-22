# Lab 23 Redux: Installation & Configuration

## Objectives

- [ ] Install Redux and related packages
- [ ] Configure Redux

## Steps

### Install Redux

1. **Open** a `command prompt` (Windows) or `terminal` (Mac).
1. Change the **current directory** to `working\keeptrack`.
1. **Run** _one_ of the following sets of commands:
   #### npm
   ```shell
   npm install redux react-redux redux-devtools-extension redux-thunk
   ```
   #### Yarn
   ```shell
   yarn add redux react-redux redux-devtools-extension redux-thunk
   ```
1. After the installs finish, **open** the `\package.json` file and quickly **verify** the **packages** were added to the `dependencies` and `devDependencies`.

### Configure Redux

1. Create the following file and configure Redux.

   #### `src\state.js`

   ```js
   import { createStore, applyMiddleware } from 'redux';
   import ReduxThunk from 'redux-thunk';
   import { composeWithDevTools } from 'redux-devtools-extension';
   import { combineReducers } from 'redux';

   const reducer = combineReducers({});

   export default function configureStore(preloadedState) {
     const middlewares = [ReduxThunk];
     const middlewareEnhancer = applyMiddleware(...middlewares);

     //Thunk is middleware
     //DevTools is an enhancer (actually changes Redux)
     //applyMiddleware wraps middleware and returns an enhancer

     // to use only thunk middleware
     // const enhancer = compose(middlewareEnhancer);

     //to use thunk & devTools
     const enhancer = composeWithDevTools(middlewareEnhancer);

     const store = createStore(reducer, preloadedState, enhancer);
     return store;
   }

   export const initialAppState = {};

   export const store = configureStore(initialAppState);
   ```

1. **Verify** the application **compiles**.

---

### &#10004; You have completed Lab 23
