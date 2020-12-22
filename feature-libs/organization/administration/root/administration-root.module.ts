import { NgModule } from '@angular/core';
import { HttpErrorHandler, provideDefaultConfig } from '@spartacus/core';
import { defaultOrganizationLayoutConfig } from './config/default-organization-layout.config';
import {
  OrganizationBadRequestHandler,
  OrganizationConflictHandler,
} from '@spartacus/organization/administration/core';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOrganizationLayoutConfig),
    provideDefaultConfig({
      featureModules: {
        organizationAdministration: {
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
    }),
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
