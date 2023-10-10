/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Consignment } from '@spartacus/order/root';

@Component({
  selector: 'cx-consignment-entries',
  templateUrl: './consignment-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsignmentEntriesComponent {
  @Input()
  consignments?: Consignment[];
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
