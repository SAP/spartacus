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
import { UserProfileRootModule } from '@spartacus/user/profile/root';
import { UserAccountModule } from '@spartacus/user/account';

@NgModule({
  declarations: [],
  imports: [UserAccountRootModule, UserProfileRootModule, UserAccountModule],
  providers: [
    provideConfig({
      featureModules: {
        [USER_ACCOUNT_FEATURE]: {
          module: () =>
            import('@spartacus/user/account').then((m) => m.UserAccountModule),
        },
        userProfile: {
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
