# Lists

Often the answer to the question of how do I do something in React can be answered by understanding how would you do it in JavaScript.

## In Vanilla JavaScript

In JavaScript, the approach we use to loop through an `Array` and transform the data in it has evolved to a more functional style of programming with the addition of:

- functions like `forEach` and `map` to the Array in ES5
- the arrow function in ES6 (ES2015)

Clear the code in `main.jsx` and work through each example below to see the progression.

### a. for loop

```js
const numbers = [1, 2, 3, 4, 5];
const tens = [];

for (let index = 0; index < numbers.length; index++) {
  const number = numbers[index];
  tens.push(number * 10);
}

console.log(tens);
```

### b. #array.forEach

```js
const numbers = [1, 2, 3, 4, 5];
const tens = [];

numbers.forEach(function(number) {
  tens.push(number * 10);
});

console.log(tens);
```

### c. #array.map

```js
const numbers = [1, 2, 3, 4, 5];

const tens = numbers.map(function(number) {
  return number * 10;
});

console.log(tens);
```

### d. #array.map with arrow function

```js
const numbers = [1, 2, 3, 4, 5];
const tens = numbers.map(number => number * 10);
console.log(tens);
```

## Multiple Elements

We can use the Array's `map` function to transform an array of data into an array of React elements and then render them as follows.

```js
function FruitList(props) {
  const fruitListItems = props.fruits.map(fruit => (
    <li key={fruit.id}>{fruit.name}</li>
  ));
  return <ul>{fruitListItems}</ul>;
}

const data = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'orange' },
  { id: 3, name: 'blueberry' },
  { id: 4, name: 'banana' },
  { id: 5, name: 'kiwi' }
];

ReactDOM.render(<FruitList fruits={data} />, document.getElementById('root'));
```

Of course, you could do the above with more verbose code using a Array `forEach` or a `for` loop in JavaScript. I've included examples of each below. You will use mostly use the terser `map` but it might help your understanding to see the following equivalent code examples.

```js
function FruitList(props) {
  const fruitListItems = [];
  const fruits = props.fruits;
  for (let index = 0; index < fruits.length; index++) {
    const fruit = fruits[index];
    const fruitListItem = <li key={fruit.id}>{fruit.name}</li>;
    fruitListItems.push(fruitListItem);
  }
  return <ul>{fruitListItems}</ul>;
}
```

```js
function FruitList(props) {
  const fruitListItems = [];
  props.fruits.forEach(fruit => {
    const fruitListItem = <li key={fruit.id}>{fruit.name}</li>;
    fruitListItems.push(fruitListItem);
  });
  return <ul>{fruitListItems}</ul>;
}
```

## Multiple Components

This same approach works with components as well.

In the example, below we extract each list item into an reusable component.

```js
function FruitListItem(props) {
  return <li>{props.fruit.name}</li>;
}

function FruitList(props) {
  const fruitListItems = props.fruits.map(fruit => (
    <FruitListItem key={fruit.id} fruit={fruit} />
  ));
  return <ul>{fruitListItems}</ul>;
}

const data = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'orange' },
  { id: 3, name: 'blueberry' },
  { id: 4, name: 'banana' },
  { id: 5, name: 'kiwi' }
];

ReactDOM.render(<FruitList fruits={data} />, document.getElementById('root'));
```

Notice that we've kept the key close to the loop and did not encapsulate it in the item component. We'll talk about `keys` in lists and why we did that in the next section.

## Keys

1. Remove the key property on the `FruitListItem` as shown below:

```diff
  const fruitListItems = props.fruits.map(fruit => (
    <FruitListItem
-      key={fruit.id}
      fruit={fruit} />
  ));
```

2. Refresh the page and check the console
3. You should see the following warning:

```sh
Warning: Each child in a list should have a unique "key" prop.
```

> Remember React has a Virtual representation of the DOM and strives to do as few DOM operations as possible when re-rendering. Adding a unique key to the list items allows React to efficiently re-render the UI.

### Adding Keys

1.  Add the key back

```diff
  const fruitListItems = props.fruits.map(fruit => (
    <FruitListItem
+      key={fruit.id}
      fruit={fruit} />
  ));
```

2.  Refresh the browser and the warning will no longer appear

> The key need should be a stable unique identifier for the item in the list.

When you don’t have stable IDs for rendered items, you may use the item index as a key as a last resort:

```js
function FruitList(props) {
  const fruitListItems = props.fruits.map((fruit, index) => (
    <FruitListItem key={index} fruit={fruit} />
  ));
  return <ul>{fruitListItems}</ul>;
}
```

It is not recommended to use indexes for keys if the order of items may change (add, remove, delete, or move items). If you choose not to assign an explicit key to list items then React will default to using indexes as keys.

### Where to put Keys

Keys only make sense in the context of the surrounding array.

Keys should be just inside of the loop not encapsulated inside a child component.

```js
function FruitListItem(props) {
  const fruit = props.fruit;
  return <li key={fruit.id}>{fruit.name}</li>;
}

function FruitList(props) {
  const fruitListItems = props.fruits.map(fruit => (
    <FruitListItem fruit={fruit} />
  ));
  return <ul>{fruitListItems}</ul>;
}

const data = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'orange' },
  { id: 3, name: 'blueberry' },
  { id: 4, name: 'banana' },
  { id: 5, name: 'kiwi' }
];
ReactDOM.render(<FruitList fruits={data} />, document.getElementById('root'));
```

This example will still give the warning:

```sh
 Warning: Each child in a list should have a unique "key" prop.
```

To remove the warning you will need to add the key closer to the loop as we did previously.

The complete code example is shown again below.

```js
function FruitListItem(props) {
  return <li>{props.fruit.name}</li>;
}

function FruitList(props) {
  const fruitListItems = props.fruits.map(fruit => (
    <FruitListItem key={fruit.id} fruit={fruit} />
  ));
  return <ul>{fruitListItems}</ul>;
}

const data = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'orange' },
  { id: 3, name: 'blueberry' },
  { id: 4, name: 'banana' },
  { id: 5, name: 'kiwi' }
];

ReactDOM.render(<FruitList fruits={data} />, document.getElementById('root'));
```

## map() in JSX

When you are first learning to map an array into React elements or components assigning the resulting array into a variable as we have thus far can be easier to understand and read.

As you get more comfortable in JSX using map directly in the return statement in JSX as shown below can be useful.

```js
function FruitList(props) {
  return (
    <ul>
      {props.fruits.map(fruit => (
        <FruitListItem key={fruit.id} fruit={fruit} />
      ))}
    </ul>
  );
}
```

> Be careful not to overuse this approach as it can be harder to read, write, and maintain.

## Resources

[Lists & Keys](https://reactjs.org/docs/lists-and-keys.html)

[Understanding unique keys for array children in React.js](https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js)
