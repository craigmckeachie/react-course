# React Context vs Redux

## Summary

- The primary reason you need Redux is to help share data and functions between components in your application which are in different parts of the component tree and not immediate relatives
- The sharing between components is achieved by pulling data and functions out of the components and into a shared object (Store) that is not a component
- You may need Redux for other reasons
- These other reasons you need Redux are a lot less common than most people will lead you to believe.
- Again, it is mostly needed to share data (state) and functions (dispatch actions) in an application. This problem is often described as:
  - Avoiding Prop Drilling
  - Handling shared mutable state
  - Component Communication
- The shared object (Store) is made available to parts of the application by wrapping it in custom element or tag (React Component) called a provider (because it provides the data and functions).
- You can recreate the functionality of Redux using React Context
- React Context is designed for low frequency updates (Authenticated User, Theme, Locale (language))
- React Context is not designed for high frequency updates (keyboard input)
- React Context by default causes a rerender of all components on the page
- The rerenders caused by React Context can be avoided by creating additional Contexts (basically multiple stores)
- Redux is complex and requires a lot of _boilerplate_ code and subsequently can be difficult to understand
- React Context has a easier to understand API than Redux
- Using Redux Toolkit can significantly reduce the amount of _boilerplate_ code in Redux
- Using TypeScript with Redux provides strong typing advantages but further increases the amount of _boilerplate_ code
- Implementing Redux functionality with React Context often often results in eventually recreating Redux
- Consider using libraries that focus on the specific kind of state that is most challenging,network state, such as React Query and SWR.
- Consider libraries which give you the basic functionality of Redux with a simpler API like Zustand or Easy Peasy
- [npm Trends Chart comparing SWR, React Query, Zustand, Easy Peasy](https://www.npmtrends.com/swr-vs-react-query-vs-zustand-vs-easy-peasy)

## Examples

Good use cases for React Context include:

- Signed In User and their permissions
- (Color) Theme of the application
- Language (locale) used in the application

Good use cases for Redux include:

- A count of something that displays in a header or sidebar (likes, upvotes, active projects, items in shopping cart, unread messages)
  - Again, this often can be done by having a common parent component but sometimes it might be too far removed from where you are updating this information
- Steps in a workflow or wizard that share data (although this can easily be done by storing the shared data in a parent component)
- Collaboritive software where multiple users can work on the same document at the same time (Google Docs, Google Sheets etc...)
-

## Reference

- [Will React’s Context API Replace Redux](https://academind.com/learn/react/redux-vs-context-api/#will-react-s-context-api-replace-redux)
- [Will React’s Context API Replace Redux: Video](https://www.youtube.com/watch?v=OvM4hIxrqAw)
- [Will React’s Context API Replace Redux: Code](https://github.com/academind/react-redux-vs-context/tree/context)
- [React Context Caveats](https://reactjs.org/docs/context.html#caveats)
- [Replacing Redux with React Hooks](https://github.com/leighhalliday/redux-context-reducers)
- [Use Hooks + Context, not React + Redux](https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/)
- [Context with Reducer (Redux Like): Code from Pluralsight Course](https://github.com/pkellner/pluralsight-course-using-react-hooks/tree/master/06-Context-with-Reducer-Redux-like)
- [How to Implement useState with useReducer](https://kentcdodds.com/blog/how-to-implement-usestate-with-usereducer)
- [SWR Documentation](https://swr.vercel.app/)
- [React Query Documentation](https://react-query.tanstack.com/docs/overview)
