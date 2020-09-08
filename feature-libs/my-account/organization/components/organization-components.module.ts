import { NgModule } from '@angular/core';
import { BudgetComponentsModule } from './budget/budget-components.module';
import { CostCenterComponentsModule } from './cost-center/cost-center-components.module';
import { PermissionComponentsModule } from './permission/permission-components.module';

@NgModule({
  imports: [
    BudgetComponentsModule,
    CostCenterComponentsModule,
    // UnitsComponentsModule,
    // UserGroupComponentsModule,
    // UserComponentsModule,
    PermissionComponentsModule,
    // OrderApprovalComponentsModule,
  ],
})
export class OrganizationComponentsModule {}
