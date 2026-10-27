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
import {
  AuthConfig,
  AuthConfigService,
  AuthStatePersistenceService,
  OAuthLibWrapperService,
  provideConfig,
  provideConfigFactory,
} from '@spartacus/core';
import {
  defaultCmsContentProviders,
  layoutConfigFactory,
  mediaConfig,
} from '@spartacus/storefront';
import { environment } from '../../environments/environment';
import {
  AuthProxyAuthConfigService,
  AuthProxyAuthStatePersistenceService,
  AuthProxyOAuthLibWrapperService,
} from './custom/auth-proxy';
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
      backend: {
        occ: {
          baseUrl: 'https://localhost:3000', // proxy URL
          // prefix: '/proxy' + environment.occApiPrefix, // not needed if not using a prefix
          useWithCredentials: true, // now need cookies sent with all OCC requests
        },
        media: {
          baseUrl: 'https://40.76.109.9:9002', // We do not want to use the proxy URL for media
          prefix: environment.mediaApiPrefix,
        },
      },
    }),
    provideConfig(<AuthConfig>{
      authentication: {
        baseUrl: 'https://localhost:3000', // set base URL to avoid OCC path concatenation
        // always treated as a relative value added to base URL
        // authBaseUrl + loginUrl = https://localhost:3000/auth
        loginUrl: '/auth',

        customLoginPage: {
          // endpoints are prefixed to baseURL, however we want to go to real auth server, not proxy
          csrfEndpoint: 'https://40.76.109.9:9002/authorizationserver/csrf',
          loginFormEndpoint:
            'https://40.76.109.9:9002/authorizationserver/login',
        },
      },
    }),
    { provide: AuthConfigService, useClass: AuthProxyAuthConfigService },
    {
      provide: OAuthLibWrapperService,
      useClass: AuthProxyOAuthLibWrapperService,
    },
    {
      provide: AuthStatePersistenceService,
      useClass: AuthProxyAuthStatePersistenceService,
    },

    spartacusChannelSpecificConfigurationProviders,
  ],
})
export class SpartacusConfigurationModule {}
