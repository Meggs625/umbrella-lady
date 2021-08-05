import { expect } from 'chai';
import Destination from '../src/Destination';

describe('Destination', () => {
  let ourDestination;

  beforeEach(() => {
    let madrid = {
      "id": 5,
      "destination": "Madrid, Spain",
      "estimatedLodgingCostPerDay": 150,
      "estimatedFlightCostPerPerson": 650,
      "image": "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "city with clear skys and a road in the day time"
    }
    ourDestination = new Destination(madrid)
  })

  it('should be a function', () => {
    expect(Destination).to.be.a('function');
  })

  it('should be an instance of the Destination class', () => {
    expect(ourDestination).to.be.an.instanceOf(Destination);
  })

  it('should store a destination id', () => {
    expect(ourDestination.id).to.equal(5)
  })

  it('should store the destination name', () => {
    expect(ourDestination.name).to.equal('Madrid, Spain')
  })

  it('should store the lodging cost per day', () => {
    expect(ourDestination.lodgingCost).to.equal(150)
  })

  it('should store the flight cost per person', () => {
    expect(ourDestination.flightCost).to.equal(650)
  })

  it('should store an image', () => {
    // eslint-disable-next-line max-len
    let madridImage = "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80";
    expect(ourDestination.image).to.equal(madridImage)
  })

  it('should store the image description', () => {
    expect(ourDestination.altText).to
      .equal("city with clear skys and a road in the day time")
  })

  // eslint-disable-next-line max-len
  it('should return an array of the estimated lodging & flight costs, respectively', () => {
    let estimatedCosts = ourDestination.returnCosts()
    expect(estimatedCosts).to.deep.equal([150, 650])
  })


})