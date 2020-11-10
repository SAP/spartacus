import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { CheckoutCartInterceptor } from './checkout-cart.interceptor';

export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: CheckoutCartInterceptor,
    multi: true,
  },
];
