# Chapter 23: Redux Thunk

Thunk middleware for Redux. Enables async actions (making http calls from actions).

## Overview

- `redux-thunk` is separate package/library
- enables async actions (AJAX calls)
- implemented as middleware for extending redux to handle async actions
- is only 15 lines of code
  - https://github.com/reduxjs/redux-thunk/blob/master/src/index.js
  - why separate? ...following the Unix philosophy of doing one thing and doing it well

## Async

### Async Actions

- actions normally dispatch an object
- Redux Thunk allows actions to return functions
- the dispatched function is called a thunk
- async is handled by creating a pair of actions
  - one to start the request
  - one to handle the complete response (success or failure)

### Thunk

- a thunk is a function that is returned from another function
- a thunk function takes dispatch (and getState) as parameters
- a thunk function
  1. initially dispatches an action to say the request started then
  2. waits for the ajax call to return and then dispatches another action (either success or failure)
- the reducer only processes dispatched objects (actions)
- the thunk middleware processes dispatched functions (thunks)
- both actions and thunks are created by action creator functions
  - the results of creators are passed to dispatch
  - there is no distinction between action creators and thunk creators
    - thunk creators often end up in an actions file and look just like an action creator

## Installation

```
npm install redux-thunk
```

Then, to enable Redux Thunk, use `applyMiddleware()`

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// Note: this API requires redux@>=3.1.0
const store = createStore(rootReducer, applyMiddleware(thunk));
```

> Note: the registration of Redux Thunk is slightly different in the demos below because we are not using ES Modules yet.

# Demos

- In the following demonstrations we will use Redux with no UI (so no React), just `console.log`
- We will refactor the HTTP Demo(s) to use Redux with Redux Thunk

## 1. Your First Thunk

```js
const baseUrl = 'http://localhost:3000';

class PhotoAPI {
  url = `${baseUrl}/photos`;

  constructor() {}

  getAll(page = 1, limit = 100) {
    return fetch(`${this.url}?_page=${page}&_limit=${limit}`)
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  static translateStatusToErrorMessage(status) {
    switch (status) {
      case 401:
        return 'Please login again.';
      case 403:
        return 'You do not have permission to view the photos.';
      default:
        return 'There was an error retrieving the photos. Please try again.';
    }
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const httpErrorInfo = {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      };
      console.log(
        `logging http details for debugging: ${JSON.stringify(httpErrorInfo)}`
      );

      let errorMessage = PhotoAPI.translateStatusToErrorMessage(
        httpErrorInfo.status
      );
      throw new Error(errorMessage);
    }
  }

  parseJSON(response) {
    return response.json();
  }
}

const LOAD_PHOTOS_REQUEST = 'LOAD_PHOTOS_REQUEST';
const LOAD_PHOTOS_SUCCESS = 'LOAD_PHOTOS_SUCCESS';
const LOAD_PHOTOS_FAILURE = 'LOAD_PHOTOS_FAILURE';

const initialState = {
  photos: [],
  processing: false,
  error: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PHOTOS_REQUEST:
      return { ...state, processing: true };
    case LOAD_PHOTOS_SUCCESS:
      return { ...state, processing: false, photos: action.payload };
    case LOAD_PHOTOS_FAILURE:
      return { ...state, processing: false, error: action.payload.message };
    default:
      return state;
  }
}

//action creator becomes thunk creator
//instead of dispatching an action object (see commented code)
//dispatch a thunk function (a function that returns another function)
//inside the thunk have that function dispatch the initial request object that sets the loading
//and eventually dispatches success and failure actions
//by returning a function (thunk) you are now able to have the action creator do multiple dispatches over time
function loadPhotos() {
  //   return { type: LOAD_PHOTOS_REQUEST };
  return function thunk(dispatch, getState) {
    let photoAPI = new PhotoAPI();
    dispatch({ type: LOAD_PHOTOS_REQUEST });
    return photoAPI
      .getAll(1)
      .then(data => {
        dispatch({ type: LOAD_PHOTOS_SUCCESS, payload: data });
      })
      .catch(error => {
        dispatch({ type: LOAD_PHOTOS_FAILURE, payload: error });
      });
  };
}

var ReduxThunk = window.ReduxThunk.default;
const store = Redux.createStore(reducer, Redux.applyMiddleware(ReduxThunk));

function logState() {
  console.log(JSON.stringify(store.getState()));
}

store.subscribe(logState);

async function test() {
  await store.dispatch(loadPhotos());
  console.log('loaded photos');
}

test();
```

## 2. CRUD

- GET (Read)
- POST (Add)
- PUT (Update)
- DELETE (Delete)

```js
const baseUrl = 'http://localhost:3000';

class PhotoAPI {
  url = `${baseUrl}/photos`;

  constructor() {}

  getAll(page = 1, limit = 100) {
    return fetch(`${this.url}?_page=${page}&_limit=${limit}`)
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  add(photo) {
    return fetch(`${this.url}`, {
      method: 'POST',
      body: JSON.stringify(photo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  update(photo) {
    return fetch(`${this.url}/${photo.id}`, {
      method: 'PUT',
      body: JSON.stringify(photo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  delete(id) {
    return fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  static translateStatusToErrorMessage(status) {
    switch (status) {
      case 401:
        return 'Please login again.';
      case 403:
        return 'You do not have permission to view the photos.';
      default:
        return 'There was an error retrieving the photos. Please try again.';
    }
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const httpErrorInfo = {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      };
      console.log(
        `logging http details for debugging: ${JSON.stringify(httpErrorInfo)}`
      );

      let errorMessage = PhotoAPI.translateStatusToErrorMessage(
        httpErrorInfo.status
      );
      throw new Error(errorMessage);
    }
  }

  parseJSON(response) {
    return response.json();
  }
}

//action types
const LOAD_PHOTOS_REQUEST = 'LOAD_PHOTOS_REQUEST';
const LOAD_PHOTOS_SUCCESS = 'LOAD_PHOTOS_SUCCESS';
const LOAD_PHOTOS_FAILURE = 'LOAD_PHOTOS_FAILURE';
const ADD_PHOTO_REQUEST = 'ADD_PHOTO_REQUEST';
const ADD_PHOTO_SUCCESS = 'ADD_PHOTO_SUCCESS';
const ADD_PHOTO_FAILURE = 'ADD_PHOTO_FAILURE';
const UPDATE_PHOTO_REQUEST = 'UPDATE_PHOTO_REQUEST';
const UPDATE_PHOTO_SUCCESS = 'UPDATE_PHOTO_SUCCESS';
const UPDATE_PHOTO_FAILURE = 'UPDATE_PHOTO_FAILURE';
const DELETE_PHOTO_REQUEST = 'DELETE_PHOTO_REQUEST';
const DELETE_PHOTO_SUCCESS = 'DELETE_PHOTO_SUCCESS';
const DELETE_PHOTO_FAILURE = 'DELETE_PHOTO_FAILURE';

//state (initial)
const initialState = {
  photos: [],
  processing: false,
  error: null
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PHOTOS_REQUEST:
      return { ...state, processing: true };
    case LOAD_PHOTOS_SUCCESS:
      return { ...state, processing: false, photos: action.payload };
    case LOAD_PHOTOS_FAILURE:
      return { ...state, processing: false, error: action.payload.message };
    case ADD_PHOTO_REQUEST:
      return { ...state, processing: true };
    case ADD_PHOTO_SUCCESS:
      return {
        ...state,
        processing: false,
        photos: [...state.photos, action.payload]
      };
    case ADD_PHOTO_FAILURE:
      return { ...state, processing: false, error: action.payload.message };
    case UPDATE_PHOTO_REQUEST:
      return { ...state, processing: true };
    case UPDATE_PHOTO_SUCCESS:
      return {
        ...state,
        processing: false,
        photos: state.photos.map(photo => {
          return photo.id === action.payload.id
            ? Object.assign({}, photo, action.payload)
            : photo;
        })
      };
    case UPDATE_PHOTO_FAILURE:
      return { ...state, processing: false, error: action.payload.message };
    case DELETE_PHOTO_REQUEST:
      return { ...state, processing: true };
    case DELETE_PHOTO_SUCCESS:
      return {
        ...state,
        processing: false,
        photos: state.photos.filter(photo => photo.id !== action.payload.id)
      };
    case DELETE_PHOTO_FAILURE:
      return { ...state, processing: false, error: action.payload.message };
    default:
      return state;
  }
}

//action creators
function loadPhotos() {
  return dispatch => {
    let photoAPI = new PhotoAPI();
    dispatch({ type: LOAD_PHOTOS_REQUEST });
    return photoAPI
      .getAll(1)
      .then(data => {
        dispatch({ type: LOAD_PHOTOS_SUCCESS, payload: data });
      })
      .catch(error => {
        dispatch({ type: LOAD_PHOTOS_FAILURE, payload: error });
      });
  };
}

function addPhoto(photo) {
  return dispatch => {
    let photoAPI = new PhotoAPI();
    dispatch({ type: ADD_PHOTO_REQUEST });
    return photoAPI
      .add(photo)
      .then(data => {
        dispatch({ type: ADD_PHOTO_SUCCESS, payload: data });
      })
      .catch(error => {
        dispatch({ type: ADD_PHOTO_FAILURE, payload: error });
      });
  };
}

function updatePhoto(photo) {
  return dispatch => {
    let photoAPI = new PhotoAPI();
    dispatch({ type: UPDATE_PHOTO_REQUEST });
    return photoAPI
      .update(photo)
      .then(data => {
        dispatch({ type: UPDATE_PHOTO_SUCCESS, payload: data });
      })
      .catch(error => {
        dispatch({ type: UPDATE_PHOTO_FAILURE, payload: error });
      });
  };
}

function deletePhoto(photoId) {
  return dispatch => {
    let photoAPI = new PhotoAPI();
    dispatch({ type: DELETE_PHOTO_REQUEST });
    return photoAPI
      .delete(photoId)
      .then(data => {
        dispatch({ type: DELETE_PHOTO_SUCCESS, payload: data });
      })
      .catch(error => {
        dispatch({ type: DELETE_PHOTO_FAILURE, payload: error });
      });
  };
}

var ReduxThunk = window.ReduxThunk.default;

//when we just needed Redux DevTools extension enabled but no middleware
// function enableDevTools() {
//   return (
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );
// }
// const store = Redux.createStore(reducer, enableDevTools());

// if you just need ReduxThunk
// const store = Redux.createStore(reducer, Redux.applyMiddleware(ReduxThunk));

// if you need Redux DevTools enabled & ReduxThunk middleware you use a composer
// don't pass enableDevTools, the __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ has already added it
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const store = Redux.createStore(
  reducer,
  compose(Redux.applyMiddleware(...[ReduxThunk]))
);

function logState() {
  console.log(JSON.stringify(store.getState()));
}

store.subscribe(logState);

const newPhoto = {
  albumId: 1,
  title: 'Added Photo',
  url: 'https://via.placeholder.com/600/b0f7cc',
  thumbnailUrl: 'https://via.placeholder.com/150/b0f7cc'
};

const updatedPhoto = {
  id: '1',
  albumId: 1,
  title: 'Updated Photo',
  url: 'https://via.placeholder.com/600/b0f7cc',
  thumbnailUrl: 'https://via.placeholder.com/150/b0f7cc'
};

async function test() {
  await store.dispatch(loadPhotos());
  console.log('loaded photos');

  await store.dispatch(addPhoto(newPhoto));
  console.log('added photo');

  const id = store.getState().photos[0].id;
  updatedPhoto.id = id;

  await store.dispatch(updatePhoto(updatedPhoto));
  console.log('updated photo');

  await store.dispatch(deletePhoto(id));
  console.log('deleted photo');
}

test();
```

### Middleware & Enhancers

- Store enhancers are a formal mechanism for adding capabilities to Redux itself. Most people will never need to write one.
- To use middleware in Redux, we use the applyMiddleware() function exported by the Redux library.
- applyMiddleware is itself a store enhancer that lets us change how dispatch() works.

## Reference

### Thunk

- [Redux Thunk on GitHub](https://github.com/reduxjs/redux-thunk)
- [Simple Example Redux Thunk](https://alligator.io/redux/redux-thunk/)
- [What is a Thunk?](https://daveceddia.com/what-is-a-thunk/)

### Why Reducers need to be Pure

- [Anti-Pattern: Async in Reducer](https://stackoverflow.com/questions/49155438/react-redux-is-adding-async-method-in-a-reducer-an-anti-pattern)
- [Why Reducers Need to be Pure](https://stackoverflow.com/questions/44767160/why-are-pure-reducers-so-important-in-redux)
- same input, same result
  - what if the api was down?

### Middleware & Enhancers

[Middleware & Enhancers](https://read.reduxbook.com/markdown/part1/05-middleware-and-enhancers.html)

### Testing

- [Redux: Writing Tests](https://redux.js.org/recipes/writing-tests#async-action-creators)
