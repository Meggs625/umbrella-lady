import { expect } from 'chai';
import DestinationCatalog from '../src/DestinationCatalog';
import sampleDestinationData from '../src/data/sampleDestinationData';

describe('Destination Catalog', () => {
  let newCatlog;

  beforeEach(() => {
    newCatlog = new DestinationCatalog(sampleDestinationData);
  })
  it('should be a function', () => {
    expect(DestinationCatalog).to.be.a('function');
  })

  it('should be an instance of the DestinationCatalog class', () => {
    expect(newCatlog).to.be.an.instanceOf(DestinationCatalog);
  })

  it('should hold all the destination data', () => {
    expect(newCatlog.destinations).to.deep.equal(sampleDestinationData)
  })

  it('should return a specific destination, identified by id number', () => {
    let columbia = newCatlog.findDestinationById(4);
    expect(columbia).to.deep.equal(sampleDestinationData[3])
  })
})