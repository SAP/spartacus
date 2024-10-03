/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { B2BUserConnector } from './connectors/b2b-user/b2b-user.connector';
import { BudgetConnector } from './connectors/budget/budget.connector';
import { CostCenterConnector } from './connectors/cost-center/cost-center.connector';
import { OrgUnitConnector } from './connectors/org-unit/org-unit.connector';
import { PermissionConnector } from './connectors/permission/permission.connector';
import { UserGroupConnector } from './connectors/user-group/user-group.connector';
import { OrganizationsGuardsModule } from './guards/organization-guards.module';
import { OrganizationBadRequestHandler } from './http-interceptors/bad-request/bad-request.handler';
import { OrganizationConflictHandler } from './http-interceptors/conflict/conflict.handler';
import { OrganizationPageMetaModule } from './services/organization-page-meta.module';
import { OrganizationStoreModule } from './store/organization-store.module';

@NgModule({
  imports: [
    OrganizationPageMetaModule,
    OrganizationStoreModule,
    OrganizationsGuardsModule,
  ],
  providers: [
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
export class AdministrationCoreModule {
  static forRoot(): ModuleWithProviders<AdministrationCoreModule> {
    return {
      ngModule: AdministrationCoreModule,
      providers: [
        BudgetConnector,
        OrgUnitConnector,
        UserGroupConnector,
        PermissionConnector,
        CostCenterConnector,
        B2BUserConnector,
      ],
    };
  }
}
