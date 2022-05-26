import { Component, OnInit } from '@angular/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';

@Component({
  selector: 'cx-delivery-pickup-options-dialog',
  templateUrl: './pickup-delivery-option-dialog.component.html',
})
export class PickupDeliveryOptionDialogComponent implements OnInit {
  /*--@Todo :- Change it to actual Data when implementing the other story --*/
  location: string;
  productCode: string;

  readonly iconTypes = ICON_TYPE;

  constructor(protected launchDialogService: LaunchDialogService) {}

  ngOnInit() {
    this.launchDialogService.data$.subscribe(({ msg, productCode }) => {
      (this.location = msg), (this.productCode = productCode);
    });
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
