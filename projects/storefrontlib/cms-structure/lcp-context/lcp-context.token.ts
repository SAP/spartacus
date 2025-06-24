import { InjectionToken } from '@angular/core';
import { of } from 'rxjs';
import { LcpContext, LcpPresence } from './lcp-context.model';

/**
 * Injection token for the LCP (Largest Contentful Paint) context.
 * It's provided on DOM level by an ancestor component (likely CMS component)
 * and can be injected into a descendant component which should react to the LCP presence.
 * For example, a descendant component can set higher image fetch priority.
 *
 * It's also provided in root injector with default value of `LcpPresence.NONE`,
 * to avoid errors when no ancestor component provides it.
 */
export const LCP_CONTEXT = new InjectionToken<LcpContext>('LCP_CONTEXT', {
  providedIn: 'root',
  factory: () => {
    return {
      lcpPresence$: of(LcpPresence.NONE),
    };
  },
});
