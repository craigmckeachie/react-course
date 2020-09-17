# Chapter 15: Routing

- [Chapter 15: Routing](#chapter-15-routing)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Basics](#basics)
    - [Not Found (404)](#not-found-404)
      - [`package.json`](#packagejson)
  - [Parameters](#parameters)
    - [URL Parameters](#url-parameters)
    - [Query Parameters](#query-parameters)
  - [Nesting](#nesting)

## Overview

- Similar in function to a server-side router in an MVC framework
  - Associates a route (url) with a particular controller action
- React Router switches between (page/container) components when a route changes
- Back button is broken by default when page/container components change
  - the browser's history is not updated with a new url when page/container components change
  - React Router programmatically adds entries to the browser's history
  - enables the back button to work in React applications

There are two versions:

1. BrowserRouter (react-router-dom) for web applications.
2. NativeRouter (react-router-native) for use with React Native.

## Installation

1. Install the package
   ```
   npm install react-router-dom
   ```
2. Add the script tag

   ```diff
   //index.html

       <script src="/node_modules/react/umd/react.development.js"></script>
       <script src="/node_modules/react-dom/umd/react-dom.development.js"></script>
   +    <script src="/node_modules/react-router-dom/umd/react-router-dom.js"></script>
       <script src="/node_modules/@babel/standalone/babel.min.js"></script>
       <script src="/node_modules/axios/dist/axios.min.js"></script>
       <script type="text/babel" src="/main.jsx"></script>
   ```

   > ! Be sure that the `main.jsx` script tag's src attribute starts with a `/` or the router will not work properly when you refresh the page.

3. Log the `RouterRouterDOM` to verify it is installed properly

   - Also export the common components so they are easier to use

   ```js
   //main.jsx
   console.log(window.ReactRouterDOM);

   const {
     BrowserRouter: Router,
     Route,
     Link,
     Prompt,
     Switch,
     Redirect,
     NavLink,
   } = window.ReactRouterDOM;
   ```

4. In the console you should see:
   ```
   {BrowserRouter: ƒ, HashRouter: ƒ, Link: ƒ, NavLink: ƒ, MemoryRouter: ƒ, …}
   ```

## Basics

1. Add these styles

```css
/* styles.css */

.container {
  border: 1px solid #ddd;
  margin: 30px;
  padding: 30px;
}

nav ul {
  list-style: none;
}

nav ul li {
  display: inline;
}

nav ul li:after {
  content: ' | ';
}

nav ul li:last-child:after {
  content: '';
}
```

2. Try this code

```js
const {
  BrowserRouter: Router,
  Route,
  Link,
  Prompt,
  Switch,
  Redirect,
  NavLink,
} = window.ReactRouterDOM;

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Contact() {
  return <h2>Contact</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/contact/">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="container">
          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/contact/" component={Contact} />
        </div>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

2. Change the Link tags to NavLink tags

```js
<nav>
  <ul>
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/about/">About</NavLink>
    </li>
    <li>
      <NavLink to="/contact/">Contact</NavLink>
    </li>
  </ul>
</nav>
```

3. Add the following style

```css
/* styles.css */

.active {
  background-color: #bee5eb;
}
```

> You can change the name of the class used for the active item by setting `activeClassName`. See the documentation on [activeClassName](https://reacttraining.com/react-router/web/api/NavLink/activeclassname-string) for more information.

4. Refresh the browser and see the navigation items are highlighted.
5. Notice that `Home` is always highlighted because the `\` path is the start of the other paths `\about` and `\contact`
6. Add an exact attribute to the **Home** `NavLink` to get this working as intended.

```js
<nav>
  <ul>
    <li>
      <NavLink exact to="/">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/about">About</NavLink>
    </li>
    <li>
      <NavLink to="/contact">Contact</NavLink>
    </li>
  </ul>
</nav>
```

> For more information see the API documentation for [\<NavLink\>](https://reacttraining.com/react-router/web/api/NavLink)

### Not Found (404)

1. Be sure you are running a development web server like serve with the `-s` flag.

#### `package.json`

```json
"scripts": {
    "start": "serve -s",
    ...
  },
  ...
```

2. Change the URL to `http://localhost:5000/noroute`
3. The navigation renders but the page is blank. Ideally, we would like to show a `NotFound` component when this happens.

   To achieve this we need to understand two things:

   - A `<Route>` with no path will always render a component
   - A `<Switch>` component will display the first matching route listed inside of it

3) Create a `NotFound` component

```js
function NotFound() {
  return (
    <React.Fragment>
      <h2>Uh oh.</h2>
      <p>
        The page you requested could not be found. Is there any chance you were
        looking for one of these?
      </p>
    </React.Fragment>
  );
}
```

4. Add a route for it with **no path**

```diff
    <Route path="/" exact  component={Home} />
    <Route path="/about/" component={About} />
    <Route path="/contact/" component={Contact} />
+   <Route component={NotFound} />
```

5. Navigate to the home route and then the contact route and notice the `NotFound` component shows when visiting every route
6. Wrap the list of routes in a `Switch` component

```diff
+ <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about/" component={About} />
    <Route path="/contact/" component={Contact} />
    <Route component={NotFound} />
+ </Switch>
```

7. Navigate to the various routes again and notice that only when you manually go to a route that doesn't exist like: `/noroute` the `NotFound` component renders.

> - The attribute `exact` on a `<Route>` controls what is displayed into the page.
> - The attribute `exact` on a `<NavLink>` controls what is active (highlighed) in the navigation.

## Parameters

### URL Parameters

1. Create a `Movie` model class.

- Add it just before the App component

```js
class Movie {
  constructor(id, name, description, type) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
  }
}
```

1. Create an array of mock movies

```js
const movies = [
  new Movie(
    1,
    ' Titanic',
    'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
    'Drama'
  ),
  new Movie(
    2,
    ' E.T. the Extra-Terrestrial',
    'A troubled child summons the courage to help a friendly alien escape Earth and return to his home world.',
    'Fantasy'
  ),
  new Movie(
    3,
    'The Wizard of Oz',
    // tslint:disable-next-line:max-line-length
    'Dorothy Gale is swept away from a farm in Kansas to a magical land of Oz in a tornado and embarks on a quest with her new friends to see the Wizard who can help her return home in Kansas and help her friends as well.',
    'Fantasy'
  ),
  new Movie(
    4,
    'Star Wars: Episode IV - A New Hope ',
    // tslint:disable-next-line:max-line-length
    'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire/`s world-destroying battle-station while also attempting to rescue Princess Leia from the evil Darth Vader.',
    'Action'
  ),
];
```

3. Create a `Movies` component to list movies

```js
function Movies(props) {
  const movieListItems = props.movies.map((movie) => (
    <li key={movie.id}>
      <Link to={`${props.match.url}/${movie.id}`}>{movie.name}</Link>
    </li>
  ));
  return (
    <div>
      <h2>Movies</h2>
      <ul>{movieListItems}</ul>
    </div>
  );
}
```

4. Add a Route to go to the `Movies` component

> Notice how we pass props to a the `Movies` component which is rendered by the React Router

- You might have been tempted to try one of these approaches:

```js
//doesn't work
<Route
  path="/movies"
  component={Movies(movies)}  />}
/>
```

```js
//doesn't work
<Route
  path="/movies"
  component={Movies} movies={movies} />}
/>
```

```js
//works but not ideal
<Route
  path="/movies"
  component={(props) => <Movies {...props} movies={movies} />}
/>
```

```js
//works but not ideal
<Route
  path="/movies"
  component={(props) => <Movies {...props} movies={movies} />}
/>
```

- To understand why the `works but is not ideal` code snippet above is not the best solution read this paragraph from the React Router documentation:

  > “When you use the component props, the router uses React.createElement to create a new React element from the given component. That means if you provide an inline function to the component attribute, you would create a new component every render. This results in the existing component unmounting and the new component mounting instead of just updating the existing component.”

```js
//works
<Route
  exact
  path="/movies"
  render={(props) => <Movies {...props} movies={movies} />}
/>
```

1. Add a NavLink to navigate to the `Movies` component.

```diff
<ul>
  ...
  <li>
    <NavLink to="/contact/">Contact</NavLink>
  </li>
+  <li>
+    <NavLink to="/movies">Movies</NavLink>
+  </li>
</ul>
```

6. Create a `MovieDetail` component to show the detail about a particular movie.

```js
function MovieDetail(props) {
  const path = props.match.path;
  const movieId = Number(props.match.params.id);
  const movie = movies.find((movie) => movie.id === movieId);

  return (
    <div>
      <h2>Movie Detail</h2>
      <h3>{movie.name}</h3>
      <p>{movie.description}</p>
    </div>
  );
}
```

8. Add a Route to go to the `MovieDetail` component.

```diff
<div className="container">
  <Route path="/" exact component={Home} />
  <Route path="/about/" component={About} />
  <Route path="/contact/" component={Contact} />

  <Route exact
    path="/movies"
    render={props => <Movies {...props} movies={movies} />}
  />
+ <Route path={`/movies/:id`} component={MovieDetail} />
</div>
```

> Notice how the params are automatically added to the props of the component being rendered by their route.

9.  To better understand how this is working temporarily add this line to the `MovieDetail` component.

```diff
function MovieDetail(props) {
  const path = props.match.path;
  const movieId = Number(props.match.params.id);
  const movie = movies.find(movie => movie.id === movieId);

  return (
    <div>
      <h2>Movie Detail</h2>
      <h3>{movie.name}</h3>
      <p>{movie.description}</p>
+     <pre>{JSON.stringify(props, null, ' ')}</pre>
    </div>
  );
}
```

10. Refresh the page and you will see all the information the `Route` automatically adds to the component.

```json
{
  "history": {
    "length": 4,
    "action": "PUSH",
    "location": {
      "pathname": "/movies/2",
      "search": "",
      "hash": "",
      "key": "t7rwjz"
    }
  },
  "location": {
    "pathname": "/movies/2",
    "search": "",
    "hash": "",
    "key": "t7rwjz"
  },
  "match": {
    "path": "/movies/:id",
    "url": "/movies/2",
    "isExact": true,
    "params": {
      "id": "2"
    }
  }
}
```

### Query Parameters

Modify the `Movies` component to filter by movie type (genre).

1. Destructure the needed props in the function signature and rename movies to `allMovies`
2. Parse the query string parameter(s)

   > React Router does not have any opinions about how you parse URL query strings. Some applications use simple key=value query strings, but others embed arrays and objects in the query string. So it's up to you to parse the search string yourself.

   > In modern browsers that support the [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL), you can instantiate a URLSearchParams object from location.search and use that.

   > In browsers that [do not support the URL API](https://caniuse.com/#feat=url) (read: IE) you can use a 3rd party library such as [query-string](https://github.com/sindresorhus/query-string).

3. Create an empty movies array and then filter the movies if a type is passed
4. Add links with search params for the various movie types

   ```js
   function Movies({ movies: allMovies, location, match }) {
     let movies = [];
     let queryParams = new URLSearchParams(location.search);
     let type = queryParams.get('type');
     if (type) {
       movies = allMovies.filter((movie) => movie.type === type);
     } else {
       movies = allMovies;
     }
     const movieListItems = movies.map((movie) => (
       <li key={movie.id}>
         <Link to={`${match.url}/${movie.id}`}>{movie.name}</Link>
       </li>
     ));
     return (
       <div>
         <nav>
           <ul>
             <li>
               <Link to={{ pathname: '/movies', search: '?type=Drama' }}>
                 Drama
               </Link>
             </li>
             <li>
               <Link to={{ pathname: '/movies', search: '?type=Fantasy' }}>
                 Fantasy
               </Link>
             </li>
             <li>
               <Link to={{ pathname: '/movies', search: '?type=Action' }}>
                 Action
               </Link>
             </li>
           </ul>
         </nav>
         <h2>Movies</h2>
         <ul>{movieListItems}</ul>
       </div>
     );
   }
   ```

5. Bonus: If time permits, add the following code to highlight the secondary navigation movie types

```js
function isLinkActive(currentType, linkType) {
return currentType === linkType ? 'active' : '';
}

function Movies({ movies: allMovies, location, match }) {
...
<nav>
      <ul>
        <li>
          <Link
            className={isLinkActive(type, 'Drama')}
            to={{ pathname: '/movies', search: '?type=Drama' }}
          >
            Drama
          </Link>
        </li>
        <li>
          <Link
            className={isLinkActive(type, 'Fantasy')}
            to={{ pathname: '/movies', search: '?type=Fantasy' }}
          >
            Fantasy
          </Link>
        </li>
        <li>
          <Link
            className={isLinkActive(type, 'Action')}
            to={{ pathname: '/movies', search: '?type=Action' }}
          >
            Action
          </Link>
        </li>
      </ul>
    </nav>
}
```

## Nesting

1. Copy then remove the `Movie` detail Route from the `App` component
2. Change the movies route to no longer require an exact match.

```diff
function App() {
  return (
    <Router>
...

      <div className="container">
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/contact/" component={Contact} />

        <Route
-          exact
          path="/movies"
          render={props => <Movies {...props} movies={movies} />}
        />
-        <Route path={`/movies/:id`} component={MovieDetail} />
      </div>
    </Router>
  );
}
```

3. Paste the `Movie` detail Route into the `Movies` component (so it is a route nested inside another route)

```diff
function Movies({ movies: allMovies, location, match }) {
  ...
  return (
    ...
      <h2>Movies</h2>
      <ul>{movieListItems}</ul>
+      <Route path={`/movies/:id`} component={MovieDetail} />
    </div>
  );
}
```

4. Refresh the browser and notice that the movie detail now shows below the movie list after clicking a movie link.

<!-- ## Redirects (Auth)

## Static vs Dynamic Routes

# Bonus

## Animated Transition

https://medium.com/@khwsc1/step-by-step-guide-of-simple-routing-transition-effect-for-react-with-react-router-v4-and-9152db1566a0

## Named

## Code Splitting
-->

- [Reach Router](https://reach.tech/router/)
- [List of all React Routers](https://reactjs.org/community/routing.html)
- [React Router](https://github.com/ReactTraining/react-router)
- [React Router 4 changes](https://css-tricks.com/react-router-4/)
- [Next.js](https://nextjs.org/)
- [Change in React Router 4 and 5 from Earlier Versions](https://www.reddit.com/r/reactjs/comments/8lgmmo/router5_or_reactrouter_4/)
- [Pass Props to Components](https://tylermcginnis.com/react-router-pass-props-to-components/)

<!--
https://medium.com/@jordan.eckowitz/reach-router-react-routing-made-easy-aac7b46cd53c

https://medium.com/@taion/react-routing-and-data-fetching-ec519428135c
https://github.com/4Catalyzer/found

https://github.com/grahammendick/router-challenge -->
