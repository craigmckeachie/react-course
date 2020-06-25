# Appendix 23: Performance

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
// PureComponent: comment out shouldComponentUpdate and extends PureComponent. Change value prop in Parent and child will re-render first time (when value changes) but not subsequent times because value prop remains the same (true).
```

## Resources

- [Performance Tools](https://reactjs.org/docs/perf.html)
- [Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html)
- [Profiling Components with Chrome](https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab)
- [React.PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent)
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
