import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';

import { ORGANIZATION_USER_REGISTRATION_FEATURE } from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultOrganizationRegistrationComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [ORGANIZATION_USER_REGISTRATION_FEATURE]: {
        cmsComponents: ['RegisterOrgUserComponent'],
      },
    },
  };

  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(
      defaultOrganizationRegistrationComponentsConfig
    ),
  ],
})
export class RegistrationRootModule {}
