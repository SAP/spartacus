import { APP_INITIALIZER, Provider } from '@angular/core';
import { SiteContextParamsService } from '../facade/site-context-params.service';
import { UrlSerializer } from '@angular/router';
import { SiteContextUrlSerializer } from '../services/site-context-url-serializer';
import { SiteContextRoutesHandler } from '../services/site-context-routes-handler';

export function initSiteContextRoutesHandler(
  siteContextRoutesHandler: SiteContextRoutesHandler
) {
  return () => {
    siteContextRoutesHandler.init();
  };
}

export const siteContextParamsProviders: Provider[] = [
  SiteContextParamsService,
  { provide: UrlSerializer, useClass: SiteContextUrlSerializer },
  {
    provide: APP_INITIALIZER,
    useFactory: initSiteContextRoutesHandler,
    deps: [SiteContextRoutesHandler],
    multi: true
  }
];
