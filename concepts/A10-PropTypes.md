# PropTypes

## Summary

Runtime type checking for React props and similar objects.

## Overview

As your app grows, you can catch a lot of bugs with typechecking. For some applications, you can use `JavaScript` extensions like `Flow` or `TypeScript` to typecheck your whole application. 

But even if you don’t use those, the `React.PropTypes library` offers some crucial typechecking abilities.

`PropTypes` was originally exposed as part of the React core module, and is commonly used with React components to type check props.

`React.PropTypes` has moved into a different package since `React v15.5`. Please use the `prop-types` library instead.

## Installation

```shell
npm install --save prop-types
```
#### `index.html`
```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Learning React</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="/node_modules/react/umd/react.development.js"></script>
    <script src="/node_modules/react-dom/umd/react-dom.development.js"></script>
+    <script src="/node_modules/prop-types/prop-types.js"></script>
  </body>
</html>
```

If you are using ES Modules you will need to import `PropTypes` in your `.js| .jsx` files:

```js
import PropTypes from 'prop-types';
```

## Usage

1. Add the following code:

    #### `main.jsx`
    ```js
    //same with function components
    
    // function Greeter(props) {
    //   return <h1>Hello, {props.name}</h1>;
    // }

    class Greeter extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
    }

    Greeter.propTypes = {
    name: PropTypes.string.isRequired
    };

    const element = <Greeter name="Joe" />;
    ReactDOM.render(element, document.getElementById('root'));
    ```
1. Change PropType to object.

    #### `main.jsx`
    ```js
    ...
    Greeter.propTypes = {
    name: PropTypes.object.isRequired
    };
    ...
    ```

1. You should receive the following warning in the browser `console`.
    ```
    Warning: Failed prop type: Invalid prop `name` of type `string` supplied to `Greeter`, expected `object`.
        in Greeter
    ```






## Reference
- [PropTypes library on npm](https://www.npmjs.com/package/prop-types)
- [Official React Documentation on PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
