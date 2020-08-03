import { NgModule } from '@angular/core';
import { CostCenterComponentsModule } from './cost-center/cost-center-components.module';
import { UserGroupComponentsModule } from './user-group/user-group-components.module';
import { OrderApprovalComponentsModule } from './order-approval/order-approval-components.module';

@NgModule({
  imports: [
    CostCenterComponentsModule,
    UserGroupComponentsModule,
    OrderApprovalComponentsModule,
  ],
})
export class OrganizationComponentsModule {}
