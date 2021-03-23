import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '../../state/state.module';
import { metaReducers, reducerToken } from './reducers/index';
import { USER_FEATURE } from './user-state';
import { effectsTransitional } from './effects/transitional';
import { reducerTransitionalProvider } from './reducers/transitoinal';

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
