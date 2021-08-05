const domUpdates = {

  toggleView(show, hide) {
    show.classList.remove('hidden');
    hide.classList.add('hidden');
  },

  renderWelcome(name) {
    const welcomeMsg = document.getElementById('welcome-msg');
    welcomeMsg.innerText = `Welcome, ${name}!`
  }

}

export default domUpdates;