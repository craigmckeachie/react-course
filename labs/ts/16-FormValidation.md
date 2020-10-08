# Lab 16: Form Validation

## Objectives

- [ ] Add Form Validation

## Steps

### Add Form Validation

1. **Open** the file `src\project\ProjectForm.tsx`

1. **Initialize** an `errors` object as a state variable to `{name: '', description: '', budget: ''}` so we can hold form errors in the component's `state`.

   #### `src\projects\ProjectForm.tsx`

   ```diff
   ...

   function ProjectForm({
     project: initialProject,
     onSave,
     onCancel,
   }: ProjectFormProps) {
     const [project, setProject] = useState(initialProject);
   + const [errors, setErrors] = useState({
   +   name: '',
   +   description: '',
   +   budget: '',
   + });

   ...

   }
   export default ProjectForm;
   ```

1. **Implement** a `validate` function in the `ProjectForm` component that meets these **requirements**.

   1. Name is required.
   2. Name needs to be at least 3 characters long.
   3. Description is required.
   4. Budget must be greater than \$0.

   Also, **implement** an `isValid` function in the `ProjectForm` component that checks whether there are any validation errors.

   #### `src\projects\ProjectForm.tsx`

   ```diff
   ...
   function ProjectForm({
     project: initialProject,
     onSave,
     onCancel,
   }: ProjectFormProps) {
     const [project, setProject] = useState(initialProject);
     const [errors, setErrors] = useState({
       name: '',
       description: '',
       budget: '',
     });

     const handleChange = (event: any) => {
       ...
     };

   +  function validate(project: Project) {
   +    let errors: any = { name: '', description: '', budget: '' };
   +    if (project.name.length === 0) {
   +      errors.name = 'Name is required';
   +    }
   +    if (project.name.length > 0 && project.name.length < 3) {
   +      errors.name = 'Name needs to be at least 3 characters.';
   +    }
   +    if (project.description.length === 0) {
   +      errors.description = 'Description is required.';
   +    }
   +    if (project.budget === 0) {
   +      errors.budget = 'Budget must be more than $0.';
   +    }
   +    return errors;
   +  }

   +  function isValid() {
   +    return (
   +      errors.name.length === 0 &&
   +      errors.description.length === 0 &&
   +      errors.budget.length === 0
   +    );
   +  }

     return (
       ...
     );
   }

   export default ProjectForm;
   ```

1. Call the `validate` function inside `handleChange` to determine if there are any errors and then set them into the `errors` state variable.

   ```diff
   ...
   function ProjectForm({
     project: initialProject,
     onSave,
     onCancel,
   }: ProjectFormProps) {
   ...

     const handleChange = (event: any) => {
       const { type, name, value, checked } = event.target;
       // if input type is checkbox use checked
       // otherwise it's type is text, number etc. so use value
       let updatedValue = type === 'checkbox' ? checked : value;

       //if input type is number convert the updatedValue string to a number
       if (type === 'number') {
         updatedValue = Number(updatedValue);
       }
       const change = {
         [name]: updatedValue,
       };

       let updatedProject: Project;
       // need to do functional update b/c
       // the new project state is based on the previous project state
       // so we can keep the project properties that aren't being edited like project.id
       // the spread operator (...) is used to
       // spread the previous project properties and the new change
       setProject((p) => {
         updatedProject = new Project({ ...p, ...change });
         return updatedProject;
       });
   +    setErrors(() => validate(updatedProject));
     };


     return (
       ...
     );
   }

   export default ProjectForm;
   ```

1. **Call** the `isValid` function on form submit and return back out of the function before saving changes if the form is invalid.

   #### `src\projects\ProjectForm.tsx`

   ```diff
   ...
   function ProjectForm({
     project: initialProject,
     onSave,
     onCancel,
   }: ProjectFormProps) {
   ...

     const handleSubmit = (event: SyntheticEvent) => {
       event.preventDefault();
   +    if (!isValid()) return;
       onSave(project);
     };

   ...

     return (
       ...
     );
   }

   export default ProjectForm;
   ```

1. In the JSX returned by the component: **display** the **validation messages** **using** the following `HTML` template.

   ```html
   <div class="card error">
     <p>error message</p>
   </div>
   ```

   #### `src\projects\ProjectForm.tsx`

   ```diff
   ...
   function ProjectForm({
     project: initialProject,
     onSave,
     onCancel,
   }: ProjectFormProps) {
     const [project, setProject] = useState(initialProject);
     const [errors, setErrors] = useState({
       name: '',
       description: '',
       budget: '',
     });
     ...

     return (
       <form className="input-group vertical" onSubmit={handleSubmit}>
         <label htmlFor="name">Project Name</label>
         <input
           type="text"
           name="name"
           placeholder="enter name"
           value={project.name}
           onChange={handleChange}
         />
   +      {errors.name.length > 0 && (
   +        <div className="card error">
   +          <p>{errors.name}</p>
   +        </div>
   +      )}

         <label htmlFor="description">Project Description</label>
         <textarea
           name="description"
           placeholder="enter description"
           value={project.description}
           onChange={handleChange}
         />
   +      {errors.description.length > 0 && (
   +        <div className="card error">
   +          <p>{errors.description}</p>
   +        </div>
   +      )}

         <label htmlFor="budget">Project Budget</label>
         <input
           type="number"
           name="budget"
           placeholder="enter budget"
           value={project.budget}
           onChange={handleChange}
         />
   +      {errors.budget.length > 0 && (
   +        <div className="card error">
   +          <p>{errors.budget}</p>
   +        </div>
   +      )}

         <label htmlFor="isActive">Active?</label>
         <input
           type="checkbox"
           name="isActive"
           checked={project.isActive}
           onChange={handleChange}
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

1. **Verify** the application is working by **following these steps**.
   1. **Click** the **edit** **button** on any project.
   2. **Delete** the contents of the **project name** textbox.
   3. **Verify** the **error message** displays.
   4. **Test** the **other** validation rules.

---

### &#10004; You have completed Lab 16
