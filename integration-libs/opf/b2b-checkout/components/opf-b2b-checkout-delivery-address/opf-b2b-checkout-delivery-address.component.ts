/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BCheckoutDeliveryAddressComponent } from '@spartacus/checkout/b2b/components';
import { OpfB2bCheckoutCostCenterComponent } from '../opf-b2b-checkout-cost-center/opf-b2b-checkout-cost-center.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { CardComponent } from '../../../../../projects/storefrontlib/shared/components/card/card.component';
import { AddressFormComponent } from '../../../../../feature-libs/user/profile/components/address-book/address-form/address-form.component';
import { SpinnerComponent } from '../../../../../projects/storefrontlib/shared/components/spinner/spinner.component';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';
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
    MockTranslatePipe,
  ],
})
export class OpfB2bCheckoutDeliveryAddressComponent extends B2BCheckoutDeliveryAddressComponent {}
