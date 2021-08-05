class Destination {
  constructor(theDestination) {
    this.id = theDestination.id;
    this.name = theDestination.destination;
    this.lodgingCost = theDestination.estimatedLodgingCostPerDay;
    this.flightCost = theDestination.estimatedFlightCostPerPerson;
    this.image = theDestination.image;
    this.altText = theDestination.alt;
  }

  returnCosts() {
    return [this.id, this.lodgingCost, this.flightCost];
  }

}

export default Destination; 