const domUpdates = {

  toggleView(show, hide) {
    const mainHeader = document.getElementById('company-header');
    mainHeader.classList.remove('hidden');
    show.classList.remove('hidden');
    hide.classList.add('hidden');

  },

  renderWelcome(name) {
    const welcomeMsg = document.getElementById('welcome-msg');
    welcomeMsg.innerText = `Welcome, ${name}!`
  },

  renderPastTrips(pastList) {
    const ul = document.getElementById(`past-slides`);
    if (pastList.length === 0) {
      this.renderPlaceHolder(ul)
    } else {   
      let card = '';
      pastList.forEach(trip => {
        card += `
      <li class="glide_slide">
        <img class="slide-pics" src="${trip[2]}" alt="${trip[3]}"> 
        <div class="trip-details">
          <p class="trip-tag">${trip[1]}</p>
          <p class="trip-tag">${trip[0]}</p>
        </div>
      </li>`
      })
      ul.innerHTML = card;
    }
  },

  renderPendingTrips(pendingList) {
    const ul = document.getElementById(`pending-slides`);
    if (pendingList.length === 0) {
      this.renderPlaceHolder(ul)
    } else {      
      let card = '';
      pendingList.forEach(trip => {
        card += `
      <li class="glide_slide">
        <img class="slide-pics" src="${trip[2]}" alt="${trip[3]}"> 
        <div class="trip-details">
          <p class="trip-tag">${trip[1]}</p>
          <p class="trip-tag">${trip[0]}</p>
        </div>
      </li>`
      })
      ul.innerHTML = card;
    }
  },

  renderCurrentTrip(currentInfo) {
    const currentDisplayArea = document.getElementById('current-trip-area');
    currentDisplayArea.classList.remove('hidden');
    const displayTrip = document.getElementById('display-current-trip');
    displayTrip.innerHTML = `
    <img class="current-trip-img" 
    src="${currentInfo[2]}" alt="${currentInfo[3]}"> 
    <div class="trip-details">
      <p class="trip-tag">${currentInfo[1]}</p>
      <p class="trip-tag">${currentInfo[0]}</p>
    </div>`
  },

  renderFutureTrips(theList) {
    const ul = document.getElementById(`upcoming-slides`);
    if (theList.length === 0) {
      this.renderPlaceHolder(ul)
    } else {   
      let card = '';
      theList.forEach(trip => {
        card += `
      <li class="glide_slide">
        <img class="slide-pics" src="${trip[2]}" alt="${trip[3]}"> 
        <div class="trip-details">
          <p class="trip-tag">${trip[1]}</p>
          <p class="trip-tag">${trip[0]}</p>
        </div>
      </li>`
      })
      ul.innerHTML = card;
    }
  },

  renderPlaceHolder(parentElement) {
    parentElement.innerHTML = `
    <li class="glide_slide">
        <img class="slide-pics" 
        src="./images/pexels-nubia-navarro-_nubikini_-385997.png" 
        alt="minibus packed up for a trip"> 
        <div class="trip-details">
          <p class="trip-tag">Nothing Here</p>
          <p class="trip-tag">Plan a New Trip Soon!</p>
        </div>
      </li>`;
  },

  renderUserInfo(theUser, tripLog, annualTripCost) {
    const userDisplay = document.getElementById('info-display');
    userDisplay.innerHTML = `
    <h2 class="user-info-welcome"> Hi, ${theUser.name}!</h2>
    <li class="user-descriptor">You are a ${theUser.type}!</p>
    <li class="user-descriptor">
      So far, you've booked ${tripLog.length} trips with us.</p>
    <li class="user-descriptor">
      Total Trip Cost: $${annualTripCost.toLocaleString('en-US')}</p>`
  }, 

  renderDestinationCards(destinations) {
    const sortedLocations = destinations.sort((place1, place2) =>
      place1.destination > place2.destination ? 1 : -1);
    const destinationDisplay = document.getElementById('the-grid');
    destinationDisplay.innerHTML = '';
    sortedLocations.forEach(item => {
      destinationDisplay.innerHTML += 
      `<section class="display-card" id="destination-card">
        <h3 class="card-heading">${item.destination} </h3>
        <img class="card-image" src="${item.image}" alt="${item.alt}">
        <button class="location-selection" id="${item.id}">
        Trips Details
        </button>
      </section>`;
    })
  },

  removeDestinations() {
    const destinationDisplay = document.getElementById('the-grid');
    destinationDisplay.innerHTML = '';
  },

  renderTripDetails(destinationInfo, tripCost) {
    const tripDisplay = document.getElementById('selected-trip');
    console.log(destinationInfo)
    tripDisplay.innerHTML = `
    <h3 class="new-trip-location">${destinationInfo.destination}</h3>
    <img class="new-trip-pic" 
    src="${destinationInfo.image}" alt="${destinationInfo.alt}">
    <h4 class="encouragement" id="small-encouragement">Excellent!<h4>
    <p class="new-trip-cost-info" id="pending-cost-info">For this trip, 
    the cost will be $${tripCost.toLocaleString('en-US')}*</p>
    `
  },

  renderFormError() {
    const error = document.getElementById('error-msg');
    error.innerText = 
      'Something went wrong. Please check your inputs and try again';
    setTimeout(function() {
      error.innerText = 
      '';
    }, 1000)
  },

}


export default domUpdates;