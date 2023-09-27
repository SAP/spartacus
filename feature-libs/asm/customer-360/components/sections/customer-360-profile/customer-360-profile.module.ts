/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { CardModule } from '@spartacus/storefront';
import { Customer360ProfileComponent } from './customer-360-profile.component';

@NgModule({
  imports: [CardModule, CommonModule, I18nModule],
  declarations: [Customer360ProfileComponent],
  exports: [Customer360ProfileComponent],
})
export class Customer360ProfileModule {}
