/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { PickupOptionsComponent } from './pickup-options.component';
import { TabModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ReactiveFormsModule,
    FeaturesConfigModule,
    TabModule,
  ],
  declarations: [PickupOptionsComponent],
  exports: [PickupOptionsComponent],
})
export class PickupOptionsModule {}
