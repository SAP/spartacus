import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrganizationPageMetaModule } from './services/organization-page-meta.module';
import { OrganizationStoreModule } from './store/order-approval-store.module';
import { BudgetConnector } from './connectors/budget/budget.connector';
import { OrderApprovalConnector } from './connectors/order-approval/order-approval.connector';
import { PermissionConnector } from './connectors/permission/permission.connector';
import { CostCenterConnector } from './connectors/cost-center/cost-center.connector';
import { B2BUserConnector } from './connectors/b2b-user/b2b-user.connector';
import { OrgUnitConnector } from './connectors/org-unit/org-unit.connector';
import { UserGroupConnector } from './connectors/user-group/user-group.connector';
@NgModule({
  imports: [OrganizationPageMetaModule, OrganizationStoreModule],
})
export class OrganizationCoreModule {
  static forRoot(): ModuleWithProviders<OrganizationCoreModule> {
    return {
      ngModule: OrganizationCoreModule,
      providers: [
        BudgetConnector,
        OrgUnitConnector,
        UserGroupConnector,
        PermissionConnector,
        CostCenterConnector,
        B2BUserConnector,
        OrderApprovalConnector,
      ],
    };
  }
}
