# Lab 5: Data

## Objectives

- [ ] Add data
- [ ] Display the data

## Steps

### Add data

1. Open File Explorer (Windows) or Finder (Mac).
1. **Copy** the `labs\js\snippets\lab05\assets` directory into the `keeptrack\public` directory.
   > When you are finished copying you should have a `keeptrack\public\assets` directory with images in it.
1. **Copy** the files `labs\js\snippets\lab05\MockProjects.js` and `labs\js\snippets\lab05\Project.js` into the `keeptrack\src\projects` directory.

### Display the data

1. Open the file `src\projects\ProjectsPage.js`.
2. Use `JSON.stringify()` to output the `MOCK_PROJECTS` array from `MockProjects.ts` in the `render` method of the component.
   > **TIPS:**
   >
   > - React components can only return one root element so you will need to wrap the `<h1>` and `<pre>` tags in a `<Fragment></Fragment>` or an outer `<div>`.
   > - Wrapping output in a HTML `<pre></pre>` (preformatted) tag retains whitespace.
   > - To switch to JavaScript in JSX use `{ }`
   > - JSON.stringify(MOCK_PROJECTS, null, ' ')'s third argument is used to insert white space into the output JSON string for readability purposes.


    ![image](https://user-images.githubusercontent.com/1474579/64889510-85efa380-d63b-11e9-8dc5-86f6dce8cec2.png)

    ### Solution
    #### `src\projects\ProjectsPage.js`

    ```diff
    import React
    +         ,{ Fragment }
        from 'react';
    + import { MOCK_PROJECTS } from './MockProjects';

    class ProjectsPage extends React.Component {
        render() {
            return (
    +        <Fragment>
                <h1>Projects</h1>
    +            <pre>{JSON.stringify(MOCK_PROJECTS, null, ' ')}</pre>
    +        </Fragment>
            );
        }
    }

    export default ProjectsPage;
    ```

---

### &#10004; You have completed Lab 5
