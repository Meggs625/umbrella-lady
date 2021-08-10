import { expect } from 'chai';
import Traveler from '../src/Traveler';

describe('Traveler', () => {
  let traveler;

  beforeEach(() => {
    traveler = new Traveler({
      "id": 2,
      "name": "Rachael Vaughten",
      "travelerType": "thrill-seeker",
    })
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function')
  });

  it('should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceOf(Traveler)
  });

  it('should store the traveler ID', () => {
    expect(traveler.id).to.equal(2)
  });

  it('should store the travler name', () => {
    expect(traveler.name).to.equal('Rachael Vaughten')
  });

  it('should store the traveler type', () => {
    expect(traveler.type).to.equal('thrill-seeker')
  });

})