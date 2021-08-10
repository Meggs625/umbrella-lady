import { expect } from 'chai';
import TripVault from '../src/TripVault';
import DestinationCatalog from '../src/DestinationCatalog';
import sampleTripData from '../src/data/sampleTripData';

describe('Trip Vault', () => {
  let newVault;

  beforeEach(() => {
    newVault = new TripVault(sampleTripData);
  });

  it('should be a function', () => {
    expect(TripVault).to.be.a('function');
  });

  it('should be an instance of Trip Vault', () => {
    expect(newVault).to.be.an.instanceOf(TripVault);
  });

  it('should house all trip data', () => {
    expect(newVault.trips).to.deep.equal(sampleTripData);
  });

  it('should return all of the trips for one specified user', () => {
    const travelerTrips = newVault.findTravelerTripsById(2);
    expect(travelerTrips).to.deep.equal([
      {
        "id": 2,
        "userID": 2,
        "destinationID": 25,
        "travelers": 5,
        "date": "2022/10/04",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 6,
        "userID": 2,
        "destinationID": 35,
        "travelers": 3,
        "date": "2022/06/29",
        "duration": 9,
        "status": "pending",
        "suggestedActivities": []
      },
      {
        "id": 10,
        "userID": 2,
        "destinationID": 50,
        "travelers": 6,
        "date": "2022/07/23",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      }
    ]);
  });

  it('should calculate the total cost for a trip based on trip id', () => {
    const jakarta = [{
      "id": 6,
      "destination": "Jakarta, Indonesia",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 890,
      // eslint-disable-next-line max-len
      "image": "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "lit up city at night"
    }];
    const newDestination = new DestinationCatalog(jakarta);
    const locationCosts = newDestination.returnDestinationCosts(6);
    const tripCost = newVault.calculateCostByDestination(locationCosts);
    expect(tripCost).to.equal(3630);
  });

})