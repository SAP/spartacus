import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrganizationPageMetaModule } from './services/organization-page-meta.module';
import { B2BUserService } from './services/b2b-user.service';
import { BudgetService } from './services/budget.service';
import { CostCenterService } from './services/cost-center.service';
import { OrderApprovalService } from './services/order-approval.service';
import { PermissionService } from './services/permission.service';
import { OrgUnitService } from './services/org-unit.service';
import { UserGroupService } from './services/user-group.service';
import { OrganizationStoreModule } from './store/organization-store.module';

@NgModule({
  imports: [OrganizationPageMetaModule, OrganizationStoreModule],
})
export class OrganizationCoreModule {
  static forRoot(): ModuleWithProviders<OrganizationCoreModule> {
    return {
      ngModule: OrganizationCoreModule,
      providers: [
        BudgetService,
        OrgUnitService,
        UserGroupService,
        PermissionService,
        CostCenterService,
        B2BUserService,
        OrderApprovalService,
      ],
    };
  }
}
