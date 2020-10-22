# Lab 9: Responding to an Event

## Objectives

- [ ] Add a button
- [ ] Handle the click event

## Steps

### Add a button

1. **Open** the **file** `src\projects\ProjectCard.js`
2. **Add** an **edit button** to the `ProjectCard` using the `HTML` snippet below.

   ```html
   <!-- place this below the <p>Budget: ...</p>  -->
   <button class="bordered">
     <span class="icon-edit "></span>
     Edit
   </button>
   ```

   > Remember you will need to change some things about the `HTML` to make it valid `JSX`

   #### `src\projects\ProjectCard.js`

   ```html
   ...
   <p>
     Budget...
     <button className=" bordered">
       <span className="icon-edit "></span>
       Edit
     </button>
   </p>
   ```

3. **Verify** the **button** **displays** in your browser.

   <kbd>![image](https://user-images.githubusercontent.com/1474579/64895325-2fd62c80-d64a-11e9-9454-761ad4982a0e.png)</kbd>

### Handle the click event

1. **Add** a `handleEditClick` **event handler** to `ProjectCard` that takes a `project` as an argument and logs it to the `console`.

   #### `src\projects\ProjectCard.js`

   ```diff
   function ProjectCard(props) {
     const { project } = props;
   +  const handleEditClick = (projectBeingEdited) => {
   +    console.log(projectBeingEdited);
   +  };
     return (
       <div className="card">
         <img src={project.imageUrl} alt={project.name} />
         <section className="section dark">
           <h5 className="strong">
             <strong>{project.name}</strong>
           </h5>
           <p>{project.description}</p>
           <p>Budget : {project.budget.toLocaleString()}</p>
           <button className=" bordered">
             <span className="icon-edit "></span>
             Edit
           </button>
         </section>
       </div>
     );
   }
   ```

2. **Wire** up the **click** **event** of the edit button to the `handleEditClick` event handler.

   #### `src\projects\ProjectCard.js`

   ```diff
   function ProjectCard(props) {
     const { project } = props;
     const handleEditClick = (projectBeingEdited) => {
       console.log(projectBeingEdited);
     };
     return (
       <div className="card">
         <img src={project.imageUrl} alt={project.name} />
         <section className="section dark">
           <h5 className="strong">
             <strong>{project.name}</strong>
           </h5>
           <p>{project.description}</p>
           <p>Budget : {project.budget.toLocaleString()}</p>
           <button
             className=" bordered"
   +          onClick={() => {
   +            handleEditClick(project);
   +          }}
           >
             <span className="icon-edit "></span>
             Edit
           </button>
         </section>
       </div>
     );
   }
   ```

3) **Verify** the application is **working** by _following these steps_:

   1. **Open** the application in your browser and refresh the page.
   2. **Open** the Chrome DevTools to the `console` (`F12` or `fn+F12` on laptop).
   3. **Click** the edit **button**.
   4. **Verify** the project is logged to the Chrome DevTools `console`.

   <kbd>![image](https://user-images.githubusercontent.com/1474579/64896237-15ea1900-d64d-11e9-8463-8f9990db9d39.png)</kbd>

---

### &#10004; You have completed Lab 9
