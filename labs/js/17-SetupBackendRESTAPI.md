# Lab 17: Setup Backend REST API

## Objectives

- [ ] Install the backend REST API server
- [ ] Create a custom npm script to run the REST API server
- [ ] Start the REST API server

## Steps

### Install the backend REST API server

1. **Open** a `command prompt` (Windows) or `terminal` (Mac).
1. Change the **current directory** to `working\keeptrack`.
1. **Run** _one_ of the following commands:
   #### npm
   ```shell
   npm install json-server@0.16.2
   ```
   #### Yarn
   ```shell
   yarn add json-server@0.16.2
   ```

### Create a custom npm script to run the REST API server

1. **Add** a **script** to **start** the **backend** REST API.
   #### `\package.json`
   ```diff
   {
    "name": "keeptrack",
    ...
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject",
   +    "api": "json-server api/db.json --port 4000"
    },
   }
   ```
2. Copy the directory `labs\js\snippets\lab17\api` into the `working\keeptrack` directory.

### Start the REST API server

1. **In** a `command prompt` (Windows) or `terminal` (Mac) with the current **directory** set to `working\keeptrack`.
1. **Run** _one_ of the following commands:
   #### npm
   ```shell
   npm run api
   ```
   > The **run** command is short for **run-script**. Running the backend `json-server` through an `npm script` ensures that we are using the local version of the server we just installed and not a previously installed global version.
   #### Yarn
   ```shell
   yarn api
   ```
1. The **server** should **start** and **output** similar to the following should display.

   ```
    \{^_^}/ hi!

    Loading api/db.json
    Done

    Resources
    http://localhost:4000/projects

    Home
    http://localhost:4000

    Type s + enter at any time to create a snapshot of the database
   ```

   > Note that if you visit `http://localhost:4000/` you would normally see the `json-server` landing page but this will not work when you are inside a `Create React App` project.

1. In your `Chrome` browser open:
   - [http://localhost:4000/projects](http://localhost:4000/projects)
1. You should see `JSON` data being returned.

   ```json
   [
       {
           "id": 1,
           "name": "Johnson - Kutch",
           "description": "Fully-configurable intermediate framework. Ullam occaecati libero laudantium nihil voluptas omnis qui modi qui.",
           "imageUrl": "/assets/placeimg_500_300_arch4.jpg",
           "contractTypeId": 3,
           "contractSignedOn": "2013-08-04T22:39:41.473Z",
           "budget": 54637,
           "isActive": false
       },
       {
           "id": 2,
           "name": "Dillesik LLCs",
           "description": "Re-contextualized dynamic moratorium. Aut nulla soluta numquam qui dolor architecto et facere dolores.",
           "imageUrl": "/assets/placeimg_500_300_arch12.jpg",
           "contractTypeId": 6,
           "contractSignedOn": "2016-06-26T18:24:01.706Z",
           "budget": 29729,
           "isActive": true
       },
       {
           "id": 3,
           "name": "Purdy, Keeling and Smithams",
           "description": "Innovative 6th generation model. Perferendis libero qui iusto et ullam cum sint molestias vel.",
           "imageUrl": "/assets/placeimg_500_300_arch5.jpg",
           "contractTypeId": 4,
           "contractSignedOn": "2013-05-26T01:10:42.344Z",
           "budget": 45660,
           "isActive": true
       },
       ...
   ]
   ```

---

### &#10004; You have completed Lab 17
