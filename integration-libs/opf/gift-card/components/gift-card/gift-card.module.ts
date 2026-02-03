/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppliedGiftCardModule } from '../applied-gift-card/applied-gift-card.module';
import { CommonModule } from '@angular/common';
import { GiftCardComponent } from './gift-card.component';
import { GiftCardService } from '../../core/services/gift-card.service';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@spartacus/storefront';
import { GiftCardCheckoutComponentModule } from '../checkout';

@NgModule({
  declarations: [GiftCardComponent],
  providers: [
    GiftCardService,
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        GiftCardComponent: {
          component: GiftCardComponent,
        },
      },
    }),
  ],
  exports: [GiftCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    SpinnerModule,
    I18nModule,
    AppliedGiftCardModule,
    ReactiveFormsModule,
    GiftCardCheckoutComponentModule,
  ],
})
export class GiftCardModule {}
