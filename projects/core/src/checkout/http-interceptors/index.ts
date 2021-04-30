import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { CheckoutCartInterceptor } from './checkout-cart.interceptor';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: CheckoutCartInterceptor,
    multi: true,
  },
];
