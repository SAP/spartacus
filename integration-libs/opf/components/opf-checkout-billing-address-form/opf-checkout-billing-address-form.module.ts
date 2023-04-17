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
} from '@spartacus/storefront';
import { OpfPipesModule } from 'integration-libs/opf/pipes/opf-pipes.module';
import { OpfCheckoutBillingAddressFormComponent } from './opf-checkout-billing-address-form.component';

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
    OpfPipesModule,
  ],
})
export class OpfCheckoutBillingAddressFormModule {}
