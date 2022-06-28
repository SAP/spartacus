import { Component, OnInit } from '@angular/core';
import { StoreFinderSearchQuery } from '@spartacus/storefinder/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { LocationSearchParams } from 'feature-libs/pickup-in-store/core';
import { PickupInStoreFacade } from 'feature-libs/pickup-in-store/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-delivery-pickup-options-dialog',
  templateUrl: './pickup-delivery-option-dialog.component.html',
})
export class PickupDeliveryOptionDialogComponent implements OnInit {
  /*--@Todo :- Change it to actual Data when implementing the other story --*/
  productCode: string;
  storeSearch: StoreFinderSearchQuery;

  getHideOutOfStockState$: Observable<boolean>;

  readonly iconTypes = ICON_TYPE;

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
}
