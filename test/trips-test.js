import { expect } from 'chai';
import Trips from '../src/Trips';
import DestinationCatalog from '../src/DestinationCatalog'

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
    }, 
    {
      "id": 6,
      "userID": 2,
      "destinationID": 6,
      "travelers": 3,
      "date": "2021/08/03",
      "duration": 9,
      "status": "pending",
      "suggestedActivities": []
    }]
    myTrips = new Trips(tripInfo)
  })

  it('should be a function', () => {
    expect(Trips).to.be.a('function');
  })

  it('should be an instance of the Trip class', () => {
    expect(myTrips).to.be.an.instanceOf(Trips);
  })

  it('should store one travelers trip data', () => {
    expect(myTrips.trips).to.deep.equal(tripInfo);
  })

  it('should return all the trips with a certain status', () => {
    const pendingTrips = myTrips.findTripsByStatus('pending');
    expect(pendingTrips).to.deep.equal([tripInfo[0], tripInfo[3]]);
  })

  it('should return all the trips with a different status', () => {
    const pendingTrips = myTrips.findTripsByStatus('approved');
    expect(pendingTrips).to.deep.equal([tripInfo[1], tripInfo[2]]);
  })

  it('should return trips already taken', () => {
    const pastTrips = myTrips.findTripsByDate('2021/08/03', 'past');
    expect(pastTrips).to.deep.equal([tripInfo[1]]);
  })

  it('should return future trips', () => {
    const futureTrips = myTrips.findTripsByDate('2021/08/03', 'future');
    expect(futureTrips).to.deep.equal([tripInfo[2]]);
  })

  it('should not include pending trips in the date search', () => {
    const futureTrips = myTrips.findTripsByDate('2017/01/01', 'future');
    expect(futureTrips).to.deep.equal([tripInfo[1], tripInfo[2]]);
  })

  it('should calculate total cost for traveling within a given year', () => {
    let destinationRepo = new DestinationCatalog([
      {
        "id": 49,
        "destination": "Castries, St Lucia",
        "estimatedLodgingCostPerDay": 650,
        "estimatedFlightCostPerPerson": 90,
        // eslint-disable-next-line max-len
        "image": "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
        "alt": "aerial photography of rocky mountain under cloudy sky"
      },
      {
        "id": 29,
        "destination": "Willemstad, Curaçao",
        "estimatedLodgingCostPerDay": 80,
        "estimatedFlightCostPerPerson": 1100,
        // eslint-disable-next-line max-len
        "image": "https://images.unsplash.com/photo-1541748603027-cbfefa3a6c8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80",
        "alt": "brightly colored buildings near body of water"
      },
      {
        "id": 19,
        "destination": "Quito, Ecuador",
        "estimatedLodgingCostPerDay": 60,
        "estimatedFlightCostPerPerson": 500,
        // eslint-disable-next-line max-len
        "image": "https://images.unsplash.com/photo-1501684691657-cf3012635478?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        "alt": "a city at night with cloudy, snowy mountains in the distance"
      },
      {
        "id": 6,
        "destination": "Jakarta, Indonesia",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 890,
        // eslint-disable-next-line max-len
        "image": "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "lit up city at night"
      }
    ])
    const thisYearsTravels = 
      myTrips.calculateAnnualTripCosts('2021', destinationRepo);
    expect(thisYearsTravels).to.equal(14663)
  })

  it('should calculate the cost for a newly selected trip', () => {
    const newTrip = {
      id: 14,
      userID: 12,
      destinationID: 19,
      travelers: 5,
      date: '2019/03/08',
      duration: 4,
      status: 'pending',
      suggestedActivities: ['walking', 'relaxing']
    };
    let destinationRepo = new DestinationCatalog([
      {
        "id": 49,
        "destination": "Castries, St Lucia",
        "estimatedLodgingCostPerDay": 650,
        "estimatedFlightCostPerPerson": 90,
        // eslint-disable-next-line max-len
        "image": "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
        "alt": "aerial photography of rocky mountain under cloudy sky"
      },
      {
        "id": 29,
        "destination": "Willemstad, Curaçao",
        "estimatedLodgingCostPerDay": 80,
        "estimatedFlightCostPerPerson": 1100,
        // eslint-disable-next-line max-len
        "image": "https://images.unsplash.com/photo-1541748603027-cbfefa3a6c8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80",
        "alt": "brightly colored buildings near body of water"
      },
      {
        "id": 19,
        "destination": "Quito, Ecuador",
        "estimatedLodgingCostPerDay": 60,
        "estimatedFlightCostPerPerson": 500,
        // eslint-disable-next-line max-len
        "image": "https://images.unsplash.com/photo-1501684691657-cf3012635478?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        "alt": "a city at night with cloudy, snowy mountains in the distance"
      },
      {
        "id": 6,
        "destination": "Jakarta, Indonesia",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 890,
        // eslint-disable-next-line max-len
        "image": "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "lit up city at night"
      }
    ]);
    const newCost = myTrips.calculateNewTripCost(newTrip, destinationRepo);
    expect(newCost).to.deep.equal([
      2500,
      240,
      2740,
      274,
      3014
    ]);
  })
})
