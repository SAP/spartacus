/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-opf-checkout-progress',
  template: '<p>Hello!</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutProgressComponent {}
