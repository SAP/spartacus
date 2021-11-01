import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfig, provideConfigValidator } from '@spartacus/core';
import { VisualPickingTabModule } from './components/visual-picking/visual-picking-tab/visual-picking-tab.module';
import { EpdVisualizationConfig } from './config/epd-visualization-config';
import { epdVisualizationConfigValidator } from './config/epd-visualization-config-validator';

@NgModule({
  imports: [VisualPickingTabModule],
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
