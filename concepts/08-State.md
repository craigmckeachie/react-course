# Chapter 8: State

- [Chapter 8: State](#chapter-8-state)
  - [Definition](#definition)
    - [state](#state)
  - [State in Class Components](#state-in-class-components)
    - [Using State Correctly](#using-state-correctly)
  - [State in Function Components](#state-in-function-components)
    - [Using the `useEffect` Hook](#using-the-useeffect-hook)
      - [Defining `state`](#defining-state)
        - [main.jsx](#mainjsx)
      - [Setting `state`](#setting-state)
        - [main.jsx](#mainjsx-1)
      - [Remember not to set `state` directly, use the setter function returned by the hook.](#remember-not-to-set-state-directly-use-the-setter-function-returned-by-the-hook)
        - [main.jsx](#mainjsx-2)
    - [FAQs](#faqs)
    - [Where to use `useEffect`](#where-to-use-useeffect)
    - [Using Multiple State Variables](#using-multiple-state-variables)
      - [Should I use one or many state variables?](#should-i-use-one-or-many-state-variables)
    - [Setting `state` using the current `state` or `props`](#setting-state-using-the-current-state-or-props)
      - [Use a Functional update](#use-a-functional-update)
  - [Data Flows Down](#data-flows-down)
  - [Reference](#reference)

## Definition

### state

A component needs state when some data associated with it changes over time. For example, a Checkbox component might need isChecked in its state, and a NewsFeed component might want to keep track of fetchedPosts in its state.

The most important difference between state and props is that props are passed from a parent component, but state is managed by the component itself. A component cannot change its props, but it can change its state.

For each particular piece of changing data, there should be just one component that “owns” it in its state. Don’t try to synchronize states of two different components. Instead, lift it up to their closest shared ancestor, and pass it down as props to both of them.
Just an object that lives inside a component and stores all of the data that that component and maybe some of its children need.

State is local to the component (encapsulated) and should not be accessed outside the component.

## State in Class Components

```js
class Clock extends React.Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };

  render() {
    return <div>{this.state.time}</div>;
  }
}

ReactDOM.render(<Clock />, document.getElementById('root'));
```

In React, you don’t manipulate the DOM directly, instead you simply update data (state) and let React react by updating the UI in all the needed places.

```js
class Clock extends React.Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };

  refresh = () => {
    this.setState({ time: new Date().toLocaleTimeString() });
  };

  render() {
    return (
      <div>
        <p>{this.state.time}</p>
        <button onClick={this.refresh}>Refresh</button>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById('root'));
```

To make it easier to read and understand, the last example uses [class field declarations](https://github.com/tc39/proposal-class-fields) which is not an official feature of JavaScript but is currently a `Stage 3 proposal`.

> Read the [TC39 Process](https://tc39.github.io/process-document/) to better understanding the ECMAScript standards process and what the stages mean.

The example could be rewritten as follows to be ES6/ES2015 compliant.

```js
class Clock extends React.Component {
  // state = {
  //   time: new Date().toLocaleTimeString()
  // };

  // refresh = () => {
  //   this.setState({ time: new Date().toLocaleTimeString() });
  // };

  constructor() {
    super();
    this.state = {
      time: new Date().toLocaleTimeString(),
    };
    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    this.setState({ time: new Date().toLocaleTimeString() });
  }

  render() {
    return (
      <div>
        <p>{this.state.time}</p>
        <button onClick={this.refresh}>Refresh</button>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById('root'));
```

### Using State Correctly

There are three things you should know about setState().

1. Do Not Modify State Directly

   ```js
   class Clock extends React.Component {
     state = {
       time: new Date().toLocaleTimeString(),
     };

     refresh = () => {
       // don't modify state directly
       // this.state.time = new Date().toLocaleTimeString();

       //instead call setState, React calls render after setState
       this.setState({ time: new Date().toLocaleTimeString() });
     };

     render() {
       return (
         <div>
           <p>{this.state.time}</p>
           <button onClick={this.refresh}>Refresh</button>
         </div>
       );
     }
   }

   ReactDOM.render(<Clock />, document.getElementById('root'));
   ```

2. State Updates are Merged

   - `setState` could be named please update these **parts** of state
   - In the example below, the button label is still **Refresh** even after clicking the button that causes state to be set (but doesn't set the `buttonLabel`).

   ```js
   class Clock extends React.Component {
     state = {
       time: new Date().toLocaleTimeString(),
       buttonLabel: 'Refresh',
     };

     refresh = () => {
       this.setState({ time: new Date().toLocaleTimeString() });
     };

     render() {
       return (
         <div>
           <p>{this.state.time}</p>
           <button onClick={this.refresh}>{this.state.buttonLabel}</button>
         </div>
       );
     }
   }

   ReactDOM.render(<Clock />, document.getElementById('root'));
   ```

3. State Updates May Be Asynchronous

   - React may batch multiple setState() calls into a single update for performance.

   - Because `this.props` and `this.state` may be updated asynchronously (after an http request or a user action like clicking a button ), you should not rely on their values for calculating the next state.

   For example, this code may fail to update the counter:

   ```js
   // Wrong
   this.setState({
     counter: this.state.counter + this.props.increment,
   });
   ```

   To fix it, use a second form of `setState()` that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:

   ```js
   // Correct
   this.setState((state, props) => ({
     counter: state.counter + props.increment,
   }));
   ```

   We used an [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) above, but it also works with regular functions:

   ```js
   // Correct
   this.setState(function (state, props) {
     return {
       counter: state.counter + props.increment,
     };
   });
   ```

## State in Function Components

### Using the `useEffect` Hook

#### Defining `state`

##### main.jsx

```js
function Clock() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  return (
    <div>
      <p>{time}</p>
      <button>Refresh</button>
    </div>
  );
}

ReactDOM.render(<Clock />, document.getElementById('root'));
```

#### Setting `state`

##### main.jsx

```diff
function Clock() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

+  const refresh = () => {
+    setTime(new Date().toLocaleTimeString());
+  };

  return (
    <div>
      <p>{time}</p>
      <button
+      onClick={refresh}>
      Refresh
      </button>
    </div>
  );
}

ReactDOM.render(<Clock />, document.getElementById('root'));
```

#### Remember not to set `state` directly, use the setter function returned by the hook.

##### main.jsx

```diff
function Clock() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  const refresh = () => {
+   time = new Date().toLocaleTimeString(); //Uncaught Error: "time" is read-only

    //do this instead
    // setTime(new Date().toLocaleTimeString());
  };

  return (
    <div>
      <p>{time}</p>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
}

ReactDOM.render(<Clock />, document.getElementById('root'));
```

```shell
VM98:11 Uncaught Error: "time" is read-only
```

### FAQs

**What does calling useState do?**

It declares a “state variable”. Our variable is called `time` but we could call it anything else, like `basketball`. This is a way to “preserve” some values between the function calls — `useState` is a new way to use the exact same capabilities that this.state provides in a class. Normally, variables “disappear” when the function exits but state variables are preserved by React.

**What do we pass to useState as an argument?**

The only argument to the `useState()` Hook is the `initial state`. Unlike with classes, the state doesn’t have to be an object. We can keep a number or a string if that’s all we need. In our example, we just want a date object to show the time, so we pass the a new date object (now) as initial state for our variable. (If we wanted to store two different values in state, we would call useState() twice.)

**What does useState return?**

It returns a pair of values: the current state and a function that updates it. This is why we write const [date, setDate] = useState(...). This is similar to `this.state.count` and `this.setState` in a class, except you get them in a pair.

**What is that syntax?**

The syntax for `useState` is confusing at first because it uses **Array destructuring** to return a pair. Array destructuring is used because it allows the us to decide what the variable and setter function should be named.

### Where to use `useEffect`

| In Classes    | With Hooks |
| ------------- | ---------- |
| this.setState | useState   |

> `useState` don’t work inside classes. But you can use function components with hooks instead of class components and `setState`.

### Using Multiple State Variables

Declaring state variables as a pair of `[something, setSomething]` is also handy because it lets us give different names to different state variables if we want to use more than one:

```js
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  ...
}
```

In the above component, we have `age`, `fruit`, and `todos` as local variables, and we can update them individually:

```js
function handleOrangeClick() {
  // Similar to this.setState({ fruit: 'orange' })
  setFruit('orange');
}
```

You don’t have to use many state variables. State variables can hold objects and arrays just fine, so you can still group related data together. However, unlike `this.setState` in a class, updating a state variable always replaces it instead of merging it.

#### Should I use one or many state variables?

If you’re coming from classes, you might be tempted to always call `useState()` once and put all state into a single object. You can do it if you’d like. Here is an example of a component that follows the mouse movement. We keep its position and size in the local state:

```js
function Box() {
  const [state, setState] = useState({
    left: 0,
    top: 0,
    width: 100,
    height: 100,
  });
  // ...
}
```

Now let’s say we want to write some logic that changes left and top when the user moves their mouse. Note how we have to merge these fields into the previous state object manually:

```js
...
const handleWindowMouseMove(e) {
      // Spreading "...state" ensures we don't "lose" width and height
      setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
}
...
```

This is because when we update a state variable, we replace its value. This is different from `this.setState` in a class, which _merges_ the updated fields into the object.

> The React team recommends to split state into multiple state variables based on which values tend to change together.

For example, we could split our component state into position and size objects, and always replace the position with no need for merging:

```js
function Box() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });

  const handleWindowMouseMove(e) {
      setPosition({ left: e.pageX, top: e.pageY });
 }
 ...
}
```

### Setting `state` using the current `state` or `props`

#### Use a Functional update

If the new state is computed using the previous state, you can pass a function to setState. The function will receive the previous value, and return an updated value. Here’s an example of a counter component that uses both forms of setState:

```js
function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>Increment</button>
    </>
  );
}
```

The ”Increment” and ”Decrement” buttons use the functional form, because the updated value is based on the previous value. But the “Reset” button uses the normal form, because it always sets the count back to the initial value.

If your update function returns the exact same value as the current state, the subsequent rerender will be skipped completely.

## Data Flows Down

Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn’t care whether it is defined as a function or a class.

This is why state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it.

A component may choose to pass its state down as props to its child components:

```js
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

This also works for user-defined components:

```js
<FormattedDate date={this.state.date} />
```

The `FormattedDate` component would receive the `date` in its props and wouldn't know whether it came from the `Clock`'s state, from the `Clock`'s props, or was typed by hand:

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

This is commonly called a "top-down" or "unidirectional" data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components "below" them in the tree.

If you imagine a component tree as a waterfall of props, each component's state is like an additional water source that joins it at an arbitrary point but also flows down.

## Reference

- [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
- [Glossary Definition: State](https://reactjs.org/docs/glossary.html#state)
- [Using the State Hook](https://reactjs.org/docs/hooks-state.html)
