import { AbstractStoreItemComponent } from './abstract-store-item.component';
import { StoreDataService } from '@spartacus/core';

class MockStoreDataService extends StoreDataService {
  getStoreLatitude(): number {
    return 1;
  }

  getStoreLongitude(): number {
    return 1;
  }
}

describe('AbstractStoreItemComponent', () => {
  let component: AbstractStoreItemComponent;
  const mockStoreDataService: MockStoreDataService = new MockStoreDataService();

  beforeEach(() => {
    component = new AbstractStoreItemComponent(mockStoreDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return string with map directions in form of link', () => {
    const result = component.getDirections({});
    expect(result).toEqual(
      'https://www.google.com/maps/dir/Current+Location/1,1'
    );
  });

  it('should return formatted address', () => {
    const result = component.getFormattedStoreAddress([
      'street',
      'flat_num',
      'city',
    ]);
    expect(result).toEqual('street, flat_num, city');
  });
});
