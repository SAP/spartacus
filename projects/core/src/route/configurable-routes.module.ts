import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ConfigurableRoutesService } from './configurable-routes.service';
import { RoutesConfigLoader } from './routes-config-loader';
import { ConfigModule, Config } from '../config/config.module';
import {
  ConfigurableRoutesModuleConfig,
  defaultConfigurableRoutesModuleConfig
} from './configurable-routes-module.config';

export function loadRoutesConfig(loader: RoutesConfigLoader) {
  const result = () => loader.loadRoutesConfig(); // workaround for AOT compilation (see https://stackoverflow.com/a/51977115)
  return result;
}

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(defaultConfigurableRoutesModuleConfig)
  ],
  declarations: [],
  exports: [],
  providers: [
    ConfigurableRoutesService,
    RoutesConfigLoader,
    {
      provide: APP_INITIALIZER,
      useFactory: loadRoutesConfig,
      deps: [RoutesConfigLoader],
      multi: true
    },
    { provide: ConfigurableRoutesModuleConfig, useExisting: Config }
  ]
})
export class ConfigurableRoutesModule {}
