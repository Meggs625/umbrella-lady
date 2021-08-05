import { expect } from 'chai';
import Trips from '../src/Trip';

describe('Trips', () => {
  let myTrips, tripInfo;

  beforeEach(() => {
    tripInfo =   [{
      "id": 1,
      "userID": 1,
      "destinationID": 49,
      "travelers": 1,
      "date": "2022/09/16",
      "duration": 8,
      "status": "pending",
      "suggestedActivities": []
    },
    {
      "id": 5,
      "userID": 1,
      "destinationID": 29,
      "travelers": 3,
      "date": "2022/04/30",
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



})
