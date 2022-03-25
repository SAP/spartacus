import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { UnitDetailsModule } from './details/unit-details.module';
import { UnitFormModule } from './form/unit-form.module';
import { UnitAddressModule } from './links/addresses/unit-address.module';
import { UnitApproverListModule } from './links/approvers/unit-approver-list.module';
import { UnitChildrenModule } from './links/children/unit-children.module';
import { UnitCostCenterListModule } from './links/cost-centers/unit-cost-centers.module';
import { UnitUsersModule } from './links/users/unit-user-list.module';
import { UnitListModule } from './list/unit-list.module';
import { unitsCmsConfig, unitsTableConfigFactory } from './units.config';

@NgModule({
  imports: [
    RouterModule,
    UnitListModule,
    UnitDetailsModule,
    UnitFormModule,
    UnitChildrenModule,
    UnitApproverListModule,
    UnitUsersModule,
    UnitCostCenterListModule,
    UnitAddressModule,
  ],
  providers: [
    provideDefaultConfig(unitsCmsConfig),
    provideDefaultConfigFactory(unitsTableConfigFactory),
  ],
})
export class UnitsComponentsModule {}
