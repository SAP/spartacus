import { Provider } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { SiteContextParamsService } from '../services/site-context-params.service';
import { SiteContextUrlSerializer } from '../services/site-context-url-serializer';

// functions below should not be exposed in public API:

export const siteContextParamsProviders: Provider[] = [
  SiteContextParamsService,
  SiteContextUrlSerializer,
  { provide: UrlSerializer, useExisting: SiteContextUrlSerializer },
];
