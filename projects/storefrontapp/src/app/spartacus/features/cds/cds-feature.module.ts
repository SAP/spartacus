/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AiSearchSuggestionsModule, CdsConfig, CdsModule } from '@spartacus/cds';
import {
  cdsTranslationChunksConfig,
  cdsTranslationsDe,
  cdsTranslationsEn,
  cdsTranslationsJa,
  cdsTranslationsZh,
} from '@spartacus/cds/assets';
import {
  I18nConfig,
  provideConfig,
  provideConfigFactory,
  WindowRef,
} from '@spartacus/core';
import { SearchBoxComponentService } from '@spartacus/storefront';

/**
 * Only differences to the default cds config, they are merged together.
 *
 * @see defaultCdsConfigFactory
 * @see CdsModule.forRoot
 */

const cds1: CdsConfig = {
  cds: {
    baseSite: ['electronics-spa', 'electronics', 'electronics-standalone'],
    tenant: 'argotest',
    baseUrl: 'https://htplasocha-main.api.stage.context.cloud.sap',
    endpoints: {
      strategyProducts:
        '/strategy/v1/sites/main/strategies/93c38f76-9d83-47af-a664-6a9f0b5de74a/products',
      searchIntelligence: '/search-intelligence/v1/sites/main/trendingSearches',
    },
    profileTag: {
      javascriptUrl:
        'https://tag.static.stage.context.cloud.sap/js/profile-tag.js',
      configUrl:
        'https://tag.static.stage.context.cloud.sap/config/mytenant-main-default',
      allowInsecureCookies: true,
    },
  },
};

/**
 * Only differences to the default cds config, they are merged together.
 *
 * @see defaultCdsConfigFactory
 * @see CdsModule.forRoot
 */
const cds2: CdsConfig = {
  cds: {
    baseSite: [
      'apparel-de',
      'apparel-uk',
      'apparel-uk-spa',
      'apparel-uk-standalone',
    ],
    tenant: 'A_CDS_TENANT',
    baseUrl: 'A_CDS_BASE_URL',
    profileTag: {
      javascriptUrl: 'A_CDS_PROFILE_TAG_LOAD_URL',
      configUrl: 'A_CDS_PROFILE_TAG_CONFIG_URL',
      cdsSiteId: 'A_CDS_SITE_ID',
      allowInsecureCookies: true,
    },
  },
};

function cdsConfigFactory(windowRef: WindowRef): CdsConfig {
  const cdsConfigArray = [cds1, cds2];

  if (!windowRef.isBrowser()) {
    return cds1;
  }
  const cds = cdsConfigArray.find((cdsConfig: CdsConfig) => {
    return cdsConfig.cds?.baseSite?.find((baseSite) =>
      windowRef.location.href?.includes(baseSite)
    );
  });
  return cds ?? cds1;
}

@NgModule({
  imports: [CdsModule.forRoot(), AiSearchSuggestionsModule],
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: cdsTranslationsEn,
          ja: cdsTranslationsJa,
          de: cdsTranslationsDe,
          zh: cdsTranslationsZh,
        },
        chunks: cdsTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfigFactory(cdsConfigFactory, [WindowRef]),
    {
      provide: APP_INITIALIZER,
      useFactory: (winRef: WindowRef, searchBoxSvc: SearchBoxComponentService) => () => {
        if (winRef.isBrowser()) {
          const params = new URLSearchParams(winRef.location.search);
          if (params.has('aiDebug')) {
            searchBoxSvc.markAiSearchLaunched(true);
          } else {
            searchBoxSvc.restoreAiContextFromStorage();
          }
        }
      },
      deps: [WindowRef, SearchBoxComponentService],
      multi: true,
    },
  ],
})
export class CdsFeatureModule {}
