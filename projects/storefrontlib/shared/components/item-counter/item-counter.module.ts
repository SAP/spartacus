/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FeaturesConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { ItemCounterComponent } from './item-counter.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule],
  declarations: [ItemCounterComponent],
  exports: [ItemCounterComponent],
  providers: [
    // TODO: (CXSPA-6034) Remove feature flag config next major release
    provideDefaultConfig(<FeaturesConfig>{
      features: {
        a11yQuantityOrderTabbing: true,
      },
    }),
  ],
})
export class ItemCounterModule {}
