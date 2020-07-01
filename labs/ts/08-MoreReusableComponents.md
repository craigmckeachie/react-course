# Lab 8: More Reusable Components

## Objectives

- [ ] Create another reusable component
- [ ] Render the reusable component

---

## Steps

### Create another reusable component

1. Create the file `src\projects\ProjectCard.tsx`.
1. Implement a `ProjectCard` as a **function** (not class) component that meets the following specifications:

   1. Takes a `project` object as a `prop`.
      > Note: If using TypeScript you will need to create an interface to define the properties that come into the component.
   1. Cut the `<div className="card">...</div>` from the `ProjectList` component and use it as the JSX for the `ProjectCard` component.
   1. Add a function to format the description to 60 characters and call it when rendering the description.

   #### `src\projects\ProjectCard.tsx`

   ```tsx
   import { Project } from './Project';
   import React from 'react';

   function formatDescription(description: string): string {
     return description.substring(0, 60) + '...';
   }

   interface ProjectCardProps {
     project: Project;
   }

   function ProjectCard(props: ProjectCardProps) {
     const { project } = props;
     return (
       <div className="card">
         <img src={project.imageUrl} alt={project.name} />
         <section className="section dark">
           <h5 className="strong">
             <strong>{project.name}</strong>
           </h5>
           <p>{formatDescription(project.description)}</p>
           <p>Budget : {project.budget.toLocaleString()}</p>
         </section>
       </div>
     );
   }

   export default ProjectCard;
   ```

### Render the reusable component

1. Open the file `src\projects\ProjectList.tsx`.
1. Render the `ProjectCard` component passing it the `project` as a `prop`.

   #### `src\projects\ProjectList.tsx`

   ```diff
   import React from 'react';
   import { Project } from './Project';
   + import ProjectCard from './ProjectCard';

   interface ProjectListProps {
     projects: Project[];
   }

   class ProjectList extends React.Component<ProjectListProps> {
     render() {
       const { projects } = this.props;
       const items = projects.map(project => (
         <div key={project.id} className="cols-sm">
   -      <img src={project.imageUrl} alt={project.name} />
   -       <section className="section dark">
   -         <h5 className="strong">
   -           <strong>{project.name}</strong>
   -         </h5>
   -         <p>{project.description}</p>
   -        <p>Budget : {project.budget.toLocaleString()}</p>
   -       </section>
   +      <ProjectCard project={project}></ProjectCard>
         </div>
       ));
       return <div className="row">{items}</div>;
     }
   }

   export default ProjectList;
   ```

1. **Verify** the **project** **data** **displays** correctly (_it should still look the same as it did in the last lab except for the ... after the description_) in the browser.

   ![image](https://user-images.githubusercontent.com/1474579/86285065-f8714600-bbb1-11ea-93f2-1ea2548f6d17.png)

>

---

### &#10004; You have completed Lab 8
