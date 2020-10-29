import { NgModule } from '@angular/core';
import { RulebasedConfiguratorComponentsModule } from './components/rulebased-configurator-components.module';
import { RulebasedConfiguratorAdapter } from './core/connectors/rulebased-configurator.adapter';
import { RulebasedConfiguratorCoreModule } from './core/rulebased-configurator-core.module';
import { VariantConfiguratorOccAdapter } from './occ/variant/variant-configurator-occ.adapter';
import { VariantConfiguratorOccModule } from './occ/variant/variant-configurator-occ.module';

@NgModule({
  providers: [
    {
      provide: RulebasedConfiguratorAdapter,
      useClass: VariantConfiguratorOccAdapter,
    },
  ],
  imports: [
    VariantConfiguratorOccModule,
    RulebasedConfiguratorCoreModule,
    RulebasedConfiguratorComponentsModule,
  ],
})
export class RulebasedConfiguratorModule {}
