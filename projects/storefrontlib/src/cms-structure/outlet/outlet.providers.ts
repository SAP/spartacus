import { InjectionToken, StaticProvider, Type } from '@angular/core';
import { OutletPosition } from './outlet.model';

/**
 * @private We plan to drive the outlets by standard configuration
 */
export const PROVIDE_OUTLET_OPTIONS = new InjectionToken<ProvideOutletOptions>(
  'PROVIDE_OUTLET_OPTIONS'
);

export interface ProvideOutletOptions {
  /**
   *  Unique id of the outlet
   */
  id: string;

  /**
   * Component to be registered for the outlet
   */
  component: Type<any>;

  /**
   * Component's position in the outlet
   */
  position?: OutletPosition;
}

/**
 * Helper function to register a component for an outlet.
 *
 * @param options.id unique id of the outlet
 * @param options.component Component to be registered for the outlet
 * @param options.position Component's position in the outlet (default: `OutletPosition.AFTER`)
 */
export function provideOutlet(options: ProvideOutletOptions): StaticProvider {
  return {
    provide: PROVIDE_OUTLET_OPTIONS,
    useValue: options,
    multi: true,
  };
}
