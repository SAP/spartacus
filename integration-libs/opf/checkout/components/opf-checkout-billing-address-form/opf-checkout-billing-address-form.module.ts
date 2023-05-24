/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import {
  AddressFormModule,
  CardModule,
  FormErrorsModule,
  IconModule,
  NgSelectA11yModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { GetAddressCardContent } from './get-address-card-content.pipe';
import { OpfCheckoutBillingAddressFormComponent } from './opf-checkout-billing-address-form.component';

@NgModule({
  declarations: [OpfCheckoutBillingAddressFormComponent, GetAddressCardContent],
  exports: [OpfCheckoutBillingAddressFormComponent],
  imports: [
    NgSelectA11yModule,
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    CardModule,
    I18nModule,
    IconModule,
    FormErrorsModule,
    AddressFormModule,
    SpinnerModule,
  ],
})
export class OpfCheckoutBillingAddressFormModule {}
