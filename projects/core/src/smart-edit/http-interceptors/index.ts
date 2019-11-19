import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CmsTicketInterceptor } from './cms-ticket.interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: CmsTicketInterceptor,
    multi: true,
  },
];
