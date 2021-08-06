const domUpdates = {

  toggleView(show, hide) {
    show.classList.remove('hidden');
    hide.classList.add('hidden');
  },

  renderWelcome(name) {
    const welcomeMsg = document.getElementById('welcome-msg');
    welcomeMsg.innerText = `Welcome, ${name}!`
  },

  renderTrips(tripList, element) {
    const ul = document.getElementById(`${element}`);
    if (!tripList) {
      ul.innerHTML = `
      <li class="glide_slide">
        <img class="slide-pics" src="/images/pexels-nubia-navarro-(nubikini)-385997.jpg"
          alt="mini bus all packed up and ready for adventure"> 
        <div class="trip-details">
          <p class="trip-tag">Nothing To See Here</p>
          <p class="trip-tag">Time to Find a New Adventure!</p>
        </div>
      </li>`
    }
    let card = '';
    tripList.forEach(trip => {
      console.log(trip[2])
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
  }

}

export default domUpdates;