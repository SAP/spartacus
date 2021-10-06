import { ModuleWithProviders, NgModule } from '@angular/core';
import { CartPersistenceModule } from './cart-persistence.module';
import { CartEventModule } from './event/cart-event.module';
import { MultiCartStoreModule } from './store/multi-cart-store.module';

@NgModule({
  imports: [
    MultiCartStoreModule,
    CartEventModule,
    CartPersistenceModule.forRoot(),
  ],
})
export class CartModule {
  static forRoot(): ModuleWithProviders<CartModule> {
    return {
      ngModule: CartModule,
    };
  }
}
