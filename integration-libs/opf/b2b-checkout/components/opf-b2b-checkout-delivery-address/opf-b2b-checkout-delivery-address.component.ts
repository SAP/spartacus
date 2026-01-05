/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BCheckoutDeliveryAddressComponent } from '@spartacus/checkout/b2b/components';
@Component({
  selector: 'cx-opf-b2b-checkout-delivery-address',
  templateUrl: './opf-b2b-checkout-delivery-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfB2bCheckoutDeliveryAddressComponent extends B2BCheckoutDeliveryAddressComponent {}
