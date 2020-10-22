# Lab 5: Data

## Objectives

- [ ] Add data
- [ ] Display the data

## Steps

### Add data

1. **Download** the code snippets, data, and images needed for the labs by **following these steps**.
   1. **Click** this **link** to open the [snip repository](https://github.com/craigmckeachie/snip) on GitHub.
   2. **Click** the **Green Code button** then choose **Download ZIP**.
   3. Unzip the file `snip-master.zip` archive you downloaded in the prior step.
2. Open File Explorer (Windows) or Finder (Mac).
3. **Copy** the `snip-master\labs\js\snippets\lab05\assets` directory (including the assets directory) into the `keeptrack\public` directory.
4. **Copy** the files `snip-master\labs\js\snippets\lab05\MockProjects.js` and `snip-master\labs\js\snippets\lab05\Project.js` into the `keeptrack\src\projects` directory.

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
   - return  <h1>Projects</h1>
   +  return (
   +   <>
   +     <h1>Projects</h1>
   +    <pre>{JSON.stringify(MOCK_PROJECTS, null, ' ')}</pre>
   +   </>
   +  );
   }

   export default ProjectsPage;
   ```

---

### &#10004; You have completed Lab 5
