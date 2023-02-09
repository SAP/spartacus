/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpfCheckoutBillingAddressFormComponent } from './opf-checkout-billing-address-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import {
  IconModule,
  FormErrorsModule,
  CardModule,
  NgSelectA11yModule,
  AddressFormModule,
} from '@spartacus/storefront';

@NgModule({
  declarations: [OpfCheckoutBillingAddressFormComponent],
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
  ],
})
export class OpfCheckoutBillingAddressFormModule {}
