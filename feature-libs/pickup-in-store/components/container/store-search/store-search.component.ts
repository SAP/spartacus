import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocationSearchParams } from '@spartacus/pickup-in-store/root';
import { CurrentLocationService } from '../../services/current-location.service';

@Component({
  selector: 'cx-store-search',
  templateUrl: './store-search.component.html',
})
export class StoreSearchComponent {
  @Output() findStores = new EventEmitter<LocationSearchParams>();
  @Output() eventHideOutOfStock = new EventEmitter<boolean>();
  @Output() showSpinner = new EventEmitter<boolean>();

  @Input() hideOutOfStock: boolean = false;

  constructor(protected currentLocationService: CurrentLocationService) {}

  onFindStores(location: string): boolean {
    this.findStores.emit({ location });
    return false;
  }

  onHideOutOfStock(): void {
    this.eventHideOutOfStock.emit(!this.hideOutOfStock);
  }

  useMyLocation(): void {
    this.showSpinner.emit(true);
    this.currentLocationService.getCurrentLocation(
      ({ coords: { latitude, longitude } }) => {
        this.findStores.emit({ latitude, longitude });
        this.showSpinner.emit(false);
      }
    );
  }
}
