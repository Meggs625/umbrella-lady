class TripVault {
  constructor(tripData) {
    this.trips = tripData;
  }

  findTravelerTripsById(id) {
    return this.trips.filter(trip => trip.userID === id);
  }

  calculateCostByDestination(destinationCosts) {
    const theTrip = this.trips.find(trip => trip.id === destinationCosts[0]);
    const lodgingCost = theTrip.duration * destinationCosts[1];
    const flightCost = theTrip.travelers * destinationCosts[2];
    const tripCost =  lodgingCost + flightCost;
    return tripCost + (tripCost * 0.1);
  }

}

export default TripVault;