/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppliedGiftCardComponent } from './applied-gift-card.component';
import { CommonModule } from '@angular/common';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppliedGiftCardComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AppliedGiftCardComponent: {
          component: AppliedGiftCardComponent,
        },
      },
    }),
  ],
  imports: [CommonModule, I18nModule],
  exports: [AppliedGiftCardComponent],
})
export class AppliedGiftCardModule {}
