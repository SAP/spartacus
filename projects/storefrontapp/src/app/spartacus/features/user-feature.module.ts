import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  USER_ACCOUNT_FEATURE,
  UserAccountRootModule,
} from '@spartacus/user/account/root';
import {
  userProfileTranslations,
  userTranslationChunksConfig,
} from '@spartacus/user/profile/assets';
import {
  USER_PROFILE_FEATURE,
  UserProfileRootModule,
} from '@spartacus/user/profile/root';

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
        [USER_PROFILE_FEATURE]: {
          module: () =>
            import('@spartacus/user/profile').then((m) => m.UserProfileModule),
        },
      },
      i18n: {
        resources: userProfileTranslations,
        chunks: userTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class UserFeatureModule {}
