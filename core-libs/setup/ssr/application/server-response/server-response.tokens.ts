import { InjectionToken } from '@angular/core';
import { ServerResponseService } from './server-response.service';

/**
 * Various implementations of `ServerResponseService`.
 *
 * Only one implementation can be active at a time, the one that
 * is Applicable in the current server context.
 */
export const SERVER_RESPONSE_SERVICES = new InjectionToken<
  ServerResponseService[]
>('SERVER_RESPONSE_SERVICES');
