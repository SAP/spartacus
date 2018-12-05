import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducerToken, reducerProvider } from './reducers/index';
import { effects } from './effects/index';
import { metaReducers } from './reducers/index';
import { AUTH_FEATURE } from './auth-state';
import { StateModule } from '../../state/state.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule,
    StoreModule.forFeature(AUTH_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  providers: [reducerProvider]
})
export class AuthStoreModule {}
