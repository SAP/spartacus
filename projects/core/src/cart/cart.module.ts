import { ModuleWithProviders, NgModule } from '@angular/core';
import { PageMetaResolver } from '../cms/page/page-meta.resolver';
import { CartDataService } from './facade/cart-data.service';
import {
  CartService,
  SaveForLaterService,
  SaveForLaterDataService,
} from './facade/index';
import { CartPageMetaResolver } from './services/cart-page-meta.resolver';
import { CartStoreModule } from './store/cart-store.module';

@NgModule({
  imports: [CartStoreModule],
})
export class CartModule {
  static forRoot(): ModuleWithProviders<CartModule> {
    return {
      ngModule: CartModule,
      providers: [
        CartDataService,
        CartService,
        SaveForLaterService,
        SaveForLaterDataService,
        {
          provide: PageMetaResolver,
          useExisting: CartPageMetaResolver,
          multi: true,
        },
      ],
    };
  }
}
