/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Promotion } from '@spartacus/core';

@Component({
  selector: 'cx-promotions',
  templateUrl: './promotions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class PromotionsComponent {
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  promotions: Promotion[];

  constructor() {
    // Intentional empty constructor
  }
}
