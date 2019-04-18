import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterTranslationService } from './router-translation.service';
import { RoutingConfigService } from './routing-config.service';
import { ConfigModule, Config } from '../../config/config.module';
import { RoutingConfig } from './config/routing-config';
import { defaultRoutingConfig } from './config/default-routing-config';
import { UrlParsingService } from './url-translation/url-parsing.service';
import { UrlTranslationService } from './url-translation/url-translation.service';

export function initConfigurableRoutes(
  service: RouterTranslationService
): () => Promise<void> {
  //spike todo check why init() runs twice
  const result = () => service.init(); // workaround for AOT compilation (see https://stackoverflow.com/a/51977115)
  return result;
}

@NgModule({
  imports: [CommonModule, ConfigModule.withConfig(defaultRoutingConfig)],
  declarations: [],
  exports: [],
  providers: [
    RouterTranslationService,
    RoutingConfigService,
    UrlTranslationService,
    UrlParsingService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfigurableRoutes,
      deps: [RouterTranslationService],
      multi: true,
    },
    { provide: RoutingConfig, useExisting: Config },
  ],
})
export class ConfigurableRoutesModule {}
