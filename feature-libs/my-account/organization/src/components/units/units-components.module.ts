import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule } from '@spartacus/core';
import {
  unitsCmsConfig,
  unitsRoutingConfig,
  unitsTableConfig,
} from './units.config';
import { UnitCreateModule } from './unit-create';
import { UnitEditModule } from './unit-edit';
import { UnitDetailsModule } from './unit-details';
import { UnitUsersModule } from './unit-users';
import { UnitAssignRolesModule } from './unit-assign-roles';
import { UnitChildrenModule } from './unit-children';
import { UnitApproversModule } from './unit-approvers';
import { UnitListModule } from './unit-list';
import { UnitAssignApproversModule } from './unit-assign-approvers';
import { UnitManageAddressesModule } from './unit-manage-addresses';
import { UnitAddressDetailsModule } from './unit-address-details';

@NgModule({
  imports: [
    RouterModule,

    // refactor to use factory function
    ConfigModule.withConfig({
      ...unitsRoutingConfig,
      ...unitsCmsConfig,
      ...unitsTableConfig,
    }),

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

    // UnitAddressCreateModule,
    // UnitAddressEditModule,
    // UnitCostCentersModule,
  ],
})
export class UnitsComponentsModule {}
