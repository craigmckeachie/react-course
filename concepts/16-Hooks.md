# Chapter 16: Hooks

- [Chapter 16: Hooks](#chapter-16-hooks)
  - [Defined](#defined)
  - [Why Hooks?](#why-hooks)
  - [No Breaking Changes](#no-breaking-changes)
  - [Hooks API](#hooks-api)
  - [useState](#usestate)
    - [Simple Class Component](#simple-class-component)
    - [Simple Function Component](#simple-function-component)
  - [useEffect](#useeffect)
    - [useEffect Simple Demo](#useeffect-simple-demo)
  - [Custom Hooks](#custom-hooks)
  - [Rules of Hooks](#rules-of-hooks)
  - [Labs](#labs)
  - [Reference](#reference)

## Defined

> Hooks are a new addition in React 16.8. They let you use `state` and other React features including `Lifecycle Methods` without writing a class.

## Why Hooks?

- It’s hard to reuse stateful logic between components
  - reusable behavior
  - current patterns: render props and higher-order components
    - both patterns create "wrapper hell" where components are surrounded by providers, consumers, higher-order components, render props etc...
    - **Hooks allow you to reuse stateful logic without changing your component hierarchy**
- Complex components become hard to understand
  - lifecycle events like `componentDidMount` and `componentDidUpdate` contain code to address mixed concerns
    - data fetching
    - setting up event listeners
    - etc...
    - leads to bugs and inconsistencies
- Classes confuse both people and machines
  - class can be a large barrier to learning React
    - understanding `this` in JavaScript
    - code is verbose without unstable syntax proposals
    - when to use class vs function components
  - classes don't work well with today's tools
    - don't minify well
    - don't tree shake well
    - make hot reloading flaky and unreliable

## No Breaking Changes

Before we continue, note that Hooks are:

- Completely opt-in.
  - You can try Hooks in a few components without rewriting any existing code. But you don’t have to learn or use Hooks right now if you don’t want to.
- 100% backwards-compatible.
  - Hooks don’t contain any breaking changes.
- Available now.
  - Hooks are now available with the release of v16.8.0.
- There are no plans to remove classes from React.
- Hooks don’t replace your knowledge of React concepts.

## Hooks API

Hooks provide a more direct API to the React concepts you already know: props, **state**, context, refs, and **lifecycle**.

| In Classes                            | With Hooks   |
| ------------------------------------- | ------------ |
| this.setState                         | useState     |
| Lifecycle Methods                     | useEffect    |
| Higher-Order Components, Render Props | Custom Hooks |

## useState

The `useState` hook was covered earlier in the course in the **State** chapter. The examples below are just to review the concepts if needed.

To understand the useState hook let's start at a class component that renders a counter.

### Simple Class Component

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('root'));
```

### Simple Function Component

To take the class component above and translate it into a function component it would look as follows

```js
function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

ReactDOM.render(<Example />, document.getElementById('root'));
```

## useEffect

The `useEffect` hook was covered earlier in the course in the **Lifecycle & Side Effects** chapter. The examples below are just to review the concepts if needed.

This Hook should be used for any side-effects you’re executing in your render cycle.

`useEffect()` _takes_ a `function` as an input and _returns_ `nothing`.

The function it takes will be executed for you:

- after the render cycle
- after _every_ render cycle

| Lifecycle Methods     | Hook                                                                       | Renders                                                                      |
| --------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| componentDidMount     | `useEffect(()=>{ ... }`, [ ])                                              | after first render only                                                      |
| componentDidUpdate    | `useEffect(()=>{... }, [dependency1, dependency2])`                        | after first render AND subsequent renders caused by a change in a dependency |
| componentWillUnmount  | `useEffect(() => { ... return ()=> {...cleanup}})`                         |
| shouldComponentUpdate | no comparable hook, instead, wrap function component in `React.memo(List)` | renders only if a prop changes                                               |
| componentWillMount    | deprecated so no comparable hook                                           |
| componentWillUpdate   | deprecated so no comparable hook                                           |

### useEffect Simple Demo

```js
//class component
// class Post extends React.Component {
//   state = {
//     now: new Date()
//   };

//   componentWillMount() {
//     setInterval(() => {
//       this.setState({ now: new Date() });
//     }, 1000);
//   }

//   render() {
//     return (
//       <div className="post">
//         <h1>My First Blog Post</h1>
//         <div>Author: Mark Twain</div>
//         <div>Published: {this.state.now.toLocaleTimeString()}</div>
//         <p>
//           I am new to blogging and this is my first post. You should expect a
//           lot of great things from me.
//         </p>
//       </div>
//     );
//   }
// }

//function component
function Post() {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="post">
      <h1>My First Blog Post</h1>
      <div>Author: Mark Twain</div>
      <div>Published: {now.toLocaleTimeString()}</div>
      <p>
        I am new to blogging and this is my first post. You should expect a lot
        of great things from me.
      </p>
    </div>
  );
}

ReactDOM.render(<Post />, document.getElementById('root'));
```

<!-- ### Items App with Hooks

#### Items App Modifying Container to `useState` and `useEffect`

We will start with the component architecture demo from earlier in the course and refactor the `Container` component to use `hooks`.

We have commented out the class code and replaced it with the hooks so you can see the syntax differences.

At this point, we are not calling an API yet we are just working with in-memory data.

_Note: This is not intended to be a full code example To get this example running, we would need to start with the code from the component architecture demo and replace just the `Container` component implementation._

##### Steps

- change class to function
- remove render method keep implementation
- comment out state
- replace with useState
- all handlers to const functions, comment out implementation
- remove this from jsx
- update handlers to use `set` functions

```js
...

function Container() {
  //   state = {
  //     items: []
  //   };
    const [items, setItems] = React.useState([]);

  //   componentDidMount() {
  //     this.setState({ items: initialItems });
  //   }

  React.useEffect(() => setItems(initialItems), []);

  const addItem = item => {
    setItems([...items, item]);
    //   this.setState(state => ({ items: [...state.items, item] }));
  };

  const updateItem = updatedItem => {
    let updatedItems = items.map(item => {
      return item.id === updatedItem.id
        ? Object.assign({}, item, updatedItem)
        : item;
    });
    return setItems(updatedItems);
    //   this.setState(state => {
    //     let items = state.items.map(item => {
    //       return item.id === updatedItem.id
    //         ? Object.assign({}, item, updatedItem)
    //         : item;
    //     });
    //     return { items };
    //   });
  };

  const removeItem = removeThisItem => {
    const filteredItems = items.filter(item => item.id != removeThisItem.id);
    setItems(filteredItems);
    //   this.setState(state => {
    //     const items = state.items.filter(item => item.id != removeThisItem.id);
    //     return { items };
    //   });
  };

  return (
    <React.Fragment>
      <Form item="" onSubmit={addItem} buttonValue="Add" />
      <List items={items} onRemove={removeItem} onUpdate={updateItem} />
    </React.Fragment>
  );
}


``` -->

## Custom Hooks

Building your own Hooks lets you extract component logic into reusable functions.

| In Classes                            | With Hooks   |
| ------------------------------------- | ------------ |
| Higher-Order Components, Render Props | Custom Hooks |

Traditionally in React, we’ve had two popular ways to share stateful logic between components: render props and higher-order components. Hooks solve many of the same problems without forcing you to add more components to the tree.

<!-- https://usehooks.com/useTheme/ -->

## Rules of Hooks

- Only call hooks at the top level (of your function component)
  - don't call them inside loops (for), conditions (if), or nested functions (only inside your main function component body)
- Only call hooks from React Functions
  - call hooks from React function components
  - call hooks from other custom hooks

## Labs

The labs in this course use a **mix** of **class** and **function** **components** with a **heavier weight** towards **function components with hooks** which are now considered a best practice in the React community.

> If you would like to see the lab code using all function components review the `hooks` branch in the lab solution repository.
>
> _Note: This branch is currently only available in the TypeScript version of the code and not the JavaScript version._

## Reference

- [Hooks Documentation](https://reactjs.org/docs/hooks-overview.html)
- [Hooks Introduction](https://academind.com/learn/react/react-hooks-introduction/)
- [Hooks Reference](https://reactjs.org/docs/hooks-reference.html)
- [Custom Hooks Documentation](https://reactjs.org/docs/hooks-custom.html)
- [Custom Hook Examples/Recipes](https://usehooks.com/)
