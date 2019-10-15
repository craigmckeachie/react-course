# Lab 14: Component Communication through Multiple Levels

## Objectives

- [ ] In a child compoonent, accept a function as a prop and invoke it and pass a parameter
- [ ] At the next level in the component hierarchy, accept a function as a prop and invoke it
- [ ] In a parent component, implement a function and pass it as a prop to a child component

## Steps

### In a child component, accept a function as a prop and invoke it and pass a parameter

1. **Open** the **file** `src\projects\ProjectForm.js`.
2. To the `propTypes`, **add** an `onSave` function.

   #### `src\projects\ProjectForm.js`

   ```diff
   ...
   ProjectForm.propTypes = {
   + onSave: PropTypes.func.isRequired,
     onCancel: PropTypes.func.isRequired
   };
   ...
   ```

3. Create an event handler function `handleSubmit` to handle the submission of the form. The function should prevent the default behavior of the browser to post to the server and then invoke the function passed into the `onSave` `prop` and pass a new `Project` that you create inline for now with just a name as shown below.

   #### `src\projects\ProjectForm.js`

   ```diff
   + import { Project } from './Project';
   ...

   class ProjectForm extends React.Component {
   +  handleSubmit = event => {
   +    event.preventDefault();
   +    this.props.onSave(new Project({ name: 'Updated Project' }));
   +  };
   ...
   }
   ```

4. Update the `<form>` tag in the `render` method to invoke handleSubmit and pass the SyntheticEvent object representing the DOM submit event.

   #### `src\projects\ProjectForm.js`

   ```diff
   <form
     className="input-group vertical"
   + onSubmit={this.handleSubmit}
   >
   ```

### At the next level in the component hierarchy, accept a function as a prop and invoke it

1. **Open** the **file** `src\projects\ProjectList.js`.
2. To the `propTypes`, **add** an `onSave` **event handler**.

#### `src\projects\ProjectList.js`



```diff
ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
+  onSave: PropTypes.func.isRequired
};
```

3. **Update** the `<ProjectForm>` component tag to **handle** a `onSave` event and have it **invoke** the function passed into the `onSave` `prop`.

   #### `src\projects\ProjectList.js`

   ```diff
   class ProjectList extends React.Component {
   ...
   render() {
       const { projects,
   +            onSave
               } = this.props;

       let item: JSX.Element;
       const items = projects.map((project) => {
       if (project !== this.state.editingProject) {
           ...
           );
       } else {
           item = (
           <div key={project.id} className="cols-sm">
               <ProjectForm
   +              onSave={onSave}
                  onCancel={this.cancelEditing}
               ></ProjectForm>
           </div>
           );
       }
       return item;
       });

       return <div className="row">{items}</div>;
   }
   }
   ```

### In a parent component, implement a function and pass it as a prop to a child component

1. In the file `src\projects\ProjectPage.js`:

   1. **Add** a `saveProject`**event handler** that takes a `project` to `ProjectPage` and `console.log`'s the project out.
   2. **Wire** up the **onSave** **event** of the `<ProjectList />` component rendered in the `ProjectPage` to the `saveProject` event handler.

   #### `src\projects\ProjectPage.js`

   ```diff
   import React, { Fragment } from 'react';
   import { MOCK_PROJECTS } from './MockProjects';
   import ProjectList from './ProjectList';

   class ProjectsPage extends React.Component {
   +  saveProject = (project) => {
   +    console.log('Saving project: ', project);
   +  };
   render() {
       return (
       <Fragment>
           <h1>Projects</h1>
           <ProjectList
   +         onSave={this.saveProject}
           projects={MOCK_PROJECTS} />
       </Fragment>
       );
   }
   }

   export default ProjectsPage;
   ```

1. **Verify** the **application** is working by _following these steps_:

   1. **Open** the application in your browser and refresh the page.
   2. **Open** the Chrome DevTools to the `console` (`F12` or `fn+F12` on laptop).
   3. **Click** the **edit** button for a project.
   4. **Click** the **save** button on the form.
   5. **Verify** the `<ProjectForm/>` is removed and replaced by the `<ProjectCard />`.
   6. **Verify** the updated project is logged to the Chrome DevTools `console`.
      > Note that the `ProjectCard` info will not be updated at this point.

   ![image](https://user-images.githubusercontent.com/1474579/64926834-66d64a80-d7d0-11e9-8dd9-7501589c6d08.png)

---

### &#10004; You have completed Lab 14
