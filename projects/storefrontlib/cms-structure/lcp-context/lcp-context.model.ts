import { InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Tells whether the component contains LCP (Largest Contentful Paint) element.
 */
export enum LcpPresence {
  CONTAINS_LCP = 'CONTAINS_LCP',
  NONE = 'NONE',
}

/**
 * Context for LCP (Largest Contentful Paint) presence in a component.
 */
export interface LcpContext {
  lcpPresence$: Observable<LcpPresence>;
}

/**
 * Injection token for the LCP (Largest Contentful Paint) context.
 * It's provided on DOM level by an ancestor component (likely CMS component)
 * and can be injected into a descendant component which should react to the LCP presence.
 * For example, a descendant component can set higher image fetch priority.
 */
export const LCP_CONTEXT = new InjectionToken<LcpContext>('LCP_CONTEXT', {
  providedIn: 'root',
  factory: () => {
    return {
      lcpPresence$: of(LcpPresence.NONE),
    };
  },
});
