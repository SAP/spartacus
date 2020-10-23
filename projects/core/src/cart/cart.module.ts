import { ModuleWithProviders, NgModule } from '@angular/core';
import { PageMetaResolver } from '../cms/page/page-meta.resolver';
import { CartPersistenceModule } from './cart-persistence.module';
import { CartEventModule } from './event/cart-event.module';
import { CartPageMetaResolver } from './services/cart-page-meta.resolver';
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
      providers: [
        {
          provide: PageMetaResolver,
          useExisting: CartPageMetaResolver,
          multi: true,
        },
      ],
    };
  }
}
