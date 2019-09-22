# Chapter 1: React

- [Chapter 1: React](#chapter-1-react)
  - [Why React?](#why-react)
    - [Amazing User Experience & Deployment Story](#amazing-user-experience--deployment-story)
    - [Easy to Learn](#easy-to-learn)
    - [Ecosystem & Community:](#ecosystem--community)
    - [Timeless Technology](#timeless-technology)
  - [What it is?](#what-it-is)
  - [Why it is useful?](#why-it-is-useful)
  - [Angular & React Compared](#angular--react-compared)
    - [React](#react)
    - [Angular](#angular)
    - [React vs. Angular: Key Insights](#react-vs-angular-key-insights)
  - [Web application architectures](#web-application-architectures)
    - [Server-side web application architecture](#server-side-web-application-architecture)
    - [Single-page web application architecture](#single-page-web-application-architecture)
  - [React Architecture](#react-architecture)


There are so many JavaScript libraries and frameworks it is difficult to keep up and understand which are worth learning and how they might be valuable to your organization.

React is one of the most popular JavaScript library currently so lets take a look at why you might want to consider adopting it as part of your technology stack.

## Why React?

Looking at this chart from npm trends (npm is the most popular package manager for JavaScript) it becomes clear that both React and Angular have extremely strong adoption.


![npm trends chart of javascript frameworks](https://user-images.githubusercontent.com/1474579/65293093-f741c180-db27-11e9-8aa6-1daf30fd6d98.png)
[View interactive chart online](https://www.npmtrends.com/@angular/core-vs-react-vs-vue)


In addition, lots of companies are using React in their technology stack including:
- Facebook
- Netflix
- Uber
- Twitter
- Pinterest
- Airbnb
- Instagram 
- reddit
- Instacart
- and more...

Exercise:
1. Install the [React DevTools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en).
1. Visit some of the sites above and see how they are using React.


### Amazing User Experience & Deployment Story

> JavaScript libraries and frameworks provide an interactive user experience similar to a destop or native application that is as easy to update as a web application.
>
So why are React and other JavaScript libraries and frameworks so popular? I think it can be summed up in the following statement.

JavaScript libraries and frameworks provide an interactive user experience similar to a destop or native application that is as easy to update as a web application.

In the past, developers have commonly used technologies from Microsoft (Windows Forms, WPF, Silverlight), Oracle (Java Swing), Adobe (Flash, Flex ) and/or mobile solutions such as iOS or Android development to provide rich interactive user experiences. These technologies were never easy to deploy or update for a large number of users. Which is why the business applications are built as web applications today.

These JavaScript libraries and frameworks allow developers to "have their cake and eat it to" by enabling an interactive user experience while remaining a web application.

### Easy to Learn

The React library itself has a *very low concept count* and is subsequently easy to learn.

### Ecosystem & Community:

> Not to worry though as React has an entire ecosystem of other tools and libraries...

After you begin building applications with the React library you quickly learn that it does one thing and does it well but you need a lot of other things to create a web application using it.

Not to worry though as React has an entire ecosystem of other tools and libraries to fill those gaps. Think of building a React app as being similar to buying best-of-breed software and integrating it. You integrate React with other best-of-breed libraries and tools to build an application. Here is a quick list of some of the more popular libraries and tools often used with React.

- Babel: a JavaScript compiler that allows you to use the latest JavaScript language features today
- TypeScript: TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Either the Babel or TypeScript compiler are used to get the features of a modern programming language today
- wepack: efficiently bundles your JavaScript, CSS, HTML, and images for deployment
- Create-React App: Creates a React project with best practices by running only one command
- State Management Libraries including Redux and MobX to architect and manage the data in your application
- GraphQL: a query language for your data APIs
- React Native: Create native apps for Android and iOS using React
- Gatsby: framework based on React that helps developers build blazing fast websites and apps

### Timeless Technology

React is built on top of timeless web standard technology including JavaScript, HTML, CSS, and the browser's Document Object Model (DOM).

Subsequently, learning and getting better at React is really just becoming better at web development. This includes deeply understanding web standards which are technologies that seem to never go out of style.

## What it is?
> React is SQL for HTML or more specifically the Document Object Model (DOM)

React is a JavaScript library for building user interfaces.
More specifically, React provides a declarative library that keeps the DOM in sync with your data.

A declarative language that most developers are familiar with is SQL. SQL is declarative because you declare what data you want and the database figures out how to efficiently return you that data. React is SQL for HTML or more specifically the Document Object Model (DOM). You declare what HTML and data you want and React figures out how to efficently (with the least amount of changes to the DOM) render your data to HTML.

The architecture is component-based and allows you that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps.


## Why it is useful?
> React makes it painless to create interactive UIs on top of web standards.

React makes it painless to create interactive UIs on top of web standards. Because it based on web standards, your application is easy to deploy to thousands of users simultaneously.


## Angular & React Compared

### React
- Facebook
- Components
- Library
- Just the View in MVC
- Need to include other libraries
  - React Router (Routing)
  - Axios, fetch API (AJAX)
- ES6 (Babel compiler) or TypeScript (tsc compiler)
- Create React App
- Uses Webpack
- Redux


### Angular

- Google
- Components
- Framework
- Modular
- Component Router
- HttpClient
- Forms
- Usually TypeScript (tsc compiler)
- Angular CLI
- Uses Webpack
- Reactive Extensions for Angular (ngrx)

### React vs. Angular: Key Insights

> **Angular** continues to put **“JS”** **into HTML**. **React** puts **“HTML” into JS**.  – Cory House
- Angular is a more comprehensive library while React is more of a targeted micro library.
- Because React is smaller it is: 
  - Easier to understand
  - Easier to include in a project
- React is much more popular (but has existed longer)
- React is used more by design/digital/interactive agencies as well as in the Enterprise
- Angular is used more for Enterprise software particularly at larger organizations

## Web application architectures

### Server-side web application architecture

- Java Spring
- ASP.NET
- Ruby on Rails
- PHP (Laravel, CodeIgniter)

![Server-side web app architecture](https://user-images.githubusercontent.com/1474579/65373190-30715300-dc48-11e9-8343-84fa96372e1b.png)


### Single-page web application architecture

- React
- Angular
- Vue
- AngularJS
- Ember
- Backbone

![SPA Architecture](https://user-images.githubusercontent.com/1474579/65373203-5565c600-dc48-11e9-957d-63b768bd9cd5.png)


## React Architecture

<kbd>![React Architecture](https://user-images.githubusercontent.com/1474579/65395139-5daf2580-dd5c-11e9-88bd-489848766507.png)</kbd>