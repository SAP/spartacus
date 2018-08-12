import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddToCartModule } from './components/add-to-cart/add-to-cart.module';
import { CartDetailsModule } from './components/cart-details/cart-details.module';
import { CartSharedModule } from './components/cart-shared/cart-shared.module';
import { services } from './services/index';
import { reducerToken, reducerProvider } from './store/reducers/index';
import { effects } from './store/effects/index';
import { metaReducers } from './store/reducers';

@NgModule({
  imports: [
    AddToCartModule,
    CartDetailsModule,
    CartSharedModule,
    StoreModule.forFeature('cart', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  exports: [AddToCartModule, CartDetailsModule, CartSharedModule],
  providers: [reducerProvider, ...services]
})
export class CartModule {}
