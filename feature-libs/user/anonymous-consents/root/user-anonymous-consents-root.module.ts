import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { USER_ANONYMOUS_CONSENTS_FEATURE } from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultUserAnonymousConsentsComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [USER_ANONYMOUS_CONSENTS_FEATURE]: {
        cmsComponents: [
          // TODO:#anon - check these
          'AnonymousConsentManagementBannerComponent',
          'AnonymousConsentOpenDialogComponent',
          // 'AnonymousConsentDialogComponent'
        ],
      },
    },
  };
  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultUserAnonymousConsentsComponentsConfig),
    // TODO:#anon - provide the facade
  ],
})
export class UserAnonymousConsentsRootModule {}
