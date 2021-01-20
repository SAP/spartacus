import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers';
import { USER_FEATURE } from './user-details.state';

@NgModule({
  imports: [
    StoreModule.forFeature(USER_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class UserDetailStoreModule {}
