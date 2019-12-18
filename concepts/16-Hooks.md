# Chapter 16: Hooks

- [Chapter 16: Hooks](#chapter-16-hooks)
  - [Defined](#defined)
  - [Why Hooks?](#why-hooks)
  - [No Breaking Changes](#no-breaking-changes)
  - [Hooks API](#hooks-api)
  - [useState](#usestate)
    - [Simple Class Component](#simple-class-component)
    - [Simple Function Component](#simple-function-component)
        - [Array destructuring](#array-destructuring)
  - [useEffect](#useeffect)
    - [useEffect Simple Demo](#useeffect-simple-demo)
    - [Items App](#items-app)
      - [Items App Modifying Container to useState](#items-app-modifying-container-to-usestate)
        - [Steps](#steps)
      - [Items App using Hooks](#items-app-using-hooks)
    - [Items App with Hooks and HTTP](#items-app-with-hooks-and-http)
  - [Custom Hooks](#custom-hooks)
  - [Rules of Hooks](#rules-of-hooks)
  - [Reference](#reference)


## Defined

> Hooks are a new addition in React 16.8. They let you use state and other React features (Lifecycle Methods) without writing a class.

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

To understand the useState hook let's start at a class component that renders a counter.

### Simple Class Component

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
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

##### Array destructuring

The syntax for useEffect is confusing at first because it uses Array destructuring to return a pair.

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

This Hook should be used for any side-effects you’re executing in your render cycle.

`useEffect()` *takes* a `function` as an input and *returns* `nothing`. 

The function it takes will be executed for you:
  - after the render cycle
  - after *every* render cycle




| Lifecycle Methods     	| Hook                                                                   	| Renders                       |
|-----------------------	|------------------------------------------------------------------------	|-------------------------------|
| componentDidMount     	| `useEffect(()=>{ ... }`, [ ])                                              | after first render only
| componentDidUpdate    	| `useEffect(()=>{... }, [dependency1, dependency2])`                       | after first render AND subsequent renders caused by a change in a dependency 	|
| componentWillUnmount  	| `useEffect(() => { ...  return ()=> {...cleanup}})`                      | 
| shouldComponentUpdate 	| no comparable hook, instead, wrap function component in `React.memo(List)`  | renders only if a prop changes	|
| componentWillMount    	| deprecated so no comparable hook                                       	|
| componentWillUpdate   	| deprecated so no comparable hook                                       	|


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
### Items App

#### Items App Modifying Container to `useState` 

We will start with the component architecture demo from earlier in the course and refactor the `Container` component to use `hooks`.

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
  const [items, setItems] = React.useState(initialItems);

  //   componentDidMount() {
  //     this.setState({ items: initialItems });
  //   }

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


```

#### Items App using Hooks

```js
function ID() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
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
  new Item(ID(), 'Third Item')
];

function List({ items, onRemove, onUpdate }) {
  const [editingItem, setEditingItem] = React.useState(null);

  const handleEditClick = item => {
    setEditingItem(item);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item === editingItem ? (
            <Form item={item} onSubmit={onUpdate} onCancel={handleCancel} />
          ) : (
            <p>
              <span>{item.name}</span>
              <button onClick={() => handleEditClick(item)}>Edit</button>
              <button onClick={() => onRemove(item)}>Remove</button>
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

function Form({ item, onSubmit, onCancel, buttonValue }) {
  const [inputValue, setInputValue] = React.useState(item.name || '');

  const handleChange = event => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const submittedItem = {
      id: item ? item.id : ID(),
      name: inputValue
    };

    onSubmit(submittedItem);
    setInputValue('');
  };

  const handleCancel = event => {
    event.preventDefault();
    onCancel();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input value={inputValue} onChange={handleChange} />
      <button>{buttonValue || 'Save'}</button>
      {onCancel && (
        <a href="#" onClick={handleCancel}>
          cancel
        </a>
      )}
    </form>
  );
}

function Container() {
  const [items, setItems] = React.useState(initialItems);

  const addItem = item => {
    setItems([...items, item]);
  };

  const updateItem = updatedItem => {
    let updatedItems = items.map(item => {
      return item.id === updatedItem.id
        ? Object.assign({}, item, updatedItem)
        : item;
    });
    return setItems(updatedItems);
  };

  const removeItem = removeThisItem => {
    const filteredItems = items.filter(item => item.id != removeThisItem.id);
    setItems(filteredItems);
  };

  return (
    <React.Fragment>
      <Form item="" onSubmit={addItem} buttonValue="Add" />
      <List items={items} onRemove={removeItem} onUpdate={updateItem} />
    </React.Fragment>
  );
}

function App() {
  return (
    <div>
      <Container />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

```




### Items App with Hooks and HTTP

```js
function ID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

function translateStatusToErrorMessage(status) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the items.';
    default:
      return 'There was an error retrieving the items. Please try again.';
  }
}

//pass translate in to make this more flexible
function checkStatus(response) {
  if (response.ok) {
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

    let errorMessage = ItemAPI.translateStatusToErrorMessage(
      httpErrorInfo.status
    );
    throw new Error(errorMessage);
  }
}

function parseJSON(response) {
  return response.json();
}

class Item {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/items`;

// API ----------
const itemAPI = {
  getAll(page = 1, limit = 100) {
    return fetch(`${url}?_page=${page}&_limit=${limit}`)
      .then(checkStatus)
      .then(parseJSON);
  },

  add(item) {
    return fetch(`${url}`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(parseJSON);
  },

  update(item) {
    return fetch(`${url}/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(parseJSON);
  },

  delete(id) {
    return fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(parseJSON);
  }
};

function List(props) {
  const { items, onRemove, onUpdate, loading, error } = props;
  const [editingItem, setEditingItem] = React.useState(null);

  const handleEditClick = item => {
    setEditingItem(item);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item === editingItem ? (
              <Form item={item} onSubmit={onUpdate} onCancel={handleCancel} />
            ) : (
              <p>
                <span>{item.name}</span>
                <button onClick={() => handleEditClick(item)}>Edit</button>
                <button onClick={() => onRemove(item)}>Remove</button>
              </p>
            )}
          </li>
        ))}
      </ul>
    );
  }
}

function Form({ item, onSubmit, onCancel, buttonValue }) {
  const [inputValue, setInputValue] = React.useState(item.name || '');

  const handleChange = event => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const submittedItem = {
      id: item ? item.id : ID(),
      name: inputValue
    };

    onSubmit(submittedItem);
    setInputValue('');
  };

  const handleCancel = event => {
    event.preventDefault();
    onCancel();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input value={inputValue} onChange={handleChange} />
      <button>{buttonValue || 'Save'}</button>
      {onCancel && (
        <a href="#" onClick={handleCancel}>
          cancel
        </a>
      )}
    </form>
  );
}

function Container() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(undefined);

  React.useEffect(() => {
    setLoading(true);
    itemAPI
      .getAll(1)
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const addItem = item => {
    itemAPI
      .add(item)
      .then(newItem => {
        setItems([...items, newItem]);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const updateItem = updatedItem => {
    itemAPI
      .update(updatedItem)
      .then(data => {
        let updatedItems = items.map(item => {
          return item.id === updatedItem.id
            ? Object.assign({}, item, data)
            : item;
        });
        setItems(updatedItems);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const removeItem = removeThisItem => {
    itemAPI
      .delete(removeThisItem.id)
      .then(() => {
        const filteredItems = items.filter(
          item => item.id != removeThisItem.id
        );
        setItems(filteredItems);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <div>
      <Form item="" onSubmit={addItem} buttonValue="Add" />
      <List
        loading={loading}
        error={error}
        items={items}
        onRemove={removeItem}
        onUpdate={updateItem}
      />
    </div>
  );
}

function App() {
  return (
    <div>
      <Container />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));

```




## Custom Hooks

Building your own Hooks lets you extract component logic into reusable functions.

| In Classes                            | With Hooks   |
| ------------------------------------- | ------------ |
| Higher-Order Components, Render Props | Custom Hooks |

Traditionally in React, we’ve had two popular ways to share stateful logic between components: render props and higher-order components.  Hooks solve many of the same problems without forcing you to add more components to the tree.

<!-- https://usehooks.com/useTheme/ -->

## Rules of Hooks

- Only call hooks at the top level (of your function component)
  - don't call them inside loops (for), conditions (if), or nested functions (only inside your main function component body)
- Only call hooks from React Functions
  - call hooks from React function components
  - call hooks from other custom hooks

## Reference

- [Hooks Documentation](https://reactjs.org/docs/hooks-overview.html)
- [Hooks Introduction](https://academind.com/learn/react/react-hooks-introduction/)
- [Hooks Reference](https://reactjs.org/docs/hooks-reference.html)
- [Custom Hooks Documentation](https://reactjs.org/docs/hooks-custom.html)
- [Custom Hook Examples/Recipes](https://usehooks.com/)
