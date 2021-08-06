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




// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import './images/icons8-umbrella-48.png';
import './images/icons8-umbrella-48 (1).png';
import './images/icons8-user-30.png';

const myTripsBtn = document.getElementById('my-trips-btn');
const adventureBtn =document.getElementById('adventure-btn');
const returnHomeBtn = document.getElementById('return-home');
const dashboard = document.getElementById('the-dashboard');
const myTrips = document.getElementById('trips-page');
let traveler, catalog, trips;

window.addEventListener('load', fetchData);
myTripsBtn.addEventListener('click', renderTripsPage);
adventureBtn.addEventListener('click', sayHello);
returnHomeBtn.addEventListener('click', renderHomePage);


function fetchData() {
  Promise.all([
    getData('travelers/2'), 
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

function sayHello() {
  console.log(trips)
}

function renderTripsPage() {
  domUpdates.toggleView(myTrips, dashboard);
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
  const pastTrips = trips.findTripsByDate('2020/3/28', 'past');
  const pastTripInfo = getDestinationInfo(pastTrips);
  domUpdates.renderTrips(pastTripInfo);
}

function renderPendingSlides() {
  const pendingTrips = trips.findTripsByStatus('pending')
  const pendingTripInfo = getDestinationInfo(pendingTrips);
  domUpdates.renderPendingTrips(pendingTripInfo);
}

function renderCurrentTrip() {
  const currentTrip = trips.findTripsByDate('2020/3/28', 'current');
  console.log(currentTrip)
  if (currentTrip.length !== 0) {
    const thisTrip = getDestinationInfo(currentTrip);
    domUpdates.renderCurrentTrip(thisTrip);
  } else {
    findFutureSlides();
  }
}

function findFutureSlides() {
  const futureTrips = trips.findTripsByDate('2020/3/28', 'future');
  // if (futureTrips.length !== 0) {

  // }
}

function getDestinationInfo(tripInfo) {
  return tripInfo.map(trip => {
    const destinationInfo = catalog.findDestinationById(trip.destinationID)
    return [trip.date, destinationInfo.destination, destinationInfo.image];
  }).sort((trip1, trip2) => (trip1.date > trip2.date ? 1 : -1))
}

function renderHomePage() {
  domUpdates.toggleView(dashboard, myTrips);
}
