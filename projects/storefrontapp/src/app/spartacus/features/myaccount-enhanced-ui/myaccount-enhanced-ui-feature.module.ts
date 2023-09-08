/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  myAccountEnhancedUITranslations,
  myAccountEnhancedUITranslationChunksConfig,
} from '@spartacus/myaccount-enhanced-ui/assets';
import { MYACCOUNT_ENHANCED_UI_FEATURE } from '@spartacus/myaccount-enhanced-ui';

@NgModule({
  imports: [],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [MYACCOUNT_ENHANCED_UI_FEATURE]: {
          module: () =>
            import('@spartacus/myaccount-enhanced-ui').then(
              (m) => m.MyAccountEnhancedUIModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: myAccountEnhancedUITranslations,
        chunks: myAccountEnhancedUITranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class MyAccountEnhancedUIFeatureModule {}
