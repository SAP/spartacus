import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { WithCredentialsInterceptor } from './with-credentials.interceptor';

export * from './with-credentials.interceptor';

/**
 * @deprecated since 1.4.0
 *
 * In version 2.0 this provider will be removed, as you no longer need to
 * manually provide this interceptor as it will be provided in the `OccModule`.
 */
export const WithCredentialsInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: WithCredentialsInterceptor,
  multi: true,
};
