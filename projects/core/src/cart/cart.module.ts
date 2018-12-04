import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//@spartacus/core
import { CartNotEmptyGuard } from './guards/index';
import { effects } from './store/effects/index';
import { reducerToken, reducerProvider } from './store/reducers/index';
import { metaReducers } from './store/reducers/index';
import { CartDataService, CartService } from './facade/';
import { AuthService } from './../auth'; // MOC
import { CartOccModule } from './occ/cart-occ-module';
export const guards: any[] = [CartNotEmptyGuard];

@NgModule({
  imports: [
    NgbModule,
    CartOccModule,
    StoreModule.forFeature('cart', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  providers: [
    reducerProvider,
    ...guards,
    CartDataService,
    CartService,
    AuthService // MOCK
  ]
})
export class CartModule {}
