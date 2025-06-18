/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  userAccountTranslationChunksConfig,
  userAccountTranslationsEn,
  userAccountTranslationsJa,
  userAccountTranslationsDe,
  userAccountTranslationsZh,
} from '@spartacus/user/account/assets';
import {
  UserAccountRootModule,
  USER_ACCOUNT_FEATURE,
} from '@spartacus/user/account/root';
import {
  userProfileTranslationChunksConfig,
  userProfileTranslationsEn,
  userProfileTranslationsJa,
  userProfileTranslationsDe,
  userProfileTranslationsZh,
} from '@spartacus/user/profile/assets';
import {
  USE_MY_ACCOUNT_V2_EMAIL,
  USE_MY_ACCOUNT_V2_PASSWORD,
  USE_MY_ACCOUNT_V2_PROFILE,
} from '@spartacus/user/profile/components';
import {
  UserProfileRootModule,
  USER_PROFILE_FEATURE,
} from '@spartacus/user/profile/root';
import { environment } from '../../../../environments/environment';

@NgModule({
  imports: [UserAccountRootModule, UserProfileRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [USER_ACCOUNT_FEATURE]: {
          module: () =>
            import('./user-account-wrapper.module').then(
              (m) => m.UserAccountWrapperModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: userAccountTranslationsEn,
          ja: userAccountTranslationsJa,
          de: userAccountTranslationsDe,
          zh: userAccountTranslationsZh,
        },
        chunks: userAccountTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig(<CmsConfig>{
      featureModules: {
        [USER_PROFILE_FEATURE]: {
          module: () =>
            import('./user-profile-wrapper.module').then(
              (m) => m.UserProfileWrapperModule
            ),
        },
      },
    }),
    {
      provide: USE_MY_ACCOUNT_V2_PROFILE,
      useValue: environment.myAccountV2,
    },
    {
      provide: USE_MY_ACCOUNT_V2_EMAIL,
      useValue: environment.myAccountV2,
    },
    {
      provide: USE_MY_ACCOUNT_V2_PASSWORD,
      useValue: environment.myAccountV2,
    },
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: userProfileTranslationsEn,
          ja: userProfileTranslationsJa,
          de: userProfileTranslationsDe,
          zh: userProfileTranslationsZh,
        },
        chunks: userProfileTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class UserFeatureModule {}
