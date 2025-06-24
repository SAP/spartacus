import { Observable } from 'rxjs';

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
