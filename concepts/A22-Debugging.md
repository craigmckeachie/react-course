# Debugging

1. Open **Lab 25** solution code.
2. In a command-prompt or terminal, run the commands.
   ```
   npm install
   npm start
   ```
3. In another command-prompt or terminal, run the command.
   ```shell
   npm run api
   ```

## Compiler Errors

1.  In your editor, remove the closing curly brace shown below.

    #### `src\Projects\ProjectList.[js|tsx]`

    ```diff
    <ProjectForm
        project={project
    -    }
        onCancel={this.cancelEditing}
    ></ProjectForm>
    ```

1.  You should see the following error in the terminal where you are running `npm start`.

    ```
    Failed to compile.
    src/projects/ProjectList.[js|tsx]
    Line 38:15:  Parsing error: Unexpected token, expected "}"

    36 |             <ProjectForm
    37 |               project={project
    > 38 |               onCancel={this.cancelEditing}
        |               ^
    39 |             ></ProjectForm>
    40 |           </div>
    41 |         );
    ```

1.  Add the `}` back.
1.  Verify the comile error goes away.
1.  Remove the return statement as shown below.

    #### `src\Projects\ProjectList.[js|tsx]`

    ```diff
    class ProjectList extends React.Component {
    ...
    render() {
    ...
    -    return
        <div className="row">{items}</div>;
    }
    }
    ```

1.  You should see the following error in the terminal where you are running `npm start`.

```
Failed to compile.


./src/projects/ProjectList.js
Line 17:3: Your render method should have return statement react/require-render-return
Line 46:6: Expected an assignment or function call and instead saw an expression no-unused-expressions

Search for the keywords to learn more about each error.

```

1. Add the `return` back.
1. Verify the error goes away.

## Runtime Errors

### Open Chrome DevTools

Open `Chrome DevTools` by following these steps:

1. In the upper right hand corner of `Chrome` click the `Three Dots > More Tools> Developer Tools`.

- Shortcuts:
  - (Windows, Linux): CTRL+SHIFT+I
  - (MacOS): CMD+OPTION+I

## Breakpoints

1. Open `ProjectsPage.[js|tsx]` in the Chrome DevTools `Sources` tab.

   > To find a file in the Chrome DevTools `Sources` tab and open the navigation to follow this or a similar path:
   > top/localhost:3000/Users/[your username]/Documents/git/r16/keeptrack-js/src/...
   > The path may differ depending on your operating system.

1. Set breakpoint on line 38.
1. Hover `this.props.project`
1. Open the `Console` tab.
1. Log `this.props.project`
1. Step through the code using the buttons outlined in the [JavaScript Debugging Reference](https://developers.google.com/web/tools/chrome-devtools/javascript/reference).

<!-- ## Network -->

## Resources

- [Get Started with Debugging JavaScript in Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/javascript)
- [Chrome Devtools Documentation](https://developers.google.com/web/tools/chrome-devtools)

```

```
