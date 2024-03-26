/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { QuoteRequestButtonComponent } from './quote-request-button.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [QuoteRequestButtonComponent],
  exports: [QuoteRequestButtonComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteRequestComponent: {
          component: QuoteRequestButtonComponent,
        },
      },
    }),
  ],
})
export class QuoteRequestButtonModule {}
