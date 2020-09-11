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

![image](https://user-images.githubusercontent.com/1474579/92810015-241b6400-f38b-11ea-9115-bc2df157c754.png)

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
    backgroundColor="#e0e0e0"
    foregroundColor="#c7c7c7"
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

> Use the [Create React Content Loader (skeletonreact.com)](https://skeletonreact.com/) site to create your own skeleton. Note that if you scroll down there are lots of examples.

4. Create the `ProjectListSkeleton` component by listing multiple `ProjectCardSkeleton` components.

#### `src\projects\ProjectListSkeleton.tsx`

```ts
import React from 'react';
import ProjectCardSkeleton from './ProjectCardSkeleton';

const ProjectListSkeleton = () => {
  const numberOfItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const items = numberOfItems.map((item) => <ProjectCardSkeleton key={item} />);
  return <div className="row">{items}</div>;
};

export default ProjectListSkeleton;
```

5. Use the `ProjectsPage` component's `loading` state to determine when to display the `ProjectListSkeleton`. Also, remove the current loading spinner.

#### `src\projects\ProjectsPage.tsx`

```diff
...
+ import ProjectListSkeleton from './ProjectListSkeleton';

function ProjectsPage() {
...
  return (
    <Fragment>
      <h1>Projects</h1>
      ...

+   {loading && <ProjectListSkeleton />}
    <ProjectList projects={projects}></ProjectList>
    ...

  - {loading && (
  -   <div className="center-page">
  -     <span className="spinner primary"></span>
  -     <p>Loading...</p>
  -   </div>
  - )}
  </Fragment>

  );
}
export default ProjectsPage;

```

6. Verify the application displays the skeleton screen as shown below.

   a.

![image](https://user-images.githubusercontent.com/1474579/92809324-832ca900-f38a-11ea-9fe6-c1dcb5a6b9e1.png)

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

1. Install the `react-transition-group` library.

   > `React Transition Group` exposes simple components useful for defining entering and exiting transitions.

   [React Transition Group](https://reactcommunity.org/react-transition-group/) used to be part of the `React` library itself but has since been removed and is part of `ReactCommunity.org`.

   ```
   # npm
   npm install react-transition-group

   # if using TypeScript
   npm install @types/react-transition-group

   # yarn
   yarn add react-transition-group
   ```

2. Move the `<Router>` component up one level to wrap the entire `App`. This is necessary for us to be able to access the new `useLocation` hook that is part of `react-router` at the point we use the `CSSTransition` and `Switch` components. We also get the `location` using the `useLocation` hook.

   > You can't use any of the hooks from within the same component that puts the Router into the tree.
   > You need to move your BrowserRouter out of that component. It can go in the ReactDOM.render() call, for instance.

   > `React Transition Group` is **not an animation library** like `React-Motion`, it does not animate styles by itself. Instead it exposes transition stages, manages classes and group elements and manipulates the DOM in useful ways, making the implementation of actual visual transitions much easier.

#### `src\App.tsx`

```diff
...
import {
-  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
+  useLocation,
} from 'react-router-dom';

...

function App() {
+  let location = useLocation();
  return (
    <Provider store={store}>
-      <Router>
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
        <Switch location={location}>
          <Route path="/" exact component={HomePage} />
          <Route path="/projects" exact component={ProjectsPage} />
          <Route path="/projects/:id" component={ProjectPage} />
        </Switch>
      </div>
-      </Router>
    </Provider>
  );
}

export default App;
```

#### `src\index.tsx`

```diff
...
+ import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
+    <Router>
      <App />
+    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

```

2. Wrap the `react-router`'s `Switch` component with a `TransitionGroup` and `CSSTransition` component from the `react-transition-group` library.

#### `src\App.tsx`

```diff
+ import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  let location = useLocation();
  return (
    <Provider store={store}>
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
+        <TransitionGroup>
+          <CSSTransition key={location.key} classNames="fade" timeout={300}>
-           <Switch>
+           <Switch location={location}>
              <Route path="/" exact component={HomePage} />
              <Route path="/projects" exact component={ProjectsPage} />
              <Route path="/projects/:id" component={ProjectPage} />
            </Switch>
+          </CSSTransition>
+        </TransitionGroup>
      </div>
    </Provider>
  );
}

export default App;
```

3. Add a `page` class to each page in the application.

#### `src\projects\ProjectsPage.tsx`

```diff
export default function ProjectsPage() {
  return (
-    <Fragment>
+    <div className="row page">
     ...
-    <Fragment>
+    </div>
 ...
}

```

#### `src\projects\ProjectPage.tsx`

```diff
export default function ProjectPage() {
  return (
-    <React.Fragment>
+    <div className="row page">
+      <div className="col-sm-12">
       ...
-    </React.Fragment>
+      </div>
+    </div>
 ...
}

```

#### `src\home\HomePage.tsx`

```diff
export default function HomePage() {
  return (
-    <div className="row">
+    <div className="row page">
 ...
}
```

4. Add the `page` and `fade` CSS styles.

##### `src\index.css`

```css
... 
/* add these below existing styles */

.page {
  position: fixed;
  height: 100%;
  width: 100%;
}

.fade-enter {
  opacity: 0;
  z-index: 1;
}

.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}
```

5. Click through the pages in the application and see the previous page content fade out and the new page content fade in to view.

### Libraries Compared

React Transition Group just makes transitions easier. It is not an animation library.
React Spring and React Framer Motion are animation libraries. Historically, React Spring has been the most popular library but React Framer Motion was released more recently and tends to be easier to use and comprehend. This article can be useful in making a decision on a library: [What’s the most developer-friendly React animation library?](https://www.freshtilledsoil.com/whats-the-most-developer-friendly-react-animation-library/).

### Reference

- [React Transition Group Documentation](https://reactcommunity.org/react-transition-group/)
- [React Documentation Animation](https://reactjs.org/docs/animation.html)
- [What’s the most developer-friendly React animation library?](https://www.freshtilledsoil.com/whats-the-most-developer-friendly-react-animation-library/)
- [React Router Animated Transitions](https://reactrouter.com/web/example/animated-transitions)
- [Cannot read property 'location' of undefined at useLocation
  ](https://github.com/ReactTraining/react-router/issues/7015)
  - [How to create page transitions with React Router](https://www.youtube.com/watch?v=NUQkajBdnmQ)
  - [Animated Transitions with React Router v4](https://www.youtube.com/watch?v=53Y8q-SgLF0)
  - [Page Transitions in React Router (With Framer Motion)](https://www.youtube.com/watch?v=qJt-FtzJ5fo&t=24s)
  - [React Spring](https://www.react-spring.io/)
  - [React Framer Motion](https://www.framer.com/motion/)

## TODO

When transitioning to projects page, seems like it's in one of the libraries.

```shell
Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://fb.me/react-strict-mode-find-node
```

## Alerts & Confirmations

<!--
## Fonts

## Colors

## Icons -->
