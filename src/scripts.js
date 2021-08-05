// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import domUpdates from './domUpdates';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import './images/icons8-umbrella-48.png';
import './images/icons8-umbrella-48 (1).png';
import './images/icons8-user-30.png';

const myTripsBtn = document.getElementById('my-trips-btn');
const dashboard = document.getElementById('the-dashboard');
const myTrips = document.getElementById('trips-page')


myTripsBtn.addEventListener('click', renderTripsPage)

function renderTripsPage() {
  domUpdates.toggleView(myTrips, dashboard)
}
