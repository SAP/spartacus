import { Input, Directive } from '@angular/core';
import { StoreDataService } from '@spartacus/misc/storefinder/core';

// tslint:disable:directive-class-suffix
@Directive()
export class AbstractStoreItemComponent {
  @Input()
  location;

  constructor(protected storeDataService: StoreDataService) {}

  getDirections(location: any): string {
    const google_map_url = 'https://www.google.com/maps/dir/Current+Location/';
    const latitude = this.storeDataService.getStoreLatitude(location);
    const longitude = this.storeDataService.getStoreLongitude(location);
    return google_map_url + latitude + ',' + longitude;
  }

  getFormattedStoreAddress(addressParts: string[]): string {
    return addressParts.filter(Boolean).join(', ');
  }
}
