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
): void {
  service.init();
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
