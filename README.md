# The Umbrella Lady
  Turing School of Software and Design Mod 2 Final Project

## Table of Contents
- [Abstract](#abstract)
- [Technologies](#technologies)
- [How to Use Application](#how-to-use-application)
- [Illustrations](#illustrations)
- [Install + Setup](#set-up)
- [Contributors](#contributors)
- [Wins](#wins)
- [Challenges + Improvements](#challenges-+-Improvements)
- [Project Specs](#project-specs)

## Abstract
	Being the final project, this was an opportunity to apply everything that we've learned in the last 5 weeks and then some. We needed to be able to utilize API fetch calls to manage our data, implement SASS for styling, apply third party packages, as well as dabble with a user login page for the first time. 
  All of this was to be used to create an app to track your travels as well as allow you to create a new trip plan. 

## Technologies
  * Javascript
  * HTML
  * Sass
  * node
  * Webpack
  * eslint
  * Mocha/Chai for testing
  * Glide.js
  * Day.js
  * MicroModal
  * Miro for wireframing

## How to Use Application

  The page you will see is the user login page where identity will be verified with username and password. Once that has been successfully entered, the user will see a dashboard where they have different options for the information they would like displayed next:

  ![recording](https://user-images.githubusercontent.com/78767067/128924263-a76169c9-349a-4747-8f46-f6d75e2b2f88.gif)

  Selecting the "My Trips" button will display the user's trips: current, upcoming, pending approval by an agent, and past trips. The user may scroll through all of these sections if there is more than one trip to display. 

  ![recording (1)](https://user-images.githubusercontent.com/78767067/128924703-78f24d0d-b506-42c9-a2f4-81d8398c4f83.gif)

  If the user is up for planning a new adventure, they can select the "Choose My Next Adventure" button to be taken to a form. Once all aspects of the form have been properly filled out, the destination options will be revealed. The user can select the "View Details" button under their desired selection and be taken to a page that will break down the cost of that trip including flight and lodging costs. Should they wish to continue with this selection, they can select the "Let's Do It!" button to book their trip. This new trip will be in a pending status and display as such until an agent has the opportunity to review. 
  If the user would like to continue browsing the destination options, they can select that button as well. 

  


## Clone This Repo

That's right, _clone_ not fork. You will use this repo multiple times, but you can only fork a repository once. So here is what you need to do to clone the repo and still be able to push changes to your repo:

1. Clone down this repo. Since you don't want to name your project "webpack-starter-kit", you can use an optional argument when you run `git clone` (you replace the `[...]` with the terminal command arguments): `git clone [remote-address] [what you want to name the repo]`
1. Remove the default remote: `git remote rm origin` (notice that `git remote -v` not gives you back nothing)
1. Create a new repo on GitHub with the name of `[what you want to name the repo]` to be consistent with naming
1. Copy the address that you would use to clone down this repo - something like `git@github.com:...`
1. Add this remote to your cloned down repo: `git remote add origin [address you copied in the previous step]` - do not include the brackets

Now try to commit something and push it up to your new repo. If everything is setup correctly, you should see the changes on GitHub.

## Setup

After one person has gone through the steps of cloning down this repo and editing the remote, everyone should clone down the repo. 

Then install the library dependencies. Run:

```bash
npm install
```

To verify that it is setup correctly, run `npm start` in your terminal. Go to `http://localhost:8080/` and you should see a page with some `h1` text, Turing logo image and a beautiful gradient background. If that's the case, you're good to go. Enter `control + c` in your terminal to stop the server at any time.

## Where to Add Your Code

### JavaScript

You have to be very intentional with where you add your feature code. This repo uses a tool called [webpack](https://webpack.js.org/) to combine many JavaScript files into one big file. Webpack enables you to have many, separate JavaScript files to keep your code organized and readable. Webpack expects all of your code files to be in a specific place, or else it doesn't know how to combine them all behind the scenes.

**Create all of your feature code files in the `src` directory.**

Since code is separated into multiple files, you need to use the `import` and `export` syntax to share code across file.

Here is a video that walks through some information about [import and export](https://www.youtube.com/watch?v=_3oSWwapPKQ). There are a lot of resources out there about `import` and `export`, and resources will sometimes call them `ES6 modules`. It's something you will see in React and beyond.

### HTML

Add the HTML you need in the `index.html` file in the `./dist` directory. There is some boilerplate HTML that exists from the start that you can modify.

### CSS (SCSS/SASS)

This project is setup to use SCSS/Sass files by default instead of your regular CSS files. Add your SCSS files in the `src/css` directory. There is a `base.scss` file already there, but you can change this file and add multiple SCSS files in this directory.

This might sound weird, but you need to `import` your SCSS files in the JavaScript entry file (`index.js`) for the styles to be applied to your HTML. The example `base.scss` file has already been imported in the JavaScript entry file as an example.

### Images

Add your image files in the `src/images` directory. Similar to CSS files, you need to `import` image files in the JavaScript entry file (`index.js`). Then go into the HTML and add an `img` element with the `src` attribute pointing to the `images` directory. There is an example in the `index.html` file for you to see.

## How to View Your Code in Action

In the terminal, run:

```bash
npm start
```

You will see a bunch of lines output to your terminal. One of those lines will be something like:

```bash
Project is running at http://localhost:8080/
```

Go to `http://localhost:8080/` in your browser to view your code running in the browser.

---

## Test Files Organization

Similar to feature code, your test code needs to be put in a specific place for it to run successfully.

**Put all of your test files in the `test` directory.** As a convention, all test filenames should end with `-test.js`. For instance: `box-test.js`.

## Running Your Tests

Run your test suite using the command:

```bash
npm test
```

The test results will output to the terminal.

---

## Linting Your Code

Run the command in your terminal `npm run lint` to run the linter on your JavaScript code. There will be errors and warnings right from the start in this starter kit - the linter is still running successfully.

Your linter will look at the JavaScript files you have within the `src` directory and the `test` directory. 

## Webpack?

If you look in the `package.json` file, you'll see one of the library dependencies called `webpack`. If you're interested in learning more about what Webpack is and how it works behind the scenes, take a look through the [Webpack configuration documentation](https://webpack.js.org/concepts/).

## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
