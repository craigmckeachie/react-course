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

2) **Add** state variables to the state of the component and initialize the value to `props.project`.

   #### `src\projects\ProjectForm.tsx`

```diff
- function ProjectForm({ onSave, onCancel }: ProjectFormProps) {
+ function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {

+  const [name, setName] = useState(project.name);
+  const [description, setDescription] = useState(project.description);
+  const [budget, setBudget] = useState(project.budget);
+  const [isActive, setIsActive] = useState(project.isActive);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSave(new Project({ name: 'Updated Project' }));
  };

  return (
    ...
  );
}

export default ProjectForm;
```

### Make form fields controlled components

1. **Make** all `<input />`s and `<textarea />`s **controlled** **components** by assigning their values to a `state` variable.

   - **Write** an event handler and wire it up to `onChange` event of all the form fields.
   - The form field **types** that need to be handled include:

     - `<input type="text" />`
     - `<input type="number" />`
     - `<input type="checkbox" />`
     - `<textarea />`

     #### `src\projects\ProjectForm.tsx`

```diff
function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [budget, setBudget] = useState(project.budget);
  const [isActive, setIsActive] = useState(project.isActive);

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
+        value={name}
+        onChange={(event) => {
+          setName(event.target.value);
+        }}
      />
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
+        value={description}
+        onChange={(event) => {
+          setDescription(event.target.value);
+        }}
      />
      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
+        value={budget}
+        onChange={(event) => {
+          setBudget(Number(event.target.value));
+        }}
      />
      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
+        checked={isActive}
+        onChange={(event) => {
+          setIsActive(Boolean(event.target.checked));
+        }}
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

1. In `handleSubmit`, when calling the `onSave` `prop` after spreading (...) the current project properties pass the state variables.

   > The JavaScript spread syntax (...) is used to copy the current project properties (including ones that are not able to be modified in the form like `Id` and `contractDate`)

   > A JavaScript object initializer syntax expression is used as well.
   > These two lines are the same.

   #### `Example: DO NOT USE THIS CODE BLOCK IN THE LABS`

   ```ts
   new Project({ ...project, name, description, budget, isActive });
   new Project({
     ...project,
     name: name,
     description: description,
     budget: budget,
     isActive: isActive,
   });
   ```

   #### `src\projects\ProjectForm.tsx`

   ```diff
   ...
   function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
   const [name, setName] = useState(project.name);
   const [description, setDescription] = useState(project.description);
   const [budget, setBudget] = useState(project.budget);
   const [isActive, setIsActive] = useState(project.isActive);

   const handleSubmit = (event: SyntheticEvent) => {
      event.preventDefault();
   -   onSave(new Project({ name: 'Updated Project' }));
      onSave(new Project({ ...project, name, description, budget, isActive }));
   };

   return (
      <form className="input-group vertical" onSubmit={handleSubmit}>
         ...
      </form>
   );
   }

   export default ProjectForm;
   ```

2. In `ProjectList` **set** the `project` **prop** on the `<ProjectForm />` in the render method of the component.

   #### `src\projects\ProjecList.tsx`

   ```diff
   function ProjectList({ projects, onSave }: ProjectListProps) {
   ...

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
   import { Project } from './Project';

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
