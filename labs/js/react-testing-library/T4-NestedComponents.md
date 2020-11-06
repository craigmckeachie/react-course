# Testing Lab 4: Nested Components

## Objectives

- [ ] Test Setup
- [ ] Testing that Projects Display
- [ ] Testing Form Display
- [ ] Testing Form Cancel

## Steps

### Test Setup

1. **Create** the **file** `src\projects\__tests__\ProjectList-test.js`.
1. **Add** the **setup** code below to test the component.

   #### `src\projects\__tests__\ProjectList-test.js`

   ```js
   import { render, screen } from '@testing-library/react';
   import React from 'react';
   import { MemoryRouter } from 'react-router-dom';
   import ProjectList from '../ProjectList';
   import { MOCK_PROJECTS } from '../MockProjects';
   import userEvent from '@testing-library/user-event';
   import { Provider } from 'react-redux';
   import { store } from '../../state';

   describe('<ProjectList />', () => {
     beforeEach(() => {
       render(
         <Provider store={store}>
           <MemoryRouter>
             <ProjectList projects={MOCK_PROJECTS} />
           </MemoryRouter>
         </Provider>
       );
     });

     test('should render without crashing', () => {
       expect(screen).toBeDefined();
     });
   });
   ```

1. Verify the initial test passes.
   ```shell
     PASS  src/projects/__tests__/ProjectCard-test.js
   ```

### Testing that Projects Display

1. **Test** that the `projects` **display** correctly.

   #### `src\projects\__tests__\ProjectList-test.js`

   ```diff
   import { render, screen } from '@testing-library/react';
   import React from 'react';
   import { MemoryRouter } from 'react-router-dom';
   import ProjectList from '../ProjectList';
   import { MOCK_PROJECTS } from '../MockProjects';
   import userEvent from '@testing-library/user-event';
   import { Provider } from 'react-redux';
   import { store } from '../../state';

   describe('<ProjectList />', () => {
     beforeEach(() => {
       render(
         <Provider store={store}>
           <MemoryRouter>
             <ProjectList projects={MOCK_PROJECTS} />
           </MemoryRouter>
         </Provider>
       );
     });

     test('should render without crashing', () => {
       expect(screen).toBeDefined();
     });

   +  test('should display list', () => {
   +    expect(screen.getAllByRole('heading')).toHaveLength(MOCK_PROJECTS.length);
   +    expect(screen.getAllByRole('img')).toHaveLength(MOCK_PROJECTS.length);
   +    expect(screen.getAllByRole('link')).toHaveLength(MOCK_PROJECTS.length);
   +    expect(screen.getAllByRole('button')).toHaveLength(MOCK_PROJECTS.length);
   +  });


   });

   ```

1. Verify the test passes.
   ```shell
    PASS  src/projects/__tests__/ProjectCard-test.js
   ```

### Testing Form Display

1. Modify the card component to add an `aria-label` so we can access the button in the test.

   #### `src\projects\ProjectCard.js`

   ```diff
   ...
   function ProjectCard(props) {
   ...

     return (
       <div className="card">
         <img src={project.imageUrl} alt={project.name} />
         <section className="section dark">
           <Link to={'/projects/' + project.id}>
             <h5 className="strong">
               <strong>{project.name}</strong>
             </h5>
             <p>{formatDescription(project.description)}</p>
             <p>Budget : {project.budget.toLocaleString()}</p>
           </Link>
           <button
   +          aria-label={`edit ${project.name}`}
             className=" bordered"
             onClick={() => {
               handleEditClick(project);
             }}
           >
             <span className="icon-edit "></span>
             Edit
           </button>
         </section>
       </div>
     );
   }

   export default ProjectCard;

   ```

1. Modify the form component to add an `aria-label` and a `name` (which gives an implicit role of form) so we can access the form in the test.

   #### `src\projects\ProjectForm.js`

   ```diff
   ...

   function ProjectForm({ project: initialProject, onCancel }) {
     ...

     return (
       <form
   +      aria-label="Edit a Project"
   +      name="projectForm"
         className="input-group vertical"
         onSubmit={handleSubmit}
       >
         ...
       </form>
     );
   }

   export default ProjectForm;


   ```

1. **Test** that the **form** is displayed when edit is clicked.

   #### `src\projects\__tests__\ProjectList-test.js`

   ```diff
   ...

   describe('<ProjectList />', () => {
   ...

     test('should display list', () => {
       ...
     });

   +    test('should display form when edit clicked', () => {
   +      userEvent.click(screen.getByRole('button', { name: /edit Wisozk Group/i }));
   +      expect(
   +        screen.getByRole('form', {
   +          name: /edit a project/i,
   +        })
   +      ).toBeInTheDocument();
   +    });


   });

   ```

1. Verify the test passes.

   ```shell
   PASS  src/projects/__tests__/ProjectCard-test.js
   ```

### Testing Form Cancel

1. **Test** that the **form** is removed after clicking cancel.

   #### `src\projects\__tests__\ProjectList-test.js`

   ```diff
   ...

   describe('<ProjectList />', () => {
   ...

   +  test('should display image and remove form when cancel clicked', () => {
   +    userEvent.click(screen.getByRole('button', { name: /edit Wisozk Group/i }));
   +    userEvent.click(
   +      screen.getByRole('button', {
   +        name: /cancel/i,
   +      })
   +    );
   +    expect(
   +      screen.getByRole('img', {
   +        name: /wisozk group/i,
   +      })
   +    ).toBeInTheDocument();
   +    expect(
   +      screen.queryByRole('form', {
   +        name: /edit a project/i,
   +      })
   +    ).not.toBeInTheDocument();
   +  });

   });

   ```

1. Verify the test passes.

   ```shell
   PASS  src/projects/__tests__/ProjectCard-test.js
   ```

---

### &#10004; You have completed Testing Lab 4
