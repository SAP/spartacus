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
import { provideConfig } from '@spartacus/core';
import { environment } from '../../environments/environment';
import { SpartacusB2bConfigurationModule } from './spartacus-b2b-configuration.module';
import { SpartacusB2cConfigurationModule } from './spartacus-b2c-configuration.module';

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
let SpartacusChannelSpecificConfigurationModule =
  SpartacusB2cConfigurationModule;

if (environment.b2b) {
  SpartacusChannelSpecificConfigurationModule = SpartacusB2bConfigurationModule;
}

@NgModule({
  providers: [
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
  ],
  imports: [SpartacusChannelSpecificConfigurationModule],
})
export class SpartacusConfigurationModule {}
