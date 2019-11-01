# Appendix A11: React with TypeScript

- [Appendix A11: React with TypeScript](#appendix-a11-react-with-typescript)
  - [Installation](#installation)
  - [Props](#props)
    - [Function Component](#function-component)
      - [`src\Hello.tsx`](#srchellotsx)
      - [`src\App.tsx`](#srcapptsx)
      - [`src\App.tsx`](#srcapptsx-1)
    - [Class Component](#class-component)
      - [`src\Hello.tsx`](#srchellotsx-1)
  - [State](#state)
      - [`src\Hello.tsx`](#srchellotsx-2)
  - [Event Handlers](#event-handlers)
      - [`src\Hello.tsx`](#srchellotsx-3)
  - [Resources](#resources)

## Installation

- See the section `Create New TypeScript Project` in `Chapter 20: Project Setup`.

- We will use the `my-app` project we created with TypeScript enabled using `Create React App`.

## Props

### Function Component

1. Create the file `src\Hello.tsx`.
2. Create a function component.

#### `src\Hello.tsx`

```tsx
import React from 'react';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

function Hello({ name, enthusiasmLevel = 1 }: Props) {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  return (
    <div className="hello">
      <div className="greeting">
        Hello {name + getExclamationMarks(enthusiasmLevel)}
      </div>
    </div>
  );
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
```

3. Render `<Hello></Hello>` component in the App component.

#### `src\App.tsx`

```diff
import React from 'react';
- import logo from './logo.svg';
import './App.css';
import Hello from './Hello';

const App: React.FC = () => {
  return (
    <div className="App">
-      <header className="App-header">
-        <img src={logo} className="App-logo" alt="logo" />
-        <p>
-          Edit <code>src/App.tsx</code> and save to reload.
-        </p>
-        <a
-          className="App-link"
-          href="https://reactjs.org"
-          target="_blank"
-          rel="noopener noreferrer"
-        >
-          Learn React
-        </a>
-      </header>
+      <Hello></Hello>
    </div>
  );
};

export default App;
```

4. You will get the following TypeScript error.

```
Property 'name' is missing in type '{}' but required in type 'Props'.
```

5. Add `name` as a `prop`.

#### `src\App.tsx`

```diff
...
- <Hello ></Hello>
+ <Hello name="David"></Hello>
...
```

6. The compiler error will go away and following should be displayed in the browser.

```
Hello David!
```

7. Enthusiasm level is an nullable parameter so we did not have to set it yet. Set enthusiasm level as follows and observe the results:

   1. `<Hello name="David" enthusiasmLevel="3"></Hello>`
      - Type 'string' is not assignable to type 'number | undefined'
   1. `<Hello name="David" enthusiasmLevel={3}></Hello>`
      - Hello David!!!
   1. `<Hello name="David" enthusiasmLevel={0}></Hello>`
      - Error: You could be a little more enthusiastic. :D
   1. Change it back so the error goes away: `<Hello name="David" enthusiasmLevel={3}></Hello>`

### Class Component

1. Replace `Hello` with a similar implementation that uses a class component.

#### `src\Hello.tsx`

```tsx
import React from 'react';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

class Hello extends React.Component<Props> {
  render() {
    const { name, enthusiasmLevel = 1 } = this.props;

    if (enthusiasmLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + getExclamationMarks(enthusiasmLevel)}
        </div>
      </div>
    );
  }
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
```

2. Verify the component works as it did before.

## State

1. Replace `Hello` with the new implementation below that stores enthusiasm level as `state`.

#### `src\Hello.tsx`

```tsx
import React from 'react';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

interface State {
  currentEnthusiasm: number;
}

class Hello extends React.Component<Props, State> {
  state = { currentEnthusiasm: this.props.enthusiasmLevel || 1 };

  onIncrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm + 1);
  onDecrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm - 1);

  render() {
    const { name } = this.props;

    if (this.state.currentEnthusiasm <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + getExclamationMarks(this.state.currentEnthusiasm)}
        </div>
        <button onClick={this.onDecrement}>-</button>
        <button onClick={this.onIncrement}>+</button>
      </div>
    );
  }

  updateEnthusiasm(currentEnthusiasm: number) {
    this.setState({ currentEnthusiasm });
  }
}

export default Hello;

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
```

2. Notice that `state` is the second type parameter being passed when the class is constructed.

> You can leave `state` off if the component doesn't have local state.

- `class Hello extends React.Component<Props>`
- `class Hello extends React.Component<Props, State>`

> If you have state but no props use one of the following syntaxes.

- `class Hello extends React.Component<object, State>`
- `class Hello extends React.Component<any, State>`
- `class Hello extends React.Component<{}, State>`

3. Verify the component is working.

## Event Handlers

1. Replace `Hello` with the new implementation below that strongly types the event object.

> This enables autocomplete for methods or properties on the event and type errors when you attempt to access a non-existent property or invoke an invalid function.

#### `src\Hello.tsx`

```tsx
import React, { SyntheticEvent } from 'react';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

interface State {
  currentEnthusiasm: number;
}

class Hello extends React.Component<Props, State> {
  state = { currentEnthusiasm: this.props.enthusiasmLevel || 1 };

  onIncrement = (event: SyntheticEvent) => {
    console.log(event);
    this.updateEnthusiasm(this.state.currentEnthusiasm + 1);
  };
  onDecrement = (event: SyntheticEvent) => {
    console.log(event.target);
    this.updateEnthusiasm(this.state.currentEnthusiasm - 1);
  };

  render() {
    const { name } = this.props;

    if (this.state.currentEnthusiasm <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + getExclamationMarks(this.state.currentEnthusiasm)}
        </div>
        <button onClick={this.onDecrement}>-</button>
        <button onClick={this.onIncrement}>+</button>
      </div>
    );
  }

  updateEnthusiasm(currentEnthusiasm: number) {
    this.setState({ currentEnthusiasm });
  }
}

export default Hello;

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
```

## Resources

- [How to Use TypeScript with React & Redux](https://medium.com/@rossbulat/how-to-use-typescript-with-react-and-redux-a118b1e02b76)
- [Microsoft Tutorial on React & Redux using TypeScript](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter)
- [React TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#reacttypescript-cheatsheets)
