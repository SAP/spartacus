import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideConfigValidator,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { epdVisualizationConfigValidator } from './config';
import { getEpdVisualizationDefaultConfig } from './config/epd-visualization-default-config';
import { EPD_VISUALIZATION_FEATURE } from './feature-name';

export function defaultEpdVisualizationComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [EPD_VISUALIZATION_FEATURE]: {
        cmsComponents: ['VisualPickingTabComponent'],
      },
    },
  };
  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultEpdVisualizationComponentsConfig),
    provideDefaultConfigFactory(getEpdVisualizationDefaultConfig),
    provideConfigValidator(epdVisualizationConfigValidator),
  ],
})
export class EpdVisualizationRootModule {}
