import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { PagesInteceptor } from './pages.interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: PagesInteceptor,
    multi: true,
  },
];
