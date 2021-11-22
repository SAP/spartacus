import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  CmsConfig,
  ConfigInitializerService,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { EPD_VISUALIZATION_FEATURE } from './feature-name';

export function epdVisualizationJsFactory(
  _configInit: ConfigInitializerService
) {
  return Promise.resolve();
}

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
    {
      provide: APP_INITIALIZER,
      useFactory: epdVisualizationJsFactory,
      deps: [ConfigInitializerService],
      multi: true,
    },
  ],
})
export class EpdVisualizationRootModule {}
