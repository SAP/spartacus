import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { PageMetaResolver } from '../cms/page/page-meta.resolver';
import { ConfigInitializerService } from '../config/config-initializer/config-initializer.service';
import { ActiveCartService } from './facade/active-cart.service';
import {
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
  imports: [CartStoreModule, MultiCartStoreModule],
})
export class CartModule {
  static forRoot(): ModuleWithProviders<CartModule> {
    return {
      ngModule: CartModule,
      providers: [
        CartVoucherService,
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
