import { NgModule } from '@angular/core';
import { CommonConfiguratorComponentsModule } from './components/common-configurator-components.module';
import { ConfiguratorCommonsAdapter } from './core/connectors/configurator-commons.adapter';
import { RulebasedConfiguratorCoreModule } from './core/rulebased-configurator-core.module';
import { OccConfiguratorVariantAdapter } from './occ/variant/occ-configurator-variant.adapter';
import { VariantConfiguratorOccModule } from './occ/variant/variant-configurator-occ.module';

@NgModule({
  providers: [
    {
      provide: ConfiguratorCommonsAdapter,
      useClass: OccConfiguratorVariantAdapter,
    },
  ],
  imports: [
    VariantConfiguratorOccModule,
    RulebasedConfiguratorCoreModule,
    CommonConfiguratorComponentsModule,
  ],
})
export class RulebasedConfiguratorModule {}
