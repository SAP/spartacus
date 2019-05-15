import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { OccPersonalizationIdInterceptor } from './occ-personalization-id.interceptor';
import { OccPersonalizationTimeInterceptor } from './occ-personalization-time.interceptor';

export const personalizationInterceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: OccPersonalizationIdInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: OccPersonalizationTimeInterceptor,
    multi: true,
  },
];
