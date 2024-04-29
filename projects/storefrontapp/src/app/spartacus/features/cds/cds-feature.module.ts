/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CdsConfig,
  CdsModule,
  cdsTranslationChunksConfig,
  cdsTranslations,
} from '@spartacus/cds';
import {
  I18nConfig,
  provideConfig,
  provideConfigFactory,
  WindowRef,
} from '@spartacus/core';

const cds1: CdsConfig = {
  cds: {
    baseSite: ['electronics-spa', 'electronics', 'electronics-standalone'],
    tenant: 'argotest',
    baseUrl: 'https://api.stage.context.cloud.sap',
    endpoints: {
      strategyProducts: '/strategy/${tenant}/strategies/${strategyId}/products',
    },
    merchandising: {
      defaultCarouselViewportThreshold: 80,
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

const cds2 = {
  cds: {
    baseSite: [
      'apparel-de',
      'apparel-uk',
      'apparel-uk-spa',
      'apparel-uk-standalone',
    ],
    tenant: 'A_CDS_TENANT',
    baseUrl: 'A_CDS_BASE_URL',
    endpoints: {
      strategyProducts: '/strategy/${tenant}/strategies/${strategyId}/products',
    },
    merchandising: {
      defaultCarouselViewportThreshold: 80,
    },
    profileTag: {
      javascriptUrl: 'A_CDS_PROFILE_TAG_LOAD_URL',
      configUrl: 'A_CDS_PROFILE_TAG_CONFIG_URL',
      allowInsecureCookies: true,
    },
  },
};

const cdsConfigArray = [cds1, cds2];

const cdsConfig = (windowRef: WindowRef): CdsConfig => {
  if (!windowRef.isBrowser()) {
    return cds1;
  }
  const cds = cdsConfigArray.find((cdsConfig: CdsConfig) => {
    return cdsConfig.cds?.baseSite?.find((baseSite) =>
      windowRef.location.href?.includes(baseSite)
    );
  });
  return cds ?? cds1;
};

@NgModule({
  imports: [CdsModule.forRoot()],
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: cdsTranslations,
        chunks: cdsTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfigFactory(cdsConfig, [WindowRef]),
  ],
})
export class CdsFeatureModule {}
