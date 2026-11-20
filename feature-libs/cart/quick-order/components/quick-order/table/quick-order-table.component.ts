/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
} from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { TranslatePipe } from '@spartacus/core';
import { QuickOrderItemComponent } from './item/quick-order-item.component';

@Component({
  selector: 'cx-quick-order-table',
  templateUrl: './quick-order-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [QuickOrderItemComponent, TranslatePipe],
})
export class QuickOrderTableComponent {
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  entries: OrderEntry[] = [];

  readonly loading = input<boolean>(false);
}
