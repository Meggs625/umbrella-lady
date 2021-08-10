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
        trip.status !== 'pending');
    case 'future':
      return this.trips.filter(trip => trip.date > searchDate &&
        trip.status !== 'pending');
    }
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
    return sum + (sum * 0.1);
  }

  calculateNewTripCost(newTripInfo, destinationRepo) {
    const allCosts = 
      destinationRepo.returnDestinationCosts(newTripInfo.destinationID);
    const flightCost = newTripInfo.travelers * allCosts[2];
    const lodgingCost = newTripInfo.duration * allCosts[1];
    const sum = flightCost + lodgingCost;
    const fee = sum * 0.1;
    const total = sum + (sum * 0.1);
    return [
      flightCost,
      lodgingCost, 
      sum,
      fee, 
      total]
  }
}

export default Trips;