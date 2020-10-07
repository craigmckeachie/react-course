# Lab 12: Hiding and Showing Components

## Objectives

- [ ] Add state to a component
- [ ] Hide and show a component

## Steps

### Add state to a component

1. Add a state variable `projectBeingEdited` to hold which project is currently being edited. And update `handleEdit` to set the `projectBeingEdited` variable.

   #### `src\projects\ProjectList.tsx`

   ```diff
   - import React from 'react';
   + import React, { useState } from 'react';
   import { Project } from './Project';
   import ProjectCard from './ProjectCard';
   import ProjectForm from './ProjectForm';

   interface ProjectListProps {
     projects: Project[];
   }

   function ProjectList({ projects }: ProjectListProps) {
   + const [projectBeingEdited, setProjectBeingEdited] = useState({});

     const handleEdit = (project: Project) => {
   -    console.log(project);
   +    setProjectBeingEdited(project);
     };

     return (
       ...
     );
   }

   export default ProjectList;
   ```

### Hide and show a component

1. Conditionally render the `ProjectForm` when the projectBeingEdited equals the current project in the list, otherwise display a `ProjectCard` .

   #### src\projects\ProjectList.tsx

```diff
...

function ProjectList({ projects }: ProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});
  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };

  return (
    <div className="row">
      {projects.map((project) => (
        <div key={project.id} className="cols-sm">
-          <ProjectCard project={project} onEdit={handleEdit} />
-          <ProjectForm />
+          {project === projectBeingEdited ? (
+            <ProjectForm />
+          ) : (
+            <ProjectCard project={project} onEdit=+{handleEdit} />
+          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
```

2. **Verify** the application is **working** by _following these steps_:

   1. **Open** the application in your browser and refresh the page.
   2. **Click** the **edit** button for a project.
   3. **Verify** the `<ProjectCard />` is removed and replaced by the `<ProjectForm/>`.

      > The `<ProjectForm/>` will be empty at this point. We will fill in the data in a future lab.

      > You can do click another edit button on another `ProjectCard` and that card will change to a form. At this point, you may notice that the cancel button doesn't work. We will get that working in the next lab.

   ![image](https://user-images.githubusercontent.com/1474579/64925618-6b473700-d7c1-11e9-9cbc-f2899bc1968a.png)

---

### &#10004; You have completed Lab 12
