# Lab 1: Creating a New Project

## Objectives

- [ ] Create a new React project (app)
- [ ] Open the new project
- [ ] Review the default project structure

---

## Steps

### Create a new React project

1. As part of the course setup, you created a `code` directory for the course (somewhere on your computer that you would easily remember). If you haven't created a `code` directory yet please do that now.
2. **Open** a `command prompt` (Windows) or `terminal` (Mac).
3. Change the **current directory** to your `code` directory.
4. **Run** **ONE** of the following commands:

   If you want to use `npm` as your package manager.

   #### `npm`

   ```bash
   npx create-react-app keeptrack --use-npm
   ```

   If you want to use `Yarn` as your package manager.

   #### `Yarn`

   ```bash
   yarn create react-app keeptrack
   ```

   > `yarn create` is available in Yarn 0.25+

### Open the new project

1. **Change** the current **directory** (`cd`) to the directory you created in the last step.
   ```bash
   cd keeptrack
   ```
2. **Open** the `keeptrack` directory in your **editor** of choice.

   > If you are using `Visual Studio Code` you can run the following command in your terminal: `code .`

   > ...`code` refers to Visual Studio Code and `.` means current directory

   > if `code` is not in your `command prompt` (Windows) or `terminal` (Mac) `PATH`
   >
   > - in `Visual Studio Code` choose `View>Command Palette> Shell Command: Install 'code' command in PATH`

### Review the default project structure

1.  Take a few minutes to go over the default project structure. Below are some files to look at:

    - `package.json`
    - `public/index.html` is the page template
    - `src/index.js` is the JavaScript entry point

    <br/>

    > For the project to build, **the last two files above files must exist with exact filenames**:

    > You can delete or rename the other files.

    > You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack. You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

    > Only files inside `public` can be used from `public/index.html`.

### Downgrade to React version 16

#### React 17

- React 17 was released October 22nd 2020.
- There aren't any significant changes but the labs have not been tested with the changes.
- In particular, a new JSX transform was introduced.
- With the new transform, you can use JSX without importing React.
- The new transform was also implemented in the latest version of all the major React releases (16, 15, 0.14.x).

#### Using React 16

This section describes how to downgrade a new React project to use React version 16 and the last version of Create React App that doesn't use the new JSX transform.

1. Open a command prompt or terminal in the `keeptrack` directory and run the following commands:

   ```shell
   npm install react@16.13 react-dom@16.13 react-scripts@3
   ```

1. Open the `App.js` file and add the import shown below.

   #### `src\App.js`

   ```diff
   + import React from 'react';
   ...
   ```

---

## &#10004; You have completed Lab 1
