import { Component, OnInit } from '@angular/core';
import { StoreFinderSearchQuery } from '@spartacus/storefinder/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';

@Component({
  selector: 'cx-delivery-pickup-options-dialog',
  templateUrl: './pickup-delivery-option-dialog.component.html',
})
export class PickupDeliveryOptionDialogComponent implements OnInit {
  /*--@Todo :- Change it to actual Data when implementing the other story --*/
  location: string;
  productCode: string;
  storeSearch: StoreFinderSearchQuery;

  readonly iconTypes = ICON_TYPE;

  constructor(protected launchDialogService: LaunchDialogService) {}

  ngOnInit() {
    this.launchDialogService.data$.subscribe(({ msg, productCode }) => {
      (this.location = msg), (this.productCode = productCode);
    });
  }

  onFindStores(storeFinderSearchQuery: StoreFinderSearchQuery): void {
    this.storeSearch = storeFinderSearchQuery;
  }
  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
