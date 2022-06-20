import { Component, EventEmitter, Output, Input } from '@angular/core';
import { LocationSearchParams } from '@spartacus/pickup-in-store/core';

@Component({
  selector: 'cx-store-search',
  templateUrl: './store-search.component.html',
})
export class StoreSearchComponent {
  @Output() findStores = new EventEmitter<LocationSearchParams>();
  @Output() eventHideOutOfStock = new EventEmitter<boolean>();

  @Input() hideOutOfStock: boolean = false;


  constructor() {}

  onFindStores(location: string): boolean {
    this.findStores.emit({ location });
    return false;
  }

  onHideOutOfStock(): void {
    this.eventHideOutOfStock.emit(!this.hideOutOfStock);
  }

  useMyLocation(): void {
    window.navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.findStores.emit({ latitude, longitude });
      }
    );
  }
}
