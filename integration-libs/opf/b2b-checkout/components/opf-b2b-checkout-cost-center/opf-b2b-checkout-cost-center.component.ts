/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckoutCostCenterComponent } from '@spartacus/checkout/b2b/components';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-opf-b2b-checkout-cost-center',
  templateUrl: './opf-b2b-checkout-cost-center.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, AsyncPipe, TranslatePipe],
})
export class OpfB2bCheckoutCostCenterComponent extends CheckoutCostCenterComponent {}
