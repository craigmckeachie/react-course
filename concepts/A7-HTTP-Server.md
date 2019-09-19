1. In the `demos` directory, install `json-server`

   ```
   cd demos //if you aren't there already
   npm install json-server
   ```

2. Create directory `api` at the top level in your project
3. Create the file `api\db.json`
4. Copy the data from [here](https://gist.github.com/craigmckeachie/196d975a63271e550d25cb57852b88cc) into the file.
5. Open `package.json`
6. Add the following script:

```diff
"scripts": {
    "start": "serve -s",
+    "api": "json-server ./api/db.json"
},
```

7. Run the server

   ```
   npm run api
   ```

8. You should see the following result:

```

\{^_^}/ hi!

Loading ./api/db.json
Done

Resources
http://localhost:3000/posts
http://localhost:3000/comments
http://localhost:3000/albums
http://localhost:3000/photos
http://localhost:3000/users
http://localhost:3000/todos

Home
http://localhost:3000

```
