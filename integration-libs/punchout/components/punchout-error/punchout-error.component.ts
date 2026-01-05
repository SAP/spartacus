/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
@Component({
  selector: 'cx-punchout-error',
  templateUrl: './punchout-error.component.html',
  standalone: false,
})
export class PunchoutErrorComponent {
  iconTypes = ICON_TYPE;
}
