import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { ORGANIZATION_USER_REGISTRATION_FEATURE } from './feature-name';

export function defaultOrganizationUserRegistrationComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [ORGANIZATION_USER_REGISTRATION_FEATURE]: {
        cmsComponents: ['OrganizationUserRegistrationComponent'],
      },
    },
  };

  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(
      defaultOrganizationUserRegistrationComponentsConfig
    ),
  ],
})
export class OrganizationUserRegistrationRootModule {}
