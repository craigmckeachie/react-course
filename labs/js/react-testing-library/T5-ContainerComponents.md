# Testing Lab 5: Container Components

## Objectives

- [ ] Test Setup
- [ ] Test the Loading Indicator Displays
- [ ] Test the Projects Display
- [ ] Test the More Button Displays
- [ ] Test the Error Displays

## Steps

### Test Setup

1. **Create** the **file** `src\projects\__tests__\ProjectsPage-test.js`.
1. **Add** the **setup** code below to test the component.

   #### `src\projects\__tests__\ProjectsPage-test.js`

   ```js
   import React from 'react';
   import { MemoryRouter } from 'react-router-dom';
   import { Provider } from 'react-redux';
   import { store } from '../../state';
   import ProjectsPage from '../ProjectsPage';
   import {
     render,
     screen,
     waitForElementToBeRemoved,
   } from '@testing-library/react';

   describe('<ProjectsPage />', () => {
     function renderComponent() {
       render(
         <Provider store={store}>
           <MemoryRouter>
             <ProjectsPage />
           </MemoryRouter>
         </Provider>
       );
     }

     test('should render without crashing', () => {
       renderComponent();
       expect(screen).toBeDefined();
     });
   });
   ```

1. **Verify** the initial **test passed**.
   ```
   PASS  src/projects/__tests__/ProjectsPage-test.js
   ```

### Test the Loading Indicator Displays

1. Test that the loading indicator displays when the component initially renders.

   #### `src\projects\__tests__\ProjectsPage-test.js`

   ```diff
   import React from 'react';
   import { MemoryRouter } from 'react-router-dom';
   import { Provider } from 'react-redux';
   import { store } from '../../state';
   import ProjectsPage from '../ProjectsPage';
   import {
   render,
   screen,
   waitForElementToBeRemoved,
   } from '@testing-library/react';

   describe('<ProjectsPage />', () => {
   function renderComponent() {
      render(
         <Provider store={store}>
         <MemoryRouter>
            <ProjectsPage />
         </MemoryRouter>
         </Provider>
      );
   }
   ...

   +  test('should display loading', () => {
   +    renderComponent();
   +    expect(screen.getByText(/loading/i)).toBeInTheDocument();
   +  });


   });
   ```

1. **Verify** the **test passed**.
   ```
   PASS  src/projects/__tests__/ProjectsPage-test.js
   ```

### Test the Projects Display

1. **Open** a `command prompt` (Windows) or `terminal` (Mac).
1. Change the **current directory** to `code\keeptrack`.
1. **Run** _one_ of the following sets of commands to install `Mock Service Worker` to mock the HTTP requests.

   ```
   $ npm install msw --save-dev
   # or
   $ yarn add msw --dev
   ```

1. Export the url used in the component from the `projectAPI.js` file.

   #### `src\projects\projectAPI.js`

   ```diff
   import { Project } from './Project';

   const baseUrl = 'http://localhost:4000';
   - const url = `${baseUrl}/projects`;
   + export const url = `${baseUrl}/projects`;
   ...
   ```

1. Add the setup code to mock the requests.

   #### `src\projects\__tests__\ProjectsPage-test.js`

   ```diff
   import React from 'react';
   import { MemoryRouter } from 'react-router-dom';
   import { MOCK_PROJECTS } from '../MockProjects';
   import { Provider } from 'react-redux';
   import { store } from '../../state';
   import ProjectsPage from '../ProjectsPage';
   import {
   render,
   screen,
   waitForElementToBeRemoved,
   } from '@testing-library/react';
   + import { rest } from 'msw';
   + import { setupServer } from 'msw/node';
   + import { url as projectsUrl } from '../projectAPI';

   + // declare which API requests to mock
   + const server = setupServer(
   +   // capture "GET http://localhost:3000/projects" requests
   +   rest.get(projectsUrl, (req, res, ctx) => {
   +     // respond using a mocked JSON body
   +     return res(ctx.json(MOCK_PROJECTS));
   +   })
   + );

   describe('<ProjectsPage />', () => {
   function renderComponent() {
      render(
         <Provider store={store}>
         <MemoryRouter>
            <ProjectsPage />
         </MemoryRouter>
         </Provider>
      );
   }

   +  beforeAll(() => server.listen());
   +  afterEach(() => server.resetHandlers());
   +  afterAll(() => server.close());

   test('should render without crashing', () => {
      renderComponent();
      expect(screen).toBeDefined();
   });

   test('should display loading', () => {
      renderComponent();
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
   });


   });
   ```

1. Test that the projects display after the mocked data is returned.

   #### `src\projects\__tests__\ProjectsPage-test.js`

   ```diff
   ...

   describe('<ProjectsPage />', () => {
   function renderComponent() {
      render(
         <Provider store={store}>
         <MemoryRouter>
            <ProjectsPage />
         </MemoryRouter>
         </Provider>
      );
   }

   beforeAll(() => server.listen());
   afterEach(() => server.resetHandlers());
   afterAll(() => server.close());

   ...

   +  test('should display projects', async () => {
   +    renderComponent();
   +    expect(await screen.findAllByRole('img')).toHaveLength(
   +      MOCK_PROJECTS.length
   +    );
   +  });


   });

   ```

1. **Verify** the **test passed**.
   ```
   PASS  src/projects/__tests__/ProjectsPage-test.js
   ```

### Test the More Button Displays

1. Test that the **More button** **displays** after the projects have loaded.

   #### `src\projects\__tests__\ProjectsPage-test.js`

   ```diff
   ...
   import {
   render,
   screen,
   waitForElementToBeRemoved,
   } from '@testing-library/react';
   ...

   describe('<ProjectsPage />', () => {
   ...

   +  test('should display more button', async () => {
   +    renderComponent();
   +    expect(
   +      await screen.findByRole('button', { name: /more/i })
   +    ).toBeInTheDocument();
   +  });
   +
   +  // this tests the same as the last test but demonstrates
   +  // what find* methods are doing
   +  test('should display more button with get', async () => {
   +    renderComponent();
   +    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
   +    expect(screen.getByRole('button', { name: /more/i })).+toBeInTheDocument();
   +  });

   });

   ```

1. **Verify** the **test passed**.
   ```
   PASS  src/projects/__tests__/ProjectsPage-test.js
   ```

### Test the Error Displays

1. Test that a custom **error** **displays** when a server error is returned.

   #### `src\projects\__tests__\ProjectsPage-test.js`

   ```diff
   ...
   import {
   render,
   screen,
   waitForElementToBeRemoved,
   } from '@testing-library/react';
   ...

   describe('<ProjectsPage />', () => {
   ...

   +  test('should display custom error on server error', async () => {
   +    server.use(
   +      rest.get(projectsUrl, (req, res, ctx) => {
   +        return res(ctx.status(500, 'Server error'));
   +      })
   +    );
   +    renderComponent();
   +
   +    expect(
   +      await screen.findByText(/There was an error retrieving the project(s)./i)
   +    ).toBeInTheDocument();
   +  });

   });

   ```

1. **Verify** the **test passed**.
   ```
   PASS  src/projects/__tests__/ProjectsPage-test.js
   ```

---

### &#10004; You have completed Testing Lab 5

<!--
```
"dependencies": {
    "@testing-library/jest-dom": "~4.2.4",
    "@testing-library/react": "~10.0.6",
}
npm install @testing-library/react

```

```
https://stackoverflow.com/questions/61036156/react-typescript-testing-typeerror-mutationobserver-is-not-a-constructor
npm i -D jest-environment-jsdom-sixteen
"test": "react-scripts test --env=jest-environment-jsdom-sixteen"
``` -->
