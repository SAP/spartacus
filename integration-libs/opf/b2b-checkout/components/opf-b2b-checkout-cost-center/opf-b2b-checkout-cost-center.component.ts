/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckoutCostCenterComponent } from '@spartacus/checkout/b2b/components';

@Component({
  selector: 'cx-opf-b2b-checkout-cost-center',
  templateUrl: './opf-b2b-checkout-cost-center.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfB2bCheckoutCostCenterComponent extends CheckoutCostCenterComponent {}
