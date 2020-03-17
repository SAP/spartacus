import { ModuleWithProviders, NgModule } from '@angular/core';
import { BudgetService } from './facade/budget.service';
import { OrgUnitService } from './facade/org-unit.service';
import { PermissionService } from './facade/permission.service';
import { CostCenterService } from './facade/cost-center.service';
import { OrganizationStoreModule } from './store/organization-store.module';
import { OrgUnitUserGroupService } from './facade/user-group.service';

@NgModule({
  imports: [OrganizationStoreModule],
})
export class OrganizationModule {
  static forRoot(): ModuleWithProviders<OrganizationModule> {
    return {
      ngModule: OrganizationModule,
      providers: [
        BudgetService,
        OrgUnitService,
        OrgUnitUserGroupService,
        PermissionService,
        CostCenterService,
      ],
    };
  }
}
