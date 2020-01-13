# Lab 8: More Reusable Components

## Objectives

- [ ] Create another reusable component
- [ ] Render the reusable component

---

## Steps

### Create another reusable component

1. Create the file `src\projects\ProjectCard.js`.
1. Implement a `ProjectCard` as a **function** (not class) component that meets the following specifications:

   1. Takes a `project` object as a `prop`.
      > Define the type of the object using the `prop-types` library.
   1. Cut the `<div className="card">...</div>` from the `ProjectList` component and use it as the JSX for the `ProjectCard` component.

   #### `src\projects\ProjectCard.js`

   ```js
   import { Project } from './Project';
   import React from 'react';
   import PropTypes from 'prop-types';

   function ProjectCard(props) {
     const { project } = props;
     return (
       <div className="card">
         <img src={project.imageUrl} alt={project.name} />
         <section className="section dark">
           <h5 className="strong">
             <strong>{project.name}</strong>
           </h5>
           <p>{project.description}</p>
           <p>Budget : {project.budget.toLocaleString()}</p>
         </section>
       </div>
     );
   }

   ProjectCard.propTypes = {
     project: PropTypes.instanceOf(Project).isRequired
   };

   export default ProjectCard;
   ```

### Render the reusable component

1. Open the file `src\projects\ProjectList.js`.
1. Render the `ProjectCard` component passing it the `project` as a `prop`.

   #### `src\projects\ProjectList.js`

   ```diff
   import React from 'react';
   import { Project } from './Project';
   + import ProjectCard from './ProjectCard';

   interface ProjectListProps {
     projects: Project[];
   }

   class ProjectList extends React.Component{
     render() {
       const { projects } = this.props;
       const items = projects.map(project => (
         <div key={project.id} className="cols-sm">
   -       <section className="section dark">
   -         <h5 className="strong">
   -           <strong>{project.name}</strong>
   -         </h5>
   -         <p>{project.description}</p>
   -        <p>Budget : {project.budget.toLocaleString()}</p>
   -       </section>
   +      <ProjectCard project={project} />
         </div>
       ));
       return <div className="row">{items}</div>;
     }
   }

   export default ProjectList;
   ```

1. **Verify** the **project** **data** **displays** correctly (_it should still look the same as it did in the last lab_) in the browser.

   ![image](https://user-images.githubusercontent.com/1474579/64892497-89d2f400-d642-11e9-84b2-ee9463c6192f.png)

>

---

### &#10004; You have completed Lab 8
