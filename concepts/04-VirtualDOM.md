# Chapter 4: Virtual DOM

React implements a browser-independent DOM system for performance and cross-browser compatibility. They call this the Virtual DOM.

1. Replace the JavaScript code in `main.jsx` with the following:

   ```js
   function renderElement() {
     const rootElement = document.getElementById('root');
     const element = (
       <div className="post">
         <h1>My First Blog Post</h1>
         <div>Author: Mark Twain</div>
         <div>Published: {new Date().toLocaleTimeString()}</div>
         <p>
           I am new to blogging and this is my first post. You should expect a
           lot of great things from me.
         </p>
       </div>
     );
     ReactDOM.render(element, rootElement);
   }
   setInterval(renderElement, 1000);
   ```

2. Open the page in Chrome and inspect the published date to see that it updates just the date but the rest of the DOM is not updated.

3. See the diagram below to better understand how the Virtual DOM works in React.

   ![Virtual DOM](./assets/React-Virtual-DOM.png)

   ## Reference

   [Illustration of React Virtual DOM](https://illustrated.dev/react-vdom)
