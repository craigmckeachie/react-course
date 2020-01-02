# Appendix A15: Security

## Encoding

React **by default encodes almost all data values** when creating DOM elements.

To provide users with an **escape hatc**h to insert HTML content into the DOM, React is equipped with the eloquently-named function `dangerouslySetInnerHTML()`, clearly conveying the dangers of using it.

> DON'T: Use the method `dangerouslySetInnerHTML()`

## Handled by Users

Contexts that are _unattended by the React security model_ and are **handled by the user**s include creating:

- HTML anchor (link) elements with user- provided input as the source for the href attribute value.

  - This **mostly applies** to versions **prior to** the recently released `React v16.9` which mitigates javascript:-based URLs in href attribute values and other contexts such as form actions, iFrame sources, and others.

    ```html
    data:text/html,
    <a href="javascript: alert('hello from javascript!')">click me</a>
    ```

- React components from user-provided input

- React’s server-side rendering could potentially introduce XSS vulnerabilities if malicious user input is injected as-is to a JavaScript context without being properly encoded or sanitized.

  ```js
  let data = {
  username: "pwned",
  bio: "</script><script>alert('XSS Vulnerability!')</script>"
  }

  <script>window.__STATE__ = ${JSON.stringify({ data })}</script>

  ```

## What to look for in a Code Review

1. Look for `dangerouslySetInnerHTML` being called.
2. Can users add links that other users may click on? If so, try adding a ‘link’ like this:

   ```js
   javascript: alert('You are vulnerable to XSS!');
   ```

   If the alert pops up on the page, you have an XSS vulnerability. Try everywhere these custom links are loaded. Most likely, not every instance will be vulnerable.

3. Look for `JSON.stringify()` being called with a variable that may have un-trusted data inside a `script` tag.

## Reference

- [React Vulnerabilities](https://snyk.io/node-js/react)
- [The Most Common XSS Vulnerability in React.js Applications](https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0)
- [3 Security Pitfalls Every React Developer Should Know](https://hunter2.com/3-security-pitfalls-every-react-developer-should-know)
- [Comparing React and Angular secure coding practices](https://snyk.io/blog/comparing-react-and-angular-secure-coding-practices/)
