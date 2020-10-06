import { NgModule } from '@angular/core';
import { provideDefaultConfig, RoutingConfig } from '@spartacus/core';
import { BudgetComponentsModule } from './budget/budget-components.module';
import { CostCenterComponentsModule } from './cost-center/cost-center-components.module';
import { OrderApprovalComponentsModule } from './order-approval/order-approval-components.module';
import { PermissionComponentsModule } from './permission/permission-components.module';
import { UnitsComponentsModule } from './unit/units-components.module';
import { UserGroupComponentsModule } from './user-group/user-group-components.module';
import { UserComponentsModule } from './user/user-components.module';
import { defaultOrganizationLayoutConfig } from './config/default-organization-layout.config';

@NgModule({
  imports: [
    BudgetComponentsModule,
    CostCenterComponentsModule,
    UnitsComponentsModule,
    UserGroupComponentsModule,
    UserComponentsModule,
    PermissionComponentsModule,
    OrderApprovalComponentsModule,
  ],
  providers: [
    provideDefaultConfig(defaultOrganizationLayoutConfig),
    provideDefaultConfig(<RoutingConfig>{
      routing: {
        routes: {
          organization: {
            paths: ['organization'],
          },
        },
      },
    }),
  ],
})
export class OrganizationComponentsModule {}
