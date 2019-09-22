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

1. Close any editor(s) and command prompt(s) or terminal(s) related to your working copy of the course labs in the directory `working\keeptrack`.
1. Rename `working\keeptrack` to `working\keeptrack_bkup1` or something similar.


### Download code
Download the completed code for the lab **before** the one you would like to work on following the steps below.
   > For example, if you wanted to work on lab 18 download lab 17

   > [Finished solution code for each of the labs is available in this repository](https://github.com/craigmckeachie/r16_keeptrack)

1. Open the branch you want to download for example
 ```diff
 -   https://github.com/craigmckeachie/r16_keeptrack/tree/labxx
 +   https://github.com/craigmckeachie/r16_keeptrack/tree/lab25 
 ```
 2. Change `tree` to `archive` and add a `.zip` extension
 ```diff
 -   https://github.com/craigmckeachie/r16_keeptrack/tree/lab25
 +   https://github.com/craigmckeachie/r16_keeptrack/archive/lab25.zip 
 ```
 3. Rename the zip.
 ```diff
 - r16_keeptrack-lab25.zip
 + keeptrack.zip
 ``` 
 4. Copy `keeptrack.zip` into `working\keeptrack.zip`.
 5. Unzip the file.

### Install dependencies
1. Open a command prompt (Windows) or terminal (Mac) in `working\keeptrack`.
1. Run the command.
    ```shell
    npm install
    ```
1. After the install finishes, run the command.
    ```shell
    npm start
    ```
1. If you are working a lab which requires the backend api (lab 17 or later). Open another command-line or terminal. Run the command.
    ```shell
    npm run api
    ```


---

### &#10004; You have completed the Appendix A1 for the labs.


<br>

## Reference
- [How to download source in ZIP format from GitHub?](https://stackoverflow.com/questions/2751227/how-to-download-source-in-zip-format-from-github)

