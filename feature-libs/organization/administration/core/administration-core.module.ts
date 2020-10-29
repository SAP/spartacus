import { ModuleWithProviders, NgModule } from '@angular/core';
import { B2BUserConnector } from './connectors/b2b-user/b2b-user.connector';
import { BudgetConnector } from './connectors/budget/budget.connector';
import { CostCenterConnector } from './connectors/cost-center/cost-center.connector';
import { OrgUnitConnector } from './connectors/org-unit/org-unit.connector';
import { PermissionConnector } from './connectors/permission/permission.connector';
import { UserGroupConnector } from './connectors/user-group/user-group.connector';
import { OrganizationPageMetaModule } from './services/organization-page-meta.module';
import { OrganizationStoreModule } from './store/organization-store.module';

@NgModule({
  imports: [OrganizationPageMetaModule, OrganizationStoreModule],
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
