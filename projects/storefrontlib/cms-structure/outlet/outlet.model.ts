import { Observable } from 'rxjs';

export enum OutletPosition {
  REPLACE = 'replace',
  BEFORE = 'before',
  AFTER = 'after',
}

export const AVOID_STACKED_OUTLETS = false;
export const USE_STACKED_OUTLETS = true;

/**
 * Token for injecting outlet related context to the component rendered in the outlet
 */
export abstract class OutletContextData<T = any> {
  /**
   * Provides reference of the outlet where component is rendered in
   */
  reference: string;
  /**
   * Provides position of the outlet
   */
  position: OutletPosition;
  /**
   * Provides outlet context
   *
   * WARNING: Avoid using it if you need to read the latest value of the context. This property
   *          is only the initial context value and won't be updated when the new context appears.
   *          Use `context$` observable instead.
   *
   * @deprecated since 3.0 - use `context$` observable instead
   */
  context: T;
  /**
   * Provides outlet context as an observable
   */
  context$: Observable<T>;
}
