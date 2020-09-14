import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { UnitDetailsModule } from './details/unit-details.module';
import { UnitFormModule } from './form';
import { UnitCostCenterListModule } from './links';
import { UnitAddressModule } from './links/addresses/unit-address.module';
import { UnitApproverListModule } from './links/approvers/unit-approver-list.module';
import { UnitChildrenModule } from './links/children/unit-children.module';
import { UnitUserListModule } from './links/users/unit-user-list.module';
import { UnitListModule } from './list/unit-list.module';
import {
  unitsCmsConfig,
  unitsRoutingConfig,
  unitsTableConfigFactory,
} from './units.config';

@NgModule({
  imports: [
    RouterModule,
    UnitListModule,
    UnitDetailsModule,
    UnitFormModule,
    UnitChildrenModule,
    UnitApproverListModule,
    UnitUserListModule,
    UnitCostCenterListModule,
    UnitAddressModule,
  ],
  providers: [
    provideDefaultConfig(unitsRoutingConfig),
    provideDefaultConfig(unitsCmsConfig),
    provideDefaultConfigFactory(unitsTableConfigFactory),
  ],
})
export class UnitsComponentsModule {}
