# Lab 5: Data

## Objectives

- [ ] Add data
- [ ] Display the data

## Steps

### Add data

1. Open File Explorer (Windows) or Finder (Mac).
1. **Copy** the `labs\snippets\lab05\assets` directory into the `keeptrack\public` directory.

   > You will need to clone the entire `react-course` repo (or download a zip) to your local machine to easily download all the files needed in this step and the next step.

1. **Copy** the files `labs\snippets\lab05\MockProjects.ts` and `labs\snippets\lab05\Project.ts` into the `keeptrack\src\projects` directory.

<!-- <a href=".\snippets\lab05\assets" target="_blank">assets</a> -->

### Display the data

1. Open the file `src\projects\ProjectsPage.tsx`.
2. Use `JSON.stringify()` to output the `MOCK_PROJECTS` array from `MockProjects.ts` in the `render` method of the component.

   > **TIPS:**
   >
   > - React components can only return one root element so you will need to wrap the `<h1>` and `<pre>` tags in a `<Fragment></Fragment>` or an outer `<div>`.
   > - Wrapping output in a HTML `<pre></pre>` (preformatted) tag retains whitespace.
   > - To switch to JavaScript in JSX use `{ }`
   > - JSON.stringify(MOCK_PROJECTS, null, ' ')'s third argument is used to insert white space into the output JSON string for readability purposes.

   ![image](https://user-images.githubusercontent.com/1474579/64889510-85efa380-d63b-11e9-8dc5-86f6dce8cec2.png)

   ### Solution

   #### `src\projects\ProjectsPage.tsx`

   ```diff
   - import React from 'react';
   + import React, { Fragment } from 'react';
   + import { MOCK_PROJECTS } from './MockProjects';

   function ProjectsPage() {
     return (
   +   <Fragment>
        <h1>Projects</h1>
   +    <pre>{JSON.stringify(MOCK_PROJECTS, null, ' ')}</pre>
   +   </Fragment>
     );
   }

   export default ProjectsPage;
   ```

---

### &#10004; You have completed Lab 5
