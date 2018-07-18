import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddToCartModule } from './components/add-to-cart/add-to-cart.module';
import { CartDetailsModule } from './components/cart-details/cart-details.module';
import { CartSharedModule } from './components/cart-shared/cart-shared.module';
import * as fromServices from './services';
import { effects, reducers } from './store';
import { metaReducers } from './store/reducers';

@NgModule({
  imports: [
    AddToCartModule,
    CartDetailsModule,
    CartSharedModule,
    StoreModule.forFeature('cart', reducers, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  exports: [AddToCartModule, CartDetailsModule, CartSharedModule],
  providers: [...fromServices.services]
})
export class CartModule {}
