
class Trips {
  constructor(travelerTrips) {
    this.trips = travelerTrips;
  }

  findTripsByStatus(status) {
    return this.trips.filter(trip => trip.status === status)
  }

  findTripsByDate(searchDate, timeFrame) {
    switch (timeFrame) {
    case 'past':
      return this.trips.filter(trip => trip.date < searchDate)
    case 'current':
      return this.trips.find(trip => trip.date === searchDate);
    case 'future':
      return this.trips.filter(trip => trip.date > searchDate)
    }
  }

  calculateCostByDestination(destinationCosts) {
    const theTrip = this.trips.find(trip => trip.id === destinationCosts[0])
    const lodgingCost = theTrip.duration * destinationCosts[1];
    const flightCost = theTrip.travelers * destinationCosts[2];
    const tripCost =  lodgingCost + flightCost;
    return tripCost + (tripCost * 0.1)
  }

  calculateAnnualTripCosts(year, destinationRepo) {
    let sum = 0;
    const annualTrips =  this.trips.filter(trip => trip.date.includes(year));
    annualTrips.forEach(trip => {
      const allCosts = 
      destinationRepo.returnDestinationCosts(trip.destinationID)
      sum += (trip.duration * allCosts[1])  
      sum += (trip.travelers * allCosts[2])        
    })
    return sum;
  }

}

export default Trips;