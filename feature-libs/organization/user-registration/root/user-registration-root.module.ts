import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { ORGANIZATION_USER_REGISTRATION_FEATURE } from './feature-name';

export function defaultOrgUserRegistrationComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [ORGANIZATION_USER_REGISTRATION_FEATURE]: {
        cmsComponents: ['OrgUserRegistrationComponent'],
      },
    },
  };

  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultOrgUserRegistrationComponentsConfig),
  ],
})
export class UserRegistrationRootModule {}
