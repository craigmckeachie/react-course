# Advanced Components

# Higher-Order Components

#### A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.

#### Definition

Higher Order Component (HOC): an abstraction over a component. When given a component (and perhaps some other parameters), they return a new component.

From the perspective of the JavaScript language:

- _a higher-order component is a function that takes a component and returns a new component._

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

## Demo

### Simple HOC

1. Here is a simple example of a higher-order component (HOC). Paste the code below in `main.jsx`

````js
The `wrapper` function is the higher-order function or more specificlaly component in the code below.

```js
function Inner(props) {
  return <span>Inner</span>;
}

function wrapper(Inner, value) {
  function Outer(props) {
    return (
      <div>
        <h3>Outer</h3>
        <Inner {...props} /> <em>{value}</em>
      </div>
    );
  }
  return Outer;
}

const Outer = wrapper(Inner, 'Peace');

function App() {
  return <Outer />;
}

ReactDOM.render(<App />, document.getElementById('root'));
````

### Composition vs. HOCs

1. To better understand when to use HOCs it is helpful to compare them to using composition with components. Paste the code below in `main.jsx` to see how composition can be used to combine components.

```js
function Inner(props) {
  return <span>Inner</span>;
}

function Peace(props) {
  return <span>Peace</span>;
}

function Calm(props) {
  return <span>Calm</span>;
}

function Self(props) {
  return <span>Self</span>;
}

function EarInfection(props) {
  return <span>Ear Infection</span>;
}

function App() {
  return (
    <div>
      <Inner /> <Peace />
      <br />
      <Inner /> <Calm />
      <br />
      <Inner /> <Self />
      <br />
      <Inner /> <EarInfection />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

> The downside of this approach is that a new component needs to get created for each suffix. This is not a problem in the example above because the components are simple (one line) but as components become more complex this can become more onerous.

2. Using a Higher-order component (function)

The `wrapper` function is the higher-order function or more specifically higher-order component in the code below.

```js
function Inner(props) {
  return <span>Inner</span>;
}

function wrapper(Inner, value) {
  function Outer(props) {
    return (
      <div>
        <Inner {...props} /> <em>{value}</em>
      </div>
    );
  }
  return Outer;
}

const InnerPeace = wrapper(Inner, 'Peace');
const InnerCalm = wrapper(Inner, 'Calm');
const InnerSelf = wrapper(Inner, 'Self');
const InnerEarInfection = wrapper(Inner, 'Ear Infection');

function App() {
  return (
    <div>
      <InnerPeace />
      <InnerCalm />
      <InnerSelf />
      <InnerEarInfection />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### Another Simple Example

```js
function Greet(props) {
  return <span>Hi</span>;
}

function withName(Greet, name) {
  function Wrapper(props) {
    return (
      <div>
        <Greet {...props} /> <em>{name}</em>
      </div>
    );
  }
  return Wrapper;
}

const GreetWithName = withName(Greet, 'Riya');

function App() {
  return <GreetWithName />;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## Use Cases

Cross-Cutting Concerns

- When you have the need to share the state or behavior that one component encapsulates to other components that need that same state
- Repeated Logic
  - Render table, given data in an Array
  - Show tooltip on hover of multiple components
- Adding additional props
- Decorating
- You can often get the same reuse out of your code using any of the following techniques
  - Higher-Order Components
  - Render Props
  - Custom Hooks

## Conventions

- Don’t Mutate the Original Component. Use Composition. (prototype)
- Convention: Pass Unrelated Props Through to the Wrapped Component
- Convention: [Wrap the Display Name for Easy Debugging](https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging)

## Reference

- [Higher-Order Components Documentation](https://reactjs.org/docs/higher-order-components.html)
- [Tutorial](https://www.codingame.com/playgrounds/8595/reactjs-higher-order-components-tutorial)
- [Example](https://levelup.gitconnected.com/understanding-react-higher-order-components-by-example-95e8c47c8006)
- [Higher Order Components Article](https://tylermcginnis.com/react-higher-order-components/)

# Render Props

#### The term “render prop” refers to a technique for sharing code between React components using a prop whose value is a function.

A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

## Demo

1. Create a Box component and render it

```js
function Box(props) {
  return (
    <div style={{ width: 100, height: 100, border: '1px solid black' }}>
      {props.render && props.render()}
    </div>
  );
}

function App() {
  return <Box />;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

2. Tell the box what you want to render inside it

```diff
function App() {
+ return <Box render={() => <h3>Jack</h3>} />;
}
```

3. Use children instead of render

```diff
function Box(props) {
  return (
    <div style={{ width: 100, height: 100, border: '1px solid black' }}>
-     {props.render && props.render()}
+     {props.children}
    </div>
  );
}
```

4. Modify the code to tell the box what you want to render inside it

```js
// function App() {
//   return <Box render={() => <h3>Jack</h3>} />;
// }

function App() {
  return (
    <Box>
      <h3>Jack</h3>
    </Box>
  );
}
```

## Use Cases

Cross-Cutting Concerns

- When you have the need to share the state or behavior that one component encapsulates to other components that need that same state
- You can often get the same reuse out of your code using any of the following techniques
  - Higher-Order Components
  - Render Props
  - Custom Hooks

## Reference

- [Render Props: React Documentation](https://reactjs.org/docs/render-props.html)
- [Understanding React Render Props](https://levelup.gitconnected.com/understanding-react-render-props-by-example-71f2162fd0f2)
- [React Render Props Article](https://tylermcginnis.com/react-render-props/)


# Context

#### Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

## When to Use Context
 When props need to be shared with most of a tree of components.

 In the example below, the theme is a prop to all components in the tree.

###
```js
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
};

class App extends React.Component {
  render() {
    return <Toolbar theme={themes.light} />;
  }
}

function Toolbar(props) {
  // The Toolbar component must take an extra "theme" prop
  // and pass it to the ThemedButton. This can become painful
  // if every single button in the app needs to know the theme
  // because it would have to be passed through all components.
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    const { background, foreground } = this.props.theme;

    return (
      <button
        style={{
          backgroundColor: background,
          color: foreground
        }}
      >
        Click Me
      </button>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

```

Instead we could use the `Context` API.

```js
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
};

// Create a context for the current theme (with "light" as the default).
const ThemeContext = React.createContext(themes.light);

// class App extends React.Component {
//   render() {
//     return <Toolbar theme={themes.light} />;
//   }
// }

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={themes.dark}>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// function Toolbar(props) {
//   return (
//     <div>
//       <ThemedButton theme={props.theme} />
//     </div>
//   );
// }

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    const { background, foreground } = this.context;

    return (
      <button
        style={{
          backgroundColor: background,
          color: foreground
        }}
      >
        Click Me
      </button>
    );
  }
}
// ThemedButton.contextType = ThemeContext;

ReactDOM.render(<App />, document.getElementById('root'));

```


## Reference
- [Context: React Documentation](https://reactjs.org/docs/context.html)