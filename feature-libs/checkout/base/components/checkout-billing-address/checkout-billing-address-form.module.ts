/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { CardModule, FormErrorsModule, IconModule, SpinnerModule } from '@spartacus/storefront';
import { CheckoutBillingAddressFormService } from './checkout-billing-address-form.service';
import { CheckoutBillingAddressFormComponent } from './checkout-billing-address-form.component';
@NgModule({
    imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    CardModule,
    I18nModule,
    IconModule,
    SpinnerModule,
    FormErrorsModule,
    FeaturesConfigModule,
    CheckoutBillingAddressFormComponent,
],
    providers: [CheckoutBillingAddressFormService],
    exports: [CheckoutBillingAddressFormComponent],
})
export class CheckoutBillingAddressFormModule {}
