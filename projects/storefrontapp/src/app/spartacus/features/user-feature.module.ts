import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  USER_ACCOUNT_FEATURE,
  UserAccountRootModule,
} from '@spartacus/user/account/root';
import {
  userProfileTranslations,
  userProfileTranslationChunksConfig,
} from '@spartacus/user/profile/assets';
import {
  USER_PROFILE_FEATURE,
  UserProfileRootModule,
} from '@spartacus/user/profile/root';
import {
  userAccountTranslationChunksConfig,
  userAccountTranslations,
} from '@spartacus/user/account/assets';

@NgModule({
  declarations: [],
  imports: [UserAccountRootModule, UserProfileRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [USER_ACCOUNT_FEATURE]: {
          module: () =>
            import('@spartacus/user/account').then((m) => m.UserAccountModule),
        },
      },
      i18n: {
        resources: userAccountTranslations,
        chunks: userAccountTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig({
      featureModules: {
        [USER_PROFILE_FEATURE]: {
          module: () =>
            import('@spartacus/user/profile').then((m) => m.UserProfileModule),
        },
      },
      i18n: {
        resources: userProfileTranslations,
        chunks: userProfileTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class UserFeatureModule {}
