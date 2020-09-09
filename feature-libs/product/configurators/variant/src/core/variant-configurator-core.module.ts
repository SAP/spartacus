import { NgModule } from '@angular/core';
import { ConfiguratorVariantOccModule } from './occ/configurator-variant-occ.module';
/**
 * Exposes the variant configurator core entities
 */
@NgModule({ imports: [ConfiguratorVariantOccModule] })
export class VariantConfiguratorCoreModule {}
