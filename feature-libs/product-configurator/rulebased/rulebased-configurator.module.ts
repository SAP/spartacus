import { NgModule } from '@angular/core';
import { RulebasedConfiguratorComponentsModule } from './components/rulebased-configurator-components.module';
import { RulebasedConfiguratorCoreModule } from './core/rulebased-configurator-core.module';
import { CpqConfiguratorOccModule } from './occ/cpq/cpq-configurator-occ.module';
import { VariantConfiguratorOccModule } from './occ/variant/variant-configurator-occ.module';

@NgModule({
  imports: [
    VariantConfiguratorOccModule,
    CpqConfiguratorOccModule,
    RulebasedConfiguratorCoreModule,
    RulebasedConfiguratorComponentsModule,
  ],
})
export class RulebasedConfiguratorModule {}
