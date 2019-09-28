# Lab 25: Redux with React

## Objectives

- [ ] Refactor the Page (container) component to be a Redux connected component
- [ ] Refactor the Form component to be a Redux connected component

## Steps

### Refactor the Page (container) component to be a Redux connected component

1. Remove the Page (container) component's state.

   #### `src\projects\ProjectsPage.tsx`

   > Make sure you are in Project**s**Page.tsx not ProjectPage.tsx.

   ```diff
   - interface ProjectsPageState {
   -   projects: Project[];
   -   loading: boolean;
   -   error: string | undefined;
   -   page: number;
   - }

   class ProjectsPage extends React.Component<any,
   - ProjectsPageState
   >
   {
   -  state = {
   -    projects: [],
   -    loading: false,
   -    error: undefined,
   -    page: 20
   -  };

   }
   ```

2. Replace setState and API calls with calls to action creators passed in via props.

   #### `src\projects\ProjectsPage.tsx`

   ```diff

   class ProjectsPage extends React.Component<any, {}>{

   componentDidMount() {
       this.loadProjects();
   }

   loadProjects(page: number) {
   - this.setState({ loading: true });
   - projectAPI
   -   .get(page)
   -   .then(data => {
   -     if (page === 1) {
   -       this.setState({ projects: data, loading: false, page });
   -     } else {
   -       this.setState(previousState => {
   -         return {
   -           projects: [...previousState.projects, ...data],
   -           loading: false,
   -           page
   -         };
   -       });
   -     }
   -   })
   -   .catch(error => this.setState({ error: error.message, loading: false }));
   +    this.props.onLoad(page);
   }

   componentDidMount() {
   -  this.loadProjects(this.state.page);
   +  this.loadProjects(this.props.page);
   }

   handleMoreClick = () => {
   - const nextPage = this.state.page + 1;
   + const nextPage = this.props.page + 1;
   this.loadProjects(nextPage);
   };

   saveProject(project){
   - projectAPI
   -   .put(project)
   -   .then(data => {
   -     this.setState(state => {
   -       let projects = state.projects.map(p => {
   -         return p.id === project.id ? project : p;
   -       });
   -       return { projects };
   -     });
   -   })
   -   .catch(error => {
   -     this.setState({ error: error.message });
   -   });
   this.props.onSave(project)
   }

   }
   ```

3. In the render method, update all references to `state` to pull from `props`.

   #### `src\projects\ProjectsPage.tsx`

   ```diff
   class ProjectsPage extends React.Component<any,{}>{
   ...

   render(){
       ...
   -    {this.state.error && (
   +     this.props.error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span>
   -              {this.state.error}
   +              {this.props.error}
                </p>
              </section>
            </div>
          </div>

        )}
       ...
       <ProjectList
   -          projects={this.state.projects}
   -          onSave={this.saveProject}
   +          projects={this.props.projects}
   +          onSave={this.props.onSave}
           ></ProjectList>

   -    {!this.state.loading && !this.state.error && (
   +    {!this.props.loading && !this.props.error && (
          <div className="row">
            <div className="col-sm-12">
              <div className="button-group fluid">
                <button
                  className="button default"
                  onClick={this.handleMoreClick}
                >
                  More...
                </button>
              </div>
            </div>
          </div>
        )}

   -    {this.state.loading && (
   +     this.props.loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>

        )}

   }

   }
   ```

4) Connect the Page (container) component so it has access to the Redux store's state and is able to dispatch actions in the action creator functions passed in via props.

   > You will need to comment out the existing default export as shown below.

   #### `src\projects\ProjectsPage.tsx`

   ```tsx
   // import { projectAPI } from './projectAPI';
   import { AppState } from '../state';
   import { ProjectState } from './state/projectTypes';
   import { loadProjects, saveProject } from './state/projectActions';
   import { connect } from 'react-redux';

   // export default ProjectsPage;

   // React Redux (connect)---------------
   function mapStateToProps(state: AppState): ProjectState {
     return {
       ...state.projectState
     };
   }

   const mapDispatchToProps = {
     onLoad: loadProjects,
     onSave: saveProject
   };

   export default connect(
     mapStateToProps,
     mapDispatchToProps
   )(ProjectsPage);
   ```

   > Be sure to `import connect` from `react-redux` NOT `http2`, `net`, or `tls`.

6. Provide the store.

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

7. **Verify** the application works as it did previously including loading and updating the projects.

### Refactor the Form component to be a Redux connected component

1. Connect the Form component so it has access to the Redux store's state and is able to dispatch actions in the action creator functions passed in via props.

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

3. In the `ProjectList` component, keep `onSave` in the `ProjectListProps` interface but update the `render` method to not pass `onSave` to `<ProjectForm>` as it is now automatically connected to that Redux action via the `Provider`.

   #### `src\Projects\ProjectList.tsx`

   ```diff
   interface ProjectListProps {
     projects: Project[];
     onSave: (project: Project) => void;
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
