import { NgModule } from '@angular/core';
import { CostCenterComponentsModule } from './cost-center/cost-center-components.module';
import { UnitsComponentsModule } from './units/units-components.module';

@NgModule({
  imports: [CostCenterComponentsModule, UnitsComponentsModule],
})
export class OrganizationComponentsModule {}
