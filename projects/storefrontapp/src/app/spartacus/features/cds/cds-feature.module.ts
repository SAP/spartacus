/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CdsConfig, CdsModule } from '@spartacus/cds';
import {
  I18nConfig,
  provideConfig,
  provideConfigFactory,
  WindowRef,
} from '@spartacus/core';
import {
  cdsTranslationChunksConfig,
  cdsTranslationsEn,
  cdsTranslationsJa,
  cdsTranslationsDe,
  cdsTranslationsZh,
} from '@spartacus/cds/assets';


/**
 * Only differences to the default cds config, they are merged together.
 *
 * @see defaultCdsConfigFactory
 * @see CdsModule.forRoot
 */



const cds1: CdsConfig = {
  cds: {
    // baseSite:
    //   ['electronics-spa', 'electronics', 'electronics-standalone'],
    // tenant: 'issqa-test1-s0',
    // baseUrl: 'https://issqa-test1-s0.iss.commerce.stage.context.cloud.sap',
    // endpoints: {
    //   strategyProducts:
    //      '/strategy/v1/sites/${baseSite}/strategies/${strategyId}/products',
    //   searchIntelligence:
    //     '/search-intelligence/v1/sites/${cdsSiteId}/trendingSearches',
    // },
    // profileTag: {
    //   javascriptUrl:
    //     'https://tag.static.stage.context.cloud.sap/js/profile-tag.js',
    //   configUrl:
    //     'https://tag.static.stage.context.cloud.sap/config/e2etest1-main-default',
    //   allowInsecureCookies: true,
    //   siteId: 'testblabliblu',
    //   sciEnabled: true
    // },
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
    tenant: 'issqa-test1-s0',
    baseUrl: 'https://issqa-test1-s0.iss.commerce.stage.context.cloud.sap',
    endpoints: {
      strategyProducts:
         '/strategy/v1/sites/main/strategies/${strategyId}/products',
      searchIntelligence:
        '/search-intelligence/v1/sites/apparel-uk-spa/trendingSearches',
    },
    profileTag: {
      javascriptUrl: 'https://tag.static.stage.context.cloud.sap/js/profile-tag.js',
      configUrl:
         'https://tag.static.stage.context.cloud.sap/config/e2etest1-main-default',
      allowInsecureCookies: true,
      siteId: 'main',
      sciEnabled: true
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
  imports: [CdsModule.forRoot()],
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
  ],
})
export class CdsFeatureModule {}
