# Appendix A1: Package Managers

- [Appendix A1: Package Managers](#appendix-a1-package-managers)
- [npm](#npm)
  - [What is Node.js?](#what-is-nodejs)
    - [Compare to:](#compare-to)
      - [What is Java’s runtime?](#what-is-javas-runtime)
      - [What is .NET’s runtime?](#what-is-nets-runtime)
  - [What is npm?](#what-is-npm)
    - [Shared Code](#shared-code)
  - [Using npm](#using-npm)
    - [Global Installs](#global-installs)
      - [Global Packages Location](#global-packages-location)
      - [The Problem with Global Installs?](#the-problem-with-global-installs)
    - [Local Installs](#local-installs)
    - [package.json](#packagejson)
      - [dependencies](#dependencies)
      - [devDependencies](#devdependencies)
      - [Semantic Versioning](#semantic-versioning)
      - [Updating Dependencies](#updating-dependencies)
      - [Interactive Updates](#interactive-updates)
      - [Uninstalling Dependencies](#uninstalling-dependencies)
    - [package-lock.json](#package-lockjson)
        - [Broken package.json scenarios](#broken-packagejson-scenarios)
    - [npm Scripts](#npm-scripts)
      - [Your First Script](#your-first-script)
  - [Resources](#resources)
- [Yarn](#yarn)
  - [Why Yarn?](#why-yarn)
    - [Performance](#performance)
    - [Reliability](#reliability)
    - [Security](#security)
    - [Other](#other)
  - [npm vs. Yarn](#npm-vs-yarn)
  - [Installation](#installation)
    - [Install via npm](#install-via-npm)
  - [Common Commands](#common-commands)
  - [Resources](#resources-1)

---

# npm

## What is Node.js?

- JavaScript runtime
- Built on Chrome's V8 JavaScript engine

### Compare to:

#### What is Java’s runtime?

- JRE

#### What is .NET’s runtime?

- CLR

## What is npm?

The Node.js package manager makes it easy for JavaScript developers to share and reuse code, and it makes it easy to update the code that you're sharing.

It's a way to reuse code from other developers, and also a way to share your code with them, and it makes it easy to manage the different versions of code.

### Shared Code

- Authors
  - **Share code**
  - Created to solve particular problems
- Developers
  - **Reuse** shared **code** in their own applications
  - **Check** if author made **updates** to shared code
  - Download those updates
- Shared Code
  - Called **package**, **module**, or **dependency** _(library)_
  - Directory of one or more files (including package.json which lists shared code it depends on)
  - Packages often **small**
  - Follows Unix philosophy of small building blocks that **“do one thing well”**

## Using npm

### Global Installs

This command installs a package and any packages that it depends on.

```shell
npm install typescript --global
```

> Replace --global with –g to save typing

#### Global Packages Location

Where do global packages get installed on a computer. Run the following command to see:

```shell
npm get prefix
```

Mac:

- `/Users/[username]/.npm-packages/lib/node_modules`

PC:

- `%USERPROFILE%\AppData\Roaming\npm\node_modules` (Windows 7, 8, and 10)
- `%USERPROFILE%\Application Data\npm\node_modules` (Windows XP)

#### The Problem with Global Installs?

Question: What could be the problem with installing all your packages globally?

Answer: ProjectA and ProjectB need different versions of dependency (shared code).

### Local Installs

```shell
npm init #creates package.json
npm install typescript --save-dev #saves in package.json
					              #creates node_modules directory
                                  #installs the shared code in subdirectory (node_modules/typescript)

tsc -v #fails because can't find package

node_modules/.bin/tsc -v #outputs version info

```

### package.json

#### dependencies

```shell
npm install typescript --save
```

```diff
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@types/jest": "24.0.18",
    "@types/node": "12.7.5",
    "@types/react": "16.9.2",
    "@types/react-dom": "16.9.0",
    "@types/react-redux": "~7.1.2",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-redux": "~7.1.1",
    "react-scripts": "3.1.1",
    "redux": "~4.0.4",
+   "typescript": "3.6.3"
  },
  ...
}
```

#### devDependencies

```shell
npm install @types/react-redux --save-dev
```

```diff
{
  "name": "keeptrack",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    ...
  },
  "devDependencies": {
+   "@types/react-redux": "~7.1.2"
  }
}
```

#### Semantic Versioning

- Major.Minor.Patch
- If you were starting with a package `1.0.4`, this is how you would specify the ranges:
  -Patch releases:  `~1.0.4`
  - Minor releases:  `^1.0.4`
    -Major releases: \* or x | `1.0.4` -> `2.0.0`
- To better understand play with the semantic versioning calculator.
  - https://semver.npmjs.com/

#### Updating Dependencies

```
npm outdated
```

```
Package        Current  Wanted  Latest  Location
react-scripts    3.1.1   3.1.1   3.1.2  my-app
```

#### Interactive Updates

```
npm install npm-check -g
npm-check -u
```

OR

```
npx npm-check -u
```

#### Uninstalling Dependencies

Uninstall a global dependency

```shell
npm uninstall create-react-app -g
```

Uninstall a local dependency

```shell
npm uninstall underscore --save
```

### package-lock.json

- In an ideal world, the same package.json should produce the exact same node_modules tree, at any time
- In some cases, this is indeed true. But in many others, npm is unable to do this
- To reliably produce the exact node_modules tree, package-lock.json was created.

##### Broken package.json scenarios

- A dependency of one of your dependencies may have published a new version, which will update even if you used pinned dependency specifiers (1.2.3 instead of ^1.2.3)
- Different versions of npm (or other package managers) may have been used to install a package, each using slightly different installation algorithms.
- A new version of a direct semver-range package may have been published since the last time your packages were installed, and thus a newer version will be used.
- The registry you installed from is no longer available, or allows mutation of versions (unlike the primary npm registry), and a different version of a package exists under the same version number now.

### npm Scripts

Npm's scripts directive can do everything that these build tools can, more succinctly, more elegantly, with less package dependencies and less maintenance overhead.

#### Your First Script

```diff
//package.json

{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
   ...
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
+    "hi": "echo hello world"
  },
  ...
}
```

```shell
npm run hi
```

## Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Configuration](https://docs.npmjs.com/misc/config)
- [Semantic Versioning](https://semver.npmjs.com/)

---

# Yarn

## Why Yarn?

`Facebook` developers were not happy with the `npm` client so they decided to create an alternative client to install JavaScript packages from `npmjs.com`. The main areas they wanted to improve were:

- Performance
- Reliablity
- Security

### Performance

- Caches packages on client
- Parallelizes operations

### Reliability

- Guarantee that an install that worked on one system will work exactly the same way on any other system
- Introduced lockfile

### Security

- Uses checksums to verify the integrity of every installed package

### Other

- Saves dependencies locally if `package.json` exists in directory even if you don't set the command line flag `--save`.

## npm vs. Yarn

Since the introduction of `Yarn`, `npm` now has:

- significantly improved performance
- introduced a lock file to improve reliability
- saves dependencies without `--save`

> The `npm` client is still significantly more popular than `Yarn` and has recently been winning back users.

- [Chart comparing npm vs Yarn downloads](https://www.npmtrends.com/yarn-vs-npm)

## Installation

### Install via npm

To install Yarn through the npm package manager if you already have it installed. If you already have Node.js installed then you should already have npm.

Once you have npm installed you can run:

```bash
npm install --global yarn
```

> Note: Installation of Yarn via npm is generally not recommended. When installing Yarn with Node-based package managers, the package is not signed, and the only integrity check performed is a basic SHA1 hash, which is a security risk when installing system-wide apps.
>
> For these reasons, it is highly recommended that you install Yarn through the installation method best suited to your operating system.

```bash
curl -o- -L https://yarnpkg.com/install.sh | bash
```

Installs in the directory ~/.yarn

> To show hidden files on macOS: CMD + SHIFT + .

## Common Commands

Here are some of the most common commands you'll need.

**Starting a new project**

```sh
yarn init
```

**Adding a dependency**

```sh
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

**Adding a dependency to different categories of dependencies**

Add to `devDependencies`, `peerDependencies`, and `optionalDependencies` respectively:

```sh
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```

**Upgrading a dependency**

```sh
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

**Removing a dependency**

```sh
yarn remove [package]
```

**Installing all the dependencies of project**

```sh
yarn
```

or

```sh
yarn install
```

## Resources

- [Yarn Documentation](https://yarnpkg.com/en/docs)
- [Migrating from npm](https://yarnpkg.com/en/docs/migrating-from-npm)
- [Why I Wouldn't use npm to install Yarn](https://stackoverflow.com/questions/40025890/why-wouldnt-i-use-npm-to-install-yarn)
