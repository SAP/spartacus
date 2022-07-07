import { Component, OnInit } from '@angular/core';
import {
  LocationSearchParams,
  PickupInStoreFacade,
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

  readonly iconTypes = ICON_TYPE;
  loading: boolean;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected pickupInStoreFacade: PickupInStoreFacade
  ) {}

  ngOnInit() {
    this.pickupInStoreFacade.clearStockData();
    this.launchDialogService.data$.subscribe(({ productCode }) => {
      this.productCode = productCode;
    });
    this.getHideOutOfStockState$ =
      this.pickupInStoreFacade.getHideOutOfStockState();
  }

  onFindStores(locationSearchParams: LocationSearchParams): void {
    this.pickupInStoreFacade.getStock({
      productCode: this.productCode,
      ...locationSearchParams,
    });
  }

  onHideOutOfStock(): void {
    this.pickupInStoreFacade.hideOutOfStock();
  }
  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
  showSpinner(showSpinner: boolean): void {
    this.loading = showSpinner;
  }
}
