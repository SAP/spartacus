/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  HttpErrorHandler,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  RoutingConfig,
} from '@spartacus/core';
import {
  CmsPageGuard,
  LayoutConfig,
  PageLayoutComponent,
} from '@spartacus/storefront';
import {
  QUOTE_CART_GUARD_FEATURE,
  QUOTE_FEATURE,
  QUOTE_REQUEST_FEATURE,
} from './feature-name';
import { QuoteBadRequestHandler } from './http-interceptors/quote-bad-request.handler';
import { QuoteNotFoundHandler } from './http-interceptors/quote-not-found.handler';

export function defaultQuoteComponentsConfig() {
  return {
    featureModules: {
      [QUOTE_FEATURE]: {
        cmsComponents: [
          'AccountMyQuotesComponent',
          'QuoteLinksComponent',
          'QuoteCommentsComponent',
          'QuoteHeaderOverviewComponent',
          'QuoteItemsComponent',
          'QuoteSummaryComponent',
        ],
      },
    },
  };
}

export function defaultQuoteCartGuardComponentConfig() {
  return {
    featureModules: {
      [QUOTE_CART_GUARD_FEATURE]: {
        cmsComponents: ['QuoteCartGuardComponent'],
      },
    },
  };
}

export function defaultQuoteRequestComponentsConfig() {
  return {
    featureModules: {
      [QUOTE_REQUEST_FEATURE]: {
        cmsComponents: ['QuoteRequestComponent'],
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

/**
 * The ng route corresponding to the cxRoute 'quotes' is not defined here
 * as it is provided via CMS.
 * For the 'quoteDetails' route we need to provide an additional
 * corresponding ng route because of its parameter
 */
@NgModule({
  imports: [
    RouterModule.forChild([
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
    {
      provide: HttpErrorHandler,
      useExisting: QuoteBadRequestHandler,
      multi: true,
    },
    {
      provide: HttpErrorHandler,
      useExisting: QuoteNotFoundHandler,
      multi: true,
    },
    provideDefaultConfigFactory(defaultQuoteComponentsConfig),
    provideDefaultConfigFactory(defaultQuoteCartGuardComponentConfig),
    provideDefaultConfigFactory(defaultQuoteRequestComponentsConfig),
    provideDefaultConfig(defaultQuoteRoutingConfig),
    provideDefaultConfig(defaultQuoteConfigLayoutConfig),
  ],
})
export class QuoteRootModule {}
