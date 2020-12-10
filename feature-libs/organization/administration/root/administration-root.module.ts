import { NgModule } from '@angular/core';
import { HttpErrorHandler, provideDefaultConfig } from '@spartacus/core';
import { defaultOrganizationLayoutConfig } from './config/default-organization-layout.config';
import { OrganizationBadRequestHandler } from '../core/http-interceptors/bad-request/bad-request.handler';
import { OrganizationConflictHandler } from '../core/http-interceptors/conflict/conflict.handler';

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
