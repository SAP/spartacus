/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ConsignmentView } from '@spartacus/order/root';
import { NgFor, NgIf } from '@angular/common';
import { TranslatePipe } from '../../../../../../projects/core/src/i18n/translate.pipe';
import { CxDatePipe } from '../../../../../../projects/core/src/i18n/date.pipe';
import { MockTranslatePipe } from '../../../../../../projects/core/src/i18n/testing/mock-translate.pipe';
import { MockDatePipe } from '../../../../../../projects/core/src/i18n/testing/mock-date.pipe';

@Component({
  selector: 'cx-my-account-v2-consignment-entries',
  templateUrl: './my-account-v2-consignment-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    NgIf,
    TranslatePipe,
    CxDatePipe,
    MockTranslatePipe,
    MockDatePipe,
  ],
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
