import './sass/base.scss';
import domUpdates from './domUpdates';
import {getData} from './apiCalls';
import Traveler from './Traveler';
import DestinationCatalog from './DestinationCatalog';
import TripVault from './TripVault';
import Trips from './Trips';
import Glide from '@glidejs/glide';
import dayjs from 'dayjs';
import MicroModal from 'micromodal';

import './images/icons8-umbrella-96.png';
import './images/pexels-nubia-navarro-_nubikini_-385997.png';
import './images/pexels-pixabay-274249.png';
import './images/icons8-facebook-30.png';
import './images/icons8-instagram-logo-30.png';
import './images/icons8-twitter-30.png';
import './images/Umbrella-Lady.png';

const loginSubmitBtn = document.getElementById('user-login-submit-btn');
const userNameField = document.getElementById('name-field');
const passwordField = document.getElementById('password-field');
const ourStoryLink = document.getElementById('our-story-link');
const returnToLoginFromStory = document.getElementById('return-to-login');
const myTripsBtn = document.getElementById('my-trips-btn');
const adventureBtn = document.getElementById('adventure-btn');
const confirmBtn = document.getElementById('confirmation-btn');
const tripSubmitBtn = document.getElementById('trip-submit-btn');
const signOutBtn = document.getElementById('sign-out-btn');
const returnToBrowsingBtn = document.getElementById('continue-browsing-btn');
const infoBtn = document.getElementById('user-info-btn');
const startDate = document.getElementById('trip-start');
const endDate = document.getElementById('trip-end');
const numTravelers = document.getElementById('num-travelers');
const tripGrid = document.getElementById('the-grid');
const returnHomeFromTripsBtn = document.getElementById('return-home');
const returnHomeFromAdvenBtn = document.getElementById('home-from-adventure');
const returnHomeFromConfirm = document.getElementById('home-from-confirmation');
const returnHomeFromUserInfoBtn = document.getElementById('home-from-user');
const loginPage = document.getElementById('user-login-page');
const ourStoryPage = document.getElementById('our-story-page');
const dashboard = document.getElementById('the-dashboard');
const myTripsPage = document.getElementById('trips-page');
const userInfoPage = document.getElementById('user-info-page');
const adventurePage = document.getElementById('adventure-page');
const newTripPage = document.getElementById('new-trip-page');
const confirmationPage = document.getElementById('confirmation-page');
let traveler, currentDate, catalog, vault, trips, currentTripInfo, newTrip;  


window.addEventListener('load', loadModalAndDate);
ourStoryLink.addEventListener('click', displayOurStory);
returnToLoginFromStory.addEventListener('click', displayLogIn);
loginSubmitBtn.addEventListener('click', function(event) {
  validateUser(event)
});
myTripsBtn.addEventListener('click', renderTripsPage);
returnHomeFromConfirm.addEventListener('click', refreshPage);
adventureBtn.addEventListener('click', function() {
  renderAdventurePage(dashboard)
});
tripSubmitBtn.addEventListener('click', function(event) {
  storeTripInfo(event)
});
tripGrid.addEventListener('click', function(event) {
  gatherNewTripInfo(event)
});
returnToBrowsingBtn.addEventListener('click', function() {
  renderAdventurePage(newTripPage)
});
confirmBtn.addEventListener('click', function() {
  displayConfirmation(confirmationPage)
});
returnHomeFromTripsBtn.addEventListener('click', function() {
  renderHomePage(myTripsPage)
});
returnHomeFromAdvenBtn.addEventListener('click', displayHome);

returnHomeFromUserInfoBtn.addEventListener('click', function() {
  renderHomePage(userInfoPage)
});
infoBtn.addEventListener('click', renderUserInfoPage);
signOutBtn.addEventListener('click', userSignOut);

function loadModalAndDate() {
  MicroModal.init();
  let today = new Date().toLocaleDateString();
  currentDate = dayjs(today).format('YYYY/MM/DD');
}

function validateUser(event) {
  event.preventDefault();
  const partOne = userNameField.value.substring(0, 8);
  const partTwo = 
  parseInt(userNameField.value.substring(8, userNameField.value.length));
  const passwordValue = passwordField.value;
  const isTraveler = checkForTravler(partOne);
  const isNum = checkForNum(partTwo);
  const isPassword = checkForPassword(passwordValue);
  if (isTraveler && isNum && isPassword) {
    fetchData(partTwo);
    renderHomePage(loginPage);
  } else if (!isPassword) {
    domUpdates.renderErrorMessage(MicroModal, 'password');
    passwordField.value = '';    
  } else if (!isTraveler || !isNum) {
    domUpdates.renderErrorMessage(MicroModal, 'username');
  }
}

function checkForTravler(string) {
  if (string === 'traveler') {
    return true;
  } 
}

function checkForNum(theNum) {
  if (theNum <= 50 && theNum > 0) {
    return true;
  }
}

function checkForPassword(thePassword) {
  if (thePassword === 'travel') {
    return true;
  }
}

function fetchData(id) {
  Promise.all([
    getData(`travelers/${id}`, MicroModal), 
    getData('trips', MicroModal), 
    getData('destinations', MicroModal)
  ])
    .then(data => {
      createTravelerData(data[0])
      createTripsData(data[1].trips)
      createDestinationData(data[2].destinations)
    })
}

function createTravelerData(theTraveler) {
  traveler = new Traveler(theTraveler);
  domUpdates.renderWelcome(traveler.name)
} 

function createTripsData(allTrips) {
  vault = new TripVault(allTrips);
  const travelerTrips = vault.findTravelerTripsById(traveler.id);
  trips = new Trips(travelerTrips)
}

function createDestinationData(allDestinations) {
  catalog = new DestinationCatalog(allDestinations)
}

function renderTripsPage() {
  window.scrollTo(0, 0);
  domUpdates.toggleView(myTripsPage, dashboard);  
  findTripsSlides(currentDate, 'future', 'upcoming-slides');  
  findTripsSlides(currentDate, 'past', 'past-slides');
  renderPendingSlides();
  renderCurrentTrip();
  new Glide('.upcoming-glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1
  }).mount();
  new Glide('.pending-glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1
  }).mount();
  new Glide('.past-glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1
  }).mount();
}

function renderPendingSlides() {
  const pendingTrips = trips.findTripsByStatus('pending')
  const pendingTripInfo = getDestinationInfo(pendingTrips);
  domUpdates.renderTrips(pendingTripInfo, 'pending-slides');  
}

function renderCurrentTrip() {
  const currentTrip = trips.trips.filter(trip => {
    const allTripDays = [];
    for (let i = 0; i < trip.duration; i++) {
      let newDate = dayjs(trip.date).add((i + 1), 'day').$d
      allTripDays.push(dayjs(newDate).format('YYYY/MM/DD'))
    }
    if (allTripDays.includes(currentDate) && trip.status !== 'pending') {
      return trip;
    }
  })  
  if (currentTrip.length !== 0) {
    const thisTrip = getDestinationInfo(currentTrip);
    domUpdates.renderCurrentTrip(thisTrip[0]);
  } 
}

function findTripsSlides(date, status, parentElement) {
  const tripsList = trips.findTripsByDate(date, status);
  const tripInfo = getDestinationInfo(tripsList);
  domUpdates.renderTrips(tripInfo, parentElement);
}

function getDestinationInfo(tripInfo) {
  return tripInfo.map(trip => {
    const destinationInfo = catalog.findDestinationById(trip.destinationID)
    return [
      trip.date, 
      destinationInfo.destination, 
      destinationInfo.image, 
      destinationInfo.alt
    ];
  }).sort((trip1, trip2) => (trip1.date > trip2.date ? 1 : -1))
}

function storeTripInfo(event) {
  const date2 = dayjs(startDate.value).format('YYYY/MM/DD');
  const date1 = dayjs(endDate.value).format('YYYY/MM/DD');
  const tripDuration = calculateDuration(date2, date1);
  if (validateDuration(tripDuration) && checkFields()) {
    event.preventDefault();
    const travelerTotal = parseInt(numTravelers.value);
    currentTripInfo = [travelerTotal, date2, tripDuration];
    domUpdates.renderDestinationCards(catalog.destinations);
  } else if (!validateDuration(tripDuration)) {
    event.preventDefault();
    domUpdates.renderErrorMessage(MicroModal, 'dates');
  } else  {
    event.preventDefault();
    domUpdates.renderErrorMessage(MicroModal, 'passengers');
  }
}

function validateDuration(duration) {
  if (duration > 0) {
    return true;
  } else {
    return false;
  }
}

function checkFields() {
  let numPassengers = parseInt(numTravelers.value);
  if (startDate.value !== '' && endDate.value !== '' && 
  Number.isInteger(numPassengers)) {
    return true;
  } else {
    return false;
  }
}

function gatherNewTripInfo(event) {
  let destinationId;
  if (event.target.className === 'location-selection') {
    destinationId = parseInt(event.target.id);
  }
  newTrip = {
    id: Date.now(),
    userID: traveler.id,
    destinationID: destinationId,
    travelers: currentTripInfo[0],
    date: currentTripInfo[1],
    duration: currentTripInfo[2],
    status: 'pending',
    suggestedActivities: ['walking', 'relaxing']
  }
  const tripCost = trips.calculateNewTripCost(newTrip, catalog);
  const thisDestination = catalog.findDestinationById(destinationId);
  domUpdates.toggleView(newTripPage, adventurePage);
  window.scrollTo(0, 0);
  domUpdates.renderTripDetails(thisDestination, tripCost)
}

function calculateDuration(date2, date1) {  
  const depart = dayjs(date2)
  const returnDate = dayjs(date1)
  return returnDate.diff(depart, 'day');
}

function displayHome() {
  resetForm();
  renderHomePage(adventurePage);
}

function resetForm() {
  startDate.value = '';
  endDate.value = '';
  numTravelers.value = '';
  domUpdates.removeDestinations();  
}

function refreshPage() { 
  domUpdates.toggleView(dashboard, confirmationPage);
}

function displayConfirmation() {  
  submitNewTrip(newTrip);
  resetForm();
  domUpdates.toggleView(confirmationPage, newTripPage);
  window.scrollTo(0, 0);
}

function submitNewTrip(theNewTrip) {
  fetch('http://localhost:3001/api/v1/trips', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(theNewTrip)
  })
    .then(response => checkForErrors(response, MicroModal))
    .then(newTripPost => addTrip(newTripPost))
    .catch(err => renderError(MicroModal, err))
}

function checkForErrors(res, modal) {
  if (!res.ok) {
    domUpdates.renderErrorMessage(modal, 'post');
  } else {
    return res.json();
  }
}

function renderError(modal, err) {
  console.log(err);
  domUpdates.renderErrorMessage(modal, 'post error');
}

function addTrip(newTripPost) {
  trips.trips.push(newTripPost.newTrip);
}

function displayOurStory() {
  domUpdates.toggleView(ourStoryPage, loginPage);
}

function displayLogIn() {
  domUpdates.toggleView(loginPage, ourStoryPage);
  domUpdates.hideHeader();
}

function renderAdventurePage(hidePage) {
  window.scrollTo(0, 0);
  domUpdates.toggleView(adventurePage, hidePage);
}

function renderHomePage(pageToHide) {
  window.scrollTo(0, 0);  
  domUpdates.toggleView(dashboard, pageToHide);  
}

function renderUserInfoPage() {
  window.scrollTo(0, 0);
  domUpdates.toggleView(userInfoPage, dashboard);
  const tripCost = trips.calculateAnnualTripCosts('2021', catalog)
  domUpdates.renderUserInfo(traveler, trips.trips, tripCost)
}

function userSignOut() {
  location.reload();
}


