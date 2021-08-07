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




// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import './images/icons8-umbrella-48.png';
import './images/icons8-umbrella-48 (1).png';
import './images/icons8-user-30.png';
import './images/pexels-nubia-navarro-_nubikini_-385997.png';
import './images/pexels-pixabay-274249.png';
// import { addDevServerEntrypoints } from 'webpack-dev-server';

const myTripsBtn = document.getElementById('my-trips-btn');
const adventureBtn = document.getElementById('adventure-btn');
const confirmBtn = document.getElementById('confirmation-btn');
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
const dashboard = document.getElementById('the-dashboard');
const myTripsPage = document.getElementById('trips-page');
const userInfoPage = document.getElementById('user-info-page');
const adventurePage = document.getElementById('adventure-page');
const newTripPage = document.getElementById('new-trip-page');
const confirmationPage = document.getElementById('confirmation-page');
let traveler, catalog, trips, newTrip;

window.addEventListener('load', fetchData);
myTripsBtn.addEventListener('click', renderTripsPage);
adventureBtn.addEventListener('click', function() {
  renderAdventurePage(dashboard)
});
infoBtn.addEventListener('click', renderUserInfoPage);
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
returnHomeFromAdvenBtn.addEventListener('click', function() {
  renderHomePage(adventurePage);
});
returnHomeFromConfirm.addEventListener('click', function() {
  renderHomePage(confirmationPage)
});
returnHomeFromUserInfoBtn.addEventListener('click', function() {
  renderHomePage(userInfoPage)
});


function fetchData() {
  Promise.all([
    getData('travelers/33'), 
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
  //this should be a method moved to the TripsVault
  const userTrips = [];
  allTrips.forEach(trip => {
    if (trip.userID === traveler.id) {
      userTrips.push(trip)
    }
  })
  trips = new Trips(userTrips);
}

function createDestinationData(allDestinations) {
  catalog = new DestinationCatalog(allDestinations)
}

function renderTripsPage() {
  console.log(trips)
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

function gatherNewTripInfo(event) {
  let destinationId;
  if (event.target.className === 'location-selection') {
    destinationId = parseInt(event.target.id);
  }

  const date2 = dayjs(startDate.value).format('YYYY/MM/DD');
  const date1 = dayjs(endDate.value).format('YYYY/MM/DD');
  const tripDuration = calculateDuration(date2, date1);
  const travelerTotal = parseInt(numTravelers.value);
  const tripCost = trips. calculateNewTripCost(
    destinationId, travelerTotal, tripDuration, catalog);
  const thisDestination = catalog.findDestinationById(destinationId);
  newTrip = {
    id: Date.now(),
    userID: traveler.id,
    destinationID: destinationId,
    travelers: travelerTotal,
    date: date2,
    duration: tripDuration,
    status: 'pending',
    suggestedActivities: ['walking', 'relaxing']
  }
  domUpdates.toggleView(newTripPage, adventurePage)
  domUpdates.renderTripDetails(thisDestination, tripCost)
}

function calculateDuration(date2, date1) {  
  const depart = dayjs(date2)
  const returnDate = dayjs(date1)
  return returnDate.diff(depart, 'day');
}

function displayConfirmation() {

  submitNewTrip(newTrip);
  domUpdates.toggleView(confirmationPage, newTripPage);
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
  domUpdates.toggleView(adventurePage, hidePage);
  domUpdates.renderDestinationCards(catalog.destinations);
}

function renderHomePage(pageToHide) {
  domUpdates.toggleView(dashboard, pageToHide);
  
}

function renderUserInfoPage() {
  domUpdates.toggleView(userInfoPage, dashboard);
  const tripCost = trips.calculateAnnualTripCosts('2020', catalog)
  domUpdates.renderUserInfo(traveler, trips.trips, tripCost)
}

