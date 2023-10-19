/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { OpfCheckoutTermsAndConditionsAlertComponent } from './opf-checkout-terms-and-conditions-alert.component';

@NgModule({
  declarations: [OpfCheckoutTermsAndConditionsAlertComponent],
  exports: [OpfCheckoutTermsAndConditionsAlertComponent],
  imports: [CommonModule, I18nModule, IconModule],
})
export class OpfCheckoutTermsAndConditionsAlertModule {}
