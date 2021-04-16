import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RulebasedConfiguratorModule } from '@spartacus/product-configurator/rulebased';
import { CpqConfiguratorOccModule } from './occ/cpq-configurator-occ.module';
import { CpqConfiguratorRestModule } from './rest/cpq-configurator-rest.module';

@NgModule({
  imports: [
    CommonModule,
    RulebasedConfiguratorModule,
    CpqConfiguratorOccModule,
    CpqConfiguratorRestModule,
  ],
})
export class RulebasedCpqConfiguratorModule {}
