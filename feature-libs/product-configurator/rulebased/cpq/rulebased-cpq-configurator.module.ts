import { NgModule } from '@angular/core';
import { RulebasedConfiguratorModule } from '@spartacus/product-configurator/rulebased';
import { CpqConfiguratorOccModule } from './occ/cpq-configurator-occ.module';
import { CpqConfiguratorRestModule } from './rest/cpq-configurator-rest.module';

/**
 * Exposes the rulebased configurator including the CPQ flavor, which connects to CPQ directly via
 * REST APIs and to commerce via OCC
 */
@NgModule({
  imports: [
    RulebasedConfiguratorModule,
    CpqConfiguratorOccModule,
    CpqConfiguratorRestModule,
  ],
})
export class RulebasedCpqConfiguratorModule {}
