import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '../../state/state.module';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';
import { USER_FEATURE } from './user-state';

/**
 * @deprecated since 3.2, moved to the `@spartacus/user` package.
 */
@NgModule({
  imports: [
    CommonModule,
    StateModule,
    StoreModule.forFeature(USER_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    RouterModule,
  ],
  providers: [reducerProvider],
})
export class UserStoreModule {}
