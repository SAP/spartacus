import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { services } from './facade/index';
import { guards } from './guards/index';
import { AddToCartModule } from './components/add-to-cart/add-to-cart.module';
import { CartDetailsModule } from './components/cart-details/cart-details.module';
import { CartSharedModule } from './components/cart-shared/cart-shared.module';
import { effects } from './store/effects/index';
import { reducerToken, reducerProvider } from './store/reducers/index';
import { metaReducers } from './store/reducers/index';

@NgModule({
  imports: [
    AddToCartModule,
    CartDetailsModule,
    CartSharedModule,
    NgbModule,
    StoreModule.forFeature('cart', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  exports: [AddToCartModule, CartDetailsModule, CartSharedModule],
  providers: [reducerProvider, ...services, ...guards]
})
export class CartModule {}
