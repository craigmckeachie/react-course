# Lab 18: HTTP GET

## Objectives

- [ ] Create an API object that loads data from an REST API
- [ ] Update a component to use the API object
- [ ] Add Pagination

## Steps

### Create an API object that loads data from an REST API

1.  Create the file `src\projects\projectAPI.js`.
1.  Create a `projectAPI` object and export it from the file.
1.  Implement a `get` method that requires `page` and `limit` parameters and sets the default to `page = 1` and `limit=20`.
    The projects should be sorted by name.

    > [json-server ](https://github.com/typicode/json-server/blob/master/README.md) supports sorting and paging using the following syntax.

    ```js
    `${url}?_page=${page}&_limit=${limit}&_sort=name`;
    ```

    #### `src\projects\projectAPI.js`

    ```js
    import { Project } from './Project';

    const baseUrl = 'http://localhost:4000';
    const url = `${baseUrl}/projects`;

    function translateStatusToErrorMessage(status) {
      switch (status) {
        case 401:
          return 'Please login again.';
        case 403:
          return 'You do not have permission to view the project(s).';
        default:
          return 'There was an error retrieving the project(s). Please try again.';
      }
    }

    function checkStatus(response) {
      if (response.ok) {
        return response;
      } else {
        const httpErrorInfo = {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
      }
    }

    function parseJSON(response) {
      return response.json();
    }

    // eslint-disable-next-line
    function delay(ms) {
      return function (x) {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
      };
    }

    const projectAPI = {
      get(page = 1, limit = 20) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
          .then(delay(600))
          .then(checkStatus)
          .then(parseJSON)
          .then((projects) => {
            return projects.map((p) => {
              return new Project(p);
            });
          })
          .catch((error) => {
            console.log('log client error ' + error);
            throw new Error(
              'There was an error retrieving the projects. Please try again.'
            );
          });
      },
    };

    export { projectAPI };
    ```

### Update a component to use the API object

1. **Open** the file `src\projects\ProjectsPage.js`.
1. **Use** the `useState` function to create two additonal state variables `loading` and `error`.

   #### `src\projects\ProjectsPage.js`

   ```diff
   ...
    function ProjectsPage() {
      const [projects, setProjects] = useState(MOCK_PROJECTS);
   +  const [loading, setLoading] = useState(false);
   +  const [error, setError] = useState(undefined);
   ...
   }
   ```

   > **DO NOT DELETE** the file `src\projects\MockProjects.js`. We will use it in our unit testing.

1. **Change** the `projects` **state** to be an empty array `[]` **(be sure to remove the mock data)**.

   #### `src\projects\ProjectsPage.js`

   ```diff
   - import { Project } from './Project';
   - import { MOCK_PROJECTS } from './MockProjects';
   ...
    function ProjectsPage() {
   -  const [projects, setProjects] = useState(MOCK_PROJECTS);
   +  const [projects, setProjects] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(undefined);
   ...
   }
   ...
   ```

1. **Implement** the loading of the data from the API after the intial component render in a `useEffect` hook. Follow these specifications.

   1. **Set** state of `loading` to `true`
   2. Call the API: `projectAPI.get(1)`.
   3. If **successful**, **set** the returned `data` into the components `projects` state variable and set the `loading` state variable to `false`.
   4. If an **error occurs**, **set** the returned error's message `error.message` to the components `error` state and `loading` to `false`.

   #### `src\projects\ProjectsPage.js`

```diff
import React, { Fragment, useState,
+ useEffect } from 'react';
+ import { projectAPI } from './projectAPI';

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

// Approach 1: using promise then
//  useEffect(() => {
//    setLoading(true);
//    projectAPI
//      .get(1)
//      .then((data) => {
//        setLoading(false);
//        setProjects(data);
//      })
//      .catch((e) => {
//        setLoading(false);
//        setError(e.message);
//      });
//  }, []);

 // Approach 2: using async/await
+  useEffect(() => {
+    async function loadProjects() {
+      setLoading(true);
+      try {
+        const data = await projectAPI.get(1);
+        setProjects(data);
+      } catch (e) {
+        setError(e.message);
+      } finally {
+        setLoading(false);
+      }
+    }
+    loadProjects();
+  }, []);

...
}
...
```

1. **Display** the **loading** indicator **below** the `<ProjectList />`. Only display the indicator when `loading=true`.

   > If you want to try it yourself first before looking at the solution code use the `HTML` snippet below to format the loading indicator.

   ```html
   <div class="center-page">
     <span class="spinner primary"></span>
     <p>Loading...</p>
   </div>
   ```

   #### `src\projects\ProjectsPage.js`

   ```diff
   function ProjectsPage() {
     const [projects, setProjects] = useState<Project[]>([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(undefined);

     ...

     return (
       <Fragment>
         <h1>Projects</h1>

         <ProjectList onSave={saveProject} projects={projects} />

   +      {loading && (
   +        <div className="center-page">
   +          <span className="spinner primary"></span>
   +          <p>Loading...</p>
   +        </div>
   +      )}
       </Fragment>
     );
   }

   export default ProjectsPage;
   ```

1. Add these `CSS` styles to center the loading indicator on the page.

   #### `src\index.css`

   ```jsx
   ... //add below existing styles

   html,
   body,
   #root,
   .container,
   .center-page {
     height: 100%;
   }

   .center-page {
     display: flex;
     justify-content: center;
     align-items: center;
   }
   ```

1. **Display** the **error** message **above** the `<ProjectList />` using the `HTML` snippet below. Only display the indicator when `error` is defined.

   > If you want to try it yourself first before looking at the solution code use the `HTML` snippet below to format the error.

   ```html
   <div class="row">
     <div class="card large error">
       <section>
         <p>
           <span class="icon-alert inverse "></span>
           {error}
         </p>
       </section>
     </div>
   </div>
   ```

   #### `src\projects\ProjectsPage.js`

   ```diff
   function ProjectsPage() {
     const [projects, setProjects] = useState<Project[]>([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(undefined);

     ...

     return (
     <Fragment>
         <h1>Projects</h1>

   +      {error && (
   +        <div className="row">
   +          <div className="card large error">
   +            <section>
   +              <p>
   +                <span className="icon-alert inverse "></span>
   +                {error}
   +              </p>
   +            </section>
   +          </div>
   +        </div>
   +      )}

         <ProjectList onSave={saveProject} projects={projects} />

         {loading && (
           <div className="center-page">
             <span className="spinner primary"></span>
             <p>Loading...</p>
           </div>
         )}
       </Fragment>
     );
   }

   export default ProjectsPage;
   ```

1. **Verify** the application is working by **following these steps** in your `Chrome` **browser**.

   1. **Open** the application on `http://localhost:3000`.
   1. **Open** `Chrome DevTools`.
   1. **Refresh** the page.
   1. For a brief second, a **loading indicator** should **appear**.
      ![image](https://user-images.githubusercontent.com/1474579/65072299-9a46df80-d95e-11e9-9c74-8fd89814bbe2.png)

   1. Then, a list of **projects** should **appear**.
   1. **Click** on the `Chrome DevTools` `Network` tab.
   1. **Verify** the **request** to `/projects?_page=1&_limit=20&_sort=name` is happening.
      ![image](https://user-images.githubusercontent.com/1474579/65073227-6ff62180-d960-11e9-8073-51597f20cda2.png)

   1. We are using a `delay` function in `projectAPI.get()` to delay the returning of data so it is easier to see the loading indicator. You can remove the `delay` at this point.

      #### `src\projects\projectAPI.js`

      ```diff
      return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
      - .then(delay(600))
        .then(checkStatus)
        .then(parseJSON);
      ```

   1. **Change** the **URL** so the API endpoint cannot be reached.

      #### `src\projects\projectAPI.js`

      ```diff
      const baseUrl = 'http://localhost:4000';
      - const url = `${baseUrl}/projects`;
      + const url = `${baseUrl}/fail`;
      ...
      ```

   1. In your browser, you should see the following **error message** **displayed**.
      ![image](https://user-images.githubusercontent.com/1474579/65073355-b51a5380-d960-11e9-9d62-d26616574d83.png)

   1. **Fix** the **URL** to the backend API before continuing to the next lab.

      #### `src\projects\projectAPI.js`

      ```diff
      ...
      const baseUrl = 'http://localhost:4000';
      + const url = `${baseUrl}/projects`;
      - const url = `${baseUrl}/fail`;
      ...
      ```

### Add Pagination

1. **Use** the `useState` function to create an additonal state variable `currentPage`.

   #### `src\projects\ProjectsPage.js`

   ```diff
   ...
   function ProjectsPage() {
     const [projects, setProjects] = useState([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(undefined);
   + const [currentPage, setCurrentPage] = useState(1);
     ...
   }
   ```

1. **Update** the `useEffect` method to make `currentPage` a dependency and use it when fetching the data.

   #### `src\projects\ProjectsPage.js`

```diff
...
function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
-        const data = await projectAPI.get(1);
+        const data = await projectAPI.get(currentPage);
-        setProjects(data);
+      if (currentPage === 1) {
+          setProjects(data);
+        } else {
+          setProjects((projects) => [...projects, ...data]);
+        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
-  }, []);
+  }, [currentPage]);
...
}
```

1. **Implement** a `handleMoreClick` event handler and implement it by incrementing the page and then calling `loadProjects`.

   #### `src\projects\ProjectsPage.js`

   ```diff
   ...
   function ProjectsPage() {
     ...
     const [currentPage, setCurrentPage] = useState(1);
     ...

   +  const handleMoreClick = () => {
   +    setCurrentPage((currentPage) => currentPage + 1);
   +  };
     ...
   }
   ```

1. Add a `More...` button below the `<ProjectList />` . Display the `More...` button only when not `loading` and there is not an `error` and handle the `More...` button's `click` event and call `handleMoreClick`.

   #### `src\projects\ProjectsPage.js`

   ```diff
   ...
   function ProjectsPage() {
   ...

     return (
       <Fragment>
         <h1>Projects</h1>
         {error && (
           <div className="row">
             <div className="card large error">
               <section>
                 <p>
                   <span className="icon-alert inverse "></span>
                   {error}
                 </p>
               </section>
             </div>
           </div>
         )}
         <ProjectList onSave={saveProject} projects={projects} />

   +      {!loading && !error && (
   +        <div className="row">
   +          <div className="col-sm-12">
   +            <div className="button-group fluid">
   +              <button className="button default" onClick={handleMoreClick}>
   +                More...
   +              </button>
   +            </div>
   +          </div>
   +        </div>
   +      )}

         {loading && (
           <div className="center-page">
             <span className="spinner primary"></span>
             <p>Loading...</p>
           </div>
         )}
       </Fragment>
     );
   }

   export default ProjectsPage;
   ```

1. **Verify** the application is working by **following these steps** in your **browser**.

   1. **Refresh** the page.
   2. A list of **projects** should **appear**.
   3. **Click** on the `More...` **button**.
   4. **Verify** that 20 additional projects are appended to the end of the list.
   5. **Click** on the `More...` **button** again.
   6. **Verify** that another 20 projects are appended to the end of the list.

   ![More](https://user-images.githubusercontent.com/1474579/65072105-391f0c00-d95e-11e9-9e22-922fd0154b2a.png)
   <kbd>![More](https://user-images.githubusercontent.com/1474579/65072105-391f0c00-d95e-11e9-9e22-922fd0154b2a.png)</kbd>

---

### &#10004; You have completed the Lab 18
