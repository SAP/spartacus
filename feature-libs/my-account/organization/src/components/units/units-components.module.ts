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
import { UnitAddressCreateModule } from './unit-address-create';
import { UnitAddressEditModule } from './unit-address-edit';
import { UnitCostCentersModule } from './unit-cost-centers';

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
