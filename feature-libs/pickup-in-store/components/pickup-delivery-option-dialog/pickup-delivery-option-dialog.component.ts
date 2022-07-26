import { Component, OnInit } from '@angular/core';
import {
  LocationSearchParams,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-delivery-pickup-options-dialog',
  templateUrl: './pickup-delivery-option-dialog.component.html',
})
export class PickupDeliveryOptionDialogComponent implements OnInit {
  productCode: string;
  getHideOutOfStockState$: Observable<boolean>;
  loading: boolean;

  readonly iconTypes = ICON_TYPE;
  readonly CLOSE_WITHOUT_SELECTION = 'CLOSE_WITHOUT_SELECTION';
  readonly LOCATION_SELECTED = 'LOCATION_SELECTED';

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade
  ) {}

  ngOnInit() {
    this.launchDialogService.data$.subscribe(({ productCode }) => {
      this.productCode = productCode;
    });
    this.getHideOutOfStockState$ =
      this.pickupLocationsSearchService.getHideOutOfStock();
  }

  onFindStores(locationSearchParams: LocationSearchParams): void {
    this.pickupLocationsSearchService.startSearch({
      productCode: this.productCode,
      ...locationSearchParams,
    });
  }

  onHideOutOfStock(): void {
    this.pickupLocationsSearchService.toggleHideOutOfStock();
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  showSpinner(showSpinner: boolean): void {
    this.loading = showSpinner;
  }
}
