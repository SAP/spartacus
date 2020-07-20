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
import { UnitChildrenModule } from './unit-children';

@NgModule({
  imports: [
    RouterModule,

    // refactor to use factory function
    ConfigModule.withConfig({
      ...unitsRoutingConfig,
      ...unitsCmsConfig,
      ...unitsTableConfig,
    }),

    UnitCreateModule,
    UnitEditModule,
    UnitDetailsModule,
    UnitUsersModule,
    UnitChildrenModule,

    // UnitAddressCreateModule,
    // UnitAddressDetailsModule,
    // UnitAddressEditModule,
    // UnitApproversModule,
    // UnitAssignApproversModule,
    // UnitAssignRolesModule,
    // UnitCostCentersModule,
    // UnitListModule,
    // UnitManageAddressesModule,
  ],
})
export class UnitsComponentsModule {}
