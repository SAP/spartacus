import {
  APP_INITIALIZER,
  ComponentFactory,
  ComponentFactoryResolver,
  FactoryProvider,
  Type,
} from '@angular/core';
import { OutletPosition } from './outlet.model';
import { OutletService } from './outlet.service';

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

function appInitFactory(
  componentFactoryResolver: ComponentFactoryResolver,
  outletService: OutletService<ComponentFactory<Type<any>>>,
  options: ProvideOutletOptions
) {
  return () => {
    const factory = componentFactoryResolver.resolveComponentFactory(
      options.component
    );
    outletService.add(
      options.id,
      factory,
      options.position ?? OutletPosition.AFTER
    );
  };
}

/**
 * Helper function to register a component for an outlet.
 *
 * @param options.id unique id of the outlet
 * @param options.component Component to be registered for the outlet
 * @param options.position Component's position in the outlet (default: `OutletPosition.AFTER`)
 */
export function provideOutlet(options: ProvideOutletOptions): FactoryProvider {
  return {
    provide: APP_INITIALIZER,
    useFactory: appInitFactory,
    deps: [ComponentFactoryResolver, OutletService, options],
    multi: true,
  };
}
