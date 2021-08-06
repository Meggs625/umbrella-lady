const domUpdates = {

  toggleView(show, hide) {
    show.classList.remove('hidden');
    hide.classList.add('hidden');
  },

  renderWelcome(name) {
    const welcomeMsg = document.getElementById('welcome-msg');
    welcomeMsg.innerText = `Welcome, ${name}!`
  },

  renderTrips(tripList, timeFrame) {
    const ul = document.getElementById('past-slides');
    let card = '';
    tripList.forEach(trip => {
      console.log(trip[2])
      card += `
      <li class="glide_slide">
        <img class="slide-pics" src="${trip[2]}"> 
        <div class="trip-details">
          ${trip[1]}
          ${trip[0]}
        </div>
      </li>`
    })
    ul.innerHTML = card;
  }

}

export default domUpdates;