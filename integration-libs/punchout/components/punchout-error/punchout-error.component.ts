/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
@Component({
  selector: 'cx-punchout-error',
  templateUrl: './punchout-error.component.html',
  imports: [IconComponent, TranslatePipe],
})
export class PunchoutErrorComponent {
  iconTypes = ICON_TYPE;
}
