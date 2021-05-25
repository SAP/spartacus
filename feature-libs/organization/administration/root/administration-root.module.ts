import { NgModule } from '@angular/core';
import {
  CmsConfig,
  HttpErrorHandler,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  OrganizationBadRequestHandler,
  OrganizationConflictHandler,
} from '@spartacus/organization/administration/core';
import { defaultOrganizationLayoutConfig } from './config/default-organization-layout.config';
import { ORGANIZATION_ADMINISTRATION_FEATURE } from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultOrganizationAdministrationComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [ORGANIZATION_ADMINISTRATION_FEATURE]: {
        cmsComponents: [
          'ManageBudgetsListComponent',
          'ManageCostCentersListComponent',
          'ManagePermissionsListComponent',
          'ManageUnitsListComponent',
          'ManageUsersListComponent',
          'ManageUserGroupsListComponent',
        ],
      },
    },
  };

  return config;
}

@NgModule({
  providers: [
    provideDefaultConfig(defaultOrganizationLayoutConfig),
    provideDefaultConfigFactory(
      defaultOrganizationAdministrationComponentsConfig
    ),
    {
      provide: HttpErrorHandler,
      useExisting: OrganizationConflictHandler,
      multi: true,
    },
    {
      provide: HttpErrorHandler,
      useExisting: OrganizationBadRequestHandler,
      multi: true,
    },
  ],
})
export class AdministrationRootModule {}
