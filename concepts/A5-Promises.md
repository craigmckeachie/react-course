## Promise

Foundational technology in JavaScript you need to know Promises first.


### Asynchronous vs Synchronous

_Synchronous_ execution means the execution happens in a single series. A->B->C->D. If you are calling those routines, A will run, then finish, then B will start, then finish, then C will start, etc.

With _Asynchronous_ execution, you begin a routine, and let it run in the background while you start your next, then at some point, say "wait for this to finish". It's more like:

Start A->B->C->D->Wait for A to finish

The advantage is that you can execute B, C, and or D while A is still running (in the background, on a separate thread), so you can take better advantage of your resources and have fewer "hangs" or "waits".

#### Analogy

**SYNCHRONOUS**

You are in a queue to get a movie ticket. You cannot get one until everybody in front of you gets one, and the same applies to the people queued behind you.

**ASYNCHRONOUS**

You are in a restaurant with many other people. You order your food. Other people can also order their food, they don't have to wait for your food to be cooked and served to you before they can order. In the kitchen restaurant workers are continuously cooking, serving, and taking orders. People will get their food served as soon as it is cooked.

If you wanted the restaurant scenario to be synchronous, then when you order food, everyone else in the restaurant would have to wait for your food to arrive before they can order their food etc. Now this seems like a really dumb scenario to be in, but in the computing world this scenario could be useful. Say each customer can't decide what they want, and instead want to look at what the previous customer orders to decide if they want that or not, then it makes sense that they have to wait for the food to arrive before ordering.

> In summary, McDonalds can be asynchronous when multiple cashiers are taking orders and Chipotle is synchronous.

Reference:

- [asynchronous-vs-synchronous-execution-what-does-it-really-mean](https://stackoverflow.com/questions/748175/asynchronous-vs-synchronous-execution-what-does-it-really-mean)

### Callback vs Promise

`Promises` provide a more convenient API to do things asynchronously. Before `promises` async things were done with `callbacks` so `promises` are an **improvement** on `callbacks`.

#### Callback Example

1. Paste the hard-coded data and responses.

   ```js
   const customer = {
     id: '10',
     first: 'James',
     last: 'Brown',
     email: 'james.brown@gmail.com'
   };

   const orders = [
     {
       id: 50,
       name: 'Vitamins',
       description: "Men's Multi-Vitamin",
       price: 25.99
     },
     {
       id: 103,
       name: 'AC Adapter Power Cord',
       description: 'Power Supply Cord Charger PSU',
       price: 15.99
     },
     {
       id: 317,
       name: 'Gatorade',
       description: '12 pack Gatorade',
       price: 12.99
     }
   ];

   const recentlyViewedItems = [
     {
       id: 504,
       name: 'Water Bottle',
       description: 'Eco 32oz Water Bottle',
       price: 25
     },
     {
       id: 78,
       name: 'Pens',
       description: 'Writing Pens, thick point',
       price: 15.99
     },
     {
       id: 317,
       name: 'Notebook',
       description: 'Spiral Ring Notebook',
       price: 12.99
     }
   ];

   const orderTrackingStatus = {
     status: 'shipped',
     lastLocation: 'Knoxville, TN'
   };

   const notFoundResponse = {
     status: 404,
     statusText: 'Not found'
   };

   const unauthorizedResponse = {
     status: 401,
     statusText: 'Unauthorized'
   };

   const serverErrorResponse = {
     status: 500,
     statusText: 'Server Error'
   };
   ```

1. Paste the API class.

   ```js
   class FakeCallbackAPI {
     findCustomer(first, last, successCallback, failureCallback) {
       setTimeout(() => successCallback(customer), 1000);
       // setTimeout(() => failureCallback(serverErrorResponse), 1000);
     }

     getOrders(customerId, successCallback, failureCallback) {
       setTimeout(() => successCallback(orders), 2000);
       // setTimeout(() => failureCallback(notFoundResponse), 1000);
     }

     getOrderTrackingStatus(orderId, successCallback, failureCallback) {
       setTimeout(() => successCallback(orderTrackingStatus), 1500);
       // setTimeout(() => failureCallback(serverErrorResponse), 1000);
     }
   }
   ```

1. Call `findCustomer` and show it logging data.
1. Comment out the call to `successCallback` in `findCustomer` and uncomment the call to `failureCallback`
1. Add a `failureCallback` that logs the error.
1. See the error being logged.
1. Comment out the call to `failureCallback` in `findCustomer` and uncomment the call to `successCallback`
1. Call `getOrders` and confirm it is logging the data
1. Call `getOrderStatus` and confirm it is logging the data

   ```js
   const api = new FakeCallbackAPI();
   api.findCustomer(
     'James',
     'Brown',
     customer => {
       console.log('1 ', customer);
       console.log('getting orders for customer id: ', customer.id);
       return api.getOrders(
         customer.id,
         orders => {
           console.log('2 ', orders);
           const mostRecentOrderId = orders[0].id;
           console.log('getting status for order id: ', mostRecentOrderId);
           return api.getOrderTrackingStatus(
             mostRecentOrderId,
             status => {
               console.log('3', status);
             },
             error => console.log(error)
           );
         },
         error => console.log(error)
       );
     },
     error => console.log(error)
   );
   ```

Issues with this approach:

- Nesting: callback `Pyramid of Doom`
- Error Handling: At each level
  - no error propagation or bubbling

#### Promise Example

Promise Guarantees

- Callbacks wait for event loop
- Callback will be called
- Each callback is executed in order

1. Paste the hard-coded data and responses.

   ```js
   const customer = {
     id: '10',
     first: 'James',
     last: 'Brown',
     email: 'james.brown@gmail.com'
   };

   const orders = [
     {
       id: 50,
       name: 'Vitamins',
       description: "Men's Multi-Vitamin",
       price: 25.99
     },
     {
       id: 103,
       name: 'AC Adapter Power Cord',
       description: 'Power Supply Cord Charger PSU',
       price: 15.99
     },
     {
       id: 317,
       name: 'Gatorade',
       description: '12 pack Gatorade',
       price: 12.99
     }
   ];

   const recentlyViewedItems = [
     {
       id: 504,
       name: 'Water Bottle',
       description: 'Eco 32oz Water Bottle',
       price: 25
     },
     {
       id: 78,
       name: 'Pens',
       description: 'Writing Pens, thick point',
       price: 15.99
     },
     {
       id: 317,
       name: 'Notebook',
       description: 'Spiral Ring Notebook',
       price: 12.99
     }
   ];

   const orderTrackingStatus = {
     status: 'shipped',
     lastLocation: 'Knoxville, TN'
   };

   const notFoundResponse = {
     status: 404,
     statusText: 'Not found'
   };

   const unauthorizedResponse = {
     status: 401,
     statusText: 'Unauthorized'
   };

   const serverErrorResponse = {
     status: 500,
     statusText: 'Server Error'
   };
   ```

1. Paste the API class.

   ```js
   const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

   function wrapInPromise(waitTime, action, data) {
     return wait(waitTime).then(() => {
       return new Promise((resolve, reject) => {
         if (action === 'resolve') {
           resolve(data);
         } else {
           reject(data);
         }
       });
     });
   }

   //no nesting, returning promises
   class FakeAPI {
     findCustomer(first, last) {
       return wrapInPromise(1000, 'resolve', customer);
       // return wrapInPromise(1000, 'reject', notFoundResponse);
     }

     getOrders(customerId) {
       return wrapInPromise(2000, 'resolve', orders);
       // return wrapInPromise(1000, 'reject', serverErrorResponse);
     }

     getOrderTrackingStatus(orderId) {
       return wrapInPromise(1000, 'resolve', orderTrackingStatus);
       // return wrapInPromise(1000, 'reject', unauthorizedResponse);
     }
   }
   ```

1. Call `findCustomer` and show it logging data.
1. Comment out the call to `wrapInPromise` with a `resolve` action in `findCustomer` and uncomment the call to `wrapInPromise` with a `reject` action
1. See the error being logged
1. Call `getOrders` and confirm it is logging the data
1. Call `getOrderStatus` and confirm it is logging the data

   ```js
   const api = new FakeAPI();
   api
     .findCustomer('James', 'Brown')
     .then(customer => {
       console.log('1 ', customer);
       console.log('getting orders for customer id: ', customer.id);
       return api.getOrders(customer.id);
     })
     .then(orders => {
       console.log('2 ', orders);
       const mostRecentOrderId = orders[0].id;
       console.log('getting status for order id: ', mostRecentOrderId);
       return api.getOrderTrackingStatus();
     })
     .then(status => {
       console.log('3', status);
     })
     .catch(error => console.log(error));
   ```

##### How Promises Improve on Callbacks

- Chaining
  - Solves nesting resulting in Pyramid of Doom by returning a new promise in every `then` enabling chaining of promises.
- Error Propagation
  - Instead of needing error handling at every level, errors can propagate up the promise chain and be handled in one place. This is similar to how nested try catch blocks work when writing synchronous code.

#### Common Issues/Mistakes:

- Nest unnecessarily
- Forget to return promise
- Forgetting to catch errors

This code makes all these mistakes but works the same as the above code. It is just significantly harder to read and maintain.

```js
//not returning the promise, nesting unnecessarily
const api = new FakeAPI();
api
  .findCustomer('James', 'Brown')
  .then(customer => {
    console.log('1 ', customer);
    console.log('getting orders for customer id: ', customer.id);
    api
      .getOrders(customer.id)
      .then(orders => {
        console.log('2 ', orders);
        const mostRecentOrderId = orders[0].id;
        console.log('getting status for order id: ', mostRecentOrderId);
        api
          .getOrderTrackingStatus()
          .then(status => {
            console.log('3', status);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  })
  .catch(error => console.log(error));
```

## Async/Await

There is a new JavaScript (ECMAScript) language feature that builds on top of promises and allows for even better syntax for working with asynchronous operations. The proposal for the language feature has currently made it to stage 3 and is hoping to go to the final stage 4 by November of 2019.

Here is the example we've been using rewritten to use `async/await`:

```js
async function loadData() {
  let data = {};
  const api = new FakeAPI();

  data.customer = await api.findCustomer('James', 'Brown');
  data.orders = await api.getOrders(data.customer.id);
  data.mostRecentOrder = data.orders[0];
  data.mostRecentOrder.status = await api.getOrderTrackingStatus(
    data.mostRecentOrder.id
  );
  console.log(data);
}
loadData();
```

<!--
Here is the example with error handling:

```js
``` -->

## Resources
- [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [Google Web Fundamentals: Promises](https://developers.google.com/web/fundamentals/primers/promises)
- [Emulate a long-running API](httpstat.us/200?sleep=5000)

