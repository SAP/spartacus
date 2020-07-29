import { ModuleWithProviders, NgModule } from '@angular/core';
import { PageMetaResolver } from '../cms/page/page-meta.resolver';
import { B2BUserService } from './facade/b2b-user.service';
import { BudgetService } from './facade/budget.service';
import { CostCenterService } from './facade/cost-center.service';
import { OrderApprovalService } from './facade/order-approval.service';
import { OrgUnitService } from './facade/org-unit.service';
import { PermissionService } from './facade/permission.service';
import { UserGroupService } from './facade/user-group.service';
import { OrganizationPageMetaResolver } from './services/organization-page-meta.resolver';
import { OrganizationStoreModule } from './store/organization-store.module';

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
        UserGroupService,
        PermissionService,
        CostCenterService,
        B2BUserService,
        {
          provide: PageMetaResolver,
          useExisting: OrganizationPageMetaResolver,
          multi: true,
        },
        OrderApprovalService,
      ],
    };
  }
}
