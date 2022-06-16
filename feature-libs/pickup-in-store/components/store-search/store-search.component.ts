import { Component, EventEmitter, Output } from '@angular/core';
import { LocationSearchParams } from '@spartacus/pickup-in-store/core';

@Component({
  selector: 'cx-store-search',
  templateUrl: './store-search.component.html',
})
export class StoreSearchComponent {
  @Output() findStores = new EventEmitter<LocationSearchParams>();

  constructor() {}

  onFindStores(location: string): boolean {
    this.findStores.emit({ location });
    return false;
  }

  useMyLocation(): void {
    window.navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.findStores.emit({ latitude, longitude });
      }
    );
  }
}
