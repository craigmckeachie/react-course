# Chapter 17: Best Practices

## Code Organization

### Opinions

React doesn’t have opinions on how you put files into folders. That said there are a few common approaches popular in the ecosystem you may want to consider.

> Start with one file...then move files around until they feel right -Dan Abramov

### Key Questions

1. Group by features or file types?

   #### Grouping by features

   One common way to structure projects is locate CSS, JS, and tests together inside folders grouped by feature or route.

   ```
   common/
     Avatar.js
     Avatar.css
     APIUtils.js
     APIUtils.test.js
   feed/
     index.js
     Feed.js
     Feed.css
     FeedStory.js
     FeedStory.test.js
     FeedAPI.js
   profile/
     index.js
     Profile.js
     ProfileHeader.js
     ProfileHeader.css
     ProfileAPI.js
   ```

   #### Grouping by file type

   Another popular way to structure projects is to group similar files together, for example:

   ```
   api/
     APIUtils.js
     APIUtils.test.js
     ProfileAPI.js
     UserAPI.js
   components/
     Avatar.js
     Avatar.css
     Feed.js
     Feed.css
     FeedStory.js
     FeedStory.test.js
     Profile.js
     ProfileHeader.js
     ProfileHeader.css
   ```

   #### Pro/Con

   - Grouping by features works better the larger the project gets (think more components).

   - Grouping by file type can keep things simple with smaller projects

2. Should a component have it's own folder?

   #### Pro/Con

   - Not creating folders can keep make smaller projects easier to navigate. This "keeps it simple."
   - Creating additional folders can result in too much nesting

3. If you do create a separate folder for a compoment, should you:

- name the file with the same name as the component?

  ```
  Button/
    Button.js
    Button.css
  Header/
    Header.js
    Header.css
  ```

  ```js
  import Button from '../Button/Button';
  ```

- put component code in `[Component-Name]/index.js`

  ```
  Button/
    index.js
    style.css
  Header/
    index.js
    style.css
  ```

  ```js
  //Button/index.js
  export default class Button;
  ```

  ```js
  import Button from '../Button';
  ```

* create an index.js (to make imports cleaner)?

  ```
  Button/
    index.js
    Button.js
    Button.css
  Header/
    index.js
    Header.js
    Header.css
  ```

  ```js
  //Button.js
  export default class Button {...};
  ```

  ```js
  //index.js
  export { default } from './Button';
  ```

  ```js
  import Button from '../Button';
  ```

  #### Pro/Con

  - When every file is named index.js or style.css it can become difficult to navigate your code
  - `import Button from '../Button/Button';` is redundant

4. How you should handle (where to put) container components?
   - There is no clear guidance on this but here is an approach.
   - components/component-name
     - css | scss | styles
     - container
     - redux, mobx
     - index
       > See [File Layout that Considers Container & Redux Components](https://itnext.io/optimal-file-structure-for-react-applications-66287250b42) for more information
5. If I use [Redux what should my file or code structure](https://redux.js.org/faq/code-structure) look like?

### Best Practices

Below are some best practices direct from the React documentation.

- Avoid too much nesting

  There are many pain points associated with deep directory nesting in JavaScript projects. It becomes harder to write relative imports between them, or to update those imports when the files are moved. Unless you have a very compelling reason to use a deep folder structure, consider limiting yourself to a maximum of three or four nested folders within a single project. Of course, this is only a recommendation, and it may not be relevant to your project.

* Don't overthink it

  If you're just starting a project, [don't spend more than five minutes](https://en.wikipedia.org/wiki/Analysis_paralysis) on choosing a file structure. Pick any of the above approaches (or come up with your own) and start writing code! You'll likely want to rethink it anyway after you've written some real code.

  If you feel completely stuck, start by keeping all files in a single folder. Eventually it will grow large enough that you will want to separate some files from the rest. By that time you'll have enough knowledge to tell which files you edit together most often. In general, it is a good idea to keep files that often change together close to each other. This principle is called "colocation".

  As projects grow larger, they often use a mix of both of the above approaches in practice. So choosing the "right" one in the beginning isn't very important.

## Code Conventions (Style Guides)

Here are links to popular React style guides.

- [AirBnB React Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [Khan Academy Style Guide](https://github.com/Khan/style-guides/blob/master/style/react.md)
- [CSS Tricks Blog Post on React Conventions](https://css-tricks.com/react-code-style-guide/)

In summary, they are all have good information but aren't very comprehensive, seem to not have evolved when the React library changes, and contradict each other at times.

Start with the `AirBnB React Style Guide` as basis for your React coding conventions.

> In particular, the section [Ordering within Component Classes](https://github.com/airbnb/javascript/tree/master/react#ordering) is useful.

## Project Setup

[Create React App](https://facebook.github.io/create-react-app/docs/getting-started) is an officially supported way to create single-page React applications. It offers a modern build setup with no configuration. This should be your default choice for business applications and is usually the right choice.

See the documentation for [Create React App](https://facebook.github.io/create-react-app/docs/getting-started) for more information.

If you need to build a single-page React application that supports server-side rendering you should consider using [Next.js](https://nextjs.org/).

If you need to use create a static React website you should consider using [Gatsby](https://www.gatsbyjs.org/)...a free and open source framework based on React that helps developers build blazing fast websites and apps.

# Reference

## Code Organization

- [React Documentation: File Structure](https://reactjs.org/docs/faq-structure.html)
  https://stackoverflow.com/questions/49276070/reactjs-code-naming-conventions
- [Dan Abramov File Structure Comment on Twitter](https://mobile.twitter.com/dan_abramov/status/1027248875072114689)
- [Ways to Structure React App](https://hackernoon.com/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed)
- [Components having own folder should have a component file with the same name](https://blog.bitsrc.io/structuring-a-react-project-a-definitive-guide-ac9a754df5eb)
- [File Layout that Considers Container & Redux Components](https://itnext.io/optimal-file-structure-for-react-applications-66287250b42)

## Code Conventions

[TC 39: JavaScript Language Feature Approval Process](http://2ality.com/2015/11/tc39-process.html)
