/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@commerce-storefront-toolset/core';
import {
  userAccountTranslationChunksConfig,
  userAccountTranslations,
} from '@commerce-storefront-toolset/user/account/assets';
import {
  UserAccountRootModule,
  USER_ACCOUNT_FEATURE,
} from '@commerce-storefront-toolset/user/account/root';
import {
  userProfileTranslationChunksConfig,
  userProfileTranslations,
} from '@commerce-storefront-toolset/user/profile/assets';
import {
  UserProfileRootModule,
  USER_PROFILE_FEATURE,
} from '@commerce-storefront-toolset/user/profile/root';

@NgModule({
  declarations: [],
  imports: [UserAccountRootModule, UserProfileRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [USER_ACCOUNT_FEATURE]: {
          module: () =>
            import('@commerce-storefront-toolset/user/account').then((m) => m.UserAccountModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: userAccountTranslations,
        chunks: userAccountTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig(<CmsConfig>{
      featureModules: {
        [USER_PROFILE_FEATURE]: {
          module: () =>
            import('@commerce-storefront-toolset/user/profile').then((m) => m.UserProfileModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: userProfileTranslations,
        chunks: userProfileTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class UserFeatureModule {}
