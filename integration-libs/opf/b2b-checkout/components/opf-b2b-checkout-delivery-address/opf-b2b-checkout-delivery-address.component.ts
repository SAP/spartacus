/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BCheckoutDeliveryAddressComponent } from '@spartacus/checkout/b2b/components';
import { OpfB2bCheckoutCostCenterComponent } from '../opf-b2b-checkout-cost-center/opf-b2b-checkout-cost-center.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { CardComponent } from '@spartacus/storefront';
import { SpinnerComponent } from '@spartacus/storefront';
import { TranslatePipe } from '@spartacus/core';
import { AddressFormComponent } from '@spartacus/user/profile/components';
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
