class DestinationCatalog {
  constructor(destinationData) {
    this.destinations = destinationData;
  }

  findDestinationById(id) {
    return this.destinations.find(destination => destination.id === id)
  }



}

export default DestinationCatalog; 