/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckoutCostCenterComponent } from '@spartacus/checkout/b2b/components';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
  selector: 'cx-opf-b2b-checkout-cost-center',
  templateUrl: './opf-b2b-checkout-cost-center.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, AsyncPipe, TranslatePipe, MockTranslatePipe],
})
export class OpfB2bCheckoutCostCenterComponent extends CheckoutCostCenterComponent {}
