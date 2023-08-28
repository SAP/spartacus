import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Consignment, OrderHistory } from '@spartacus/order/root';

@Component({
  selector: 'cx-new-myaccount-consolidated-information',
  templateUrl: './new-myaccount-consolidated-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMyAccountConsolidatedInformationComponent {
  @Input()
  order?: OrderHistory;
  constructor() {}
  consignmentsCount(consignments: Consignment[] | undefined): number {
    var count = 0;
    if (consignments) {
      for (let consignment of consignments) {
        if (consignment.entries) {
          count = count + consignment.entries.length;
        }
      }
    }
    return count;
  }
  orderEntriesCount(orderEntries: OrderEntry[] | undefined): number {
    var count = 0;
    if (orderEntries) {
      return orderEntries.length;
    }
    return count;
  }
}
