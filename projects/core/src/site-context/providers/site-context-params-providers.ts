import { APP_INITIALIZER, Provider } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { SiteContextParamsService } from '../services/site-context-params.service';
import { SiteContextRoutesHandler } from '../services/site-context-routes-handler';
import { SiteContextUrlSerializer } from '../services/site-context-url-serializer';

// functions below should not be exposed in public API:

export function initSiteContextRoutesHandler(
  siteContextRoutesHandler: SiteContextRoutesHandler,
  configInit: ConfigInitializerService
) {
  return () => {
    configInit.getStableConfig('context').then(() => {
      siteContextRoutesHandler.init();
    });
  };
}

export const siteContextParamsProviders: Provider[] = [
  SiteContextParamsService,
  SiteContextUrlSerializer,
  { provide: UrlSerializer, useExisting: SiteContextUrlSerializer },
  {
    provide: APP_INITIALIZER,
    useFactory: initSiteContextRoutesHandler,
    deps: [SiteContextRoutesHandler, ConfigInitializerService],
    multi: true,
  },
];
