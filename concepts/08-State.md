# Chapter 8: State

- [Chapter 8: State](#chapter-8-state)
  - [Definition](#definition)
    - [state](#state)
  - [Using State Correctly](#using-state-correctly)
  - [Data Flows Down](#data-flows-down)
  - [Converting a Function Component to a Class Component](#converting-a-function-component-to-a-class-component)
  - [Reference](#reference)

Just an object that lives inside a component and stores all of the data that that component and maybe some of its children need.

State is local to the component (encapsulated) and should not be accessed outside the component.

```js
class Clock extends React.Component {
  state = {
    time: new Date().toLocaleTimeString()
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
    time: new Date().toLocaleTimeString()
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
      time: new Date().toLocaleTimeString()
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

## Definition

### state

A component needs state when some data associated with it changes over time. For example, a Checkbox component might need isChecked in its state, and a NewsFeed component might want to keep track of fetchedPosts in its state.

The most important difference between state and props is that props are passed from a parent component, but state is managed by the component itself. A component cannot change its props, but it can change its state.

For each particular piece of changing data, there should be just one component that “owns” it in its state. Don’t try to synchronize states of two different components. Instead, lift it up to their closest shared ancestor, and pass it down as props to both of them.

## Using State Correctly

There are three things you should know about setState().

1. Do Not Modify State Directly

   ```js
   class Clock extends React.Component {
     state = {
       time: new Date().toLocaleTimeString()
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
       buttonLabel: 'Refresh'
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
     counter: this.state.counter + this.props.increment
   });
   ```

   To fix it, use a second form of `setState()` that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:

   ```js
   // Correct
   this.setState((state, props) => ({
     counter: state.counter + props.increment
   }));
   ```

   We used an [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) above, but it also works with regular functions:

   ```js
   // Correct
   this.setState(function(state, props) {
     return {
       counter: state.counter + props.increment
     };
   });
   ```

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

## Converting a Function Component to a Class Component

Often you will start with a function component and eventually need state for that component. Below is the process for converting from a function component to a class component.

1. **Create** an ES6 `class`, with the same name, that `extends` `React.Component`.
2. **Add** a single empty `method` to it called `render()`.
3. **Move** the **body** of the `function` into the `render()` method.
4. **Replace** `props` with `this.props` in the `render()` body.
5. **Delete** the remaining **empty** `function` declaration.

## Reference

- [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
- [Glossary Definition: State](https://reactjs.org/docs/glossary.html#state)

<!-- ## StopWatch -->
