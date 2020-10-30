import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ComponentFactory,
  ComponentFactoryResolver,
  ModuleWithProviders,
  NgModule,
  Type,
} from '@angular/core';
import { OutletDirective } from './outlet.directive';
import { OutletPosition } from './outlet.model';
import {
  ProvideOutletOptions,
  PROVIDE_OUTLET_OPTIONS,
} from './outlet.providers';
import { OutletService } from './outlet.service';

/**
 * @private
 */
export function registerOutletsFactory(
  providedOutletOptions: ProvideOutletOptions[],
  componentFactoryResolver: ComponentFactoryResolver,
  outletService: OutletService<ComponentFactory<Type<any>>>
) {
  const result = () => {
    providedOutletOptions.forEach((options) => {
      const factory = componentFactoryResolver.resolveComponentFactory(
        options.component
      );
      outletService.add(
        options.id,
        factory,
        options.position ?? OutletPosition.AFTER
      );
    });
  };
  return result;
}

@NgModule({
  imports: [CommonModule],
  declarations: [OutletDirective],
  providers: [OutletService],
  exports: [OutletDirective],
})
export class OutletModule {
  static forRoot(): ModuleWithProviders<OutletModule> {
    return {
      ngModule: OutletModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: registerOutletsFactory,
          deps: [
            PROVIDE_OUTLET_OPTIONS,
            ComponentFactoryResolver,
            OutletService,
          ],
          multi: true,
        },
      ],
    };
  }
}
