import { NgModule } from '@angular/core';
import { CostCenterComponentsModule } from './cost-center/cost-center-components.module';
import { UserGroupComponentsModule } from './user-group/user-group-components.module';
import { UserComponentsModule } from './user/user-components.module';

@NgModule({
  imports: [
    CostCenterComponentsModule,
    UserGroupComponentsModule,
    UserComponentsModule,
  ],
})
export class OrganizationComponentsModule {}
