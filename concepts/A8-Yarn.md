# Yarn

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

[Why I Wouldn't use npm to install Yarn](https://stackoverflow.com/questions/40025890/why-wouldnt-i-use-npm-to-install-yarn)
