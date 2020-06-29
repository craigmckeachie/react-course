# Appendix 23: Performance

- [Appendix 23: Performance](#appendix-23-performance)
  - [Premature Optimization](#premature-optimization)
  - [What causes a component to `render` in React?](#what-causes-a-component-to-render-in-react)
    - [Component Render Demo (optional)](#component-render-demo-optional)
      - [styles.css](#stylescss)
      - [main.jsx](#mainjsx)
  - [Wasted Renders](#wasted-renders)
    - [`React.PureComponent`](#reactpurecomponent)
    - [`React.memo`](#reactmemo)
  - [`React.memo` Demo](#reactmemo-demo)
      - [styles.css](#stylescss-1)
  - [`React.PureComponent` Demo](#reactpurecomponent-demo)
    - [FAQs](#faqs)
      - [index.js](#indexjs)
  - [Resources](#resources)

## Premature Optimization

> Premature optimization is the root of all evil -- DonaldKnuth

Premature Optimization is optimizing before we know that we need to do it.

**Recommendation:** Get your application working and then near the end of a development cycle take the time to optimize for performance.

## What causes a component to `render` in React?

A re-render can only be triggered if a component’s state has changed. The state can change from a `props` change, or from a call to `setState` or a `useState` update state function. The component gets the updated state and React decides if it should re-render the component. Unfortunately, by default React is incredibly simplistic and basically re-renders everything all the time.

Component changed? Re-render. Parent changed? Re-render. Section of props that doesn't actually impact the view changed? Re-render.

### Component Render Demo (optional)

#### styles.css

```css
.box {
  border: 1px dashed;
  padding: 30px;
}
```

#### main.jsx

```js
const { Component, PureComponent } = React;

class LastRendered extends Component {
  render() {
    return <p>Last Rendered: {new Date().toLocaleTimeString()}</p>;
  }
}

class GrandchildA extends Component {
  state = { value: false };
  handleClick = () => {
    this.setState({ value: true });
  };
  render() {
    return (
      <div className="box">
        <h3>Grandchild A</h3>
        <LastRendered />
        <button onClick={this.handleClick}>Change State</button>
      </div>
    );
  }
}

class ChildA extends PureComponent {
  state = { value: false };
  handleClick = () => {
    this.setState({ value: false });
  };
  // shouldComponentUpdate(nextProps) {
  //   // return true;
  //   const hasChanged = this.props.value !== nextProps.value;
  //   return hasChanged;
  // }
  render() {
    return (
      <div className="box">
        <h2>Child A</h2>
        <LastRendered />
        <button onClick={this.handleClick}>Change State</button>
        <GrandchildA></GrandchildA>
      </div>
    );
  }
}
class ChildB extends Component {
  state = { value: false };
  handleClick = () => {
    this.setState({ value: true });
  };
  render() {
    return (
      <div className="box">
        <h2>Child B</h2>
        <LastRendered />
        <button onClick={this.handleClick}>Change State</button>
      </div>
    );
  }
}

class Parent extends Component {
  state = { value: false };
  handleStateClick = () => {
    this.setState({ value: true });
  };
  render() {
    return (
      <div className="box">
        <h1>Parent</h1>
        <LastRendered />
        <button onClick={this.handleStateClick}>Change State</button>
        <ChildA value={this.state.value} />
        <br />
        <ChildB />
      </div>
    );
  }
}

class App extends Component {
  state = {};
  render() {
    return (
      <div className="box">
        <h1>App</h1>
        <LastRendered />
        <Parent />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// Default Behavior: Changing state results in that component and all descendants being re-rendered.
// Default Behavior: Changing state that updates a prop in a child results in that component and all descendants being re-rendered.
// Override shouldComponentUpdate: return true results in that component and all descendants being re-rendered.
// Override shouldComponentUpdate: return false results in no re-renders (current component and all descendants).
// Override shouldComponentUpdate: see if props changed and only then return true. Change value prop in Parent and child will re-render first time (when value changes) but not subsequent times because value prop remains the same (true).
// PureComponent: comment out shouldComponentUpdate and make ChildA a PureComponent. Change value prop in Parent and child will re-render first time (when value changes) but not subsequent times because value prop remains the same (true).
```

## Wasted Renders

React has two phrases that run sequentially to update the UI.

1. **Render Phase**

   The "render phase" is where React compares a previous version of a Virtual DOM representing the UI with an updated version to figure out what if any changes need to be made.

1. **Commit Phase**

   The "commit phase" is where React actually changes the real DOM.

As demonstrated in the Virtual DOM chapter React is very efficient about figuring out the minimal DOM operations to make in the "render phase" and batches them to make rendering the UI extremely performant.

However, the "render phase" does take work and consumes resources and should not take place if it isn't needed. If all the components on the screen are constantly rendering when the don't need to this is a common source of eventual performance problems. We call this problem: "wasted renders".

Wasted Renders can be fixed using:

- `React.PureComponent` when using class components.
- `React.Memo` when using function components.

### `React.PureComponent`

`React.PureComponent` is similar to [`React.Component`](#reactcomponent). The difference between them is that [`React.Component`](#reactcomponent) doesn't implement [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate), but `React.PureComponent` implements it with a shallow prop and state comparison.

If your React component's `render()` function renders the same result given the same props and state, you can use `React.PureComponent` for a performance boost in some cases.

> Note
>
> `React.PureComponent`'s `shouldComponentUpdate()` only shallowly compares the objects. If these contain complex data structures, it may produce false-negatives for deeper differences. Only extend `PureComponent` when you expect to have simple props and state, or use [`forceUpdate()`](/docs/react-component.html#forceupdate) when you know deep data structures have changed. Or, consider using [immutable objects](https://facebook.github.io/immutable-js/) to facilitate fast comparisons of nested data.
>
> Furthermore, `React.PureComponent`'s `shouldComponentUpdate()` skips prop updates for the whole component subtree. Make sure all the children components are also "pure".

---

### `React.memo`

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```

`React.memo` is a [higher order component](/docs/higher-order-components.html). It's similar to [`React.PureComponent`](#reactpurecomponent) but for function components instead of classes.

If your function component renders the same result given the same props, you can wrap it in a call to `React.memo` for a performance boost in some cases by memoizing the result. This means that React will skip rendering the component, and reuse the last rendered result.

`React.memo` only checks for prop changes. If your function component wrapped in `React.memo` has a [`useState`](/docs/hooks-state.html) or [`useContext`](/docs/hooks-reference.html#usecontext) Hook in its implementation, it will still rerender when state or context change.

By default it will only shallowly compare complex objects in the props object. If you want control over the comparison, you can also provide a custom comparison function as the second argument.

```javascript
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);
```

This method only exists as a **[performance optimization](/docs/optimizing-performance.html).** Do not rely on it to "prevent" a render, as this can lead to bugs.

> Note
>
> Unlike the [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) method on class components, the `areEqual` function returns `true` if the props are equal and `false` if the props are not equal. This is the inverse from `shouldComponentUpdate`.

---

## `React.memo` Demo

Run the demo below and open the console to observe some wasted renders.

Steps:

1. Before beginning the demos in this chapter add the following css class if it doesn't already exist.

   #### styles.css

   ```css
   .box {
     border: 1px dashed;
     padding: 30px;
   }
   ```

1. **Paste** the **code** below into `main.jsx`
1. **Open** the application in a **browser**.
1. **Open** Chrome DevTools and switch to the `console`.
1. Type in the add textbox to add an item and then click the add button.
1. Notice that every item in the list re-renders even though you only added one item.
1. Commment out the `ListItem` component.
1. Uncomment the `ListItem` component below the original wrapped in a `React.memo` function.
1. Refresh your browser.
1. Once again type in the add textbox to add an item and then click the add button.
1. Notice that only one item in the list re-renders since the other `ListItem`'s are the same. You have successfully eliminated a wasted render.

   > The same issue of every item re-rendering actually existing when editing or removing an item. We have now fixed all of these wasted renders. If time permits feel free to change back to the non memoized implemention of `ListItem` to see the wasted renders.

```js
function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

class Item {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

const initialItems = [
  new Item(ID(), 'First Item'),
  new Item(ID(), 'Second Item'),
  new Item(ID(), 'Third Item'),
];

class LastRendered extends React.Component {
  render() {
    return <p>Last Rendered: {new Date().toLocaleTimeString()}</p>;
  }
}

function ListItem({ item, onEdit, onRemove }) {
  return (
    <div className="box">
      <LastRendered />
      <p>
        <span>{item.name}</span>
        <button onClick={() => onEdit(item)}>Edit</button>
        <button onClick={() => onRemove(item)}>Remove</button>
      </p>
    </div>
  );
}

// const ListItem = React.memo(
//   function ListItem({ item, onEdit, onRemove }) {
//     return (
//       <div className="box">
//         <LastRendered />
//         <p>
//           <span>{item.name}</span>
//           <button onClick={() => onEdit(item)}>Edit</button>
//           <button onClick={() => onRemove(item)}>Remove</button>
//         </p>
//       </div>
//     );
//   },
//   (previous, next) => previous.item === next.item
// );

function List({ items, onRemove, onUpdate }) {
  const [editingItem, setEditingItem] = React.useState(null);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <div className="box">
      <LastRendered />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item === editingItem ? (
              <Form item={item} onSubmit={onUpdate} onCancel={handleCancel} />
            ) : (
              <ListItem item={item} onEdit={handleEdit} onRemove={onRemove} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Form({ item, onSubmit, onCancel, buttonValue }) {
  const [inputValue, setInputValue] = React.useState(item.name || '');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const submittedItem = {
      id: item ? item.id : ID(),
      name: inputValue,
    };

    onSubmit(submittedItem);
    setInputValue('');
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <div className="box">
      <LastRendered />
      <form onSubmit={handleFormSubmit}>
        <input value={inputValue} onChange={handleChange} />
        <button>{buttonValue || 'Save'}</button>
        {onCancel && (
          <a href="#" onClick={handleCancel}>
            cancel
          </a>
        )}
      </form>
    </div>
  );
}

function Container() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => setItems(initialItems), []);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const updateItem = (updatedItem) => {
    let updatedItems = items.map((item) => {
      return item.id === updatedItem.id
        ? Object.assign({}, item, updatedItem)
        : item;
    });
    return setItems(updatedItems);
  };

  const removeItem = (removeThisItem) => {
    const filteredItems = items.filter((item) => item.id != removeThisItem.id);
    setItems(filteredItems);
  };

  console.log('Container');
  return (
    <div className="box">
      <LastRendered />
      <Form item="" onSubmit={addItem} buttonValue="Add" />
      <List items={items} onRemove={removeItem} onUpdate={updateItem} />
    </div>
  );
}

function App() {
  console.log('App');
  return (
    <div>
      <Container />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## `React.PureComponent` Demo

Run the demo below and open the console to observe some wasted renders.

Steps:

1. **Paste** the **code** below into `main.jsx`
1. **Open** the application in a **browser**.
1. **Open** Chrome DevTools and switch to the `console`.
1. Type in the add textbox to add an item and then click the add button.
1. Notice that every item in the list re-renders even though you only added one item.
1. Commment out the `ListItem` component (version labeled a).
1. Uncomment the `ListItem` component below the which extends `React.PureComponent` function (version b).
1. Notice that the anonymous callback functions in the `onClick` event handlers where changed to use `bind` so that the same version of the function would be passed as a prop every time instead of a new instance.
   ```diff
   -  <button onClick={() => onEdit(item)}>Edit</button>
   -  <button onClick={() => onRemove(item)}>Remove</button>
   +  <button onClick={onEdit.bind(this, item)}>Edit</button>
   +  <button onClick={onRemove.bind(this, item)}>Remove</button>
   ```
1. Refresh your browser.
1. Once again type in the add textbox to add an item and then click the add button.
1. Notice that only one item in the list re-renders since the other `ListItem`'s are the same. You have successfully eliminated a wasted render.
1. Try version c) of the component which uses the `shouldComponentUpdate` lifecyle method to control whether the component updates and only focuses on the `item` prop and ignores the `onEdit` and `onRemove` callbacks.

> The same issue of every item re-rendering actually existing when editing or removing an item. We have now fixed all of these wasted renders. If time permits feel free to change back to the nonpure implemention of `ListItem` to see the wasted renders.

```js
function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

class Item {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

const initialItems = [
  new Item(ID(), 'First Item'),
  new Item(ID(), 'Second Item'),
  new Item(ID(), 'Third Item'),
];

class LastRendered extends React.Component {
  render() {
    return <p>Last Rendered: {new Date().toLocaleTimeString()}</p>;
  }
}

//a) wasted renders
class ListItem extends React.Component {
  render() {
    const { item, onEdit, onRemove } = this.props;
    return (
      <div className="box">
        <LastRendered />
        <p>
          <span>{item.name}</span>
          <button onClick={() => onEdit(item)}>Edit</button>
          <button onClick={() => onRemove(item)}>Remove</button>
        </p>
      </div>
    );
  }
}

//b) pure component
// class ListItem extends React.PureComponent {
//   render() {
//     const { item, onEdit, onRemove } = this.props;
//     return (
//       <div className="box">
//         <LastRendered />
//         <p>
//           <span>{item.name}</span>
//           <button onClick={onEdit.bind(this, item)}>Edit</button>
//           <button onClick={onRemove.bind(this, item)}>Remove</button>
//         </p>
//       </div>
//     );
//   }
// }

//c) shouldComponentUpdate
// class ListItem extends React.Component {
//   shouldComponentUpdate(previousProps) {
//     return previousProps.item !== this.props.item;
//   }

//   render() {
//     const { item, onEdit, onRemove } = this.props;
//     return (
//       <div className="box">
//         <LastRendered />
//         <p>
//           <span>{item.name}</span>
//           <button onClick={() => onEdit(item)}>Edit</button>
//           <button onClick={() => onRemove(item)}>Remove</button>
//         </p>
//       </div>
//     );
//   }
// }

class List extends React.Component {
  state = {
    editingItem: null,
  };

  handleEditClick = (item) => {
    this.setState({ editingItem: item });
  };

  handleCancel = (item) => {
    this.setState({ editingItem: null });
  };

  render() {
    const { items, onRemove, onUpdate } = this.props;
    return (
      <div className="box">
        <LastRendered />
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item === this.state.editingItem ? (
                <Form
                  item={item}
                  onSubmit={onUpdate}
                  onCancel={this.handleCancel}
                />
              ) : (
                <ListItem
                  item={item}
                  onEdit={this.handleEditClick}
                  onRemove={onRemove}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class Form extends React.Component {
  state = {
    inputValue: this.props.item.name || '',
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ inputValue: event.target.value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const item = {
      id: this.props.item ? this.props.item.id : ID(),
      name: this.state.inputValue,
    };

    this.props.onSubmit(item);
    this.setState({ inputValue: '' });
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.props.onCancel();
  };

  render() {
    return (
      <div className="box">
        <LastRendered />
        <form onSubmit={this.handleFormSubmit}>
          <input value={this.state.inputValue} onChange={this.handleChange} />
          <button>{this.props.buttonValue || 'Save'}</button>
          {this.props.onCancel && (
            <a href="#" onClick={this.handleCancel}>
              cancel
            </a>
          )}
        </form>
      </div>
    );
  }
}

class Container extends React.Component {
  state = {
    items: [],
  };

  componentDidMount() {
    this.setState({ items: initialItems });
  }

  addItem = (item) => {
    this.setState((state) => ({ items: [...state.items, item] }));
  };

  updateItem = (updatedItem) => {
    this.setState((state) => {
      let items = state.items.map((item) => {
        return item.id === updatedItem.id
          ? Object.assign({}, item, updatedItem)
          : item;
      });
      return { items };
    });
  };

  removeItem = (removeThisItem) => {
    this.setState((state) => {
      const items = state.items.filter((item) => item.id != removeThisItem.id);
      return { items };
    });
  };

  render() {
    return (
      <div className="box">
        <LastRendered />
        <Form item="" onSubmit={this.addItem} buttonValue="Add" />
        <List
          items={this.state.items}
          onRemove={this.removeItem}
          onUpdate={this.updateItem}
        />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Container />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### FAQs

**What is memoization?**

In computing, memoization or memoisation is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

**Why is my component rendering twice?**

Remove the `<React.StrictMode>` tag as shown below and this behavior will go away however you may not want to remove it as it doesn't happen in production. For more information, see the [Strict Mode Documentation](https://reactjs.org/docs/strict-mode.html) or this stackoverflow question: [Strict Mode Rendering Twice](https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode).

#### index.js

```diff
ReactDOM.render(
-  <React.StrictMode>
    {app}
-  </React.StrictMode>
,
  document.getElementById('root')
);
```

## Resources

- [React.PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent)
- [React.memo](https://reactjs.org/docs/react-api.html#reactmemo)
- [Performance Tools](https://reactjs.org/docs/perf.html)
- [Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html)
- [Profiling Components with Chrome](https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab)
- [Why is immutability so important (or needed) in JavaScript?](https://stackoverflow.com/questions/34385243/why-is-immutability-so-important-or-needed-in-javascript)
- [The DAO of Immutability](https://medium.com/javascript-scene/the-dao-of-immutability-9f91a70c88cd)
- [Why Did You Render](https://github.com/welldone-software/why-did-you-render)
- [Why Did You Render Blog Post](https://medium.com/welldone-software/why-did-you-render-mr-big-pure-react-component-2a36dd86996f)
- [React Component Renders Too Often](https://medium.com/@Osterberg/react-component-renders-too-often-2917daabcf5)
- [Flame Chart](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html#flame-chart)
- [React Rendering Misconception](https://thoughtbot.com/blog/react-rendering-misconception)
- [You Probably Don't Need Derived State](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)
- [When to Re-Render a Component](https://lucybain.com/blog/2017/react-js-when-to-rerender/)
- [How to Update a Component's Props in React](https://www.freecodecamp.org/news/how-to-update-a-components-prop-in-react-js-oh-yes-it-s-possible-f9d26f1c4c6d/)
- [How to force a React component to re-render](https://www.educative.io/edpresso/how-to-force-a-react-component-to-re-render)
- [Pluralsight: Optimize Performance for React (payment required)](https://www.pluralsight.com/courses/optimize-performance-react)
- [Strict Mode Documentation](https://reactjs.org/docs/strict-mode.html)
- [Strict Mode Rendering Twice](https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode)

<!-- ## Unused Examples

```js
// The list renders on every change to state.
// State changes on every call to handleChange which handles on changes to the input.
// So the List gets rendered every time you type in the input.
// To fix this make the list a React.PureComponent.

class List extends React.Component {
  render() {
    console.log('list render');
    const listItems = this.props.items.map((item) => (
      <li key={item}>{item}</li>
    ));
    return <ul>{listItems}</ul>;
  }
}

function App() {
  const [albums, setAlbums] = React.useState([
    'Illmatic',
    'AstroWorld',
    'Life of Pablo',
    'Paid in Full',
  ]);
  const [newAlbum, setNewAlbum] = React.useState('');
  const handleChange = (event) => {
    setNewAlbum(event.target.value);
  };
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      setAlbums([...albums, newAlbum]);
    }
  };
  const handleAddClick = () => setAlbums([...albums, newAlbum]);
  // const handleAddClick = () => {
  //   albums.push(newAlbum);
  //   setAlbums(albums);
  // };
  return (
    <>
      <input
        type="text"
        placeholder="Add Album"
        value={newAlbum}
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <button onClick={handleAddClick}>Add</button>
      <List items={albums}></List>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

```js
class Test extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [
        { title: 'excercise' },
        { title: 'cooking' },
        { title: 'Reacting' },
      ],
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState((oldState) => {
        return { taskList: [...oldState.taskList] };
      });
    }, 1000);
  }
  render() {
    console.log('taskList render called');
    return (
      <div>
        {this.state.taskList.map((task, i) => {
          return <Task key={i} title={task.title} />;
        })}
      </div>
    );
  }
}
class Task extends React.PureComponent {
  render() {
    console.log('task added');
    return <div>{this.props.title}</div>;
  }
}
ReactDOM.render(<Test />, document.getElementById('root'));
```
 -->
