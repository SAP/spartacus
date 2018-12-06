import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { effects } from './store/effects/index';
import { reducerToken, reducerProvider } from './store/reducers/index';
import { metaReducers } from './store/reducers/index';
import { CartDataService, CartService } from './facade';
import { AuthService } from './../auth';
import { CartOccModule } from './occ/cart-occ-module';

@NgModule({
  imports: [
    NgbModule,
    CartOccModule,
    StoreModule.forFeature('cart', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  providers: [reducerProvider, CartDataService, CartService, AuthService]
})
export class CartModule {}
