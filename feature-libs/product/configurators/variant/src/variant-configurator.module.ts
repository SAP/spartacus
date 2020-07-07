import { NgModule } from '@angular/core';
import { VariantComponentsModule } from './components/variant-components.module';
import { VariantCoreModule } from './core/variant-core.module';

@NgModule({
  imports: [VariantCoreModule, VariantComponentsModule],
})
export class VariantConfiguratorModule {}
