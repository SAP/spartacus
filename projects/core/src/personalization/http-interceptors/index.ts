import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { OccPersonalizationIdInterceptor } from './occ-personalization-id.interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: OccPersonalizationIdInterceptor,
    multi: true,
  },
];
