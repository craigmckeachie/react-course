# Chapter 10: Conditional Rendering

- [Chapter 10: Conditional Rendering](#chapter-10-conditional-rendering)
  - [if](#if)
    - [Component](#component)
    - [Element](#element)
      - [Function Component Example (using hooks)](#function-component-example-using-hooks)
      - [Class Component Example](#class-component-example)
    - [Null](#null)
    - [Preventing Components from Rendering](#preventing-components-from-rendering)
    - [Summary (if)](#summary-if)
  - [Conditional Operator ? true : false](#conditional-operator--true--false)
    - [Simple](#simple)
    - [Complicated](#complicated)
  - [Logical && Operator](#logical--operator)
  - [Syntax Summary](#syntax-summary)
        - [if](#if-1)
        - [if else](#if-else)
      - [? (inline)](#-inline)
      - [&& (inline)](#-inline-1)
  - [Resources](#resources)

Just use the features in the JavaScript language.

- if statement
- conditional ? (ternary) operator
- logical && operator

## if

JavaScript has an `if` statement

### Component

Here is an example of how to add or remove an entire component.

```js
function CorrectAnswer(props) {
  return <div>&#10004; Correct</div>;
}

function IncorrectAnswer(props) {
  return <div>&#10006; Wrong</div>;
}

function Answer(props) {
  const isCorrect = props.isCorrect;
  if (isCorrect) {
    return <CorrectAnswer />;
  } else {
    return <IncorrectAnswer />;
  }
}

ReactDOM.render(
  // Try changing to isCorrect={false}
  <Answer isCorrect={true} />,
  document.getElementById('root')
);
```

> As shown above this is particularly helpful if you need to add or remove an entire component from the rendered output.

> More often however you need to hide or show a part of a component (an element) we'll explore how to do this in the next section

### Element

Here is an example of how to add or remove a part of a component (element) using an element variable.

You can't use an `if` in a `return` statement in JavaScript. **Element variables** allow you to capture and store an element(s) in a variable to later be rendered.

#### Function Component Example (using hooks)

```js
function DropdownMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  let menu;
  if (isOpen) {
    menu = (
      <ul>
        <li>Edit</li>
        <li>Remove</li>
        <li>Archive</li>
      </ul>
    );
  }
  return (
    <div>
      <button onClick={handleClick}>Actions</button>
      {menu}
    </div>
  );
}

ReactDOM.render(<DropdownMenu />, document.getElementById('root'));
```

#### Class Component Example

```js
class DropdownMenu extends React.Component {
  state = {
    isOpen: false,
  };

  handleClick = () => {
    this.setState((state) => {
      return { isOpen: !state.isOpen };
    });
  };

  render() {
    let menu;
    if (this.state.isOpen) {
      menu = (
        <ul>
          <li>Edit</li>
          <li>Remove</li>
          <li>Archive</li>
        </ul>
      );
    }
    return (
      <div>
        <button onClick={this.handleClick}>Actions</button>
        {menu}
      </div>
    );
  }
}

ReactDOM.render(<DropdownMenu />, document.getElementById('root'));
```

The above example renders nothing when `menu` is `null` or `undefined`. Understanding this is important to conditional rendering in React so we will explore it in more detail in the the next section.

### Null

An element that is null or undefined will render nothing.

```js
function Example(){
    const elementVariable;

    return (
        <h3>Nothing will be rendered below</h3>
        {elementVariable}
    )
}
```

A component that returns null or undefined will render nothing.

```js

function MyComponent{
    return null;
}

function Example(){

    return (
        <h3>Nothing will be rendered below</h3>
        <MyComponent/>
    )
}
```

Returning null can be used to prevent a component from rendering at all. We will explore how to do this in the next section.

### Preventing Components from Rendering

In rare cases you might want a component to hide itself even though it was rendered by another component. This can be achieved by returning `null` instead of its render output.

```js
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return <div className="warning">Warning!</div>;
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState((state) => ({
      showWarning: !state.showWarning,
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById('root'));
```

> It is preferred to handle the if logic in the parent component because lifecycle methods still run when you return null from a render function.

### Summary (if)

In summary, `if` statements

- can be used in the function body but not directly in a `return` statement
- are easy to read, particularly for beginners to React
- can be used when you have an if or an if else condition
- in rare cases, can be used to opt-out early from a render method and prevent a component from rendering at all

## Conditional Operator ? true : false

### Simple

In simpler cases where the amount of JSX is small the conditional operator can be easier to read.

Why?

- Only a few lines
- The logic is **inline** closer to the elements/components because conditional operators can be in the return statement
- `()` may not be needed

```js
function CorrectAnswer(props) {
  return <div>&#10004; Correct</div>;
}

function IncorrectAnswer(props) {
  return <div>&#10006; Wrong</div>;
}

function Answer(props) {
  const isCorrect = props.isCorrect;
  return isCorrect ? <CorrectAnswer /> : <IncorrectAnswer />;
}

ReactDOM.render(
  // Try changing to isCorrect={false}
  <Answer isCorrect={true} />,
  document.getElementById('root')
);
```

### Complicated

In more complicated cases where the amount of JSX grows the conditional operator can be more difficult to read.

Why?

- Spans multiple lines
- `()` are added
- Often an `else` condition exists

```js
class DropdownMenu extends React.Component {
  state = {
    isOpen: false,
  };

  handleClick = () => {
    this.setState((state) => {
      return { isOpen: !state.isOpen };
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Actions</button>
        {this.state.isOpen ? (
          <ul>
            <li>Edit</li>
            <li>Remove</li>
            <li>Archive</li>
          </ul>
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<DropdownMenu />, document.getElementById('root'));
```

When there isn't an `else` condition, the return of `null` becomes awkward and difficult to read. In the next section, we'll look at a solution to this the logical && operator.

## Logical && Operator

When there isn't an `else` condition, using a logical `&&` operator can make the conditional rendering logic more readable.

```js
class DropdownMenu extends React.Component {
  state = {
    isOpen: false,
  };

  handleClick = () => {
    this.setState((state) => {
      return { isOpen: !state.isOpen };
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Actions</button>
        {this.state.isOpen && (
          <ul>
            <li>Edit</li>
            <li>Remove</li>
            <li>Archive</li>
          </ul>
        )}
      </div>
    );
  }
}

ReactDOM.render(<DropdownMenu />, document.getElementById('root'));
```

It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false.

Therefore, if the condition is true, the element right after && will appear in the output. If it is false, React will ignore and skip it.

## Syntax Summary

##### if

```js
const condition = props.condition;
const elementVariable;
if(condition){
    elementVariable = <div>true</div>
}

return (
    <h3>Element Variables</h3>
    {elementVariable}
)
```

##### if else

```js
const condition = props.condition;
const elementVariable;
if(condition){
    elementVariable = <div>true</div>
}
else{
    elementVariable = <div>false</div>
}

return (
    <h3>Element Variables</h3>
    {elementVariable}
)
```

#### ? (inline)

```js
return condition ? <div>true</div> : <div>false</div>;
```

#### && (inline)

```js
return condition && <div>true</div>;
```

## Resources

- [Conditional Rendering: Official Documentation](https://reactjs.org/docs/conditional-rendering.html)
- [All React Conditional Rendering Techniques](https://www.robinwieruch.de/conditional-rendering-react/)
- [AirBnb Styleguide: Conditional Rendering (Discussion: no rule yet)](https://github.com/airbnb/javascript/issues/520)
