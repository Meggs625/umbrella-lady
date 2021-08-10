# The Umbrella Lady
  Turing School of Software and Design Mod 2 Final Project

## Table of Contents
- [Abstract](#abstract)
- [Technologies](#technologies)
- [How to Use Application](#how-to-use-application)
- [Illustrations](#illustrations)
- [Install and Setup](#install-and-set-up)
- [Contributors](#contributors)
- [Wins](#wins)
- [Challenges and Improvements](#challenges-and-improvements)
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

  ![recording (3)](https://user-images.githubusercontent.com/78767067/128930159-de4bce34-94c2-4f1c-959f-55e6112e8d13.gif)

  In addition, there is a section where the user can see their total number of trips book with The Umbrella Lady as well as how much they have spent for the calender year of 2021 thus far(pending trip costs are also added to this total).

  ![recording (4)](https://user-images.githubusercontent.com/78767067/128931827-0f1b686c-e7aa-4817-86e4-76172633ff8f.gif)


## Illustrations
  This application is fully responsive to all screen sizes across all pages.

![Screen Shot 2021-08-10 at 2 42 30 PM](https://user-images.githubusercontent.com/78767067/128932328-bcde84ce-7c17-4971-934e-b861b8b7d6b3.png)

![Screen Shot 2021-08-10 at 2 43 24 PM](https://user-images.githubusercontent.com/78767067/128932338-30ef945a-cfb2-45ae-9ed9-d0761fc6135e.png)

![Screen Shot 2021-08-10 at 2 42 58 PM](https://user-images.githubusercontent.com/78767067/128932373-81817869-a730-4b86-8f99-c9e96c02c477.png)

![Screen Shot 2021-08-10 at 2 43 09 PM](https://user-images.githubusercontent.com/78767067/128932382-7118ea93-685a-42b2-bc0b-3365496d2a93.png)


## Install and Setup

1. Clone this repo to your local machine in the directory of your choice. 
2. Run `npm install`
3. Clone the local API to your machine in a different terminal tab from this [site](https://github.com/turingschool-examples/travel-tracker-api)
4. Run `npm install` on the API and then `npm start`
5. Once the API is running, run `npm start` in this repo's cloned directory

## Clone This Repo

That's right, _clone_ not fork. You will use this repo multiple times, but you can only fork a repository once. So here is what you need to do to clone the repo and still be able to push changes to your repo:

1. Clone down this repo. Since you don't want to name your project "webpack-starter-kit", you can use an optional argument when you run `git clone` (you replace the `[...]` with the terminal command arguments): `git clone [remote-address] [what you want to name the repo]`
1. Remove the default remote: `git remote rm origin` (notice that `git remote -v` not gives you back nothing)
1. Create a new repo on GitHub with the name of `[what you want to name the repo]` to be consistent with naming
1. Copy the address that you would use to clone down this repo - something like `git@github.com:...`
1. Add this remote to your cloned down repo: `git remote add origin [address you copied in the previous step]` - do not include the brackets

## Contributors
- [Megan Mcbride](https://github.com/Meggs625)
- [Janika Hortizuela](https://github.com/jhortizu01)
- [Hannah Hudson](https://github.com/hannahhch) (as Project Manager)

## Wins

This was a daunting project with lots of bumps along the way, but there were also a lot of wins. 
The first, was my attempt at working with Sass. We didn't have the opportunity to get there in my group project, and so this was the first time that I dove in. Although there is definitely room for improvement, I did enjoy the clean set up it provided. 
The second win: finally getting the Glide.js package to function as I was hoping. There was a lot of trial and error with this feature and I stubbornly sunk hours into getting it. However, once it worked, it was exactly what I had hoped for!
The last win was figuring out a way to have the user login work for all users. I really enjoyed playing around with what logic to use to allow for this and what errors might pop up and need managed. 

## Challenges and Improvements

As mentioned above, there were a lot of bumps along this project road. 
One challenge I ran into was the implementation of the third party packages. Both Glide.js and MicroModal took some time to figure out and use within the project as I had intended. It took much longer than I had originally planned to figure out how to use them and then style them as well. Although this did make the victory sweeter when they worked - it was a huge challenge with the project that almost made me change my plan altogether. 
Another challenge included the POST request. Unfortunately, I continually ran into struggles when trying to pass the information to be posted to the request if I housed it in the apiCalls file as I had wanted. I worked through some trouble shooting, but ultimately left it in my scripts file. Given more time, I would like to get this moved to the apiCalls file and working smoothly. I would also like a little more time and understanding of the best way to create the error handling functions that go along with both the GET and POST requests. 
A last challenge I faced was simply: time. There was a lot more that I wanted to do with this project but was unable to. This leads me into the next section of Improvements.

To improve this project I would like to do the following:
* Clean up my API calls 
* Complete the fourth iteration which would allow for travel agent access. I had hoped to get through this and my code still has some of the original setup that I would like to see to through to the end. 
* Take time to clean up some functions and improve error handling.
* Add a type in search field to the destinations on the "Choose Your Next Adventure" page and possibly a toggle feature that would remove any destinations that user had already visited.
* Implement another modal to pop up with all trip details when a user clicks on a trip in their "My Trips" page. 
* Possibly change color scheme. 

## Project Specs 
The original project spec can be found [here](https://frontend.turing.edu/projects/travel-tracker.html).
My original wireframe can be found [here](https://miro.com/app/board/o9J_l3zJKDw=/)