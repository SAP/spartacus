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
  FeaturesConfigModule,
  I18nModule,
  PageMetaModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PageMetaModule,
    I18nModule,
    FeaturesConfigModule,
    BreadcrumbComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        BreadcrumbComponent: {
          component: BreadcrumbComponent,
        },
      },
    }),
  ],
  exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
