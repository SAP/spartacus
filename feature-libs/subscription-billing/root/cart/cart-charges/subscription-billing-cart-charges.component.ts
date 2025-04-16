import { Component, inject, OnInit } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import {
  LaunchDialogService,
  ICON_TYPE,
  FocusConfig,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-subscription-billing-cart-charges',
  standalone: false,
  templateUrl: './subscription-billing-cart-charges.component.html',
})
export class SubscriptionBillingCartChargesComponent implements OnInit {
  protected launchDialogService = inject(LaunchDialogService);
  iconTypes = ICON_TYPE;

  focusConfig: FocusConfig = {
    trap: false,
    block: false,
    autofocus: 'button',
    focusOnEscape: true,
  };

  orderData: OrderEntry;
  showTableFor: any = {
    unitBasedCharges: false,
    tierBasedCharges: false,
    volumeBasedCharges: false,
    percentageCharges: false,
  };

  ngOnInit(): void {
    this.launchDialogService.data$.subscribe((data) => {
      this.orderData = data;
    });
  }

  onDialogClose(reason: string) {
    console.log('Dialog closed');
    this.launchDialogService.closeDialog(reason);
  }

  toggleTable(table: string) {
    this.showTableFor[table] = !this.showTableFor[table];
    // this.showTable = !this.showTable;
  }
}
