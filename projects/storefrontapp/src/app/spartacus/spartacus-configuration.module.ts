/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeJa from '@angular/common/locales/ja';
import localeZh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import {
  translationChunksConfig,
  translationsDe,
  translationsEn,
  translationsJa,
  translationsZh,
} from '@spartacus/assets';
import { provideConfig, provideConfigFactory } from '@spartacus/core';
import {
  defaultCmsContentProviders,
  layoutConfigFactory,
  mediaConfig,
} from '@spartacus/storefront';
import { environment } from '../../environments/environment';
import { spartacusB2bConfigurationProviders } from './spartacus-b2b-configuration.providers';
import { spartacusB2cConfigurationProviders } from './spartacus-b2c-configuration.providers';

registerLocaleData(localeDe);
registerLocaleData(localeJa);
registerLocaleData(localeZh);

/**
 * Extra configuration specific for B2B or B2C sales channel only
 * It's enabled only in our repo via a special environment variable at build time.
 *
 * In customers' applications, either B2B or B2C configuration is used, which is decided
 * at the installation time of Spartacus (i.e. when running `ng add @spartacus/schematics`).
 */
const spartacusChannelSpecificConfigurationProviders = environment.b2b
  ? spartacusB2bConfigurationProviders
  : spartacusB2cConfigurationProviders;

@NgModule({
  providers: [
    provideConfigFactory(layoutConfigFactory),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
    provideConfig({
      pwa: {
        enabled: false,
        addToHomeScreen: true,
      },
    }),
    provideConfig({
      // we bring in static translations to be up and running soon right away
      i18n: {
        resources: {
          en: translationsEn,
          ja: translationsJa,
          de: translationsDe,
          zh: translationsZh,
        },
        chunks: translationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig({
      authentication: { client_id: 'mobile_android_login' },
      federatedLogin: {
        enabled: true,
        contextParameterName: 'context',
        loginDomains: ['login.local:4200'],
        originMap: {
          de: 'https://electronics-storefront.de:4200',
          es: 'https://electronics-storefront.es:4200',
          pd: 'https://powertools-storefront.de:4200',
        },
      },
    }),

    spartacusChannelSpecificConfigurationProviders,
  ],
})
export class SpartacusConfigurationModule {}
