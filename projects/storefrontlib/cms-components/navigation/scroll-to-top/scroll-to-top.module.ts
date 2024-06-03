/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule, CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '../../misc/icon/icon.module';
import { ScrollToTopComponent } from './scroll-to-top.component';

@NgModule({
  imports: [CommonModule, IconModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ScrollToTopComponent: {
          component: ScrollToTopComponent,
        },
      },
    }),
  ],
  declarations: [ScrollToTopComponent],
  exports: [ScrollToTopComponent],
})
export class ScrollToTopModule {}
