/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { VisualViewerModule } from '../../visual-viewer/visual-viewer.module';
import { VisualPickingProductFilterModule } from './product-filter/visual-picking-product-filter.module';
import { VisualPickingProductListModule } from './product-list/visual-picking-product-list.module';
import { VisualPickingTabComponent } from './visual-picking-tab.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    VisualViewerModule,
    VisualPickingProductListModule,
    VisualPickingProductFilterModule,
  ],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        VisualPickingTabComponent: {
          component: VisualPickingTabComponent,
        },
      },
    } as CmsConfig),
  ],
  declarations: [VisualPickingTabComponent],
  exports: [VisualPickingTabComponent],
})
export class VisualPickingTabModule {}
