import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfig, provideConfigValidator } from '@spartacus/core';
import { SparePartsTabModule } from './components/spare-parts/spare-parts-tab/spare-parts-tab.module';
import { EpdVisualizationConfig } from './config/epd-visualization-config';
import { epdVisualizationConfigValidator } from './config/epd-visualization-config-validator';

@NgModule({
  imports: [SparePartsTabModule],
})
export class EpdVisualizationModule {
  static forRoot(
    config?: EpdVisualizationConfig
  ): ModuleWithProviders<EpdVisualizationModule> {
    return {
      ngModule: EpdVisualizationModule,
      providers: [
        provideConfig(config),
        provideConfigValidator(epdVisualizationConfigValidator),
      ],
    };
  }
}
