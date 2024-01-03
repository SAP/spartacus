/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
  QUOTE_AWARE_FEATURE,
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

export function defaultQuoteAwareComponentsConfig() {
  return {
    featureModules: {
      [QUOTE_AWARE_FEATURE]: {
        cmsComponents: ['QuoteAwareComponent'],
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
    provideDefaultConfigFactory(defaultQuoteAwareComponentsConfig),
    provideDefaultConfigFactory(defaultQuoteRequestComponentsConfig),
    provideDefaultConfig(defaultQuoteRoutingConfig),
    provideDefaultConfig(defaultQuoteConfigLayoutConfig),
  ],
})
export class QuoteRootModule {}
