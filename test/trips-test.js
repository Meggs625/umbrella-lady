import { expect } from 'chai';
import Trips from '../src/Trips';

describe('Trips', () => {
  let myTrips, tripInfo;

  beforeEach(() => {
    tripInfo =   [{
      "id": 1,
      "userID": 1,
      "destinationID": 49,
      "travelers": 1,
      "date": "2021/09/16",
      "duration": 8,
      "status": "pending",
      "suggestedActivities": []
    },
    {
      "id": 5,
      "userID": 1,
      "destinationID": 29,
      "travelers": 3,
      "date": "2021/04/30",
      "duration": 18,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 9,
      "userID": 1,
      "destinationID": 19,
      "travelers": 5,
      "date": "2022/12/19",
      "duration": 19,
      "status": "approved",
      "suggestedActivities": []
    }]
    myTrips = new Trips(tripInfo)
  })

  it('should be a function', () => {
    expect(Trips).to.be.a('function');
  })

  it('should be an instance of the Trip class', () => {
    expect(myTrips).to.be.an.instanceOf(Trips)
  })

  it('should store one travelers trip data', () => {
    expect(myTrips.trips).to.deep.equal(tripInfo)
  })

  it('should return all the trips with a certain status', () => {
    const pendingTrips = myTrips.findTripsByStatus('pending');
    expect(pendingTrips).to.deep.equal([tripInfo[0]])
  })

  it('should return all the trips with a different status', () => {
    const pendingTrips = myTrips.findTripsByStatus('approved');
    expect(pendingTrips).to.deep.equal([tripInfo[1], tripInfo[2]])
  })

  it('should return trips already taken', () => {
    const pastTrips = myTrips.findTripsByDate('2021/08/03', 'past');
    expect(pastTrips).to.deep.equal([tripInfo[1]])
  })

  it('should return future trips', () => {
    const futureTrips = myTrips.findTripsByDate('2021/08/03', 'future');
    expect(futureTrips).to.deep.equal([tripInfo[0], tripInfo[2]])
  })

  it('should return a trip of the same date', () => {
    const currentTrip = {
      "id": 6,
      "userID": 2,
      "destinationID": 35,
      "travelers": 3,
      "date": "2022/06/29",
      "duration": 9,
      "status": "pending",
      "suggestedActivities": []
    }

    
  })

})
