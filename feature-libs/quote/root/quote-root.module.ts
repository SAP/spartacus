/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  RoutingConfig,
} from '@spartacus/core';
import {
  CmsPageGuard,
  LayoutConfig,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { QUOTE_AWARE_FEATURE, QUOTE_FEATURE } from './feature-name';

export function defaultQuoteComponentsConfig() {
  return {
    featureModules: {
      [QUOTE_FEATURE]: {
        cmsComponents: [
          'AccountMyQuotesComponent',
          'QuoteActionsLinkComponent',
          'QuoteActionsByRoleComponent',
          'QuoteCommentsComponent',
          'QuoteHeaderOverviewComponent',
          'QuoteHeaderPriceComponent',
          'QuoteHeaderSellerEditComponent',
          'QuoteItemsComponent',
          'QuoteRequestComponent',
        ],
      },
    },
  };
}

export function defaultQuoteAwareComponentsConfig() {
  return {
    featureModules: {
      [QUOTE_AWARE_FEATURE]: {
        cmsComponents: ['QuoteAwareComponent'],
      },
    },
  };
}

export const defaultQuoteRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      quotes: {
        paths: ['my-account/quotes'],
      },
      quoteDetails: {
        paths: ['my-account/quote/:quoteId'],
        paramsMapping: { quoteId: 'quoteId' },
      },
      quoteEdit: {
        paths: ['my-account/quotes/:quoteId/edit'],
        paramsMapping: { quoteId: 'quoteId' },
      },
    },
  },
};

export const defaultQuoteConfigLayoutConfig: LayoutConfig = {
  layoutSlots: {
    QuoteDetailsPageTemplate: {
      slots: ['BodyContent', 'CenterRightContent'],
    },
  },
};

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'quotes',
        },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'quoteDetails',
        },
      },
    ]),
  ],
  providers: [
    provideDefaultConfigFactory(defaultQuoteComponentsConfig),
    provideDefaultConfigFactory(defaultQuoteAwareComponentsConfig),
    provideDefaultConfig(defaultQuoteRoutingConfig),
    provideDefaultConfig(defaultQuoteConfigLayoutConfig),
  ],
})
export class QuoteRootModule {}
