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

  getRecentlyViewedItems(customerId) {
    return wrapInPromise(3000, 'resolve', recentlyViewedItems);
  }
}

// https://stackoverflow.com/questions/28714298/how-to-chain-and-share-prior-results-with-promises
//share prior results
const api = new FakeAPI();
const customerId = 10;
const results = {};
api
  .findCustomer(customerId)
  .then(customer => {
    console.log('1 ', customer);
    results.customer = customer;
    console.log('getting orders for customer id: ', customer.id);
    return api.getOrders(customer.id);
  })
  .then(orders => {
    console.log('2 ', orders);
    results.orders = orders;
    const mostRecentOrderId = orders[0].id;
    console.log('getting status for order id: ', mostRecentOrderId);
    return api.getOrderTrackingStatus();
  })
  .then(status => {
    console.log('3', status);
    return status;
  })
  .then(() => {
    return api.getRecentlyViewedItems(customerId);
  })
  .then(items => {
    console.log('4 ', items);
    results.recentlyViewedItems = items;
  })
  .catch(error => {
    console.log('e ', error);
    results.error = error;
  })
  .then(() => console.log(results));

// all

// const api = new FakeAPI();
// const customerId = 10;
// let yourOrdersData;
// Promise.all([
//   api.findCustomer(customerId),
//   api.getOrders(customerId),
//   api.getRecentlyViewedItems(customerId)
// ])
//   .then(results => {
//     console.log(results);
//     let [customer, orders, items] = results;
//     yourOrdersData = {
//       customer,
//       orders,
//       recentlyViewedItems: items,
//       mostRecentOrder: orders[0]
//     };
//     return yourOrdersData;
//   })
//   .then(data => {
//     return api.getOrderTrackingStatus(yourOrdersData.mostRecentOrder.id);
//   })
//   .then(status => {
//     yourOrdersData.mostRecentOrder.status = status;
//     return yourOrdersData;
//   })
//   .then(data => console.log(data));
```
