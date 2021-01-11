import { ModuleWithProviders, NgModule } from '@angular/core';
import { EVENT_BUILDER } from '../../event/event.token';
import { CartEventCollector } from './cart-event.collector';

@NgModule({})
export class CartEventCollectorModule {
  static forRoot(): ModuleWithProviders<CartEventCollectorModule> {
    return {
      ngModule: CartEventCollectorModule,
      providers: [
        {
          provide: EVENT_BUILDER,
          useExisting: CartEventCollector,
          multi: true,
        },
      ],
    };
  }
}
