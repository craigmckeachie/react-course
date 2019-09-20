# Setup

### For your class, each student computer should have:

1. A **recent** version of **Windows** (7 or later), **macOS**, or **Linux**, with:
   - _current system updates_
   - at least `4 GB` of `RAM`
2. **Node.js** installed, a recent **10.x LTS** version.

   - **Visit** [http://nodejs.org/](http://nodejs.org/).
   - **Click** the `10.16.[x] LTS Recommended For Most Users` (or similar) **green button on the left** to **download** the **installer** file.
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

3. **Permissions** to **install** `npm` **packages** is required for attendees. This can be confirmed by following these steps.

   - **Open** a `command prompt` (Windows) or `terminal` (Mac).
   - **Run** the following **command**:
     ```shell
     npm install serve -g
     ```
   - **Verify** the package installed by running the following **command**:
     ```shell
     serve -v
     ```
   - The current version of `serve` should be returned `11.x.x`

4. An **IDE** (Integrated Development Environment) _or_ code **editor** of your choice.

   > Students may use any IDE/editor that they are comfortable with using.

   - We **recommend** **Visual Studio Code**.
     - It is **free**, **cross-platform** has a **small** download, and is a **quick** install.
     - **Visit** [https://code.visualstudio.com/](https://code.visualstudio.com/) to **install**.
       > Don't confuse Visual Studio Code with the heavier Visual Studio IDE used for .NET development.
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
   - **Visit** https://github.com/facebook/react/.
   - **Verify** the **page** **loads** successfully on your company's network.

---

### &#10004; You have completed the computer setup.
