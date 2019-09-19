# Lab 18: HTTP GET

## Objectives

- [ ] Create an API object that loads data from an REST API
- [ ] Update a component to use the API object
- [ ] Bonus: Add Pagination

## Steps

### Create an API object that loads data from an REST API

1.  Create the file `src\projects\projectAPI.ts`.
2.  Create a `projectAPI` object and export it from the file.
3.  Implement a `get` method that requires `page` and `limit` parameters and sets the default to `page = 1` and `limit=20`.
    The projects should be sorted by name.

    > [json-server ](https://github.com/typicode/json-server/blob/master/README.md) supports sorting and paging using the following syntax.

    ```js
    `${url}?_page=${page}&_limit=${limit}&_sort=name`;
    ```

    #### `src\projects\projectAPI.ts`

    ```ts
    const baseUrl = 'http://localhost:4000';
    const url = `${baseUrl}/projects`;

    function translateStatusToErrorMessage(status: number) {
      switch (status) {
        case 401:
          return 'Please login again.';
        case 403:
          return 'You do not have permission to view the project(s).';
        default:
          return 'There was an error retrieving the project(s). Please try again.';
      }
    }

    function checkStatus(response: any) {
      if (response.ok) {
        return response;
      } else {
        const httpErrorInfo = {
          status: response.status,
          statusText: response.statusText,
          url: response.url
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
      }
    }

    function parseJSON(response: Response) {
      return response.json();
    }

    // eslint-disable-next-line
    function delay(ms: number) {
      return function(x: any): Promise<any> {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
      };
    }

    const projectAPI = {
      get(page = 1, limit = 20) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
          .then(delay(600))
          .then(checkStatus)
          .then(parseJSON)
          .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error(
              'There was an error retrieving the projects. Please try again.'
            );
          });
      }
    };

    export { projectAPI };
    ```

### Update a component to use the API object

5. **Open** the file `src\projects\ProjectsPage.tsx`.
6. **Update** the `ProjectPageState` **interface** to have two additonal properties `loading` and `error`.

   #### `src\projects\ProjectsPage.tsx`

   ```diff
   ...
   interface ProjectsPageState {
     projects: Project[];
   +  loading: boolean;
   +  error: string | undefined
   }
   ...
   ```

7) **Initialize** the component **state** as follows:

   1. `projects` should be an empty array `[]` **(be sure to remove the mock data)**
   2. `loading` should be `false`
   3. `error` should be `undefined`

   #### `src\projects\ProjectsPage.tsx`

   ```diff
   - import { MOCK_PROJECTS } from './MockProjects';
   ...
   class ProjectsPage extends React.Component<any, ProjectsPageState> {
     state = {
   -    projects: MOCK_PROJECTS
   +    projects: [],
   +    loading: false,
   +    error: undefined
     };
     ...
   }
   ```

8. **Implement** the loading of the data from the API after the component has been added to the DOM `(componentDidMount`) following these specifications.

   1. **Set** state of `loading` to `true`
   2. Call the API: `projectAPI.get(1)`.
   3. If **successful**, **set** the returned `data` into the components `projects` state and `loading` to `false`.
   4. If an **error occurs**, **set** the returned error's message `error.message` to the components `error` state and `loading` to `false`.

   #### `src\projects\ProjectsPage.tsx`

   ```diff
   ...
   class ProjectsPage extends React.Component<any, ProjectsPageState> {
     state = {
       projects: [],
       loading: false,
       error: undefined
     };

   +  componentDidMount() {
   +    this.setState({ loading: true });
   +    projectAPI
   +      .get(1)
   +      .then(data => this.setState({ projects: data, loading: false }))
   +      .catch(error => this.setState({ error: error.message, loading: false }));
   +  }
     ...
   }
   ```

9) **Display** the **loading** indicator **below** the `<ProjectList />`. Only display the indicator when `loading=true`.

   > If you want to try it yourself first before looking at the solution code use the `HTML` snippet below to format the loading indicator.

   ```html
   <div class="center-page">
     <span class="spinner primary"></span>
     <p>Loading...</p>
   </div>
   ```

   #### `src\projects\ProjectsPage.tsx`

   ```diff
   class ProjectsPage extends React.Component<any, ProjectsPageState> {
   ...
     render() {
       return (
         <Fragment>
           <h1>Projects</h1>

           <ProjectList onSave={this.saveProject} projects={this.state.projects} />

   +        {this.state.loading && (
   +          <div className="center-page">
   +            <span className="spinner primary"></span>
   +            <p>Loading...</p>
   +          </div>
   +        )}

         </Fragment>
       );
     }
   }

   export default ProjectsPage;
   ```

   2. Add these `CSS` styles to center the loading indicator on the page.

      #### `src\index.css`

      ```tsx
      ... //add below existing styles and import

      .center-page {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      ```

9. We are using a `delay` function in `projectAPI.get()` to delay the returning of data so it is easier to see the loading indicator. You can remove the `delay` at this point.

   #### `src\projects\projectAPI.ts`

   ```diff
   return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
   - .then(delay(600))
     .then(checkStatus)
     .then(parseJSON);
   ```

10. **Display** the **error** message **above** the `<ProjectList />` using the `HTML` snippet below. Only display the indicator when `error` is defined.

    > If you want to try it yourself first before looking at the solution code use the `HTML` snippet below to format the error.

    ```html
    <div class="row">
      <div class="card large error">
        <section>
          <p>
            <span class="icon-alert inverse "></span>
            {this.props.error}
          </p>
        </section>
      </div>
    </div>
    ```

    #### `src\projects\ProjectsPage.tsx`

    ```diff
    class ProjectsPage extends React.Component<any, ProjectsPageState> {
    ...
      render() {
        return (
          <Fragment>
            <h1>Projects</h1>
            {this.state.error && (
              <div className="row">
                <div className="card large error">
                  <section>
                    <p>
                      <span className="icon-alert inverse "></span>
                      {this.state.error}
                    </p>
                  </section>
                </div>
              </div>
            )}

            <ProjectList onSave={this.saveProject} projects={this.state.projects} />

    +        {this.state.loading && (
    +          <div className="center-page">
    +            <span className="spinner primary"></span>
    +            <p>Loading...</p>
    +          </div>
    +        )}

          </Fragment>
        );
      }
    }

    export default ProjectsPage;
    ```

11. **Verify** the application is working by **following these steps** in your `Chrome` **browser**.

    1. **Open** `Chrome DevTools`.
    2. **Refresh** the page.
    3. For a brief second, a **loading indicator** should **appear**.
       ![image](https://user-images.githubusercontent.com/1474579/65072299-9a46df80-d95e-11e9-9c74-8fd89814bbe2.png)

    4. Then, a list of **projects** should **appear**.
    5. **Click** on the `Chrome DevTools` `Network` tab.
    6. **Verify** the **request** to `/projects?_page=1&_limit=20&_sort=name` is happening.
       ![image](https://user-images.githubusercontent.com/1474579/65073227-6ff62180-d960-11e9-8073-51597f20cda2.png)

    7. **Change** the **URL** so the API endpoint cannot be reached.

       #### `src\projects\projectAPI.tsx`

       ```diff
       const baseUrl = 'http://localhost:4000';
       - const url = `${baseUrl}/projects`;
       + const url = `${baseUrl}/fail`;
       ...
       ```

    8. In your browser, you should see the following **error message** **displayed**.
       ![image](https://user-images.githubusercontent.com/1474579/65073355-b51a5380-d960-11e9-9d62-d26616574d83.png)

    9. **Fix** the **URL** to the backend API before continuing to the next lab.

       #### `src\projects\projectAPI.tsx`

       ```diff
       ...
       const baseUrl = 'http://localhost:4000';
       + const url = `${baseUrl}/projects`;
       - const url = `${baseUrl}/fail`;
       ...
       ```

---

### &#10004; You have completed Lab 18

---

### Bonus: Add Pagination

> This part of the lab is optional and can be safely skipped for now if time is tight.

6. **Update** the `ProjectPageState` `interface` to hold a `page` property.

   #### `src\projects\ProjectsPage.tsx`

   ```diff
   ...
   interface ProjectsPageState {
     projects: Project[];
     loading: boolean;
     error: string | undefined;
   +  page: number
   }
   ...
   ```

7. **Initialize** the `page` property of **state** as follows:

   #### `src\projects\ProjectsPage.tsx`

   ```diff
   ....
   class ProjectsPage extends React.Component<any, ProjectsPageState> {
     state = {
       projects: [],
       loading: false,
       error: undefined,
   +    page: 1
     };
     ...
   }
   ```

8. **Implement** a `loadProjects` method and call it from `componentDidMount`.

   #### `src\projects\ProjectsPage.tsx`

   ```diff
   class ProjectsPage extends React.Component<any, ProjectsPageState> {
   ...

   +  loadProjects(page: number) {
   +    this.setState({ loading: true });
   +    projectAPI
   +      .get(page)
   +      .then(data => {
   +        if(page === 1){
   +          this.setState({ projects: data, loading: false, page });
   +        }else{
   +          this.setState((previousState)=>{
   +             return { projects: [...previousState.projects, ...data], loading: false, page}
   +          });
   +        }
   +
   +       })
   +      .catch(error => this.setState({ error: error.message, loading: false }));
   +  }

     componentDidMount() {
   -    projectAPI.get(1)...
   +    this.loadProjects(this.state.page);
     }

   }
   ```

10) **Implement** a `handleMoreClick` event handler and increment the page and then call `loadProjects`.

    #### `src\projects\ProjectsPage.tsx`

    ```diff
    class ProjectsPage extends React.Component<any, ProjectsPageState> {
      ...
    +  handleMoreClick = () => {
    +    const nextPage = this.state.page + 1;
    +    this.loadProjects(nextPage);
    +  };
    }
    ```

11) Add a `More...` button below the `<ProjectList />` using the `HTML` snippet below.
    ```html
    <div class="row">
      <div class="col-sm-12">
        <div class="button-group fluid">
          <button class="button default">
            More...
          </button>
        </div>
      </div>
    </div>
    ```
    > Don't forget that JSX and HTML are not the same exact syntax.
12) Display the `More...` button only when not `loading` and there is not an `error` and handle the `More...` button's `click` event and call `handleMoreClick`.

    #### `src\projects\ProjectsPage.tsx`

    ```diff
    class ProjectsPage extends React.Component<any, ProjectsPageState> {
      ...
      render() {
        return (
          <Fragment>
            <h1>Projects</h1>
            {this.state.error && (
              <div className="row">
                <div className="card large error">
                  <section>
                    <p>
                      <span className="icon-alert inverse "></span>
                      {this.state.error}
                    </p>
                  </section>
                </div>
              </div>
            )}

            <ProjectList onSave={this.saveProject} projects={this.state.projects} />

    +       {!this.state.loading && !this.state.error && (
            <div className="row">
              <div className="col-sm-12">
                <div className="button-group fluid">
                  <button
                    className="button default"
    +                 onClick={this.handleMoreClick}
                  >
                    More...
                  </button>
                </div>
              </div>
            </div>
    +       )}

            {this.state.loading && (
              <div className="center-page">
                <span className="spinner primary"></span>
                <p>Loading...</p>
              </div>
            )}
          </Fragment>
        );
      }
    }
    ```

12. **Verify** the application is working by **following these steps** in your **browser**.

    1.  **Refresh** the page.
    2.  A list of **projects** should **appear**.
    3.  **Click** on the`More...` **button**.
    4.  **Verify** that 20 additional projects are appended to the end of the list.
    5.  **Click** on the`More...` **button** again.
    6.  **Verify** that another 20 projects are appended to the end of the list.

    ![More](https://user-images.githubusercontent.com/1474579/65072105-391f0c00-d95e-11e9-9e22-922fd0154b2a.png)
    <kbd>![More](https://user-images.githubusercontent.com/1474579/65072105-391f0c00-d95e-11e9-9e22-922fd0154b2a.png)</kbd>

---

### &#10004; You have completed the Lab 18 bonus exercise



