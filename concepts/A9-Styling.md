# Appendix A9: Styling & CSS

- [Appendix A9: Styling & CSS](#appendix-a9-styling--css)
  - [Class](#class)
  - [Style](#style)
  - [CSS in JS](#css-in-js)
      - [What is CSS-in-JS?](#what-is-css-in-js)
      - [CSS-in-JS Libraries](#css-in-js-libraries)
  - [Reference](#reference)


Components can be styled using CSS classes or inline styles as you would in when using plain HTML and CSS without React.

## Class

**className**

- use `className` not `class`
- pass a string to `className`
- it is common for CSS classes to be dynamically added or removed based on data in the component props or state
- vanilla JavaScript can be used to dynamically build the string of CSS classes

1. Create the file `styles.css`
2. Add the following styles:

   ```css
   .container {
     width: 50rem;
   }

   .alert {
     position: relative;
     padding: 0.75rem 1.25rem;
     margin-bottom: 1rem;
     border: 1px solid transparent;
     border-radius: 0.25rem;
   }

   .alert-danger {
     color: #721c24;
     background-color: #f8d7da;
     border-color: #f5c6cb;
   }

   .alert-success {
     color: #155724;
     background-color: #d4edda;
     border-color: #c3e6cb;
   }

   .alert-warning {
     color: #856404;
     background-color: #fff3cd;
     border-color: #ffeeba;
   }

   .alert-info {
     color: #0c5460;
     background-color: #d1ecf1;
     border-color: #bee5eb;
   }
   ```

3) Add a css link tag to the `index.html` page

   ```diff
   <head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <meta http-equiv="X-UA-Compatible" content="ie=edge" />
   +    <link rel="stylesheet" href="styles.css" />
   <title></title>
   </head>
   ```

4. Create an `Alert` component in `main.jsx` and display the different kinds of alerts

   ```js
   function Alert() {
     return (
       <div className="container">
         <div className="alert alert-danger">danger</div>
         <div className="alert alert-warning">warning</div>
         <div className="alert alert-success">success</div>
         <div className="alert alert-info">info</div>
       </div>
     );
   }

   ReactDOM.render(<Alert />, document.getElementById('root'));
   ```

5. Modify the component to take an `Alert` `type` prop to dynamically set the type of alert

   ```js
   function Alert({ type = 'info' }) {
     const alertClasses = `alert alert-${type}`;
     return (
       <div className="container">
         <div className={alertClasses}>This is a message.</div>
       </div>
     );
   }

   ReactDOM.render(<Alert type="danger" />, document.getElementById('root'));
   ```

6. Set the alert type as shown above and confirm it is working
7. Remove the `type` prop from `<Alert type="danger" />`
8. Verify the alert type correctly defaults to the `info` type

> If you often find yourself writing code to build up a string of CSS classes the [classnames](https://www.npmjs.com/package/classnames#usage-with-reactjs) package can simplify it. Alternatively, you could use one of the CSS-in-JS libraries below if you prefer.

## Style

Using the `style` attribute as the primary means of styling elements is generally not recommended. In most cases, `className` should be used to reference classes defined in an external CSS stylesheet. `style` is most often used in React applications to add dynamically-computed styles at render time.

> Are inline styles bad?
>
> - CSS classes are generally better for performance than inline styles.

**style**

- accepts a JavaScript object (not a ; delimited string like HTML)
- the object `properties` are `camelCased` instead of `kebab-cased`
- consistent with the DOM property `style` (not the attribute)
- more efficient
- prevents XSS security holes
- not auto-prefixed
- to support older browsers you need to supply the corresponding style properties

1. Override the styles from the CSS Classes in the previous example with inline styles

   ```diff
   function Alert({ type = 'info' }) {
   const alertClasses = `alert alert-${type}`;
   return (
       <div className="container">
       <div
           className={alertClasses}
   +        style={{ backgroundColor: 'fuchsia', color: 'white', width: 50 }}
       >
           This is a message.
       </div>
       </div>
   );
   }

   ReactDOM.render(<Alert type="danger" />, document.getElementById('root'));
   ```

## CSS in JS

#### What is CSS-in-JS?

“CSS-in-JS” refers to a pattern where CSS is composed using JavaScript instead of defined in external files.

_Note that this functionality is not a part of React, but provided by third-party libraries._ React does not have an opinion about how styles are defined; if in doubt, a good starting point is to define your styles in a separate `*.css` file as usual and refer to them using `className`.

#### CSS-in-JS Libraries

- [styled components](https://www.styled-components.com/)
- [emotion](https://emotion.sh)

Read a comparison of CSS-in-JS libraries [here](https://github.com/MicheleBertoli/css-in-js).

## Reference

- [See also FAQ: Styling and CSS](https://reactjs.org/docs/faq-styling.html)
- [style attribute](https://reactjs.org/docs/dom-elements.html#style)
