class DestinationCatalog {
  constructor(destinationData) {
    this.destinations = destinationData;
  }

  findDestinationById(id) {
    return this.destinations.find(destination => destination.id === id)
  }

  returnDestinationCosts(id) {
    const selectedDestination = 
    this.destinations.find(destination => destination.id === id)
    return [
      selectedDestination.id, 
      selectedDestination.estimatedLodgingCostPerDay,
      selectedDestination.estimatedFlightCostPerPerson]
  }
}

export default DestinationCatalog; 