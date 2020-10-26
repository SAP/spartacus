import {
  APP_INITIALIZER,
  ComponentFactoryResolver,
  FactoryProvider,
  Type,
} from '@angular/core';
import { OutletPosition } from './outlet.model';
import { OutletService } from './outlet.service';

interface ProvideOutletOptions {
  name: string;
  position?: OutletPosition;
  component: Type<any>;
}

export function provideOutlet(options: ProvideOutletOptions): FactoryProvider {
  function appInitFactory(
    componentFactoryResolver: ComponentFactoryResolver,
    outletService: OutletService
  ) {
    return () => {
      if (options.component) {
        const factory = componentFactoryResolver.resolveComponentFactory(
          options.component
        );
        outletService.add(
          options.name,
          <any>factory,
          options.position ?? OutletPosition.REPLACE
        );
      }
    };
  }

  return {
    provide: APP_INITIALIZER,
    useFactory: appInitFactory,
    deps: [ComponentFactoryResolver, OutletService],
    multi: true,
  };
}
