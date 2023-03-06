/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import { userAccountTranslations, userAccountTranslationChunksConfig } from '@spartacus/user/account/assets';
import { CdpRootModule } from 'integration-libs/cdp/cdp-root.module';
import { CdpMyAccountComponent } from 'integration-libs/cdp/root/components/cdp-my-account';
// import { CdcConfig, CdcRootModule, CDC_FEATURE } from '@spartacus/cdc/root';
// import { CmsConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CdpRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      component: [
        {
          CdpMyAccountComponent: CdpMyAccountComponent
        }
      ]
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: userAccountTranslations,
        chunks: userAccountTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class CdpFeatureModule {}
