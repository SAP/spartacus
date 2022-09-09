import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  userAccountTranslationChunksConfig,
  userAccountTranslations,
} from '@spartacus/user/account/assets';
import {
  UserAccountRootModule,
  USER_ACCOUNT_FEATURE,
} from '@spartacus/user/account/root';
import {
  userProfileTranslationChunksConfig,
  userProfileTranslations,
} from '@spartacus/user/profile/assets';
import {
  UserProfileRootModule,
  USER_PROFILE_FEATURE,
} from '@spartacus/user/profile/root';

@NgModule({
  declarations: [],
  imports: [UserAccountRootModule, UserProfileRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [USER_ACCOUNT_FEATURE]: {
          module: () =>
            import('@spartacus/user/account').then((m) => m.UserAccountModule),
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
            import('@spartacus/user/profile').then((m) => m.UserProfileModule),
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
