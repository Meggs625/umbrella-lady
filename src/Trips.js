import dayjs from "dayjs";

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
      return this.trips.filter(trip => trip.date < searchDate && 
        trip.status !== 'pending')
    case 'current':
      return this.trips.filter(trip => trip.date === searchDate &&
        trip.status !== 'pending');
    case 'future':
      return this.trips.filter(trip => trip.date > searchDate &&
        trip.status !== 'pending')
    }
  }

  // case 'current':
  //     return this.trips.filter(trip => trip.date === searchDate &&
  //       trip.status !== 'pending');

  calculateAnnualTripCosts(year, destinationRepo) {
    let sum = 0;
    const annualTrips =  this.trips.filter(trip => trip.date.includes(year));
    annualTrips.forEach(trip => {
      const allCosts = 
      destinationRepo.returnDestinationCosts(trip.destinationID)
      sum += (trip.duration * allCosts[1])  
      sum += (trip.travelers * allCosts[2])        
    })
    return sum + (sum * 0.1);
  }

  calculateNewTripCost(newTripInfo, destinationRepo) {
    const allCosts = 
      destinationRepo.returnDestinationCosts(newTripInfo.destinationID);
    const sum = (newTripInfo.travelers * allCosts[2]) + 
      (newTripInfo.duration * allCosts[1])
    return sum + (sum * 0.1);
  }
}

export default Trips;