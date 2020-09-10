# Professional Polish

Use `lab25` as the starting point for these enhancements.

The finished solution code for this optional lab is available in the `makeover` branch.

## Splash Screen

1. Add a splash screen and the associated styles.

- Copy `/react-course/concepts/assets/logo-splash-screen.svg` into `keeptrack\public\assets`

#### public\index.html

```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
+    <style>
+      html,
+      body,
+      #root,
+      .container,
+      .center-page {
+        height: 100%;
+      }
+
+      .center-page {
+        display: flex;
+        justify-content: center;
+        align-items: center;
+      }
+
+      .loading {
+        background-color: #dddddd;
+      }
+    </style>
    <title>React App</title>
  </head>
...

```

```diff
...
    <div id="root">
+      <div class="center-page loading">
+        <img src="/assets/logo-splash-screen.svg" alt="logo" />
+      </div>
    </div>
...
```

2. Refresh the app from the root (localhost:3000).

- Open `Chrome DevTools` > `Network Tab` > in the dropdown at the top change `Online` to `Fast 3g` to see the splash screen more easily.

> The splash-screen svg is a logo with animation to fade in and out to produce an effect like Gmail when the app first loads.

## Skeleton Screen

1. Open a command-prompt or terminal and run one of the following commands to install `react-content-loader`.

#### npm

```sh
npm i react-content-loader --save
```

OR

#### Yarn

```sh
yarn add react-content-loader
```

2. Add a delay to your API call so it is easier to see the loader.

#### `src\projects\projectAPI.ts`

```diff
const projectAPI = {
  ...
  get(page = 1, limit = 20) {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
+      .then(delay(2000))
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error retrieving the projects. Please try again.'
        );
      });
  },
  ...
}
```

3. Create a `ProjectCardSkeleton` component using the `ContentLoader` component from the `react-content-loader` library .

#### `src\projects\ProjectCardSkeleton.tsx`

```ts
import React from 'react';
import ContentLoader from 'react-content-loader';

const ProjectCardSkeleton = (props: any) => (
  <ContentLoader
    viewBox="0 0 330 404"
    height={404}
    width={330}
    speed={3}
    backgroundColor="#bababa"
    foregroundColor="#8f8f8f"
    {...props}
  >
    <rect x="6" y="3" rx="10" ry="10" width="330" height="192" />
    <rect x="20" y="210" rx="0" ry="0" width="239" height="32" />
    <rect x="20" y="250" rx="0" ry="0" width="200" height="20" />
    <rect x="20" y="280" rx="0" ry="0" width="150" height="20" />
    <rect x="20" y="310" rx="0" ry="0" width="72" height="42" />
  </ContentLoader>
);

export default ProjectCardSkeleton;
```

4. Pass the `ProjectsPage` component's `loading` state into `ProjectList` as a `prop` and remove the current `div` that displays the loading spinner.

#### `src\projects\ProjectsPage.tsx`

```diff
...
- <ProjectList projects={projects}></ProjectList>
+ <ProjectList projects={projects} loading={loading}></ProjectList>

...

- {loading && (
-   <div className="center-page">
-     <span className="spinner primary"></span>
-     <p>Loading...</p>
-   </div>
- )}

```

5. Use the `ProjectList` component's `loading` prop to render either the `ProjectCardSkeleton` or the `ProjectCard`.

#### `src\projects\ProjectList.tsx`

```diff
...
+ import ProjectCardSkeleton from './ProjectCardSkeleton';

interface ProjectListProps {
  projects: Project[];
+  loading: boolean;
}

...

class ProjectList extends React.Component<ProjectListProps, ProjectListState> {
  ...

  render() {
-    const { projects } = this.props;
+    const { projects, loading } = this.props;

    let item: JSX.Element;
    const items = projects.map((project: Project) => {
      if (project !== this.state.editingProject) {
        item = (
          <div key={project.id} className="cols-sm">
-            <ProjectCard
-              project={project}
-              onEdit={() => {
-                this.handleEdit(project);
-              }}
-            ></ProjectCard>

+            {loading && <ProjectCardSkeleton />}
+            {!loading && (
+              <ProjectCard
+                project={project}
+                onEdit={() => {
+                  this.handleEdit(project);
+                }}
+              ></ProjectCard>
+            )}
          </div>
        );
      } else {
        item = (
          <div key={project.id} className="cols-sm">
            <ProjectForm project={project} onCancel={this.cancelEditing} />
          </div>
        );
      }
      return item;
    });

    return <div className="row">{items}</div>;
  }
}

export default ProjectList;
```

6. Verify the application displays the skeleton screen as shown below.

   a.
   ![image](https://user-images.githubusercontent.com/1474579/92786562-579fc380-f376-11ea-932f-3f966c5445ef.png)

   b.
   ![image](https://user-images.githubusercontent.com/1474579/92786648-6be3c080-f376-11ea-92f7-92e188cedc10.png)

7. Remove the delay from the API call.

#### `src\projects\projectAPI.ts`

```diff
const projectAPI = {
  ...
  get(page = 1, limit = 20) {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
-      .then(delay(2000))
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error retrieving the projects. Please try again.'
        );
      });
  },
  ...
}
```

### Reference

- [React Content Loader](https://github.com/danilowoz/react-content-loader)
- [Skeleton React](https://skeletonreact.com/)
- [React Skeleton Screens](https://www.digitalocean.com/community/tutorials/react-skeleton-screens-react-and-react-native)
- [Skeleton Screens in React](https://www.smashingmagazine.com/2020/04/skeleton-screens-react/)
- [CSS Skeleton Screen Generator](http://www.andy-howard.com/css-skeleton-screen-generator/)
- [CSS Skeleton Screen Codepen Example](https://codepen.io/shahbokhari/pen/oBbmXG)

## Page Transitions

## Alerts & Confirmations

## Fonts

## Colors

## Icons
