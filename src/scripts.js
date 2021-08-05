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
const dashboard = document.getElementById('the-dashboard');
const myTrips = document.getElementById('trips-page');
let traveler, catalog, trips;

window.addEventListener('load', fetchData)
myTripsBtn.addEventListener('click', renderTripsPage)


function fetchData() {
  Promise.all([
    getData('travelers/2'), 
    getData('trips'), 
    getData('destinations')
  ])
    .then(data => {
      createTravelerData(data[0])
      createTripsData(data[1].trips)

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

function renderTripsPage() {
  domUpdates.toggleView(myTrips, dashboard)
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
