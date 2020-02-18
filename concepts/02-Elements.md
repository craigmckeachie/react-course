# Chapter 2: Elements

- [Chapter 2: Elements](#chapter-2-elements)
  - [Part 1 - Hello World in JavaScript](#part-1---hello-world-in-javascript)
  - [Part 2 - Hello World in React](#part-2---hello-world-in-react)
  - [Reference](#reference)

React implements a browser-independent DOM system for performance and cross-browser compatibility. They call this the Virtual DOM.

- A React element is not an actual instance of a [DOM Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
- [React elements](https://reactjs.org/docs/dom-elements.html) have an almost identical API to DOM Elements

React elements are the building blocks of React applications.
An element describes what you want to see on the screen.

One might confuse elements with a more widely known concept of “components”. Typically, elements are not used directly, but get returned from components.

## Part 1 - Hello World in JavaScript

1.  Create directory `demos`

    ```
    mkdir demos
    cd demos
    ```

2.  Open `demos` in your editor of choice

    > If you are using VS Code you can type the following command on the command-line to open the editor
    >
    > ```
    >  code .
    > ```

3.  Create file `index.html`
4.  Add the following code

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
      </head>
      <body></body>
    </html>
    ```

    > If your editor supports `Emmet` you can use the code snippet `html:5`

5.  Add a `div` element with an id of `root`

    ```diff
    <body>
    +  <div id="root"></div>
    </body>
    ```

    > If your editor supports `Emmet` you can use the code snippet `div#root`

6.  Add the following script tag to reference a JavaScript file that we will create in the next step.
    ```diff
    <body>
    <div id="root"></div>
    + <script type="text/javascript" src="/main.jsx"></script>
    </body>
    ```
7.  Create a new file `demos/main.jsx`
8.  Add the following code to `demos/main.jsx`

    ```js
    const rootElement = document.getElementById('root');

    const element = document.createElement('div');
    element.textContent = 'Hello World';
    element.className = 'container';
    rootElement.appendChild(element);
    ```

9.  Create a `package.json` file to store your local project dependencies. Open a command prompt/terminal in the `demos` directory and run the following command.

    ```sh
    npm init --yes
    ```

    > --yes : tells npm says yes to accepting all the default values in the npm config file

10. Install a web server


    ```sh
    npm install serve
    ```

    > Assuming you would like to serve a static site, single page application or just a static file (no matter if on your device or on the local network), `serve` is a development web server that serves static content.

    > It behaves exactly like static deployments on 
    > https://zeit.co/now
    > so it's perfect for developing your static project.

    > For more information see:
    > https://www.npmjs.com/package/serve

11. Configure an `npm script` to start the web server

    ```diff
    // package.json
    {
      "name": "demos",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
    +  "start": "serve -s"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {
        "serve": "..."
      }
    }
    ```

12) Run the web server
    ```sh
    npm start
    ```
13) Open `http://localhost:5000/` in your Chrome browser

14. Verify the page displays:

    ```

    Hello World

    ```

## Part 2 - Hello World in React

Hello World in JavaScript is not that different than it is in React. Let's update the code to see it in React.

1. Open a new cmd prompt or terminal (leave `serve` running) and install `React`

   ```shell
   npm install react react-dom --save
   ```

2. Add the script tags to include `React` on the page. Place them just below the `root div` but before the `main.jsx` `script` tag

   ```html
   <script src="/node_modules/react/umd/react.development.js"></script>
   <script src="/node_modules/react-dom/umd/react-dom.development.js"></script>
   ```

3. Update the code to use React

   ```js
   const rootElement = document.getElementById('root');

   // const element = document.createElement('div');
   // element.textContent = 'Hello World';
   // element.className = 'container';
   // rootElement.appendChild(element);

   const element = React.createElement(
     'div',
     {
       className: 'container'
     },
     'Hello World'
   );

   ReactDOM.render(element, rootElement);
   ```

   > The method signature for createElement is as follows:
   >
   > ```js
   > React.createElement(type, [props], [...children]);
   > ```

4. Log out the `React Element` to the console.

   ```diff
   const element = React.createElement(
     'div',
     {
       className: 'container'
     },
     'Hello World'
   );

   + console.log(element);

   ReactDOM.render(element, rootElement);
   ```

5. Open Chrome DevTools (F12 or fn+F12 on a laptop) to see the console output.

   > Notice that the React element is just an object with a `props` property that holds an object. And the `props` object has three properties we are using to represent the HTML element: `type`, `children`, and `className`.

6. Instead of as the third parameter children (child elements-- even if just a text element as in this example) can be passed as part of the elements props (which is short for properties).

   ```diff
   const element = React.createElement(
       'div',
       {
       className: 'container'
   +       children: 'Hello World'
   or
   +       children: ['Hello World', 'Goodbye World']
       },
   -     'Hello World'
   );
   ```

<br>

> To summarize the `React.createElement` parameters are as follows.
>
> - Param 1: the element you want to create
> - Param 2: an object that contains all the properties you want to be applied or set on that element
> - Param 3: as a convenience, you can provide the children as any number of arguments after the props

React.createElement() performs a few checks to help you write bug-free code but essentially it creates an object like this:

```js
// Note: this structure is simplified
const element = {
  type: 'div',
  props: {
    className: 'container',
    children: 'Hello World'
  }
};
```

These objects are called `React elements`. You can think of them as descriptions of what you want to see on the screen. React reads these objects and uses them to construct the DOM and keep it up to date.

## Reference

- [Rendering Elements](https://reactjs.org/docs/rendering-elements.html)
- [createElement](https://reactjs.org/docs/react-api.html#createelement)
- [Elements vs Components](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)
- [React Supported HTML Attributes](https://reactjs.org/docs/dom-elements.html#all-supported-html-attributes)
- [Glossary: Elements](https://reactjs.org/docs/glossary.html#elements)
