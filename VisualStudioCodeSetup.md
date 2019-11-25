# Appendix A2: Visual Studio Code Extensions

## Extensions

1. **Click** this **link** to begin [installing the Prettier- Code formatter extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode&ssr=false#overview). 
2. **Click** the **Install** button.
3. Repeat the above process to [Install the HTML to JSX extension](https://marketplace.visualstudio.com/items?itemName=riazxrazor.html-to-jsx)

## Configure settings

1. On the bottom left of VS Code > click the `Gear Icon`
2. Choose `Command Palette..`
3. Type `open settings`
4. Choose `Open Settings.JSON`
5. Paste the settings below into the file.

If you have existing `USER SETTINGS` you will want to **add** the following settings below your current settings. Otherwise, you can replace the contents of the file with the JSON below.

`settings.json`
 ```json
 {
    "files.autoSave": "afterDelay",
    "editor.fontFamily": "Fira Code iScript, Menlo, Monaco, 'Courier New', monospace",
    "editor.fontLigatures": true,
    "prettier.singleQuote": true,
    "prettier.printWidth": 80,
    "editor.multiCursorModifier": "alt",
    "editor.formatOnSave": true,
    "workbench.iconTheme": "material-icon-theme",
    "emmet.includeLanguages": {
        "typescript": "html"
    }
}
 ```

## Install a font for programming (optional)

If you are interested in trying a new font designed for programming.

1. Install the free [FiraCodeiScript](https://github.com/kencrocken/FiraCodeiScript) font on your system.

- [How to Install Fonts on Windows 10](https://www.groovypost.com/howto/install-fonts-windows-10/)
- [How to Install Fonts on Mac](https://www.dafont.com/faq.php#mac)

2. Close and reopen VS Code to see the new font.


## Reference

- [VS Code ReactJS Tutorial](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial)


#### Other Extensions (not required)

- [React & JS Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) OR [Simple React Snippets](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets)
- [Jest Snippets](https://marketplace.visualstudio.com/items?itemName=andys8.jest-snippets)
- [React Documentation Extension](https://marketplace.visualstudio.com/items?itemName=avraammavridis.vsc-react-documentation)
