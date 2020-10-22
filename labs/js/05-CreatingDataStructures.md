# Lab 5: Data

## Objectives

- [ ] Add data
- [ ] Display the data

## Steps

### Add data

1. Open File Explorer (Windows) or Finder (Mac).
1. **Copy** the `labs\ts\snippets\lab05\assets` directory into the `keeptrack\public` directory.

   > You will need to clone the entire `react-course` repo (or download a zip) to your local machine to easily download all the files needed in this step and the next step.

1. You can safely **delete** these files in the `keeptrack` project.
   > Note that it won't have any effect on the project outcome we just don't need them anymore.
   - `src\public\logo192.png`
   - `src\public\logo512.png`
1. **Copy** the files `labs\ts\snippets\lab05\MockProjects.js` and `labs\ts\snippets\lab05\Project.js` into the `keeptrack\src\projects` directory.

<!-- <a href=".\snippets\lab05\assets" target="_blank">assets</a> -->

### Display the data

1. Open the file `src\projects\ProjectsPage.js`.
2. Use `JSON.stringify()` to output the `MOCK_PROJECTS` array from `MockProjects.js` in the `render` method of the component.

   > **TIPS:**
   >
   > - React components can only return one root element so you will need to wrap the `<h1>` and `<pre>` tags in a React Fragement `<></>`.
   > - Wrapping output in a HTML `<pre></pre>` (preformatted) tag retains whitespace.
   > - To switch to JavaScript in JSX use `{ }`
   > - JSON.stringify(MOCK_PROJECTS, null, ' ')'s third argument is used to insert white space into the output JSON string for readability purposes.
   >   The second argument is a replacer function so we can pass null because we don't need to replace anything.

   ![image](https://user-images.githubusercontent.com/1474579/64889510-85efa380-d63b-11e9-8dc5-86f6dce8cec2.png)

   ### Solution

   #### `src\projects\ProjectsPage.js`

   ```diff
   + import { MOCK_PROJECTS } from './MockProjects';

   function ProjectsPage() {
     return (
   +   <>
        <h1>Projects</h1>
   +    <pre>{JSON.stringify(MOCK_PROJECTS, null, ' ')}</pre>
   +   </>
     );
   }

   export default ProjectsPage;
   ```

---

### &#10004; You have completed Lab 5
