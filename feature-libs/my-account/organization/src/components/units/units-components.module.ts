import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule } from '@spartacus/core';
import { unitsCmsConfig, unitsRoutingConfig } from './units.config';
import { UnitAddressCreateModule } from './unit-address-create';
// import { UnitAddressDetailsModule } from './unit-address-details';
// import { UnitAddressEditModule } from './unit-address-edit';
// import { UnitApproversModule } from './unit-approvers';
// import { UnitAssignApproversModule } from './unit-assign-approvers';
// import { UnitAssignRolesModule } from './unit-assign-roles';
// import { UnitCreateModule } from './unit-create';
// import { UnitChildrenModule } from './unit-children';
// import { UnitCostCentersModule } from './unit-cost-centers';
// import { UnitDetailsModule } from './unit-details';
// import { UnitEditModule } from './unit-edit';
// import { UnitListModule } from './unit-list';
// import { UnitManageAddressesModule } from './unit-manage-addresses';
// import { UnitUsersModule } from './unit-users';

@NgModule({
  imports: [
    RouterModule,

    // refactor to use factory function
    ConfigModule.withConfig({
      ...unitsRoutingConfig,
      ...unitsCmsConfig,
    }),

    UnitAddressCreateModule,
    // UnitAddressDetailsModule,
    // UnitAddressEditModule,
    // UnitApproversModule,
    // UnitAssignApproversModule,
    // UnitAssignRolesModule,
    // UnitChildrenModule,
    // UnitCostCentersModule,
    // UnitCreateModule,
    // UnitDetailsModule,
    // UnitEditModule,
    // UnitListModule,
    // UnitManageAddressesModule,
    // UnitUsersModule,
  ],
})
export class UnitsComponentsModule {}
