# Format the Description

This is an optional bonus excercise that can be completed at any point after Lab 7.

Notice that the project descriptions are of varying length which causes the project cards to not align horizontally on the page.

The solution is to truncate the project description on the card to only 60 characters and then display `...` after it to keep all the cards the same size.

Figure out how to truncate the project description string and append the `...` in React.

> Remember, when you are trying to figure out how to do something in React you should ask yourself how you would do this in JavaScript and you will have your answer.

The solution is available in the lab 22 branch.


# Description Minimum Height

1. Edit a project then delete all but a few characters of the description and save.
1. The short description will cause the card/box the project to collapse and be a smaller size than the others which results in a poor layout.
1. To fix this follow these steps below.

    #### `src\projects\ProjectCard.js`
    ```html
    <p className="description">
        {formatDescription(project.description)}
    </p>
    ```

    #### `src\index.css`
    ```css
    .description {
      min-height: 50px;
    }
    ```