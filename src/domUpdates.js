const domUpdates = {

  toggleView(show, hide) {
    show.classList.remove('hidden');
    hide.classList.add('hidden');
  },

  renderWelcome(name) {
    const welcomeMsg = document.getElementById('welcome-msg');
    welcomeMsg.innerText = `Welcome, ${name}!`
  },

  renderTrips(tripList) {
    const ul = document.getElementById(`past-slides`);
    let card = '';
    tripList.forEach(trip => {
      card += `
      <li class="glide_slide">
        <img class="slide-pics" src="${trip[2]}"> 
        <div class="trip-details">
          <p class="trip-tag">${trip[1]}</p>
          <p class="trip-tag">${trip[0]}</p>
        </div>
      </li>`
    })
    ul.innerHTML = card;
  },

  renderPendingTrips(pendingList) {
    const ul = document.getElementById(`pending-slides`);
    let card = '';
    pendingList.forEach(trip => {
      card += `
      <li class="glide_slide">
        <img class="slide-pics" src="${trip[2]}"> 
        <div class="trip-details">
          <p class="trip-tag">${trip[1]}</p>
          <p class="trip-tag">${trip[0]}</p>
        </div>
      </li>`
    })
    ul.innerHTML = card;
  },

  renderCurrentTrip(currentInfo) {
    const currentDisplayArea = document.getElementById('current-trip-area');
    currentDisplayArea.classList.remove('hidden');
    const displayTrip = document.getElementById('display-current-trip');
    displayTrip.innerHTML = `
    <img class="current-trip-img" src="${currentInfo[2]}"> 
    <div class="trip-details">
      <p class="trip-tag">${currentInfo[1]}</p>
      <p class="trip-tag">${currentInfo[0]}</p>
    </div>`
  },

  renderCurrentOrFutureTrips(theList) {
    console.log(theList)
  }

}

export default domUpdates;