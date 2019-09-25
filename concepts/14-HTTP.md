# Chapter 14: HTTP

- [Chapter 14: HTTP](#chapter-14-http)
  - [Setup Backend](#setup-backend)
  - [Axios](#axios)
  - [Fetch](#fetch)
  - [React](#react)
    - [componentDidMount](#componentdidmount)
    - [Loading](#loading)
    - [Error Handling](#error-handling)
    - [Lists](#lists)
    - [Example](#example)
  - [Reuse](#reuse)
  - [POST](#post)
      - [POST with Axios](#post-with-axios)
      - [POST with Fetch](#post-with-fetch)
  - [PUT](#put)
  - [DELETE](#delete)
  - [Item CRUD Implemented](#item-crud-implemented)
- [Resources](#resources)

The ability to make HTTP calls is not built-in to React.

React applications use one of the following to make `HTTP` calls:

- `Axios` library
- `fetch` API (built-in to modern browsers)

## Setup Backend

Before making HTTP calls we need to [setup a backend following these directions](A7-BackendAPISetup.md).

## Axios

1. Install the [axios](https://github.com/axios/axios) library.

   ```shell
   npm install axios
   ```

   > Axios is a `Promise` based HTTP client for the `browser` and node.js.

2. Add a script tag to the library in `index.html`.

   ```diff
   <!DOCTYPE html>
   <html lang="en">
   <head>
       ...
   </head>
   <body>
       <div id="root"></div>
       ...
       <script src="node_modules/@babel/standalone/babel.min.js"></script>
   +   <script src="node_modules/axios/dist/axios.js"></script>
       <script type="text/babel" src="main.jsx"></script>
   </body>
   </html>
   ```

3. Try the following code in `main.jsx`:

   ```js
   const okUrl = 'https://localhost:3000/photos?_page=1&_limit=100';
   const notFoundErrorUrl = 'https://httpstat.us/404';
   const forbiddenErrorUrl = 'https://httpstat.us/403';
   const serverErrorUrl = 'https://httpstat.us/500';
   // const urls here

   axios
     .get(okUrl)
     .then(response => response.data)
     .then(data => console.log(data));
   ```

4. Open the Chrome DevTools console and you should see the data being logged.
5. Update the url to an endpoint that throws a server error and update the code to catch the error.

   ```diff
    // const urls here

   axios
   + .get(serverErrorUrl)
   .then(response => response.data)
   .then(data => console.log(data))
   + .catch(error => console.log(error));
   ```

6. You should see the following logged in the console.

   ```shell
   VM599:1 GET https://httpstat.us/500 500 (Internal Server Error)
   Error: Request failed with status code 500
   ```

7. Try these other urls that also return errors and verify they are logged.
   ```js
   const notFoundErrorUrl = 'https://httpstat.us/404';
   const forbiddenErrorUrl = 'https://httpstat.us/403';
   ```

## Fetch

The fetch specification differs from `jQuery.ajax()` and `axios` in three main ways:

- The entire response is returned instead of the JSON data being already parsed (deserialized) into a JavaScript object.

- The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or if anything prevented the request from completing.

* By default, fetch won't send or receive any cookies from the server, resulting in unauthenticated requests if the site relies on maintaining a user session (to send cookies, the credentials init option must be set).

The `Fetch API` is now standard in modern browsers and does not require an additional install.

> Note that you will need to use a polyfill if you need to support IE browsers. See the [can I use feature page for fetch](https://caniuse.com/#feat=fetch) for more information. The most commonly used polyfill is [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch).

1. Try the following code in `main.jsx`:

   ```js
   // const urls here
   fetch(okUrl).then(response => console.log(response));
   ```

1. Open the Chrome DevTools console and you should see the response object being logged. Notice that the body property is a readable stream object but you can't yet see the data.
1. Update the code to read the body stream and parse the JSON in the body of the request into a JavaScript object.

   ```js
   // const urls here

   fetch(okUrl)
     .then(response => {
       console.log(response);
       return response;
     })
     .then(response => response.json())
     .then(data => console.log(data));
   ```

1. In the console you will see the response as well as the data (parsed body) begin logged.
1. Update the url to an endpoint that throws a server error and update the code to catch the error.

   ```diff
   // const urls here

   + fetch(serverErrorUrl)
   .then(response => {
   console.log(response);
   return response;
   })
   .then(response => response.json())
   .then(data => console.log(data));
   + .catch(error => console.log(error));
   ```

1. You should see the following logged in the console.
   ```shell
   GET https://httpstat.us/500 500 (Internal Server Error)
   Response {type: "cors", url: "https://httpstat.us/500", redirected: false, status: 500, ok: false, …}
   SyntaxError: Unexpected token I in JSON at position 4
   ```
1. The catch caught an error thrown on the line shown below. The error occurred when parsing the json into a JavaScript object.

   ```js
   .then(response => response.json());
   ```

1. Remember, `fetch()` won’t reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, it will resolve normally (with ok status set to false)
1. To see this happening change .json() to .text()

   ```diff
   - .then(response => response.json());
   + then(response => response.text());
   ```

1. You should now see the error: `500 Internal Server Error` being logged to the console.

   > The fetch API doesn't consider server errors to be an error, the request was made and a response was returned. The response just happened to include an error message in the body and that body is not of `content-type: application/json` hence the error when attempt to parse it as `json`.

1. Change .text() back to .json()

   ```diff
   + .then(response => response.json());
   - then(response => response.text());
   ```

1. Add the following code to treat a response with a status set to false as an error.

   ```diff
   // const urls here

   fetch(serverErrorUrl)
   .then(response => {
       console.log(response);
       return response;
   })
   +  .then(response => {
   +    if (!response.ok) throw new Error(response.statusText);
   +    return response;
   + })
   .then(response => response.json())
   .then(data => console.log(data))
   .catch(error => console.log(error));
   ```

1. You should again see the error: `Internal Server Error` being logged to the console.
1. Now that we have things working we can remove the logging of the full response.

   ```diff
    // const urls here

   fetch(serverErrorUrl)
   -   .then(response => {
   -       console.log(response);
   -       return response;
   -   })
   .then(response => {
     if (!response.ok) throw new Error(response.statusText);
     return response;
   })
   .then(response => response.json())
   .then(data => console.log(data))
   .catch(error => console.log(error));
   ```

1. We can also pull the logic to parse the JSON body and handle the error into reusable functions.

```diff
 // const urls here

fetch(serverErrorUrl)
  .then(response => {
    console.log(response);
    return response;
  })
-  .then(response => {
-     if (!response.ok) throw new Error(response.statusText);
-     return response;
-   })
+  .then(handleErrors)
-  .then(response => response.json())
+  .then(parseJSON)
  .then(data => console.log(data))
  .catch(error => console.log(error));

+ function handleErrors(response) {
+  if (!response.ok) throw new Error(response.statusText);
+  return response;
+ }

+ function parseJSON(response) {
+   return response.json();
+ }
```

2. Try these other urls that also return errors and verify they are logged properly.

   ```js
   const notFoundErrorUrl = 'https://httpstat.us/404';
   const forbiddenErrorUrl = 'https://httpstat.us/403';
   ```

## React

Now that we understand the fundamental underlying concepts lets render this data in React.

### componentDidMount

You should populate data with AJAX calls in the `componentDidMount` lifecycle method. This is so you can use `setState` to update your component when the data is retrieved.

### Loading

Since AJAX calls don't always return immediately (they are asynchronous) it is common practice to show a loading indicator when the HTTP request is in flight.

### Error Handling

If an error occurs while making the request or when it returns we need to either display that error or translate it to a more user friendly message and then display the error.

Initially, we'll just display the error from the server and then later we will see how to translate that error to something more user friendly.

### Lists

If the data is returned successfully, we can use what we learned in the list section to display the data.

> ! Remember we need to set a key on the list items.

### Example

1.  Try the following code in `main.jsx`

    ```js
    const okUrl = 'https://localhost:3000/photos?_page=1&_limit=100';
    const notFoundErrorUrl = 'https://httpstat.us/404';
    const forbiddenErrorUrl = 'https://httpstat.us/403';
    const serverErrorUrl = 'https://httpstat.us/500';

    class PhotoList extends React.Component {
      state = {
        loading: false,
        photos: [],
        error: undefined
      };

      componentDidMount() {
        this.setState({ loading: true });

        fetch(notFoundErrorUrl)
          // fetch(okUrl)
          .then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response;
          })
          .then(response => response.json())
          .then(data => {
            this.setState({ photos: data, loading: false });
          })
          .catch(error => {
            const userError = this.toUserError(error);
            this.setState({ error: userError, loading: false });
          });
      }

      toUserError(error) {
        console.log('Call API to log the raw error. ', error);
        return 'There was an error loading the photos.';
      }

      render() {
        const { loading, photos, error } = this.state;
        if (error) {
          return <div>{error}</div>;
        } else if (loading) {
          return <div>Loading...</div>;
        } else {
          return (
            <ul>
              {photos.map(photo => {
                return (
                  <li key={photo.id}>
                    <img src={photo.thumbnailUrl} alt={photo.title} />
                    <p>{photo.title}</p>
                  </li>
                );
              })}
            </ul>
          );
        }
      }
    }

    ReactDOM.render(<PhotoList />, document.getElementById('root'));
    ```

1.  Try these other urls that also return errors and verify they are logged properly.
    ```js
    const notFoundErrorUrl = 'https://httpstat.us/404';
    const forbiddenErrorUrl = 'https://httpstat.us/403';
    const serverErrorUrl = 'https://httpstat.us/500';
    ```
1.  If time permits, update the code to use `Axios` instead of the `fetch API` as shown below.

    ```diff
    componentDidMount() {
        this.setState({ loading: true });

    +    axios
    +      .get(okUrl)
    +      .then(response => response.data)
    -     fetch(notFoundErrorUrl)
    -     fetch(okUrl)
    -      .then(response => {
    -         if (!response.ok) throw new Error(response.statusText);
    -         return response;
    -       })
    -     .then(response => response.json())
        .then(data => {
            this.setState({ photos: data, loading: false });
        })
        .catch(error => {
            const userError = this.toUserError(error);
            this.setState({ error: userError, loading: false });
        });
    }

    ```

## Reuse

After you get comfortable using `Axios` and/or the `fetch API` and rendering the result in a React component, consider pulling the data access code into a reusable object. The benefit to doing this is that multiple components can make the same API call and convert to more user friendly error messages without repeating the code involved.

React is not very prescriptive about file names but their documentation does show these files being named with an API suffix (for example ProfileAPI.js).

Review the example below (using the fetch API). If time permits get the example running in `main.jsx`

```js
const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/photos`;

function translateStatusToErrorMessage(status) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the photos.';
    default:
      return 'There was an error retrieving the photos. Please try again.';
  }
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url
    };
    console.log(
      `logging http details for debugging: ${JSON.stringify(httpErrorInfo)}`
    );

    let errorMessage = PhotoAPI.translateStatusToErrorMessage(
      httpErrorInfo.status
    );
    throw new Error(errorMessage);
  }
}

function parseJSON(response) {
  return response.json();
}

function delay(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

const photoAPI = {
  getAll(page = 1, limit = 100) {
    return (
      fetch(`${url}?_page=${page}&_limit=${limit}`)
        // .then(delay(600))
        .then(checkStatus)
        .then(parseJSON)
    );
  },

  add(photo) {
    return fetch(`${url}`, {
      method: 'POST',
      body: JSON.stringify(photo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(parseJSON);
  },

  update(photo) {
    return fetch(`${url}/${photo.id}`, {
      method: 'PUT',
      body: JSON.stringify(photo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(parseJSON);
  },

  delete(id) {
    return fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(parseJSON);
  }
};

class PhotoList extends React.Component {
  state = {
    loading: false,
    photos: [],
    error: undefined
  };

  componentDidMount() {
    this.setState({ loading: true });

    photoAPI
      .getAll(2)
      .then(data => {
        this.setState({ photos: data, loading: false });
      })
      .catch(error => {
        this.setState({ error: error.message, loading: false });
      });
  }

  render() {
    const { loading, photos, error } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>{error}</div>;
    } else {
      return (
        <ul>
          {photos.map(photo => {
            return (
              <li key={photo.id}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <p>{photo.title}</p>
              </li>
            );
          })}
        </ul>
      );
    }
  }
}

ReactDOM.render(<PhotoList />, document.getElementById('root'));
```

## POST

#### POST with Axios

```js
axios({
  method: 'post',
  url: 'http://localhost:3000/photos',
  data: {
    albumId: 1,
    title: 'New Photo',
    url: 'https://via.placeholder.com/600/b0f7cc',
    thumbnailUrl: 'https://via.placeholder.com/150/b0f7cc'
  }
})
  .then(response => response.data)
  .then(photo => console.log(photo))
  .catch(error => console.log(error));
```

#### POST with Fetch

```js
var url = 'http://localhost:3000/photos';
var data = {
  albumId: 1,
  title: 'Another Photo',
  url: 'https://via.placeholder.com/600/b0f7cc',
  thumbnailUrl: 'https://via.placeholder.com/150/b0f7cc'
};

fetch(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    console.log(response);
    return response;
  })
  .then(response => {
    if (!response.ok) throw new Error(response.statusText);
    return response;
  })
  .then(response => response.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));
```

## PUT

```js
var okUrl = 'http://localhost:3000/photos/5001';
const notFoundErrorUrl = 'http://localhost:3000/photos/10000000';

var data = {
  title: 'Another Updated Photo'
};

fetch(notFoundErrorUrl, {
  method: 'PUT',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    if (!response.ok) throw new Error(response.statusText);
    return response;
  })
  .then(response => response.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));
```

## DELETE

```js
var okUrl = 'http://localhost:3000/photos/5001';

fetch(okUrl, {
  method: 'DELETE'
})
  .then(response => {
    console.log(response);
    return response;
  })
  .then(response => {
    if (!response.ok) throw new Error(response.statusText);
    return response;
  })
  .then(response => response.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));
```

## Item CRUD Implemented

`api\db.json`

```json
,
  "items": [
    {"id": 1, "name": "First Item" },
    {"id": 2, "name": "Second Item" },
    {"id": 3, "name": "Third Item" }
  ]
```

```css
/* styles.css */

body,
button,
input,
textarea,
li {
  font-family: 'Open Sans', sans-serif;
  font-size: 1em;
}

li {
  list-style: none;
  border-bottom: 1px solid #ddd;
}

span {
  margin: 15px;
}

button {
  margin: 10px;
  padding: 5px 15px 5px 15px;
  background: transparent;
}

form {
  margin: 15px;
}
```

```js
//main.jsx

function ID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

function translateStatusToErrorMessage(status) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the items.';
    default:
      return 'There was an error retrieving the items. Please try again.';
  }
}

//pass translate in to make this more flexible
function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url
    };
    console.log(
      `logging http details for debugging: ${JSON.stringify(httpErrorInfo)}`
    );

    let errorMessage = ItemAPI.translateStatusToErrorMessage(
      httpErrorInfo.status
    );
    throw new Error(errorMessage);
  }
}

function parseJSON(response) {
  return response.json();
}

class Item {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/items`;

// API ----------
const itemAPI = {
  getAll(page = 1, limit = 100) {
    return fetch(`${url}?_page=${page}&_limit=${limit}`)
      .then(checkStatus)
      .then(parseJSON);
  },

  add(item) {
    return fetch(`${url}`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(parseJSON);
  },

  update(item) {
    return fetch(`${url}/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(parseJSON);
  },

  delete(id) {
    return fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(parseJSON);
  }
};

class List extends React.Component {
  state = {
    editingItem: null
  };

  handleEditClick = item => {
    this.setState({ editingItem: item });
  };

  handleCancel = item => {
    this.setState({ editingItem: null });
  };

  render() {
    const { items, onRemove, onUpdate, loading, error } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>{error}</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item === this.state.editingItem ? (
                <Form
                  item={item}
                  onSubmit={onUpdate}
                  onCancel={this.handleCancel}
                />
              ) : (
                <p>
                  <span>{item.name}</span>
                  <button onClick={() => this.handleEditClick(item)}>
                    Edit
                  </button>
                  <button onClick={() => onRemove(item)}>Remove</button>
                </p>
              )}
            </li>
          ))}
        </ul>
      );
    }
  }
}

class Form extends React.Component {
  state = {
    inputValue: this.props.item.name || ''
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ inputValue: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const item = {
      id: this.props.item ? this.props.item.id : ID(),
      name: this.state.inputValue
    };

    this.props.onSubmit(item);
    this.setState({ inputValue: '' });
  };

  handleCancel = event => {
    event.preventDefault();
    this.props.onCancel();
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input value={this.state.inputValue} onChange={this.handleChange} />
        <button>{this.props.buttonValue || 'Save'}</button>
        {this.props.onCancel && (
          <a href="#" onClick={this.handleCancel}>
            cancel
          </a>
        )}
      </form>
    );
  }
}

class Container extends React.Component {
  state = {
    loading: false,
    items: [],
    error: undefined
  };

  componentDidMount() {
    this.setState({ items: [], loading: true });
    itemAPI
      .getAll(1)
      .then(data => {
        this.setState({ items: data, loading: false });
      })
      .catch(error => {
        this.setState({ error: error.message, loading: false });
      });
  }

  addItem = item => {
    itemAPI
      .add(item)
      .then(data => {
        this.setState(state => ({
          items: [...state.items, item]
        }));
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  updateItem = updatedItem => {
    itemAPI
      .update(updatedItem)
      .then(data => {
        this.setState(state => {
          let items = state.items.map(item => {
            return item.id === updatedItem.id
              ? Object.assign({}, item, data)
              : item;
          });
          return { items };
        });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  removeItem = removeThisItem => {
    itemAPI
      .delete(removeThisItem.id)
      .then(data => {
        this.setState(state => {
          const items = state.items.filter(
            item => item.id != removeThisItem.id
          );
          return { items };
        });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  render() {
    return (
      <div>
        <Form item="" onSubmit={this.addItem} buttonValue="Add" />
        <List
          loading={this.state.loading}
          error={this.state.error}
          items={this.state.items}
          onRemove={this.removeItem}
          onUpdate={this.updateItem}
        />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return <Container />;
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
```

# Resources

- [Comparison: Fetch vs Axios](https://gist.github.com/jsjoeio/0fd8563bc23ef852bc921836512992d9)
- [Gotchas: Fetch vs Axios ](https://medium.com/@thejasonfile/fetch-vs-axios-js-for-making-http-requests-2b261cdd3af5)
- [JSON Server](https://github.com/typicode/json-server)
- [AJAX: React FAQ](https://reactjs.org/docs/faq-ajax.html)
- [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) -[Fetch Examples](https://mdn.github.io/fetch-examples/)
- [A Practical Guide to Using Fetch](https://medium.freecodecamp.org/a-practical-es6-guide-on-how-to-perform-http-requests-using-the-fetch-api-594c3d91a547)
- [Fetch & Errors](https://www.tjvantoll.com/2015/09/13/fetch-and-errors/)
- [Reusable API Class Example](https://codeburst.io/how-to-call-api-in-a-smart-way-2ca572c6fe86)
