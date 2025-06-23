import { InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Possible values for the LCP context.
 * This enum is used to indicate whether a component contains an LCP (Largest Contentful Paint) element.
 * It helps in applying different behaviors based on the presence of LCP,
 * such as prioritizing the loading of a main image within the component.
 */
export enum LcpContext {
  CONTAINS_LCP = 'CONTAINS_LCP',
  NONE = 'NONE',
}

/**
 * Tells whether the component contains LCP (Largest Contentful Paint) element.
 * This is used to apply different behaviors based on the presence of LCP,
 * for example, to prioritize loading of a main image inside of the component.
 */
export const LCP_CONTEXT = new InjectionToken<Observable<LcpContext>>(
  'LCP_CONTEXT',
  {
    providedIn: 'root',
    factory: () => of(LcpContext.NONE),
  }
);
