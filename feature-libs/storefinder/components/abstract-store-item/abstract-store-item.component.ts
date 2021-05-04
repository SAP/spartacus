import { Input, Directive } from '@angular/core';
import { StoreFinderService } from '@spartacus/storefinder/core';

/* eslint-disable @angular-eslint/directive-class-suffix */
@Directive()
export class AbstractStoreItemComponent {
  @Input()
  location;

  constructor(protected storeFinderService: StoreFinderService) {}

  getDirections(location: any): string {
    const google_map_url = 'https://www.google.com/maps/dir/Current+Location/';
    const latitude = this.storeFinderService.getStoreLatitude(location);
    const longitude = this.storeFinderService.getStoreLongitude(location);
    return google_map_url + latitude + ',' + longitude;
  }

  getFormattedStoreAddress(addressParts: string[]): string {
    return addressParts.filter(Boolean).join(', ');
  }
}
