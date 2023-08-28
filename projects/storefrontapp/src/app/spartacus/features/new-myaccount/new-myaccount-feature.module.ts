/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  newMyAccountTranslations,
  newMyAccountTranslationChunksConfig,
} from 'integration-libs/new-myaccount/assets/public_api';
import { NEW_MYACCOUNT_FEATURE } from '@spartacus/new-myaccount';

@NgModule({
  imports: [],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [NEW_MYACCOUNT_FEATURE]: {
          module: () =>
            import('@spartacus/new-myaccount').then(
              (m) => m.NewMyAccountModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: newMyAccountTranslations,
        chunks: newMyAccountTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class NewMyAccountFeatureModule {}
