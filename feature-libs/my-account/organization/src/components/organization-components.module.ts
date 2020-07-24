import { NgModule } from '@angular/core';
import { CostCenterComponentsModule } from './cost-center/cost-center-components.module';
import { UserGroupComponentsModule } from './user-group/user-group-components.module';

@NgModule({
  imports: [CostCenterComponentsModule, UserGroupComponentsModule],
})
export class OrganizationComponentsModule {}
