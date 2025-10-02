/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { IconComponent } from '@spartacus/storefront';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';
@Component({
  selector: 'cx-punchout-error',
  templateUrl: './punchout-error.component.html',
  imports: [IconComponent, TranslatePipe, MockTranslatePipe],
})
export class PunchoutErrorComponent {
  iconTypes = ICON_TYPE;
}
