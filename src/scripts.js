// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import domUpdates from './domUpdates';
import {getData} from './apiCalls';
import Traveler from './Traveler';
import DestinationCatalog from './DestinationCatalog';
import TripVault from './TripVault';
import Trips from './Trips';
import Glide from '@glidejs/glide';
import dayjs from 'dayjs';
import MicroModal from 'micromodal';

// An example of how you tell webpack to use an image 
// (also need to link to it in the index.html)
// import './images/turing-logo.png'
import './images/icons8-umbrella-48.png';
import './images/icons8-umbrella-48 (1).png';
import './images/icons8-user-30.png';
import './images/pexels-nubia-navarro-_nubikini_-385997.png';
import './images/pexels-pixabay-274249.png';
import './images/icons8-facebook-30.png';
import './images/icons8-instagram-logo-30.png';
import './images/icons8-twitter-30.png';

const loginSubmitBtn = document.getElementById('user-login-submit-btn');
const userNameField = document.getElementById('name-field');
const passwordField = document.getElementById('password-field');
const loginError = document.getElementById('login-error-area');
const myTripsBtn = document.getElementById('my-trips-btn');
const adventureBtn = document.getElementById('adventure-btn');
const confirmBtn = document.getElementById('confirmation-btn');
const tripSubmitBtn = document.getElementById('trip-submit-btn');
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
const dashboard = document.getElementById('the-dashboard');
const myTripsPage = document.getElementById('trips-page');
const userInfoPage = document.getElementById('user-info-page');
const adventurePage = document.getElementById('adventure-page');
const newTripPage = document.getElementById('new-trip-page');
const confirmationPage = document.getElementById('confirmation-page');
let traveler, catalog, vault, trips, currentTripInfo, newTrip;

window.addEventListener('load', loadModal);
loginSubmitBtn.addEventListener('click', function(event) {
  validateUser(event)
});
myTripsBtn.addEventListener('click', renderTripsPage);
infoBtn.addEventListener('click', renderUserInfoPage);
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
returnHomeFromAdvenBtn.addEventListener('click', resetForm);

returnHomeFromUserInfoBtn.addEventListener('click', function() {
  renderHomePage(userInfoPage)
});

function loadModal() {
  MicroModal.init();
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
    fetchData(partTwo)
    renderHomePage(loginPage)
  } else {
    domUpdates.renderErrorMessage(MicroModal);
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
    getData(`travelers/${id}`), 
    getData('trips'), 
    getData('destinations')
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
  console.log(trips)
  window.scrollTo(0, 0)
  domUpdates.toggleView(myTripsPage, dashboard);
  renderPendingSlides();
  renderPastSlides();
  renderCurrentTrip();
  
  new Glide('.glide', {
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

function renderPastSlides() {
  const pastTrips = trips.findTripsByDate('2021/03/28', 'past');
  const pastTripInfo = getDestinationInfo(pastTrips);
  domUpdates.renderPastTrips(pastTripInfo);
}

function renderPendingSlides() {
  const pendingTrips = trips.findTripsByStatus('pending')
  const pendingTripInfo = getDestinationInfo(pendingTrips);
  domUpdates.renderPendingTrips(pendingTripInfo);
}

function renderCurrentTrip() {
  const currentTrip = trips.findTripsByDate('2021/03/28', 'current');
  if (currentTrip.length !== 0) {
    const thisTrip = getDestinationInfo(currentTrip);
    domUpdates.renderCurrentTrip(thisTrip[0]);
  } 
  findFutureSlides();  
}

function findFutureSlides() {
  const futureTrips = trips.findTripsByDate('2021/03/28', 'future');
  const futureTripInfo = getDestinationInfo(futureTrips);
  domUpdates.renderFutureTrips(futureTripInfo);
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
    console.log(currentTripInfo)
    domUpdates.renderDestinationCards(catalog.destinations);
  } else {
    event.preventDefault();
    domUpdates.renderErrorMessage(MicroModal);
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
  if (startDate.value !== '' && endDate.value !== '' && numTravelers.value) {
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

function resetForm() {
  startDate.value = '';
  endDate.value = '';
  numTravelers.value = '';
  domUpdates.removeDestinations();
  renderHomePage(adventurePage);
}

function refreshPage() { 
  domUpdates.toggleView(dashboard, confirmationPage);
  location.reload();
}

function displayConfirmation() {  
  submitNewTrip(newTrip);
  domUpdates.toggleView(confirmationPage, newTripPage);
  window.scrollTo(0, 0);
}

function submitNewTrip(theNewTrip) {
  fetch('http://localhost:3001/api/v1/trips', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(theNewTrip)
  })
    .then(response => checkForErrors(response))
    .then(newTripPost => addTrip(newTripPost))
    .catch(error => console.log(error))
}

function checkForErrors(res) {
  if (!res.ok) {
    throw new Error("Please make sure to supply all needed information");
  } else {
    return res.json();
  }
}

function addTrip(newTripPost) {
  console.log(trips.trips)
  trips.trips.push(newTripPost);
  console.log(trips)
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
  const tripCost = trips.calculateAnnualTripCosts('2020', catalog)
  domUpdates.renderUserInfo(traveler, trips.trips, tripCost)
}


