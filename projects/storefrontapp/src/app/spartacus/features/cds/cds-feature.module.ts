/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CdsConfig, CdsModule } from '@spartacus/cds';
import { I18nConfig, provideConfig } from '@spartacus/core';
import { cdsTranslationChunksConfig, cdsTranslations } from '@spartacus/cds/assets';

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
    provideConfig(<CdsConfig>{
      cds: {
        tenant: 'argotest',
        baseUrl: 'https://api.stage.context.cloud.sap',
        endpoints: {
          strategyProducts:
            '/strategy/${tenant}/strategies/${strategyId}/products',
        },
        merchandising: {
          defaultCarouselViewportThreshold: 80,
        },
      },
    }),
    provideConfig(<CdsConfig>{
      cds: {
        profileTag: {
          javascriptUrl:
            'https://tag.static.stage.context.cloud.sap/js/profile-tag.js',
          configUrl:
            'https://tag.static.stage.context.cloud.sap/config/mytenant-main-default',
          allowInsecureCookies: true,
        },
      },
    }),
  ],
})
export class CdsFeatureModule {}
