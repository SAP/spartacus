/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {

  PageMetaModule,
  provideDefaultConfig,
  I18nModule,
} from '@spartacus/core';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  imports: [CommonModule, RouterModule, PageMetaModule, I18nModule],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        BreadcrumbComponent: {
          component: BreadcrumbComponent,
        },
      },
    }),
  ],
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
