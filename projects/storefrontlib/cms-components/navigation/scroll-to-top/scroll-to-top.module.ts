/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
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
