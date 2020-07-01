# Lab 16: Form Validation

## Objectives

- [ ] Add Form Validation

## Steps

### Add Form Validation

1. **Open** the file `src\project\ProjectForm.tsx`
1. **Add** an `errors` object of type `any` to the component's state interface `ProjectFormState`.

   #### `src\projects\ProjectForm.tsx`

   ```diff
   interface ProjectFormState {
     project: Project;
   +  errors: any;
   }
   ```

1. **Initialize** the `errors` object to `{name: '', description: '', budget: ''}` so we can hold form errors in the component's `state`.

   #### `src\projects\ProjectForm.tsx`

   ```diff
   class ProjectForm extends React.Component<ProjectFormProps, ProjectFormState> {
     state = {
       project: this.props.project,
   +    errors: { name: '', description: '', budget: '' }
     };
   }
   ```

1. **Implement** a `validate` method in the `ProjectForm` component that meets these **requirements**.

   1. Name is required.
   2. Name needs to be at least 3 characters long.
   3. Description is required.
   4. Budget must be greater than \$0.

   #### `src\projects\ProjectForm.tsx`

   ```tsx
   class ProjectForm extends React.Component<ProjectFormProps, ProjectFormState> {
   ...

    validate = (project: Project) => {
      let errors: any = { name: '', description: '', budget: '' };
      if (project.name.length === 0) {
        errors.name = 'Name is required';
      }
      if (project.name.length > 0 && project.name.length < 3) {
        errors.name = 'Name needs to be at least 3 characters.';
      }
      if (project.description.length === 0) {
        errors.description = 'Description is required.';
      }
      if (project.budget === 0) {
        errors.budget = 'Budget must be more than $0.';
      }
      return errors;
    };
   ...
   }
   ```

1. Call the `validate` method to determine if there are any errors in `handleChange`.

   ```diff
   class ProjectForm extends React.Component<ProjectFormProps, ProjectFormState> {
   ...
     handleChange = (event: any) => {
       const { type, name, value, checked } = event.target;
       let updatedValue = type === 'checkbox' ? checked : value;
       if (type === 'number') {
         updatedValue = +updatedValue;
       }
       const updatedProject = {
         [name]: updatedValue
       };

       this.setState((previousState: ProjectFormState) => {
         // Shallow clone using Object.assign while updating changed property
         const project = Object.assign(
           new Project(),
           previousState.project,
           updatedProject
         );
   +      const errors = this.validate(project);
   -       return { project };
   +      return { project, errors };
       });
     };
   ...
   }
   ```

1. **Implement** an `isValid` method in the `ProjectForm` component that checks whether there are any validation errors.

   #### `src\projects\ProjectForm.tsx`

   ```tsx
   class ProjectForm extends React.Component<ProjectFormProps, ProjectFormState> {
   ...

     isValid = () => {
       const { errors } = this.state;
       return (
         errors.name.length === 0 &&
         errors.description.length === 0 &&
         errors.budget.length === 0
       );
     };
   ...
   }
   ```

1. **Call** the `isValid` method on form submit.

   #### `src\projects\ProjectForm.tsx`

   ```diff
   class ProjectForm extends React.Component<ProjectFormProps, ProjectFormState> {
     ...

     validate = (project: Project) => {
       ...
     };

     ...
    handleSubmit = (event: SyntheticEvent) => {
      event.preventDefault();
   +   if (!this.isValid()) return;
      this.props.onSave(this.state.project);
    };
      ...
   }
   ```

1. In the `render` method of the component: **display** the **validation messages** **using** the following `HTML` template.

   ```html
   <div class="card error">
     <p>error message</p>
   </div>
   ```

   #### `src\projects\ProjectForm.tsx`

   ```diff
   ...
   render() {
     const { onCancel, onRemove } = this.props;
     return (
       <form
         className="input-group vertical"
         onSubmit={e => {
           this.handleSubmit(e);
         }}
       >
         <label htmlFor="name">Project Name</label>
         <input
           type="text"
           name="name"
           value={this.state.project.name}
           onChange={this.handleChange}
           placeholder="enter name"
         />

   +      {this.state.errors.name.length > 0 && (
   +        <div className="card error">
   +          <p>{this.state.errors.name}</p>
   +        </div>
   +      )}

         <label htmlFor="description">Project Description</label>
         <textarea
           name="description"
           value={this.state.project.description}
           onChange={this.handleChange}
           placeholder="enter description"
         ></textarea>
   +      {this.state.errors.description.length > 0 && (
   +        <div className="card error">
   +          <p>{this.state.errors.description}</p>
   +        </div>
   +      )}

         <label htmlFor="budget">Project Budget</label>
         <input
           type="number"
           name="budget"
           value={this.state.project.budget}
           onChange={this.handleChange}
           placeholder="enter budget"
         />
   +      {this.state.errors.budget.length > 0 && (
   +        <div className="card error">
   +          <p>{this.state.errors.budget}</p>
   +        </div>
   +      )}

         <label htmlFor="isActive">Active?</label>
         <input
           type="checkbox"
           checked={this.state.project.isActive}
           onChange={this.handleChange}
           name="isActive"
         />

       ...
       </form>
     );
   }
   ...
   ```

1. **Verify** the application is working by **following these steps**.
   1. **Click** the **edit** **button** on any project.
   2. **Delete** the contents of the **project name** textbox.
   3. **Verify** the **error message** displays.
   4. **Test** the **other** validation rules.

---

### &#10004; You have completed Lab 16
