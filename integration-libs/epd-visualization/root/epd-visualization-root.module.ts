import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideConfigValidator,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { epdVisualizationConfigValidator } from './config';
import { SceneAdapter } from './connectors/scene/scene.adapter';
import { StorageV1Adapter } from './connectors/scene/storage-v1.adapter';
import { VisualizationV1Adapter } from './connectors/visualization/visualization-v1.adapter';
import { VisualizationAdapter } from './connectors/visualization/visualization.adapter';
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
    provideConfigValidator(epdVisualizationConfigValidator),
    { provide: SceneAdapter, useClass: StorageV1Adapter },
    { provide: VisualizationAdapter, useClass: VisualizationV1Adapter },
  ],
})
export class EpdVisualizationRootModule {}
