# Lab 22: Build & Deploy

## Objectives

- [ ] Build a React Application
- [ ] Deploy the application to a web server

## Steps

### Build a React Application

1. **Open** a `command prompt` (Windows) or `terminal` (Mac).
1. Change the **current directory** to `working\keeptrack`.
1. **Run** the following command to install the node.js web server named `serve`:
   ```shell
   npm install -g serve
   ```
1. **Run** _one_ of the following commands:
   #### npm
   ```shell
   npm run build
   ```
   #### Yarn
   ```shell
   yarn build
   ```
1. After the buld finishes, verify a `keeptrack\build` directory was created.

### Deploy the application to a web server

1. **In** the `command prompt` (Windows) or `terminal` (Mac) **run** the following **command** to **start** a **web server** and serve up the contents of the `build` directory created in the last step.

   ```shell
   serve build
   ```

   > Assuming you would like to serve a state site, single page application or just a static file (no matter if on your device or on the local network), the package `serve` is a web server that serves static content.

   > It behaves exactly like static deployments on https://vercel.com so it's perfect for developing your static project.

   > For more information see: https://www.npmjs.com/package/serve

1. The **output** should be as follows.

   ```
   Serving!
   ...
   Copied local address to clipboard!
   ```

1. **Open** a new browser tab and **paste** the local **link** copied to the clipboard in the last step into the address bar.

1. You should **see** the **application** **running** in your browser.
1. **Click** on **Projects** in the **navigation menu **on the top of the page and the list of projects should be displayed.

   > If you see the following **error message** **displayed** your backend is likely shut down. Run the command `npm run api` to restart the backend.
   > ![image](https://user-images.githubusercontent.com/1474579/65073355-b51a5380-d960-11e9-9d62-d26616574d83.png)

1. After navigating to the projects route, **refresh** your **browser**.
1. You should **see** a **404 error** page.
1. Use `Ctrl+C` to **stop** the **web server**.
1. **Start** the **web server** again but add the `-s` flag for single-page-application.
   ```shell
    serve -s build
   ```
1. Follow these steps to verify the server is now redirecting to `index.html` when it can't find a route.
   1. **Visit** the root of the site `http://localhost:5000/`
   2. **Click** on **Projects** in the **navigation menu **on the top of the page and the list of projects should be displayed.
   3. After navigating to the projects route, **refresh** your **browser**.
   4. You should **see** the projects page refresh and display the **projects**.
      > Note that you are no longer getting the 404 error page.

---

### &#10004; You have completed Lab 22

> If time permits you can read the documentation linked below for very similar steps to deploy the application on common production web servers and cloud platforms including AWS, Azure, Heroku, Netlify, and Vercel.

- [https://create-react-app.dev/docs/deployment](https://create-react-app.dev/docs/deployment)
