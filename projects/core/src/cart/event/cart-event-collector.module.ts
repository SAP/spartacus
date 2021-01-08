import { ModuleWithProviders, NgModule } from '@angular/core';
import { TMS_COLLECTORS } from '../../event';
import { CartEventCollector } from './cart-event.collector';

@NgModule({})
export class CartEventCollectorModule {
  static forRoot(): ModuleWithProviders<CartEventCollectorModule> {
    console.log('cart event collectors module for root');
    return {
      ngModule: CartEventCollectorModule,
      providers: [
        {
          provide: TMS_COLLECTORS,
          useExisting: CartEventCollector,
          multi: true,
        },
      ],
    };
  }
}
