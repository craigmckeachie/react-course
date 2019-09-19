Start
git checkout -b lab25

Complete
git add .
git commit -m "lab25"
git push --set-upstream origin lab25

https://stackoverflow.com/questions/14015899/embed-typescript-code-in-an-html-document

# TODO

## Make Private Copy of Repository

git clone https://github.com/octocat/Spoon-Knife.git
cd Spoon-Knife

Repository > New > copy-Spoon-Knife.git

git remote add copy https://github.com/craigmckeachie/copy-Spoon-Knife.git
git push -u copy master

## Versions

React
16.8 Hooks
16.9 Profiler API

React Router
2,3=> 4 (Rewrite), 5 (just necessary b/c semantic versioning)

hooks

- useEffect
  - https://academind.com/learn/react/react-hooks-introduction/
- custom hooks

API class needs modifications or hook needs mods to support all CRUD operations.

```js
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

class Item {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

const baseUrl = 'http://localhost:3000';

class ItemAPI {
  url = `${baseUrl}/items`;

  constructor() {}

  getAll(page = 1, limit = 100) {
    return fetch(`${this.url}?_page=${page}&_limit=${limit}`)
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  add(item) {
    return fetch(`${this.url}`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  update(item) {
    return fetch(`${this.url}/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  delete(id) {
    return fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  static translateStatusToErrorMessage(status) {
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
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
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

  parseJSON(response) {
    return response.json();
  }
}

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
    const { items = [], onRemove, onUpdate, loading, error } = this.props;

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

const useHttp = (api, dependencies) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(undefined);
  const [error, setError] = React.useState(undefined);

  React.useEffect(() => {
    setLoading(true);
    api
      .getAll(1)
      .then(data => {
        setLoading(false);
        setData(data);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      });
  }, dependencies);

  return [loading, data, setData, error];
};

function Container() {
  // const [items, setItems] = React.useState([]);
  // const [loading, setLoading] = React.useState(false);
  // const [error, setError] = React.useState(null);

  // React.useEffect(() => {
  //   setLoading(true);
  //   let itemAPI = new ItemAPI();
  //   itemAPI
  //     .getAll(1)
  //     .then(data => {
  //       setLoading(false);
  //       setItems(data);
  //     })
  //     .catch(error => {
  //       setLoading(false);
  //       setError(error.message);
  //     });
  // }, []);

  const [loading, items, setItems, error] = useHttp(new ItemAPI(), []);

  const addItem = item => {
    setItems([...items, item]);
  };

  const updateItem = updatedItem => {
    let updatedItems = items.map(item => {
      return item.id === updatedItem.id
        ? Object.assign({}, item, updatedItem)
        : item;
    });
    return setItems(updatedItems);
  };

  const removeItem = removeThisItem => {
    const filteredItems = items.filter(item => item.id != removeThisItem.id);
    setItems(filteredItems);
  };

  return (
    <React.Fragment>
      <Form item="" onSubmit={addItem} buttonValue="Add" />
      <List
        loading={loading}
        items={items}
        onRemove={removeItem}
        onUpdate={updateItem}
        error={error}
      />
    </React.Fragment>
  );
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Container />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

- other hooks
- text/explanation

advanced components?
x- render props
x- higher order components

react-redux-thunk

- text/explanation

labs

- one branch check in until done
- keep high level markdown document for each lab

demos
-solutions
-one folder each
-one file each etc....

TypeScript
GraphQL

## Small

VS Code extension: Version Lens by PLannery

consider just loading mock data in the action creator at first [see Ex 2. step 4](https://github.com/microsoft/TechnicalCommunityContent/tree/master/Web%20Frameworks/React/Session%203%20-%20Hands%20On)

https://github.com/graphql-compose/graphql-compose-examples/tree/master/examples/northwind/data/json

https://stackoverflow.com/questions/39209181/how-to-add-ts-files-for-debugging-in-prod
