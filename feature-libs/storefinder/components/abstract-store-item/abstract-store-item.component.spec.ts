import { AbstractStoreItemComponent } from './abstract-store-item.component';
import { StoreFinderService } from '@spartacus/storefinder/core';

export class MockStoreFinderService implements Partial<StoreFinderService> {
  getStoreLatitude(): number {
    return 1;
  }

  getStoreLongitude(): number {
    return 1;
  }
  getDirections(): string {
    const google_map_url = 'https://www.google.com/maps/dir/Current+Location/';
    const latitude = this.getStoreLatitude();
    const longitude = this.getStoreLongitude();
    return google_map_url + latitude + ',' + longitude;
  }
}

describe('AbstractStoreItemComponent', () => {
  let component: AbstractStoreItemComponent;
  const mockStoreFinderService: MockStoreFinderService =
    new MockStoreFinderService();

  beforeEach(() => {
    component = new AbstractStoreItemComponent(<any>mockStoreFinderService);
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
