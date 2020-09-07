import { NgModule } from '@angular/core';
import { BudgetComponentsModule } from './budget/budget-components.module';
import { OrderApprovalComponentsModule } from './order-approval/order-approval-components.module';

@NgModule({
  imports: [
    BudgetComponentsModule,
    // CostCenterComponentsModule,
    // UnitsComponentsModule,
    // UserGroupComponentsModule,
    // UserComponentsModule,
    // PermissionComponentsModule,
    OrderApprovalComponentsModule,
  ],
})
export class OrganizationComponentsModule {}
