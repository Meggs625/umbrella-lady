const domUpdates = {

  toggleView(show, hide) {
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
    console.log(tripLog)
    userDisplay.innerHTML = `
    <h2 class="user-info-welcome"> Hi, ${theUser.name}!</h2>
    <li class="user-descriptor">You are a ${theUser.type}!</p>
    <li class="user-descriptor">So far, you've booked ${tripLog.length} trips with us.</p>
    <li class="user-descriptor">Total Trip Cost: $${annualTripCost.toLocaleString('en-US')}.</p>`
  }, 

  renderDestinationCards(destinations) {
    console.log(destinations)
    const destinationDisplay = document.getElementById('the-grid');
    destinationDisplay.innerHTML = '';
    destinations.forEach(item => {destinationDisplay.innerHTML += 
      `<section class="display-card" id="destination-card">
        <h3 class="card-heading">${item.destination} </h3>
        <img class="card-image" src="${item.image}" alt="alt">
        <button class="location-selection" id="${item.id}">Trips Details</button>
      </section>`;
    })
  }
}


export default domUpdates;