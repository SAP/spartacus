import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ConfigurableRoutesService } from './configurable-routes.service';
import { RoutesConfigLoader } from './routes-config-loader';
import { ConfigModule, Config } from '../../config/config.module';
import { ConfigurableRoutesConfig } from './config/configurable-routes-config';
import { defaultConfigurableRoutesConfig } from './config/default-configurable-routes-config';
import { UrlParserService } from './url-translator/url-parser.service';
import { RouteRecognizerService } from './url-translator/route-recognizer.service';
import { UrlTranslatorService } from './url-translator/url-translator.service';

export function loadRoutesConfig(loader: RoutesConfigLoader) {
  const result = () => loader.load(); // workaround for AOT compilation (see https://stackoverflow.com/a/51977115)
  return result;
}

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(defaultConfigurableRoutesConfig)
  ],
  declarations: [],
  exports: [],
  providers: [
    ConfigurableRoutesService,
    RoutesConfigLoader,
    UrlTranslatorService,
    RouteRecognizerService,
    UrlParserService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadRoutesConfig,
      deps: [RoutesConfigLoader],
      multi: true
    },
    { provide: ConfigurableRoutesConfig, useExisting: Config }
  ]
})
export class ConfigurableRoutesModule {}
