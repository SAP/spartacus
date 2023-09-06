/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Consignment } from '@spartacus/order/root';

@Component({
  selector: 'cx-new-myaccount-order-consigned-entries',
  templateUrl: './new-myaccount-order-consigned-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMyaccountOrderConsignedEntriesComponent {
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

  consignmentNumber(code?: string) {
    if (code) {
      return code.split('_')[1];
    } else {
      return '';
    }
  }
}
