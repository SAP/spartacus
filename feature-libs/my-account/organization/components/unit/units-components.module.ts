import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  unitsCmsConfig,
  unitsRoutingConfig,
  unitsTableConfigFactory,
} from './units.config';
import { UnitCreateModule } from './create/unit-create.module';
import { UnitEditModule } from './edit/unit-edit.module';
import { UnitDetailsModule } from './details/unit-details.module';
import { UnitUserListModule } from './users/list/unit-user-list.module';
import { UnitUserAssignRolesModule } from './users/assign-roles/unit-user-assign-roles.module';
import { UnitChildrenModule } from './children/unit-children.module';
import { UnitApproverListModule } from './approvers/list/unit-approver-list.module';
import { UnitListModule } from './list/unit-list.module';
import { UnitAssignApproversModule } from './approvers/assign/unit-assign-approvers.module';
import { UnitAddressListModule } from './addresses/list/unit-address-list.module';
import { UnitAddressDetailsModule } from './addresses/details/unit-address-details.module';
import { UnitAddressCreateModule } from './addresses/create/unit-address-create.module';
import { UnitAddressEditModule } from './addresses/edit/unit-address-edit.module';
import { UnitCostCentersModule } from './cost-centers/unit-cost-centers.module';

@NgModule({
  imports: [
    RouterModule,
    UnitListModule,
    UnitCreateModule,
    UnitEditModule,
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
