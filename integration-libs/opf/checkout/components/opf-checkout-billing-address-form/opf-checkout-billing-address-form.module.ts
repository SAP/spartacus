/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import {
  CardModule,
  FormErrorsModule,
  IconModule,
  NgSelectA11yModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { AddressFormModule } from '@spartacus/user/profile/components';
import { GetAddressCardContent } from './get-address-card-content.pipe';
import { OpfCheckoutBillingAddressFormComponent } from './opf-checkout-billing-address-form.component';
import { OpfCheckoutBillingAddressFormService } from './opf-checkout-billing-address-form.service';

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
    SpinnerModule,
    AddressFormModule,
  ],
  providers: [OpfCheckoutBillingAddressFormService],
})
export class OpfCheckoutBillingAddressFormModule {}
