# Lab 4: Your First Component

## Objectives

- [ ] Create a component
- [ ] Render the component

## Steps

### Create a component

1. **Create** the directory `src\projects`.
2. **Create** the file `src\projects\ProjectsPage.js`
3. In the file, **create** a **function** **component** that returns the following html:

   ```html
   <h1>Projects</h1>
   ```

   > The solution code for the component appears next. Challenge yourself to write it from scratch before looking at it.

   > In VS Code, you could use this extension [VS Code ES7 React/Redux/React-Native/JS snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) that you installed as part of the setup for the course and then type `rfce` then `tab`.

   ### Solution

   #### `src\projects\ProjectsPage.js`

   ```jsx
   import React from 'react';

   function ProjectsPage() {
     return <h1>Projects</h1>;
   }

   export default ProjectsPage;
   ```

   > The import: `import React from 'react';` is not required in the latest version(s) of **React** because it uses a new `JSX Transform`.
   >
   > - `React 17` RC and **higher** supports the new JSX Transform, and they’ve also released `React 16.14.0`, `React 15.7.0`, and `React 0.14.10` for people who are still on the older major versions).
   > - With the new JSX Transform, the import statement is only needed at the entry point of the application which is `src\index.js` in a **Create React App**. Note that the code still works if you include the import in other files but it is no longer required.
   > - The import is included throughout the labs so the code continues to work on older versions of React

### Render the component

1. **Remove** the `<blockquote>...</blockquote>` we returned in the last lab and **replace** it with `<ProjectsPage/>` wrapped in a `div` with a css `class` of `container`.

   #### `src\App.js`

   ```diff
   + import ProjectsPage from './projects/ProjectsPage';

   function App() {
   -   return (
   -      <blockquote cite="Benjamin Franklin">
   -         Tell me and I forget, teach me and I may remember, involve me and I learn.
   -      </blockquote>
   -   );
   +   return (
   +   <div className="container">
   +      <ProjectsPage />
   +   </div>
   +   );
   }
   ```

2. **Verify** the following is displayed in the browser:

   **Projects**

---

### &#10004; You have completed Lab 4
