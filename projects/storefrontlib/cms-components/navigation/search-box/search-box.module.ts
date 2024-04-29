/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { MediaModule } from '../../../shared';
import { IconModule } from '../../misc';
import { HighlightPipe } from './highlight.pipe';
import { SearchBoxComponent } from './search-box.component';
import { OutletModule } from '../../../cms-structure';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    IconModule,
    UrlModule,
    I18nModule,
    OutletModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SearchBoxComponent: {
          component: SearchBoxComponent,
        },
      },
    }),
  ],
  declarations: [SearchBoxComponent, HighlightPipe],
  exports: [SearchBoxComponent, HighlightPipe],
})
export class SearchBoxModule {}
