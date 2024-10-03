/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ConsignmentView } from '@spartacus/order/root';

@Component({
  selector: 'cx-my-account-v2-consignment-entries',
  templateUrl: './my-account-v2-consignment-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAccountV2ConsignmentEntriesComponent {
  @Input()
  consignments?: ConsignmentView[];
  @Input()
  orderCode?: string;

  getConsignmentNumber(code?: string): string | undefined {
    if (code) {
      const consignmentNumber = Number(code.split('_')[1]);
      if (!isNaN(consignmentNumber)) {
        return (consignmentNumber + 1).toString();
      }
    }
    return code;
  }
}
