import { InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Possible values for the LCP context.
 * This enum is used to indicate whether a component contains an LCP (Largest Contentful Paint) element.
 * It helps in applying different behaviors based on the presence of LCP,
 * such as prioritizing the loading of a main image within the component.
 */
export enum LcpPresence {
  CONTAINS_LCP = 'CONTAINS_LCP',
  NONE = 'NONE',
}

export interface LcpContext {
  lcpPresence$: Observable<LcpPresence>;
}

/**
 * Tells whether the component contains LCP (Largest Contentful Paint) element.
 * This is used to apply different behaviors based on the presence of LCP,
 * for example, to prioritize loading of a main image inside of the component.
 */
export const LCP_CONTEXT = new InjectionToken<LcpContext>('LCP_CONTEXT', {
  providedIn: 'root',
  factory: () => {
    return {
      lcpPresence$: of(LcpPresence.NONE),
    };
  },
});
