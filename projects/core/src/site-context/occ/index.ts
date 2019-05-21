import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SiteContextInterceptor } from './site-context.interceptor';
import { SiteAdapter } from '../connectors/site.adapter';
import { OccSiteAdapter } from './occ-site.adapter';

export * from './site-context-occ.module';
export * from './site-context.interceptor';
export * from './occ-site.adapter';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SiteContextInterceptor,
    multi: true,
  },
  {
    provide: SiteAdapter,
    useClass: OccSiteAdapter,
  },
];
