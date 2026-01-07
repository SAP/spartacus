/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  PageMetaModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { PageTitleComponent } from './page-title.component';

@NgModule({
  imports: [CommonModule, RouterModule, PageMetaModule, PageTitleComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        PageTitleComponent: {
          component: PageTitleComponent,
        },
      },
    }),
  ],
  exports: [PageTitleComponent],
})
export class PageTitleModule {}
