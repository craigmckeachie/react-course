# Lab 21: Route Parameters

## Objectives

- [ ] Navigate to a route with a parameter

## Steps

### Navigate to a route with a parameter

1. **Add** a `find` **method** to `projectAPI` to return a single `Project` by `id`

   ```diff
   const projectAPI = {
   ...

   +  find(id) {
   +    return fetch(`${url}/${id}`)
   +      .then(checkStatus)
   +      .then(parseJSON);
   +  },
   +
    ...
   };
   ```

2. **Copy** the files `snippets\lab21\[ProjectPage.js and ProjectDetail.js]` into the `src\projects` directory.
   > These files contain some pre-built components we will use in this lab. Take a moment to review the code in them.
3. Add a route to display the `ProjectPage` (notice that we now have a `ProjectPage` and a `ProjectsPage` so be careful you are in the correct file).

```diff
import ProjectsPage from './projects/ProjectsPage';
+ import ProjectPage from './projects/ProjectPage';

function App() {
  return (
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
+          <Route path="/projects/:id" component={ProjectPage} />
        </Switch>
      </div>
    </Router>
  );
}


```

4. Make the name and description clickable by adding a `<Link />` component around them.

   #### `src\projects\ProjectCard.js`

   ```diff
   + import { Link } from 'react-router-dom';
   ...
   <section className="section dark">
   +  <Link to={'/projects/' + project.id}>
       <h5 className="strong">
       <strong>{project.name}</strong>
       </h5>
       <p>{formatDescription(project.description)}</p>
       <p>Budget : {project.budget.toLocaleString()}</p>
   +  </Link>
   <button
       type="button"
       className=" bordered"
       onClick={() => {
       handleEditClick(project);
       }}
   >
       <span className="icon-edit "></span>
       Edit
   </button>
   </section>
   ...
   ```

5. **Verify** the new **route** works by the **following these steps**:

   1. **Visit** the root of the site: `http://localhost:3000/` and refresh the page in your browser.
   2. **Click** on `Projects` in the **navigation**.
   3. **Verify** you are taken to the `/projects` route and the `ProjectsPage` **displays**.
   4. **Click** on the name or description in any of the project cards .
   5. **Verify** you are taken to the `/projects/1` route and the `ProjectPage` **displays** the `ProjectDetail` component.

   <kbd><![image](https://user-images.githubusercontent.com/1474579/65079801-e77e7d80-d96d-11e9-8e1f-c8dab5ae60ba.png)</kbd>

---

### &#10004; You have completed Lab 21
