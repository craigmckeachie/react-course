# Lab 1: Creating a New Project

## Objectives

- [ ] Create a new React project (app) that uses TypeScript
- [ ] Open the new project
- [ ] Review the default project structure

---

## Steps

### Create a new React project

1. **Create** a `working` directory in `labs`.
2. **Open** a `command prompt` (Windows) or `terminal` (Mac).
3. Change the **current directory** to `labs\working`.
4. **Run** one of the following commands:

   #### npx

   ```bash
   npx create-react-app keeptrack --use-npm
   ```

   #### npm

   ```bash
   npm init react-app keeptrack --use-npm
   ```

   > `npm init <initializer>` is available in npm 6+

   #### Yarn

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
    - `src/index.jsx` is the JavaScript entry point

    <br/>

    > For the project to build, **the last two files above files must exist with exact filenames**:

    > You can delete or rename the other files.

    > You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack. You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

    > Only files inside `public` can be used from `public/index.html`.

---

## &#10004; You have completed Lab 1
