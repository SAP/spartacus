import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HardcodedSiteContext } from './sitecontext-slot.interceptor';
import { HardcodedSiteLinks } from './sitelinks-slot.interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HardcodedSiteContext,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HardcodedSiteLinks,
    multi: true
  }
];
