/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckoutCostCenterComponent } from '@spartacus/checkout/b2b/components';
import { I18nModule } from '@spartacus/core';

@Component({
  selector: 'cx-opf-b2b-checkout-cost-center',
  standalone: true,
  templateUrl: './opf-b2b-checkout-cost-center.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, AsyncPipe, I18nModule],
})
export class OpfB2bCheckoutCostCenterComponent extends CheckoutCostCenterComponent {}
