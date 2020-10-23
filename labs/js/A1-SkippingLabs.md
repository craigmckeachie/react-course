# Appendix A1: How to Skip Labs

Labs can be skipped by attendees who:

- arrive late, leave early
- get pulled into a meeting
- have a doctors appointment
- understand a topic and want to move on to a topic they don't know
- etc...

## Objectives

- [ ] Backup your current code
- [ ] Download code
- [ ] Install dependencies

## Steps

### Backup your current code

1. Close any editor(s) and command prompt(s) or terminal(s) related to your code copy of the course labs in the directory `code\keeptrack`.
1. Rename `code\keeptrack` to `code\keeptrack_bkup1` or something similar.

### Download code

Download the completed code for the lab **before** the one you would like to work on following the steps below.

> For example, if you wanted to work on lab 18 download lab 17

> [Finished solution code for each of the labs is available in this repository](https://github.com/craigmckeachie/keeptrack-js)

1. Open the branch you want to download:

   - For example:

   ```shell
   https://github.com/craigmckeachie/keeptrack-js/tree/lab25
   ```

   - You can use this template:

   ```shell
   https://github.com/craigmckeachie/keeptrack-js/tree/labxx
   ```

   > Replacing xx with the lab number

2. Change `tree` to `archive` and add a `.zip` extension

```diff
-   https://github.com/craigmckeachie/keeptrack-js/tree/lab25
+   https://github.com/craigmckeachie/keeptrack-js/archive/lab25.zip
```

3.  Rename the zip.

```diff
- keeptrack-js-lab25.zip
+ keeptrack.zip
```

4.  Copy `keeptrack.zip` into `code\keeptrack.zip`.
5.  Unzip the file.

### Install dependencies

1. Open a command prompt (Windows) or terminal (Mac) in `code\keeptrack`.
1. Run the command.
   ```shell
   npm install
   ```
1. After the install finishes, run the command.
   ```shell
   npm start
   ```
1. If you are working on a lab which requires the backend api (lab 17 or later). Open another command-line or terminal. Run the command.
   ```shell
   npm run api
   ```

---

### &#10004; You have completed the Appendix A1 for the labs.

<br>

## Reference

- [How to download source in ZIP format from GitHub?](https://stackoverflow.com/questions/2751227/how-to-download-source-in-zip-format-from-github)
