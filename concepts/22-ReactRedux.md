# Chapter 22: React Redux

**React bindings for Redux.**

Redux can be used with any UI layer (such as Angular, Vue, or plain JS), but is most commonly used with React.

`React-Redux` provides bindings between React and Redux.

The `connect` function generates wrapper **"container"** components that subscribe to the store, so you don't have to write store subscription code for every component that needs to talk to the store.

Any component in your application can be wrapped with `connect` and "connected" to the store. Connecting more components is usually better for performance.

Putting a `<Provider>` component around your root component makes the store accessible to all connected components.

Action Creators:

- loadItems
- addItem
- removeItem

- App
  - Provider: store
    - ConnectedContainer
      - Container: componentDidMount(props.onLoad> loadItems), render(<List ...this.props>)
        - List
        - Form: handleSubmit: props.onAdd> addItem
        - Detail

## The `connect` function

### What it Does

- Automatically handles subscribing to the store, and helps dispatch actions
- Performance optimizations - automatically implements shouldComponentUpdate, and only re-renders your component when the data it needs changes
- Separates "subscribing to the store" from "what store am I subscribing to, and where did it come from?"
- Helps keep your React components "unaware" of Redux

### Using

The `connect` function takes two arguments, both optional:

- **mapStateToProps**: called every time the store state changes. It receives the entire store state, and should return an object of data this component needs.

> `mapStateToProps` could have been named `mapStoreStateToProps` or `mapReduxStateToProps` because people confuse React's local component state and Redux's state held in the store. [See this issue for more information](https://github.com/reduxjs/react-redux/issues/466).

- **mapDispatchToProps**: called once on component creation. It receives the dispatch method, and should return an object full of functions that use dispatch.
  For both functions, each field in the returned object becomes a prop for the wrapped component.

`connect` returns a new function that accepts the component to wrap, and that function returns the wrapper component.

```js
import { connect } from 'react-redux';
import { increment } from './counterActions';

function mapStateToProps(state) {
  return {
    // The "counter" field in this object becomes props.counter
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    // The "increment" field in this object becomes props.increment
    increment: () => dispatch(increment())
  };
}

const Counter = props => (
  <div>
    <div>Counter value: {props.counter}</div>,
    <button onClick={props.increment}>Increment</button>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
// Expanded:
// const generateWrapperComponent = connect(mapState, mapDispatch);
// const ConnectedCounter = generateWrapperComponent(Counter);
```

## Writing `mapState` Functions

- `connect` will re-run your mapState function every time the store state changes
  - does shallow equality comparison between the last and current result objects
  - re-renders your component if any fields are === different than the last result
- if function passes two parameters:
  - receives wrapper component's props as the second argument
  - called whenever the props passed to the wrapper component change (in addition to when store state changes)
- a mapState function should be pure
  - no side effects
  - just state ( + wrapper props) in
  - new component props out
  - similar to reducer

```js
// Also commonly known as "mapState" for short
// the state parameter is connect calling store.getState() and returning the result as state
function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

// Same thing, just with lots of ES6 shorthand
const mapState = ({ counter }) => ({ counter });

// If declared with two arguments, will be called whenever
// the state changes _and_ when incoming props change
const mapState = (state, ownProps) => ({
  todo: state.todos[ownProps.todoIndex]
});

// can contain whatever logic and data preparation
// steps you need, not just "return state.whatever"
const mapState = state => {
  const { basicData, otherItem } = state;
  const transformedData = transformStuff(basicData);
  const filteredData = filterStuff(transformedData);

  return {
    data: filteredData,
    otherItem
  };
};
```

## Writing `mapDispatch` Functions

- By default, connect gives your components `props.dispatch`.
- If you want to "bind" action creators instead, you can provide a mapDispatch function as the second argument to connect. It gets dispatch as an argument, and you can return functions that will dispatch automatically when called.
- Declaring mapDispatch with two arguments works the same way as mapState - will be given ownProps, and re-run when they change
- **Better choice**: pass an object full of action creators as the second argument to connect (the "object shorthand")

```js
/ Also commonly known as "mapDispatch" for short
function mapDispatchToProps(dispatch, ownProps) {
    return {
        increment : () => dispatch(increment()),
        decrement : () => dispatch({type : "DECREMENT"}),
        add : (amount) => dispatch(add(amount)),
    };
}

export default connect(mapState, mapDispatchToProps)(MyComponent);

// If declared with two arguments, will be called whenever
// the state changes _and_ when incoming props change
const mapDispatch = (dispatch, ownProps) => ({
    add : () => dispatch(add(ownProps.amount))
});

// can use bindActionCreators inside
const mapDispatch = (dispatch) => {
    return bindActionCreators({increment, decrement}, dispatch);
}

// TIP: Don't write a separate mapDispatch function.
// Use the "object shorthand" instead! They're automatically bound.
const actions = {increment, decrement};
export default connect(mapState, actions)(MyComponent);
```

## Tips

- You can connect as many of your app's components as you want, not just the root component.
  - connecting more components is usually better for performance
- Connect components when
  - they need to access store state or dispatch actions
  - where passing props down multiple levels would be a pain
- Only declare your map\* functions with two arguments if you really need props
- Both map\* functions are optional
  - if you only need data, use connect(mapState)(MyComponent).
  - if you only need to dispatch, use connect(null, mapDispatch)(MyComponent)
- In general, don't write an actual `mapDispatch` function yourself
  - use the "object shorthand" form with action creators instead!

## Provider

Wrapping your root application component in `<Provider>` and passing it the store reference makes that store available to all connected components in the component tree.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';

// App may be connected itself, and have connected
// components deep inside its tree
import App from './App';

ReactDOM.render(
  // Wrap your top-level component in <Provider>,
  // and pass in the store reference
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

### Why

- Manually importing the `store` ties your components to that specific store instance, making it harder to test them
- React-Redux's `<Provider>` acts as a lightweight dependency injection approach, which lets you reuse Redux-connected components and test them with a fake store if needed

## Inside React Redux

### Inside connect

How does connect work internally or how would you manually create a container component (connected, wrapped)?

Using Redux with any UI layer requires the same consistent set of steps:

1. Create a Redux store
2. Subscribe to updates
3. Inside the subscription callback:

- Get the current store state
- Extract the data needed by this piece of UI
- Update the UI with the data

4. If necessary, render the UI with initial state
5. Respond to UI inputs by dispatching Redux actions

```js
// 1) Create a store
const store = createStore(counter);

// 2) Subscribe to store updates
store.subscribe(render);

const valueEl = document.getElementById('value');

// 3. When the subscription callback runs:
function render() {
  // 3.1) Get the current store state
  const state = store.getState();

  // 3.2) Extract the data you want
  const newValue = state.toString();

  // 3.3) Update the UI with the new value
  valueEl.innerHTML = newValue;
}

// 4) Display the UI with the initial store state
render();

// 5) Dispatch actions based on UI inputs
document.getElementById('increment').addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
```

### Inside Provider

How does the wrapped component get access to the store?

- The Provider puts it in the React context.

## Demo

In this demos we are going to:

1. Use the redux demo code from the previous concept chapter on Redux shown below:
   - commenting out the last lines that manually dispatch actions (because there is no UI yet)

```js
//action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

//action creators
function increment() {
  return { type: INCREMENT };
}
function decrement() {
  return { type: DECREMENT };
}

//reducer
function reducer(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

//store
var store = Redux.createStore(reducer);

// store.subscribe(logState);

// store.dispatch({ type: '' });
// store.dispatch(increment());
// store.dispatch(increment());
// store.dispatch(decrement());
// store.dispatch(decrement());
// store.dispatch(decrement());
// store.dispatch(decrement());
```

2. Add a UI by creating components including manually creating the container component.

Add this code right below the last line in the previous step.

```js
function Counter(props) {
  return (
    <React.Fragment>
      <div>Count: {props.count}</div>
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>
    </React.Fragment>
  );
}

class WrappedCounterManual extends React.Component {
  state = this.getCurrentStateFromStore();

  getCurrentStateFromStore() {
    return {
      count: store.getState()
    };
  }

  updateStateFromStore = () => {
    const currentState = this.getCurrentStateFromStore();

    if (this.state !== currentState) {
      this.setState(currentState);
    }
  };

  componentDidMount() {
    this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  render() {
    return (
      <Counter
        count={this.state.count}
        increment={() => store.dispatch(increment())}
        decrement={() => store.dispatch(decrement())}
      />
    );
  }
}

const element = (
  <div>
    <h3>Container Manually Implemented </h3>
    <WrappedCounterManual />
  </div>
);

const rootElement = document.getElementById('root');
ReactDOM.render(element, rootElement);
```

3. Open the application in a browser: http://localhost:5000/
4. Click the `+` and `-` buttons to verify it is working
5. Comment out the manually created component

   ```js
   //   class WrappedCounterManual extends React.Component {
   //     state = this.getCurrentStateFromStore();

   //     getCurrentStateFromStore() {
   //       return {
   //         count: store.getState()
   //       };
   //     }

   //     updateStateFromStore = () => {
   //       const currentState = this.getCurrentStateFromStore();

   //       if (this.state !== currentState) {
   //         this.setState(currentState);
   //       }
   //     };

   //     componentDidMount() {
   //       this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
   //     }

   //     componentWillUnmount() {
   //       this.unsubscribeStore();
   //     }

   //     render() {
   //       return (
   //         <Counter
   //           count={this.state.count}
   //           increment={() => store.dispatch(increment())}
   //           decrement={() => store.dispatch(decrement())}
   //         />
   //       );
   //     }
   //   }

   //   const element = (
   //     <div>
   //       <h3>Container Manually Implemented </h3>
   //       <WrappedCounterManual />
   //     </div>
   //   );

   // const rootElement = document.getElementById('root');
   // ReactDOM.render(element, rootElement);
   ```

6. Use `connect` to automatically create the container component.

   Add this code to the bottom of the file.

   ```js
   const mapStateToProps = state => {
     return {
       count: state
     };
   };

   const mapDispatchToProps = { increment, decrement };

   const WrappedCounter = ReactRedux.connect(
     mapStateToProps,
     mapDispatchToProps
   )(Counter);

   const element = (
     <div>
       <h3>Container Created using React Redux (connect)</h3>
       <ReactRedux.Provider store={store}>
         <WrappedCounter />
       </ReactRedux.Provider>
     </div>
   );

   const rootElement = document.getElementById('root');
   ReactDOM.render(element, rootElement);
   ```

### Final Code:

```js
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function increment() {
  return { type: INCREMENT };
}
function decrement() {
  return { type: DECREMENT };
}

function reducer(state = 5, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}
var store = Redux.createStore(reducer);

function Counter(props) {
  return (
    <React.Fragment>
      <div>Count: {props.count}</div>
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    count: state
  };
};

const mapDispatchToProps = { increment, decrement };

const WrappedCounter = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(
  Counter
);

//manually
class WrappedCounterManual extends React.Component {
  state = this.getCurrentStateFromStore();

  getCurrentStateFromStore() {
    return {
      count: store.getState()
    };
  }

  updateStateFromStore = () => {
    const currentState = this.getCurrentStateFromStore();

    if (this.state !== currentState) {
      this.setState(currentState);
    }
  };

  componentDidMount() {
    this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  render() {
    return (
      <Counter
        count={this.state.count}
        increment={() => store.dispatch(increment())}
        decrement={() => store.dispatch(decrement())}
      />
    );
  }
}

const element = (
  <div>
    <h3>Container Manually Implemented </h3>
    <WrappedCounterManual />
    <hr />
    <h3>Container Created using React Redux (connect)</h3>
    <ReactRedux.Provider store={store}>
      <WrappedCounter />
    </ReactRedux.Provider>
  </div>
);

const rootElement = document.getElementById('root');
ReactDOM.render(element, rootElement);

// var store = Redux.createStore(reducer, enableDevTools());

// function enableDevTools() {
//   return (
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );
// }

// function logState() {
//   console.log(store.getState().toString());
// }

// store.subscribe(logState);

// store.dispatch({ type: '' });
// store.dispatch({ type: 'INCREMENT' });
// store.dispatch({ type: 'INCREMENT' });
// store.dispatch({ type: 'DECREMENT' });
```

## Reference

- [React Redux Documentation](https://react-redux.js.org/introduction/why-use-react-redux)
- [React Redux Implementation History](https://blog.isquaredsoftware.com/2018/11/react-redux-history-implementation/)
- [Using React Redux](https://blog.isquaredsoftware.com/presentations/workshops/redux-fundamentals/react-redux.html#/)
- [Understanding React Redux](https://blog.logrocket.com/react-redux-connect-when-and-how-to-use-it-f2a1edab2013/)
- [useSelector: connect as a React Hook](https://react-redux.js.org/next/api/hooks)
- [Using Redux Containers vs Only at a High Level](https://github.com/elastic/kibana/issues/14547)
