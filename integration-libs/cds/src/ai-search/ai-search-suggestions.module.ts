/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IconModule,
  OutletPosition,
  provideOutlet,
  SearchBoxModule,
  SearchBoxOutlets,
} from '@spartacus/storefront';
import { I18nModule, UrlModule } from '@spartacus/core';
import { AiSearchSuggestionsComponent } from './ai-search-suggestions.component';
import { AiProductCriteriaComponent } from './ai-product-criteria.component';
import { AiProductCriteriaPdpComponent } from './ai-product-criteria-pdp.component';
import { AiAnswerBannerComponent } from './ai-answer-banner.component';
import { ProductListOutlets, ProductDetailOutlets } from '@spartacus/storefront';

@NgModule({
  declarations: [
    AiSearchSuggestionsComponent,
    AiProductCriteriaComponent,
    AiProductCriteriaPdpComponent,
    AiAnswerBannerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SearchBoxModule,
    UrlModule,
    I18nModule,
    IconModule,
  ],
  // DecimalPipe (number pipe) is provided by CommonModule
  providers: [
    provideOutlet({
      id: SearchBoxOutlets.AI_SEARCH_PANEL,
      component: AiSearchSuggestionsComponent,
      position: OutletPosition.REPLACE,
    }),
    provideOutlet({
      id: ProductListOutlets.ITEM_AI_CRITERIA,
      component: AiProductCriteriaComponent,
      position: OutletPosition.REPLACE,
    }),
    provideOutlet({
      id: ProductDetailOutlets.AI_CRITERIA,
      component: AiProductCriteriaPdpComponent,
      position: OutletPosition.REPLACE,
    }),
    provideOutlet({
      id: ProductListOutlets.AI_ANSWER_BANNER,
      component: AiAnswerBannerComponent,
      position: OutletPosition.REPLACE,
    }),
  ],
})
export class AiSearchSuggestionsModule {}
