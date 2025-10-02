/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { useFeatureStyles } from '@spartacus/core';
import { NgIf, NgFor } from '@angular/common';
import { FeatureDirective } from '@spartacus/core';
import { QuickOrderItemComponent } from './item/quick-order-item.component';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-quick-order-table',
  templateUrl: './quick-order-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    FeatureDirective,
    NgFor,
    QuickOrderItemComponent,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class QuickOrderTableComponent {
  @Input()
  entries: OrderEntry[] = [];

  @Input()
  loading: boolean = false;

  constructor() {
    useFeatureStyles('a11yQTY2Quantity');
  }
}
