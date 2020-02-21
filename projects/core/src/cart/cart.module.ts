import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { PageMetaResolver } from '../cms/page/page-meta.resolver';
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
import { CartPersistanceService } from './services/cart-persistance.service';
import { PersistanceService } from './services/persistance.service';
import { CartStoreModule } from './store/cart-store.module';
import { MultiCartStoreModule } from './store/multi-cart-store.module';

export function cartPersistanceFactory(cartPersistanceService): any {
  const result = () => cartPersistanceService;
  return result;
}

export function persistanceFactory(persistanceService): any {
  const result = () => persistanceService;
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
          useFactory: persistanceFactory,
          deps: [PersistanceService],
          multi: true,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: cartPersistanceFactory,
          deps: [CartPersistanceService],
          multi: true,
        },
        CartPersistanceService,
      ],
    };
  }
}
