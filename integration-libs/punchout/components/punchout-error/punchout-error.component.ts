/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
@Component({
  selector: 'cx-punchout-error',
  templateUrl: './punchout-error.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [IconComponent, TranslatePipe],
})
export class PunchoutErrorComponent {
  iconTypes = ICON_TYPE;
}
