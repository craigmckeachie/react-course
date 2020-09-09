# Lab 25: Redux with React

## Objectives

- [ ] Refactor the Page (container) component to use React Redux Hooks
- [ ] Refactor the Form component to be a Redux connected component

## Steps

### Refactor the Page (container) component to use React Redux Hooks

1. Remove the Page (container) component's local state and replace with Redux state using useSelector. Also, get a reference to the Store's dispatch function using useDispatch so we can dispatch actions.

   #### `src\projects\ProjectsPage.tsx`

   > Make sure you are in Project**s**Page.tsx not ProjectPage.tsx.

   ```diff
   import React, { Fragment, useEffect } from 'react';
   import ProjectList from './ProjectList';
   import { Project } from './Project';
   + import { useSelector, useDispatch } from 'react-redux';
   + import { AppState } from '../state';

   function ProjectsPage() {
   -  const [projects, setProjects] = useState<Project[]>([]);
   -  const [loading, setLoading] = useState(false);
   -  const [error, setError] = useState(undefined);
   -  const [currentPage, setCurrentPage] = useState(1);

   +  const loading = useSelector(
   +    (appState: AppState) => appState.projectState.loading
   +  );
   +  const projects = useSelector(
   +    (appState: AppState) => appState.projectState.projects
   +  );
   +  const error = useSelector(
   +    (appState: AppState) => appState.projectState.error
   +  );
   +  const currentPage = useSelector(
   +    (appState: AppState) => appState.projectState.page
   +  );
   +  const dispatch = useDispatch();

   ...
   }
   ```

1. Replace state setter function calls and API calls with calls to dispatch passing action creators.

   #### `src\projects\ProjectsPage.tsx`

   ```diff
   - import { Project } from './Project';
   - import { projectAPI } from './projectAPI';

   - import React, { Fragment, useState, useEffect } from 'react';
   + import React, { Fragment, useEffect } from 'react';

   + import { loadProjects } from './state/projectActions';

   function ProjectsPage() {
     ...
     const dispatch = useDispatch();

   -  useEffect(() => {
   -    setLoading(true);
   -    projectAPI
   -      .get(currentPage)
   -      .then((data) => {
   -        setLoading(false);
   -        if (currentPage === 1) {
   -          setProjects(data);
   -        } else {
   -          setProjects((projects) => [...projects, ...data]);
   -        }
   -      })
   -      .catch((e) => {
   -        setLoading(false);
   -        setError(e.message);
   -      });
   -  }, [currentPage]);

   +  useEffect(() => {
   +    dispatch(loadProjects(1));
   +  }, [dispatch]);

     const handleMoreClick = () => {
   -    setCurrentPage((currentPage) => currentPage + 1);
   +    dispatch(loadProjects(currentPage + 1));
     };

   -  const saveProject = (project: Project) => {
   -    projectAPI
   -      .put(project)
   -      .then((updatedProject) => {
   -        let updatedProjects = projects.map((p: Project) => {
   -          return p.id === project.id ? project : p;
   -        });
   -        setProjects(updatedProjects);
   -      })
   -      .catch((e) => {
   -        setError(e.message);
   -      });
   -  };

     return (
       <Fragment>
         ...
   -      <ProjectList onSave={saveProject} projects={projects} />
   +      <ProjectList projects={projects} />
         ...
       </Fragment>
     );
   }
   ...
   ```

1. Provide the store.

   #### `src\App.tsx`

   ```diff
   import ProjectPage from './projects/ProjectPage';
   + import { Provider } from 'react-redux';
   + import { store } from './state';

   const App: React.FC = () => {
     return (
   +    <Provider store={store}>
         <Router>
           <header className="sticky">
             <span className="logo">
               <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
             </span>
             <NavLink to="/" exact className="button rounded">
               <span className="icon-home"></span>
               Home
             </NavLink>
             <NavLink to="/projects/" className="button rounded">
               Projects
             </NavLink>
           </header>
           <div className="container">
             <Switch>
               <Route path="/" exact component={HomePage} />
               <Route path="/projects" exact component={ProjectsPage} />
               <Route path="/projects/:id" component={ProjectPage} />
             </Switch>
           </div>
         </Router>
   +   </Provider>
     );
   };

   export default App;
   ```

### Refactor the Form component to be a Redux connected component

1. Connect the Form component so it has access to the Redux store's dispatch function so we can dispatch the `saveProject` action.

   #### `src\projects\ProjectForm.tsx`

   ```tsx
   ...
   import { saveProject } from './state/projectActions';
   import { connect } from 'react-redux';
   ...

   // export default ProjectForm;

   // React Redux (connect)---------------

   const mapDispatchToProps = {
     onSave: saveProject
   };

   export default connect(
   null,
   mapDispatchToProps
   )(ProjectForm);

   ```

2. Provide the store.

   - This was already done in `src\App.tsx` because it is inherited from the parent Page component: Page =>List=>Form.

3. In the `ProjectList` component, remove `onSave` in the `ProjectListProps` interface and update the `render` method to not pass `onSave` to `<ProjectForm>` as it is now automatically connected to that Redux action via the `Provider`.

   #### `src\Projects\ProjectList.tsx`

   ```diff
   interface ProjectListProps {
     projects: Project[];
   -  onSave: (project: Project) => void;
   }

   interface ProjectListState {
     editingProject: Project | {};
   }

   class ProjectList extends React.Component<ProjectListProps, ProjectListState> {
     state = {
       editingProject: {}
     };
     handleEdit = (project: Project) => {
       this.setState({ editingProject: project });
     };

     cancelEditing = () => {
       this.setState({ editingProject: {} });
     };

     render() {
   -   const { projects, onSave } = this.props;
   +    const { projects } = this.props;

       let item: JSX.Element;
       const items = projects.map((project: Project) => {
         if (project !== this.state.editingProject) {
           item = (
             <div key={project.id} className="cols-sm">
               <ProjectCard
                 project={project}
                 onEdit={() => {
                   this.handleEdit(project);
                 }}
               ></ProjectCard>
             </div>
           );
         } else {
           item = (
             <div key={project.id} className="cols-sm">
               <ProjectForm
                 project={project}
   -             onSave={onSave}
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

4. **Verify** the application still works including loading and updating the projects.

---

### &#10004; You have completed Lab 25
