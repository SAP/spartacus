import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Consignment } from '@spartacus/order/root';

@Component({
  selector: 'cx-cdp-order-consigned-entries',
  templateUrl: './cdp-order-consigned-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdpOrderConsignedEntriesComponent {
  @Input()
  consignments?: Consignment[];
  @Input()
  orderCode?: string;
  constructor() {}

  consignmentEntriesLength(consignment: Consignment): number {
    var length = 0;
    if (consignment.entries) {
      return consignment.entries.length;
    }
    return length;
  }
}
