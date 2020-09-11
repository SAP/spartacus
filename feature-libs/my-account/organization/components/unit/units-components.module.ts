import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { UnitAddressCreateModule } from './addresses/create/unit-address-create.module';
import { UnitAddressDetailsModule } from './addresses/details/unit-address-details.module';
import { UnitAddressEditModule } from './addresses/edit/unit-address-edit.module';
import { UnitAddressListModule } from './addresses/list/unit-address-list.module';
import { UnitAssignApproversModule } from './approvers/assign/unit-assign-approvers.module';
import { UnitApproverListModule } from './approvers/list/unit-approver-list.module';
import { UnitChildrenModule } from './children/unit-children.module';
import { UnitCostCentersModule } from './cost-centers/unit-cost-centers.module';
import { UnitDetailsModule } from './details/unit-details.module';
import { UnitListModule } from './list/unit-list.module';
import {
  unitsCmsConfig,
  unitsRoutingConfig,
  unitsTableConfigFactory,
} from './units.config';
import { UnitUserAssignRolesModule } from './users/assign-roles/unit-user-assign-roles.module';
import { UnitUserListModule } from './users/list/unit-user-list.module';

@NgModule({
  imports: [
    RouterModule,
    UnitListModule,
    UnitDetailsModule,
    UnitUserListModule,
    UnitUserAssignRolesModule,
    UnitChildrenModule,
    UnitApproverListModule,
    UnitAssignApproversModule,
    UnitAddressListModule,
    UnitAddressDetailsModule,
    UnitAddressCreateModule,
    UnitAddressEditModule,
    UnitCostCentersModule,
  ],
  providers: [
    provideDefaultConfig(unitsRoutingConfig),
    provideDefaultConfig(unitsCmsConfig),
    provideDefaultConfigFactory(unitsTableConfigFactory),
  ],
})
export class UnitsComponentsModule {}
