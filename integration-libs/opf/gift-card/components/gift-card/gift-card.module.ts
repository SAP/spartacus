/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppliedGiftCardModule } from '../applied-gift-card/applied-gift-card.module';
import { CommonModule } from '@angular/common';
import { GiftCardCheckoutComponentModule } from '../checkout';
import { GiftCardComponent } from './gift-card.component';
import { GiftCardService } from '../../core/services/gift-card.service';
import { I18nModule } from '@spartacus/core';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@spartacus/storefront';

@NgModule({
  providers: [GiftCardService],
  imports: [
    CommonModule,
    FormsModule,
    SpinnerModule,
    I18nModule,
    AppliedGiftCardModule,
    ReactiveFormsModule,
    GiftCardCheckoutComponentModule,
    GiftCardComponent,
  ],
  exports: [GiftCardComponent],
})
export class GiftCardModule {}
