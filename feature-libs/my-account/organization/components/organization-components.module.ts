import { NgModule } from '@angular/core';
import { BudgetComponentsModule } from './budget/budget-components.module';
import { CostCenterComponentsModule } from './cost-center/cost-center-components.module';
import { OrderApprovalComponentsModule } from './order-approval';
import { PermissionComponentsModule } from './permission/permission-components.module';
import { UserGroupComponentsModule } from './user-group';
import { UserComponentsModule } from './user/user-components.module';

@NgModule({
  imports: [
    BudgetComponentsModule,
    CostCenterComponentsModule,
    // UnitsComponentsModule,
    UserGroupComponentsModule,
    UserComponentsModule,
    PermissionComponentsModule,
    OrderApprovalComponentsModule,
  ],
})
export class OrganizationComponentsModule {}
