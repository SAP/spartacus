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
import { UnitCreateModule } from './unit-create/unit-create.module';
import { UnitEditModule } from './unit-edit/unit-edit.module';
import { UnitDetailsModule } from './unit-details/unit-details.module';
import { UnitUsersModule } from './unit-users/unit-users.module';
import { UnitAssignRolesModule } from './unit-assign-roles/unit-assign-roles.module';
import { UnitChildrenModule } from './unit-children/unit-children.module';
import { UnitApproversModule } from './unit-approvers/unit-approvers.module';
import { UnitListModule } from './unit-list/unit-list.module';
import { UnitAssignApproversModule } from './unit-assign-approvers/unit-assign-approvers.module';
import { UnitManageAddressesModule } from './unit-manage-addresses/unit-manage-addresses.module';
import { UnitAddressDetailsModule } from './unit-address-details/unit-address-details.module';
import { UnitAddressCreateModule } from './unit-address-create/unit-address-create.module';
import { UnitAddressEditModule } from './unit-address-edit/unit-address-edit.module';
import { UnitCostCentersModule } from './unit-cost-centers/unit-cost-centers.module';

@NgModule({
  imports: [
    RouterModule,
    UnitListModule,
    UnitCreateModule,
    UnitEditModule,
    UnitDetailsModule,
    UnitUsersModule,
    UnitAssignRolesModule,
    UnitChildrenModule,
    UnitApproversModule,
    UnitAssignApproversModule,
    UnitManageAddressesModule,
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
