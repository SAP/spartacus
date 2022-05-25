import { Component, OnInit } from '@angular/core';
import { ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';

@Component({
  selector: 'cx-delivery-pickup-options-dialog',
  templateUrl: './pickup-delivery-option-dialog.component.html',
})
export class PickupDeliveryOptionDialogComponent implements OnInit {
  iconTypes = ICON_TYPE;
  /*--@Todo :- Change it to actual Data when implementing the other story --*/
  dialogData: string;
  constructor(protected launchDialogService: LaunchDialogService) {}

  ngOnInit() {
    this.launchDialogService.data$.subscribe(
      (data) => (this.dialogData = data.msg)
    );
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
