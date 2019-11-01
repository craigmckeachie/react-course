# Chapter 6: Props

- [Chapter 6: Props](#chapter-6-props)
  - [Read-only](#read-only)
  - [String Literals vs. Expressions](#string-literals-vs-expressions)
  - [Function vs. Class Components](#function-vs-class-components)
  - [Additional Reading](#additional-reading)

`Props` is short for `properties`. When React sees an element representing a user-defined component, it passes JSX attributes to this component as a single object. We call this object `props`.

1. Create a `Greeter` component and render it
   ```js
   function Greeter() {
     return <h1>Hello</h1>;
   }
   const element = <Greeter />;
   ReactDOM.render(element, document.getElementById('root'));
   ```
2. Add a `property (prop)` to the component
   ```js
   function Greeter(props) {
     return <h1>Hello, {props.name}</h1>;
   }
   const element = <Greeter name="Joe" />;
   ReactDOM.render(element, document.getElementById('root'));
   ```

## Read-only

This function is considered `pure` “pure” because it does not attempt to change its inputs, and always return the same result for the same inputs.

```js
function sum(a, b) {
  return a + b;
}
```

In contrast, this function is impure because it changes its own input:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

> All React components must act like pure functions with respect to their props. Props are immutable, they cannot be changed.

1. Update the `Greeter` component to change its `props`
   ```diff
   function Greeter(props) {
   +  props.name = 'Dave';
     return <h1>Hello, {props.name}</h1>;
   }
   const element = <Greeter name="Joe" />;
   ReactDOM.render(element, document.getElementById('root'));
   ```
1. Open your browser's DevTools and you will receive the following error:

   ```sh
   Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'
    at Greeter (<anonymous>:4:14)
   ```

1. Remove the change to `props`
   ```diff
   function Greeter(props) {
   -  props.name = 'Dave';
     return <h1>Hello, {props.name}</h1>;
   }
   const element = <Greeter name="Joe" />;
   ReactDOM.render(element, document.getElementById('root'));
   ```
1. The error will go away and the component will render again.

> Of course, application UIs are dynamic and change over time. In the next section, we will introduce a new concept of `state`. State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.
> Reference: [Components & Props](https://reactjs.org/docs/components-and-props.html)

## String Literals vs. Expressions

1. If you want to hard-code a string (string literal) and pass it into the component you want quotes to signify it is a string literal.
   ```js
   const element = <Greeter name="Joe" />;
   ```
2. If you want to assign properties to a variable or an object property you need to use an expression and leave off the quotes.
   ```js
   const person = { firstName: 'John' };
   const element = <Greeter name={person.firstName} />;
   ```
3. Renders: `Hello John`
4. If you leave the quotes React takes you literally.
   ```js
   const person = { firstName: 'John' };
   const element = <Greeter name="{person.firstName}" />;
   ```
5. Renders:
   ```
   Hello, {person.firstName}
   ```

## Function vs. Class Components

Since class methods create a new function context (this) , be sure to use `this.props`
in a `class component` instead of just `props` as you would in a `function component` to reference properties passed into the component.

- Function Component: props
- Class Component: this.props

1. Update your function component to be a class component and be sure to use `this.props`
   ```js
   class Greeter extends React.Component {
     render() {
       return <h1>Hello, {this.props.name}</h1>;
     }
   }
   ```

<!-- ## Extracting Components -->

## Additional Reading

If time permits check out this additional information about `props`.

- [Props Default to True](https://reactjs.org/docs/jsx-in-depth.html#props-default-to-true)
- [Spread Attributes](https://reactjs.org/docs/jsx-in-depth.html#props-default-to-true)
