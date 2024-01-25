/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-dot-spinner',
  templateUrl: './dot-spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotSpinnerComponent {}
