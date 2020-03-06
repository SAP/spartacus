import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { PageMetaResolver } from '../cms/page/page-meta.resolver';
import { ConfigInitializerService } from '../config/config-initializer/config-initializer.service';
import { CartEventModule } from './event/cart-event.module';
import { ActiveCartService } from './facade/active-cart.service';
import { CartDataService } from './facade/cart-data.service';
import {
  CartService,
  CartVoucherService,
  SelectiveCartService,
  WishListService,
} from './facade/index';
import { MultiCartService } from './facade/multi-cart.service';
import { CartPageMetaResolver } from './services/cart-page-meta.resolver';
import { MultiCartStatePersistenceService } from './services/multi-cart-state-persistence.service';
import { CartStoreModule } from './store/cart-store.module';
import { MultiCartStoreModule } from './store/multi-cart-store.module';

export function cartStatePersistenceFactory(
  cartStatePersistenceService: MultiCartStatePersistenceService,
  configInit: ConfigInitializerService
) {
  const result = () =>
    configInit.getStableConfig('context').then(() => {
      cartStatePersistenceService.sync();
    });
  return result;
}

@NgModule({
  imports: [CartStoreModule, MultiCartStoreModule, CartEventModule],
})
export class CartModule {
  static forRoot(): ModuleWithProviders<CartModule> {
    return {
      ngModule: CartModule,
      providers: [
        CartDataService,
        CartVoucherService,
        CartService,
        MultiCartService,
        WishListService,
        ActiveCartService,
        SelectiveCartService,
        {
          provide: PageMetaResolver,
          useExisting: CartPageMetaResolver,
          multi: true,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: cartStatePersistenceFactory,
          deps: [MultiCartStatePersistenceService, ConfigInitializerService],
          multi: true,
        },
      ],
    };
  }
}
