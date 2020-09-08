# Setup

### For your class, each student computer should have:

1. A **recent** version of **Windows** (7 or later), **macOS**, or **Linux**, with:
   - _current system updates_
   - at least `4 GB` of `RAM`
2. **Node.js** installed, a recent **10.x or 12.x LTS** version.

   - **Visit** [http://nodejs.org/](http://nodejs.org/).
   - **Click** the `12.18.[x] LTS Recommended For Most Users` (or similar) **green button on the left** to **download** the **installer** file.
   - **Run** the **installer**, accepting all _default_ _settings_.
   - After installation, **confirm** that the `Path` environment variable on your computer has been modified to include the path for `node` and `npm` by following these steps.
     - **Open** a `command prompt` (Windows) or `terminal` (Mac).
       > In Windows 7, click the Start button and type `cmd`
     - **Run** the following **commands**:
       ```shell
       node -v
       npm -v
       ```
     - **Verify** the **version** of each program is **returned**.
   - Please **DO NOT use** `Node 8.x` or `11.x`, `13.x` or `14.x` for this class.
   - If you are using one of the older or experimental versions of `Node.js` listed above, uninstall it and reinstall a recent **LTS** version.
     - [How to remove Node.js from Windows](https://stackoverflow.com/a/20711410/48175)
     ```
     tldr;
     1. Uninstall from Programs & Features with the uninstaller.
     2. Reboot (or you probably can get away with killing all node-related processes from Task Manager).
     ```
     - [How to Remove Node.js from Mac OSX](https://stackabuse.com/how-to-uninstall-node-js-from-mac-osx/)

3. **Install** **Create React App** and **verify** a project can be created.

   1. Create a `working` directory for the course somewhere on your computer that you will remember.
   2. **Open** a `command prompt` (Windows) or `terminal` (Mac).
   3. **Change directory** (`cd`) into the `working` directory you created.

   4. **Run** the following **commands**:

   ```shell
   npx create-react-app my-app --use-npm
   cd my-app
   npm start
   ```

   > If you've previously installed `create-react-app` globally via `npm install -g create-react-app`, it is recommended that you uninstall the package using `npm uninstall -g create-react-app` to ensure that `npx` always uses the latest version.

   3. After the application builds, your default browser should open to [http://localhost:3000/](http://localhost:3000/).

      > If [http://localhost:3000/](http://localhost:3000/) does not open automatically, open your browser and navigate there manually.

   4. **Verify** the **React logo** is displayed in the browser.

4. An **IDE** (Integrated Development Environment) _or_ code **editor** of your choice.

   > Students may use any IDE/editor that they are comfortable with using.

   - We **recommend** **Visual Studio Code**.
     - It is **free**, **cross-platform** has a **small** download, and is a **quick** install.
     - **Visit** [https://code.visualstudio.com/](https://code.visualstudio.com/) to **install**.
       > Don't confuse Visual Studio Code with the heavier Visual Studio IDE used for .NET development.
     - [Follow these directions](VisualStudioCodeSetup.md) to configure Visual Studio Code for the course.
   - **WebStorm** or **IntelliJ IDEA Ultimate** both made by `JetBrains` are also great choices.

     - In summary, these IDEs are heavier but have more features built-in.
     - **Visit** [Download WebStorm](https://www.jetbrains.com/webstorm/download/) to **install**.
       - OR
     - **Visit** [Download IntelliJ IDEA](https://www.jetbrains.com/idea/download/) to **install**.

       > Note: IntelliJ IDEA Ultimate includes TypeScript support while the Community Edition does not.

     > Each download comes with a free 30-day trial.

5. `Google Chrome` browser.
   - **Visit** [http://www.google.com/chrome/](http://www.google.com/chrome/) to **install**.
     > Any recent version will work for the class.
   - Also, any other browsers that you plan to support
6. **Internet access in the classroom is required** because attendees will download additional software packages and material from github.com as part of the class. This can be confirmed by following these steps.
   - **Visit**: https://github.com/facebook/react/
   - **Verify** the **page** **loads** successfully on your company's network.

---

### &#10004; You have completed the computer setup.
