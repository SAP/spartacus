import { NgModule } from '@angular/core';
import { BudgetComponentsModule } from './budget/budget-components.module';
import { CostCenterComponentsModule } from './cost-center/cost-center-components.module';
import { UserGroupComponentsModule } from './user-group/user-group-components.module';
import { UserComponentsModule } from './user/user-components.module';
import { PermissionComponentsModule } from './permission/permission-components.module';

@NgModule({
  imports: [
    BudgetComponentsModule,
    CostCenterComponentsModule,
    UserGroupComponentsModule,
    UserComponentsModule,
    PermissionComponentsModule,
  ],
})
export class OrganizationComponentsModule {}
