import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { PageMetaResolver } from '../cms/page/page-meta.resolver';
import { ConfigInitializerService } from '../config/config-initializer/config-initializer.service';
import { CartEventModule } from './event/cart-event.module';
import { CartPageMetaResolver } from './services/cart-page-meta.resolver';
import { MultiCartStatePersistenceService } from './services/multi-cart-state-persistence.service';
import { MultiCartStoreModule } from './store/multi-cart-store.module';

export function cartStatePersistenceFactory(
  cartStatePersistenceService: MultiCartStatePersistenceService,
  configInit: ConfigInitializerService
) {
  const result = () =>
    configInit.getStableConfig('context').then(() => {
      cartStatePersistenceService.initSync();
    });
  return result;
}

@NgModule({
  imports: [MultiCartStoreModule, CartEventModule],
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
