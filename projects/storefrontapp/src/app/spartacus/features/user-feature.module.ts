import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  CmsConfig,
  ConfigInitializerService,
  I18nConfig,
  provideConfig,
} from '@spartacus/core';
import {
  userAccountTranslationChunksConfig,
  userAccountTranslations,
} from '@spartacus/user/account/assets';
import {
  UserAccountRootModule,
  USER_ACCOUNT_FEATURE,
} from '@spartacus/user/account/root';
import { UserAnonymousConsentsModule } from '@spartacus/user/anonymous-consents';
import {
  userAnonymousConsentsTranslationChunksConfig,
  userAnonymousConsentsTranslations,
} from '@spartacus/user/anonymous-consents/assets';
import { UserAnonymousConsentsService } from '@spartacus/user/anonymous-consents/core';
import { UserAnonymousConsentsRootModule } from '@spartacus/user/anonymous-consents/root';
import {
  userProfileTranslationChunksConfig,
  userProfileTranslations,
} from '@spartacus/user/profile/assets';
import {
  UserProfileRootModule,
  USER_PROFILE_FEATURE,
} from '@spartacus/user/profile/root';
import { switchMap, take } from 'rxjs/operators';

export function loadAnonymousConsentsFactory(
  userAnonymousConsentsService: UserAnonymousConsentsService,
  configInitializerService: ConfigInitializerService
) {
  const consents = configInitializerService.getStable('context.baseSite').pipe(
    switchMap((_) => userAnonymousConsentsService.get()),
    take(1)
  );
  return () => consents;
}

@NgModule({
  declarations: [],
  imports: [
    UserAccountRootModule,
    UserProfileRootModule,
    UserAnonymousConsentsRootModule,
    // TODO:#anon ll
    UserAnonymousConsentsModule,
  ],
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
    // TODO:#anon ll
    // provideConfig(<CmsConfig>{
    //   featureModules: {
    //     [USER_ANONYMOUS_CONSENTS_FEATURE]: {
    //       module: () =>
    //         import('@spartacus/user/anonymous-consents').then(
    //           (m) => m.UserAnonymousConsentsModule
    //         ),
    //     },
    //   },
    // }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: userAnonymousConsentsTranslations,
        chunks: userAnonymousConsentsTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: loadAnonymousConsentsFactory,
      deps: [UserAnonymousConsentsService, ConfigInitializerService],
      multi: true,
    },
  ],
})
export class UserFeatureModule {}
