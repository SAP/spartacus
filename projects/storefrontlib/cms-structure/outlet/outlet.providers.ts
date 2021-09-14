import {
  ComponentFactoryResolver,
  InjectionToken,
  Optional,
  StaticProvider,
  Type,
} from '@angular/core';
import { MODULE_INITIALIZER } from '@spartacus/core';
import { OutletPosition } from './outlet.model';
import { registerOutletsFactory } from './outlet.module';
import { OutletService } from './outlet.service';

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

  lazyLoad?: boolean;
}

/**
 * Helper function to register a component for an outlet.
 *
 * @param options.id unique id of the outlet
 * @param options.component Component to be registered for the outlet
 * @param options.position Component's position in the outlet (default: `OutletPosition.AFTER`)
 */
export function provideOutlet(
  options: ProvideOutletOptions
): StaticProvider | StaticProvider[] {
  if (options.lazyLoad) {
    return [
      { provide: PROVIDE_OUTLET_OPTIONS, useValue: options, multi: true },
      {
        provide: MODULE_INITIALIZER,
        useFactory: registerOutletsFactory,
        deps: [
          [new Optional(), PROVIDE_OUTLET_OPTIONS],
          ComponentFactoryResolver,
          OutletService,
        ],
        multi: true,
      },
    ];
  }
  return {
    provide: PROVIDE_OUTLET_OPTIONS,
    useValue: options,
    multi: true,
  };
}
