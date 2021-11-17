import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '../../state/state.module';
import { effectsTransitional } from './effects/transitional';
import { metaReducers, reducerToken } from './reducers/index';
import { reducerTransitionalProvider } from './reducers/transitional';
import { USER_FEATURE } from './user-state';

/**
 * @deprecated since 4.2 - use UserStoreTransitional_4_2_Module with order lib instead
 */
@NgModule({
  imports: [
    CommonModule,
    StateModule,
    StoreModule.forFeature(USER_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effectsTransitional),
    RouterModule,
  ],
  providers: [reducerTransitionalProvider],
})
export class UserStoreTransitionalModule {}
