/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  PageMetaModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { PageTitleComponent } from './page-title.component';

@NgModule({
  imports: [CommonModule, RouterModule, PageMetaModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        PageTitleComponent: {
          component: PageTitleComponent,
        },
      },
    }),
  ],
  declarations: [PageTitleComponent],
  exports: [PageTitleComponent],
})
export class PageTitleModule {}
