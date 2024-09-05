/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Promotion } from '@spartacus/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'cx-promotions',
    templateUrl: './promotions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor],
})
export class PromotionsComponent {
  @Input()
  promotions: Promotion[];

  constructor() {
    // Intentional empty constructor
  }
}
