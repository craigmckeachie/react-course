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

   ### Solution

   #### `src\projects\ProjectsPage.js`

   ```tsx
   import React from 'react';
   function ProjectsPage() {
     return <h1>Projects</h1>;
   }

   export default ProjectsPage;
   ```

### Render the component

1. **Remove** the `<blockquote>...</blockquote>` we returned in the last lab and **replace** it with `<ProjectsPage/>` wrapped in a `div` with a css `class` of `container`.

   #### `src\App.js`

   ```diff
   ...
   + import ProjectsPage from './projects/ProjectsPage';

   function App() {
   return (
   -     <blockquote cite="Benjamin Franklin">
   -     Tell me and I forget, teach me and I may remember, involve me and I learn.
   -     </blockquote>
   +     <ProjectsPage />
   );
   };
   ```

2. **Verify** the following is displayed in the browser:

   **Projects**

---

### &#10004; You have completed Lab 4
