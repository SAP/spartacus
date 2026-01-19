/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BCheckoutDeliveryAddressComponent } from '@spartacus/checkout/b2b/components';
import { TranslatePipe } from '@spartacus/core';
import { CardComponent, SpinnerComponent } from '@spartacus/storefront';
import { AddressFormComponent } from '@spartacus/user/profile/components';
import { OpfB2bCheckoutCostCenterComponent } from '../opf-b2b-checkout-cost-center/opf-b2b-checkout-cost-center.component';
@Component({
  selector: 'cx-opf-b2b-checkout-delivery-address',
  templateUrl: './opf-b2b-checkout-delivery-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    OpfB2bCheckoutCostCenterComponent,
    NgIf,
    NgFor,
    CardComponent,
    AddressFormComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class OpfB2bCheckoutDeliveryAddressComponent extends B2BCheckoutDeliveryAddressComponent {}
