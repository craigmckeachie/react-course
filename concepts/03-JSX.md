# Chapter 3: JSX

JSX just provides syntactic sugar for the function:

```js
React.createElement(component, props, ...children);
```

## Part 1 - Replacing createElement with JSX

1.  Comment out the `React.createElement` call and replace it with the JavaScript XML (JSX) as shown below. When compiled the JSX will generate the commented code below it.

    ```js
    //    const element = React.createElement(
    //      'div',
    //      {
    //        className: 'container'
    //      },
    //      'Hello World'
    //    );

    const element = <div className="container">Hello World</div>;

    ReactDOM.render(element, rootElement);
    ```

2.  But since a JSX compiler has not been configured if you try to run this code by opening or refreshing the index page in the your browser you will get the following error:

    ```shell
    Uncaught SyntaxError: Unexpected token <
    ```

    > Because the bracket syntax (JSX) has not been compiled to JavaScript.

3.  To install the JSX compiler (Babel)

    ```shell
    npm install --save-dev @babel/standalone
    ```

    > Compiling in the browser with @babel/standalone has a fairly limited use case, so if you are working on a production site you should be precompiling your scripts server-side.

4.  To configure the JSX compiler (Babel). Make the following changes:

    ```diff
    ...
    <script src="/node_modules/react-dom/umd/react-dom.development.js"></script>
    + <script src="/node_modules/@babel/standalone/babel.min.js"></script>
    - <script type="text/javascript" src="/main.jsx">
    + <script type="text/babel" src="/main.jsx">
    ...
    </script>
    ```

5.  You should now again see the following output to the page

    ```
    Hello World
    ```

6.  In the previous chapter, we wrote out React.createElement calls but now the Babel compiler generates them.

    > If you want to test out how some specific JSX is converted into JavaScript, you try out [the online Babel compiler](https://babeljs.io/repl)

    Here are some other examples:

    List:

    ```html
    <ul>
      <li>Home</li>
      <li>About</li>
      <li>Contact</li>
    </ul>
    ```

    ```js
    React.createElement(
      'ul',
      null,
      React.createElement('li', null, 'Home'),
      React.createElement('li', null, 'About'),
      React.createElement('li', null, 'Contact')
    );
    ```


    Self-closing element:

    ```js
    <i className="fas fa-plus" />
    ```

    ```js
    React.createElement('i', {
      className: 'fas fa-plus'
    });
    ```

    Paste [this Sign-In form](./snippets/bootstrap-form.jsx) into the [the online Babel compiler](https://babeljs.io/repl) to understand why you will want to use `JSX` as your HTML grows.

## Part 2 - Embedding Expressions in JSX

An expression can be created in JSX with curly braces. When you create an expression using curly braces you are saying you want to write some JavaScript.

1.  Create a variable and assign a `name` to it then use that variable inside your `JSX` in an `expression`.


    ```diff
    <script type="text/babel">
      const rootElement = document.getElementById('root');
    +  const name = 'Joe';
    +  const element = <div className="container">Hello {name}</div>;
      ReactDOM.render(element, rootElement);
    </script>
    ```

    ```shell
    Hello Joe
    ```

    You can use complex objects as well:

    ```diff
     const rootElement = document.getElementById('root');
    +  const person = { first: 'Joe', last: 'Doe' };
      const element = (
        <div className="container">
    +      Hello {person.first} {person.last}
        </div>
      );
      ReactDOM.render(element, rootElement);
    ```

## Part 3 - Specifying Attributes with JSX

1. Copy the React logo from the snippets folder into the root of your project `demos`.
1. Update the element to be an image tag pointing to the logo.
   ```js
   const element = <img src="./react-logo.png" />;
   ```
1. Refresh the page and the React logo should appear on the page.
1. Create a logo object with path, name, and title properties and set attributes in JSX to each of those values as shown below.
1. ```js
   const logo = {
     name: 'React Logo',
     title: 'React Logo',
     path: './react-logo.png'
   };

   const element = <img src={logo.path} alt={logo.name} title={logo.title} />;
   ```

1. Refresh the page and the React logo should still appear on the page. Hover over the logo with your mouse and the title should appear.
   > Note that when the value is a `string literal` you can simply set the attribute to it, but when the value refers to a variable or a property on an object you need to use the `expression` syntax and be sure to leave off the quotes `''`.
1. In general, you can use any DOM properties and attributes in JSX but there are a few things to be aware of:

   > In React, all DOM properties and attributes (including event handlers) should be camelCased. For example, the HTML attribute `tabindex` corresponds to the attribute tabIndex in React. The exception is aria-_ and data-_ attributes, which should be lowercased. For example, you can keep aria-label as aria-label.

   > There are a number of attributes that work differently between React and HTML. [You can read about them here](https://reactjs.org/docs/dom-elements.html#differences-in-attributes).

The most common differences are shown below.

- Instead of `class` use `className`

  ```html
  <div className="alert alert-danger">error message</div>
  ```

  1. Change the element variable to the `div` shown above with an error message
  2. Refresh the page in your browser and inspect the div to see that `className` was changed to `class`

- Instead of `for` use `htmlFor`

  ```html
  <form>
    <label htmlFor="name">Name</label>
    <input id="name" />
  </form>
  ```

## Part 4 - Children

1. You can nest multiple child elements.

```js
const element = (
  <ul>
    <li>
      <a href="">a</a>
    </li>
    <li>
      <a href="">b</a>
    </li>
    <li>
      <a href="">c</a>
    </li>
  </ul>
);
```

2. If you want your code formatting and indentation to line up you will want your opening tag on the next line after the variable declaration. Because JavaScript has automatic semi-colon insertion your code can break as shown below.
   ```js
   const element = ;
    <ul>
    ...
   ```
3. To prevent automatic semi-colon insertion issues and still be able to use proper indentation, simply wrap your JSX in parenthesis () as is shown above.

4. Although you can nest any number of elements inside the root parent element you can only have one parent element. The code below is invalid.

   ```js
   const element = (
       <p>123</p>
       <ul>
       . ..
       </ul>
   );
   ```

   You will receive the following error:

   ```
   Uncaught SyntaxError: /Inline Babel script: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?
   ```

   To fix this you can either:

   - wrap your code in a container element like a div

   ```diff
   const element = (
   +     <div> //extraneous element
         <p>123</p>
         <ul>
         . ..
         </ul>
   +    </div>
     );
   ```

   - wrap your code in a `React.Fragment` element

   ```diff
   const element = (
   +     <React.Fragment>
         <p>123</p>
         <ul>
         . ..
         </ul>
   +    </React.Fragment>
     );
   ```

   - use short-hand syntax

   > Support for fragment syntax in JSX will vary depending on the tools you use to build your app.

   ```diff
   const element = (
   +     <>
         <p>123</p>
         <ul>
         . ..
         </ul>
   +     </>
     );
   ```

## Reference

[JSX Illustration](https://illustrated.dev/jsx)

    <!-- - Children
      - String Literals
      - JSX Children
      - JavaScript Expressions as Children
      - Functions as Children
      - Booleans, Null, and Undefined are Ignored -->
