# Lab 3: Styles Using CSS

## Objectives

- [ ] Install CSS
- [ ] Apply CSS

## Steps

### Install CSS

1.  **Open** a **new** `command prompt` (Windows) or `terminal` (Mac) **window**.
    > ! Be sure to open a new window. Leave `npm start` running.
2.  Run _one_ of the following commands:

    ### npm

    ```
    npm install mini.css@3.0.1
    ```

    ### Yarn

    ```
    yarn add mini.css@3.0.1
    ```

    > `Warnings` can be ignored but `Errors` indicate there was a problem.

3.  Verify `mini.css` was added as a `dependency` of the project in `package.json`.

    #### `\package.json`

    ```diff
    {
    "name": "keeptrack",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
      ...
    +   "mini.css": "~3.0.1",
      "react": "^16.9.0",
      "react-dom": "^16.9.0",
      "react-scripts": "3.1.1"
      ...
    },
    ...
    }
    ```

### Apply CSS

1. **Open** and **delete** the contents of `app.css`
2. Open the file `app.js`.
3. Delete the `JSX` returned and replace with the `HTML` as shown below.

   #### src\App.js

   ```diff
   import React from 'react';
   - import logo from './logo.svg';
   import './App.css';

   function App() {
     return (
   -     <div className="App">
   -      <header className="App-header">
   -        <img src={logo} className="App-logo" alt="logo" />
   -        <p>
   -          Edit <code>src/App.js</code> and save to reload.
   -        </p>
   -        <a
   -          className="App-link"
   -          href="https://reactjs.org"
   -          target="_blank"
   -          rel="noopener noreferrer"
   -        >
   -          Learn React!!
   -        </a>
   -      </header>
   -    </div>

   +    <blockquote cite="Benjamin Franklin">
   +      Tell me and I forget, teach me and I may remember, involve me +and I learn.
   +    </blockquote>
     );
   }
   ```

4. Open the file `src\index.css`
5. Delete the current contents of the file.
6. Import the stylesheet you installed.
   #### `src\index.css`
   ```css
   @import '../node_modules/mini.css/dist/mini-default.min.css';
   ```
   > Alternatively, you could choose a dark theme: `mini-dark.min.css` or a nordic theme: `mini-dark.min.css`
7. Verify you see the following output in the browser

   ![image](https://user-images.githubusercontent.com/1474579/64926635-c2eb9f80-d7cd-11e9-8ff7-84660d706ff9.png)

> [Mini.css](https://minicss.org/) is a **minimal**, responsive, style-agnostic **CSS framework**. `Mini.css` is similar to `Bootstrap` but lighter and **requires fewer CSS classes** so you can **focus** on learning `React` but still get a **professional look**.

---

### &#10004; You have completed Lab 3
