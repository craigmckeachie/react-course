# Lab 15: Form Values to State

## Objectives

- [ ] Add form data to component state
- [ ] Make form fields controlled components
- [ ] Handle submission of the form

## Steps

### Add form data to component state

1. **Open** the **file** `src\projects\ProjectForm.tsx`.
1. On the `ProjectFormProps` **interface** add the `project` prop to it.

   #### `src\projects\ProjectForm.tsx`

   ```diff
   interface ProjectFormProps {
   + project: Project;
     onSave: (project: Project) => void;
     onCancel: () => void;
   }
   ```

1. **Destructure** the `project` prop in the function component signature and **rename** it `initialProject` so that we can name our state variable `project`. Next, **create** a _state variable_ `project` using the `useState` hook.

   #### `src\projects\ProjectForm.tsx`

   ```diff
   - import React from 'react';
   + import React, { useState } from 'react';

   function ProjectForm({
   + project: initialProject,
     onSave,
     onCancel,
   }: ProjectFormProps) {
   +  const [project, setProject] = useState(initialProject);

   const handleSubmit = (event: SyntheticEvent) => {
      event.preventDefault();
      onSave(new Project({ name: 'Updated Project' }));
   };

   ...
   }
   ```

### Make form fields controlled components

1. **Make** all `<input />`s and `<textarea />`s **controlled** **components** by assigning their values to a `project` property on `state`.

   - **Write** a `handleChange` event handler and wire it up to `onChange` event of all the form fields.
   - The form field **types** that need to be handled include:

     - `<input type="text" />`
     - `<input type="number" />`
     - `<input type="checkbox" />`
     - `<textarea />`
       > Alternatively, you could write a separate handler for each of the form field types and invoke them as appropriate but this can be tedious and more difficult to maintain.

     #### `src\projects\ProjectForm.tsx`

```diff
...
function ProjectForm({
  project: initialProject,
  onSave,
  onCancel,
}: ProjectFormProps) {
  const [project, setProject] = useState(initialProject);
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSave(new Project({ name: 'Updated Project' }));
  };

+  const handleChange = (event: any) => {
+    const { type, name, value, checked } = event.target;
+    // if input type is checkbox use checked
+    // otherwise it's type is text, number etc. so use value
+    let updatedValue = type === 'checkbox' ? checked : value;
+
+    //if input type is number convert the updatedValue string to a +number
+    if (type === 'number') {
+      updatedValue = Number(updatedValue);
+    }
+    const change = {
+      [name]: updatedValue,
+    };
+
+    let updatedProject: Project;
+    // need to do functional update b/c
+    // the new project state is based on the previous project state
+    // so we can keep the project properties that aren't being edited +like project.id
+    // the spread operator (...) is used to
+    // spread the previous project properties and the new change
+    setProject((p) => {
+      updatedProject = new Project({ ...p, ...change });
+      return updatedProject;
+    });
+  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
+       value={project.name}
+       onChange={handleChange}
      />
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
+       value={project.description}
+       onChange={handleChange}
      />
      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
+       value={project.budget}
+       onChange={handleChange}
      />
      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
+       checked={project.isActive}
+       onChange={handleChange}
      />
      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
```

### Handle submission of the form

1. In `handleSubmit`, when calling the `onSave` `prop` pass `state.project` instead of `new Project({ name: 'Updated Project' })`.

   #### `src\projects\ProjectForm.tsx`

```diff
...
function ProjectForm({
  project: initialProject,
  onSave,
  onCancel,
}: ProjectFormProps) {
  const [project, setProject] = useState(initialProject);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
-   onSave(new Project({ name: 'Updated Project' }));
+   onSave(project);
  };
  ...
}

export default ProjectForm;
```

2. In `ProjectList` **set** the `project` **prop** into the `<ProjectForm />`.

   #### `src\projects\ProjecList.tsx`

   ```diff
   ...
   function ProjectList({ projects, onSave }: ProjectListProps) {
   const [projectBeingEdited, setProjectBeingEdited] = useState({});

   const handleEdit = (project: Project) => {
      setProjectBeingEdited(project);
   };

   const cancelEditing = () => {
      setProjectBeingEdited({});
   };

   return (
      <div className="row">
         {projects.map((project) => (
         <div key={project.id} className="cols-sm">
            {project === projectBeingEdited ? (
               <ProjectForm
   +              project={project}
               onSave={onSave}
               onCancel={cancelEditing}
               />
            ) : (
               <ProjectCard project={project} onEdit={handleEdit} />
            )}
         </div>
         ))}
      </div>
   );
   }

   export default ProjectList;
   ```

3. ProjectsPage update the project.

   #### `src\projects\ProjectsPage.tsx`

   ```diff
   import React, { Fragment,
   + useState } from 'react';
   import { MOCK_PROJECTS } from './MockProjects';
   import ProjectList from './ProjectList';
   + import { Project } from './Project';

   function ProjectsPage() {
   +  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

   const saveProject = (project: Project) => {
   -   console.log('Saving project: ', project);
   +    let updatedProjects = projects.map((p: Project) => {
   +      return p.id === project.id ? project : p;
   +    });
   +    setProjects(updatedProjects);
   };

   return (
      <Fragment>
         <h1>Projects</h1>
   -      <ProjectList onSave={saveProject} projects={MOCK_PROJECTS} />
   +      <ProjectList onSave={saveProject} projects={projects} />
      </Fragment>
   );
   }

   export default ProjectsPage;
   ```

4. **Verify** the application is working by following these **steps** in your browser.
   1. **Click** the **edit** button for a project.
   2. **Change** the **project name** in the form.
   3. **Click** **save** on the form.
   4. **Verify** the card shows the **updated** data.
      > Note that if you refresh your browser page your changes will not persist because the updates are only happening in the browser's memory. We will get a more permanent save working in a future lab when we communicate to our backend web API.

---

### &#10004; You have completed Lab 15
