# Lab 10: Creating a Form to Edit Your Data

## Objectives

- [ ] Create a form component
- [ ] Render the form component

## Steps

### Create a form component

1. Add the following CSS style to to set the width of the form.
   #### `src\index.css`
   ```css
   form {
     min-width: 300px;
   }
   ```
2. Create the file `src\projects\ProjectForm.tsx`.
3. Implement a `ProjectForm` **class** component that meets the following specifications:

   - Paste the HTML below into the render method of the `ProjectForm` and use your editor and the link below to identify the changes needed to the `HTML` to make it `JSX`.

     > [DOM Element vs JSX Element Differences](https://reactjs.org/docs/dom-elements.html#differences-in-attributes)

     > We will pass the `project` object as a `prop` in a later lab so you just need to render the `HTML` from the previous step as `JSX`.

     ```html
     <form class="input-group vertical">
       <label for="name">Project Name</label>
       <input type="text" name="name" placeholder="enter name" />
       <label for="description">Project Description</label>

       <textarea name="description" placeholder="enter description"></textarea>
       <label for="budget">Project Budget</label>

       <input type="number" name="budget" placeholder="enter budget" />
       <label for="isActive">Active?</label>
       <input type="checkbox" name="isActive" />

       <div class="input-group">
         <button class="primary bordered medium">Save</button>
         <span></span>
         <button type="button" class="bordered medium">cancel</button>
       </div>
     </form>
     ```

     ### Solution

     #### src\projects\ProjectForm.tsx

     ```tsx
     import React from 'react';

     class ProjectForm extends React.Component {
       render() {
         return (
           <form className="input-group vertical">
             <label htmlFor="name">Project Name</label>
             <input type="text" name="name" placeholder="enter name" />
             <label htmlFor="description">Project Description</label>
             <textarea name="description" placeholder="enter description" />
             <label htmlFor="budget">Project Budget</label>
             <input type="number" name="budget" placeholder="enter budget" />
             <label htmlFor="isActive">Active?</label>
             <input type="checkbox" name="isActive" />
             <div className="input-group">
               <button className="primary bordered medium">Save</button>
               <span />
               <button type="button" className="bordered medium">
                 cancel
               </button>
             </div>
           </form>
         );
       }
     }

     export default ProjectForm;
     ```

### Render the form component

1. Open the file `src\projects\ProjectList.tsx`.
2. Render the `ProjectForm` component below the `ProjectCard`.

   #### `src\projects\ProjectList.tsx`

   ```diff
   ...
   + import ProjectForm from './ProjectForm';
   ...
   class ProjectList extends React.Component<ProjectListProps> {
     render() {
       const { projects } = this.props;
       const items = projects.map(project => (
         <div key={project.id} className="cols-sm">
           <ProjectCard project={project}></ProjectCard>
   +       <ProjectForm />
         </div>
       ));
       return <div className="row">{items}</div>;
     }
   }
   ```

3. **Verify** a **form** **renders** under each card in the application.

   ![image](https://user-images.githubusercontent.com/1474579/64896991-c8bb7680-d64f-11e9-913c-b3e8521a74e3.png)

---

### &#10004; You have completed Lab 10
