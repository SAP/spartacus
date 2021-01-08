import { ModuleWithProviders, NgModule } from '@angular/core';
import { EVENT_BUILDER } from '../../event/event.token';
import { CartEventCollector } from './cart-event.collector';

@NgModule({})
export class CartEventCollectorModule {
  static forRoot(): ModuleWithProviders<CartEventCollectorModule> {
    console.log('cart event collectors module for root');
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
