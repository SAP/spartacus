import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '../../state/state.module';
import { effectsTransitional_4_2 } from './effects/transitional_4_2';
import { metaReducers, reducerToken } from './reducers/index';
import { reducerTransitional_4_2_Provider } from './reducers/transitional_4_2';
import { USER_FEATURE } from './user-state';

@NgModule({
  imports: [
    CommonModule,
    StateModule,
    StoreModule.forFeature(USER_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effectsTransitional_4_2),
    RouterModule,
  ],
  providers: [reducerTransitional_4_2_Provider],
})
export class UserStoreTransitional_4_2_Module {}
