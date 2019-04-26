import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ConfigurableRoutesService } from './configurable-routes.service';
import { RoutingConfigService } from './routing-config.service';
import { ConfigModule, Config } from '../../config/config.module';
import { RoutingConfig } from './config/routing-config';
import { defaultRoutingConfig } from './config/default-routing-config';
import { UrlParsingService } from './url-translation/url-parsing.service';
import { UrlTranslationService } from './url-translation/url-translation.service';

export function initConfigurableRoutes(
  service: ConfigurableRoutesService
): () => Promise<void> {
  const result = () => service.init(); // workaround for AOT compilation (see https://stackoverflow.com/a/51977115)
  return result;
}

@NgModule({
  imports: [CommonModule, ConfigModule.withConfig(defaultRoutingConfig)],
  declarations: [],
  exports: [],
  providers: [
    ConfigurableRoutesService,
    RoutingConfigService,
    UrlTranslationService,
    UrlParsingService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfigurableRoutes,
      deps: [ConfigurableRoutesService],
      multi: true,
    },
    { provide: RoutingConfig, useExisting: Config },
  ],
})
export class ConfigurableRoutesModule {}
