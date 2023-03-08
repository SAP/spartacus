/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
import { cdpTranslations, cdpTranslationChunksConfig } from 'integration-libs/cdp/assets/public_api';
import { CdpRootModule } from 'integration-libs/cdp/cdp-root.module';
//import { CdpMyAccountComponent } from 'integration-libs/cdp/root/components/cdp-my-account';
// import { CdcConfig, CdcRootModule, CDC_FEATURE } from '@spartacus/cdc/root';
// import { CmsConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CdpRootModule],
  providers: [
    // provideConfig(<CmsConfig>{
    //   component: [
    //     {
    //       CdpMyAccountComponent: CdpMyAccountComponent,
    //       CdpMySideComponent: CdpMyAccountSideComponent,
    //     }
    //   ]
    // }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: cdpTranslations,
        chunks: cdpTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class CdpFeatureModule {}
