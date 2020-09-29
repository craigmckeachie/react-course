# Chapter 12: Component Architecture

- [Chapter 12: Component Architecture](#chapter-12-component-architecture)
  - [Reuse](#reuse)
  - [Component Communication](#component-communication)
      - [Common Communication Patterns](#common-communication-patterns)
      - [Additional Communication Patterns](#additional-communication-patterns)
- [Design Patterns](#design-patterns)
  - [Lifting State Up](#lifting-state-up)
    - [Function Compnoent Example](#function-compnoent-example)
    - [Class Component Example](#class-component-example)
  - [Container and Presentation Components](#container-and-presentation-components)
    - [Container (Smart) Components](#container-smart-components)
    - [Presentation Components](#presentation-components)
    - [Reference](#reference)
  - [Composition vs Inheritance](#composition-vs-inheritance)
  - [Thinking in React](#thinking-in-react)
  - [Items (CRUD) Demo](#items-crud-demo)
      - [styles.css](#stylescss)
      - [index.html](#indexhtml)
      - [main.jsx](#mainjsx)
    - [Requirements](#requirements)
  - [Reference](#reference-1)

## Reuse

You can split a component into multiple smaller components to have a more readable and maintanable design and/or to achieve reuse.

But how do you know what should be its own component?

Here are some questions to ask yourself when determining when to create another component:

**Is it possible for your code chunk to be reused?**

- If yes, construction of a new component seems like a great idea.
- Even if the reuse is within a single component.

**Is your code quite complex?**

- If yes maybe its good idea to split in separate components in order to make your code more readable and maintainable.

**Software Design**

- In general, just use the same techniques for deciding if you should create a new function or object.
- One such technique is the single responsibility principle, that is, a component should ideally only do one thing. If it ends up growing, it should be decomposed into smaller subcomponents.

**After you create more components, more questions arise such as:**

- How should components interact? (Component Communication)
- Are there any design patterns I should follow when creating components? (Lifting State Up, Composition vs Inheritance)
- What types of components are there? (Container vs. Presentation)
- How do I make my components reusable?

This section explores each of those questions.

## Component Communication

How should components interact?

#### Common Communication Patterns

Components commonly communicate in these ways:

- Parent to Child
- Child to Parent

**Parent to Child** communication is passing a data property into a component. More specifically, passing some data (could be a string (primitive), object, array) into a child component.

```js
function App() {
  return <Parent />;
}

class Parent extends React.Component {
  state = {
    words: '',
  };

  handleClick = () => {
    this.setState({ words: 'Did you do your homework?' });
  };

  render() {
    return (
      <div>
        <h1>Parent</h1>
        <button onClick={this.handleClick}>Ask</button>
        <Child hears={this.state.words} />
      </div>
    );
  }
}

function Child(props) {
  return (
    <div>
      <h2>Child</h2>
      <p>{props.hears}</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

**Child to Parent** communication is passing a function as a property into a component. The function is later invoked in the child but executed in the context of the parent.

```js
function App() {
  return <Parent />;
}

function Parent() {
  const handleRequest = (request) => {
    if (request.includes('car')) {
      alert('No');
    }
  };

  return (
    <div>
      <h1>Parent</h1>
      <Child onRequest={handleRequest} />
    </div>
  );
}
function Child(props) {
  const handleClick = () => {
    props.onRequest('Can I have the car?');
  };

  return (
    <div>
      <h2>Child</h2>
      <button onClick={handleClick}>Ask for the car</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

#### Additional Communication Patterns

Now that you understand how this communication works in practice then we can explore these additional communication patterns which are essentially variations on "Parent to Child" and "Child to Parent"

- Child to Child (siblings)
- Parent to Grandchild
- Grandchild to Parent

Essentially, **communication doesn't skip generations** so if it is going to happen you need to manually communicate up or down between each generation.

> Component communication does not work like JavaScript events...there is no event bubbling.

# Design Patterns

## Lifting State Up

Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor.

Here is an example.

### Function Compnoent Example

```js
function Button({ onClickFunction }) {
  return <button onClick={onClickFunction}>+1</button>;
}

const Result = ({ value }) => {
  return <div>Result: {value}</div>;
};

function App() {
  const [counter, setCounter] = React.useState(0);

  const incrementCounter = () => {
    setCounter((previousCounter) => previousCounter + 1);
  };

  return (
    <div>
      <Button onClickFunction={incrementCounter} />
      <Result value={counter} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### Class Component Example

```js
class Button extends React.Component {
  render() {
    return <button onClick={this.props.onClickFunction}>+1</button>;
  }
}

const Result = (props) => {
  return <div>Result: {props.value}</div>;
};

class App extends React.Component {
  state = {
    counter: 0,
  };

  incrementCounter = () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
    }));
  };

  render() {
    return (
      <div>
        <Button onClickFunction={this.incrementCounter} />
        <Result value={this.state.counter} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

The React documentation summarizes it best:

> There should be a single “source of truth” for any data that changes in a React application. Usually, the state is first added to the component that needs it for rendering. Then, if other components also need it, you can lift it up to their closest common ancestor. Instead of trying to sync the state between different components, you should rely on the top-down data flow.

> Lifting state involves writing more “boilerplate” code than two-way binding approaches, but as a benefit, it takes less work to find and isolate bugs. Since any state “lives” in some component and that component alone can change it, the surface area for bugs is greatly reduced. Additionally, you can implement any custom logic to reject or transform user input.

> If something can be derived from either props or state, it probably shouldn’t be in the state.

## Container and Presentation Components

### Container (Smart) Components

- Are concerned with how things work
- Sets data into child component input properties
- Receives events by subscribing to children
- Loads and modifies data via calls to an API
- Also know as container components or controller components

### Presentation Components

- Are concerned with how things look
- Receive data via input properties from parent
- Send events with information to their parent
- Don’t specify how the data is loaded or changed
- Also know as pure components or dumb components

### Reference

- [Presentational and Container Components by Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

- [Not a Rule but Something to Notice](https://twitter.com/dan_abramov/status/802569801906475008)

Until Recently when React introduced `Hooks` seems like almost every component eventually needed state so people tended to just create class components by default. In reality, it's not one or the other...often components are a blend of both. Just be aware the more stateful they become the harder they are to test and reuse but reuse often comes at a cost of complexity.

Often my presentation components aren't pure presentation components, they have some state particularly local form state.

## Composition vs Inheritance

React recommends using composition instead of inheritance to reuse code between components.

In general, components can be nested inside other components or live next to other components just like in HTML where a `<div>` can have a `<p>` inside of it and the `<p>` can have an `<a>` and an `<img>`. HTML works on composition so React components work on composition as they are essentially HTML tags you invented.

See the section [Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html) in the React documentation for more information.

> We use React in thousands of components, and we haven’t found any use cases where we would recommend creating component inheritance hierarchies. - Facebook

## Thinking in React

Here are some steps you might find useful as you learn to **Think in React**

1. Break the UI Into a Component Hierarchy
2. Build a Static Version in React
   - No State or Props
3. Identify The Minimal (but complete) Representation Of UI State
4. Identify Where Your State Should Live

   - For each piece of state in your application:

     - Identify every component that renders something based on that state.
     - Find a common owner component (a single component above all the components that need the state in the hierarchy).
     - Either the common owner or another component higher up in the hierarchy should own the state.
     - If you can’t find a component where it makes sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component.

5. Add Inverse Data Flow
   - Rendering the screen initially involves props and state flowing down the hierarchy
   - Inverse data flow refers to components deep in the hierarchy responding to user actions (clicking a button, hovering, typing) and then updating the state in the higher container component(s)

See the section [Thinking in React](https://reactjs.org/docs/thinking-in-react.htm) in the documentation for more information.

## Items (CRUD) Demo

Below is an example of a simple application that lists and deletes (CRUD) items.

It puts into practice all the ideas we discussed in this Component Architecture section.

```
- App
  - Container
    - List
      - ListItem
```

#### styles.css

```css
body,
button,
input,
textarea,
li {
  font-family: 'Open Sans', sans-serif;
  font-size: 1em;
}

li {
  list-style: none;
  border-bottom: 1px solid #ddd;
}

span {
  margin: 15px;
}

button {
  margin: 10px;
  padding: 5px 15px 5px 15px;
  background: transparent;
}

form {
  margin: 15px;
}
```

#### index.html

```diff
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Demos</title>
+    <link rel="stylesheet" href="styles.css" />
  </head>
...
```

Start with the following static mockup of a component hierarchy and then implement the requirements listed in the next section.

#### main.jsx

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

class ListItem extends React.Component {
  render() {
    return (
      <p>
        <span>Item Name</span>
        <button>Remove</button>
      </p>
    );
  }
}
class List extends React.Component {
  render() {
    return (
      <ul>
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </ul>
    );
  }
}

class Container extends React.Component {
  render() {
    return (
      <React.Fragment>
        <List />
      </React.Fragment>
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

The requirements are as follows:

### Requirements

1. In the container component
   1. The `Container` should hold the items in it's local component state
   1. Set the `initialItems` into state in `componentDidMount`
   1. Display the items in JSX using `{JSON.stringify(this.state.items)}`
   1. Before continuing to the next step, remove the JSX from the last step to display the items in the `Container`
1. Display a list of items
   1. Pass the items from the Container's state into the list component as an `items` prop
   1. Render a `ListItem` component for each item in the items prop
1. Display the `item` in the `ListItem` component
   1. Pass the item as a prop to `ListItem`
   1. Render the `item.name`
1. Implement the feature to remove an item from the list
   1. Add a remove button next to each item on the list
   1. Handle the remove button click by calling a function on the container to remove the item from state

See the finished solution code below up to these requirements.

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

class ListItem extends React.Component {
  render() {
    const { item, onRemove } = this.props;
    return (
      <p>
        <span>{item.name}</span>
        <button onClick={() => onRemove(item)}>Remove</button>
      </p>
    );
  }
}
class List extends React.Component {
  state = {
    editingItem: null,
  };

  render() {
    const { items, onRemove } = this.props;
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <ListItem
              item={item}
              onEdit={this.handleEditClick}
              onRemove={onRemove}
            />
          </li>
        ))}
      </ul>
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

  removeItem = (removeThisItem) => {
    this.setState((state) => {
      const items = state.items.filter((item) => item.id != removeThisItem.id);
      return { items };
    });
  };

  render() {
    return (
      <React.Fragment>
        <List items={this.state.items} onRemove={this.removeItem} />
      </React.Fragment>
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

We will continue to enhance this demo in the remaining chapters.

<!--
## Demo 2: GitHub API Example

### Card Component

Static Component

```js
const Card = props => {
  return (
    <div>
      <img src="http://placehold.it/75" alt="" />
      <div>
        <div>Name here...</div>
        <div>Company name here...</div>
      </div>
    </div>
  );
};

ReactDOM.render(<Card />, mountNode);
```

## Card List

```diff
const Card = (props) => {
	return (
  	<div>
  	  <img src="http://placehold.it/75" alt=""/>
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
          Name here...
        </div>
        <div>Company name here...</div>
      </div>
  	</div>
  )
}

+ const CardList = (props) => {
+	return (
+  	<div>
+  	  <Card />
+  	</div>
+  )
+}

+ ReactDOM.render(<CardList />, mountNode);
```

[Github API](https://api.github.com/)
[Github API for a User](https://api.github.com/users/craigmckeachie)

Copy Avatar URL, Name, and Company into the card

```js
const Card = props => {
  return (
    <div>
      <img
        width="75"
        src="https://avatars0.githubusercontent.com/u/1474579?v=4"
        alt=""
      />
      <div style={{ display: 'inline-block', marginLeft: 10 }}>
        <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>
          Craig McKeachie
        </div>
        <div>Funny Ant LLC</div>
      </div>
    </div>
  );
};

const CardList = props => {
  return (
    <div>
      <Card />
    </div>
  );
};

ReactDOM.render(<CardList />, mountNode);
```

Using Properties

Be sure to use props.name not this.props.name.

```js
const Card = props => {
  return (
    <div>
      <img width="75" src={props.avatar_url} alt="" />
      <div style={{ display: 'inline-block', marginLeft: 10 }}>
        <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>
          {props.name}
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

const CardList = props => {
  return (
    <div>
      <Card
        name="Craig McKeachie"
        avatar_url="https://avatars0.githubusercontent.com/u/1474579?v=4"
        company="Funny Ant LLC"
      />
    </div>
  );
};

ReactDOM.render(<CardList />, mountNode);
```

Mapping over an array of data

```js
const Card = props => {
  return (
    <div>
      <img width="75" src={props.avatar_url} alt="" />
      <div style={{ display: 'inline-block', marginLeft: 10 }}>
        <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>
          {props.name}
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

let data = [
  {
    name: 'Paul O’Shannessy',
    avatar_url: 'https://avatars.githubusercontent.com/u/8445?v=3',
    company: 'Facebook'
  },
  {
    name: 'Ben Alpert',
    avatar_url: 'https://avatars.githubusercontent.com/u/6820?v=3',
    company: 'Facebook'
  }
];

const CardList = props => {
  return (
    <div>
      {props.cards.map(card => (
        <Card {...card} />
      ))}
    </div>
  );
};

ReactDOM.render(<CardList cards={data} />, mountNode);
```

## Add Form and App components

Move data to App component

```js
const Card = props => {
  return (
    <div>
      <img width="75" src={props.avatar_url} alt="" />
      <div style={{ display: 'inline-block', marginLeft: 10 }}>
        <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>
          {props.name}
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

const CardList = props => {
  return (
    <div>
      {props.cards.map(card => (
        <Card {...card} />
      ))}
    </div>
  );
};

class Form extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Github username" />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    cards: [
      {
        name: 'Paul O’Shannessy',
        avatar_url: 'https://avatars.githubusercontent.com/u/8445?v=3',
        company: 'Facebook'
      },
      {
        name: 'Ben Alpert',
        avatar_url: 'https://avatars.githubusercontent.com/u/6820?v=3',
        company: 'Facebook'
      }
    ]
  };

  render() {
    return (
      <div>
        <Form />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

### Form Submission

```js
class Form extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    display.log('Form submitted.');
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Github username" />
        <button type="submit">Add card</button>
      </form>
    );
  }
}
```

### Form values using Ref

```js
class Form extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    display.log('Form submitted.', this.userNameInput.value);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          ref={input => {
            this.userNameInput = input;
          }}
          type="text"
          placeholder="Github username"
        />
        <button type="submit">Add card</button>
      </form>
    );
  }
}
```

### Form values using Controlled Components

Use React DevTools to inspect the Form component under the App component. See `state.userName` changing as you type in the input.

```js
class Form extends React.Component {
  state = {
    userName: ''
  };

  handleSubmit = event => {
    event.preventDefault();
    display.log('Form submitted.', this.state.userName);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="Github username"
        />
        <button type="submit">Add card</button>
      </form>
    );
  }
}
```

### AJAX

```js
class Form extends React.Component{
 state = {
 	userName: ''
 }

  handleSubmit = (event) => {
  	event.preventDefault();
    display.log('Form submitted.', this.state.userName);
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    .then(response => {
    		display.log(response);
    })
  }
  ...
}
```

### Using the AJAX Data

1. Send `onSubmit` function handler from `App`: `this.addNewCard`
2. concat onto state
3. Add key to card.
4. Clear hard-coded data and logs

```js
const Card = props => {
  return (
    <div>
      <img width="75" src={props.avatar_url} alt="" />
      <div style={{ display: 'inline-block', marginLeft: 10 }}>
        <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>
          {props.name}
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

const CardList = props => {
  return (
    <div>
      {props.cards.map(card => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

class Form extends React.Component {
  state = {
    userName: ''
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.userName}`)
      .then(response => {
        this.props.onSubmit(response.data);
        this.setState({ userName: '' });
      });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="Github username"
        />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    cards: []
  };

  addNewCard = cardInfo => {
    this.setState(prevState => ({ cards: prevState.cards.concat(cardInfo) }));
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
``` -->

## Reference

- [Unique ID](https://gist.github.com/gordonbrander/2230317)

- [To Do List Example](https://reactjsexample.com/a-to-do-list-app-built-using-react-js/)
