import { NgModule, Optional } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, USER_PROVIDED_META_REDUCERS } from '@ngrx/store';
import { ConfigModule } from '../config/config.module';
import { defaultStateConfig } from './config/default-state-config';
import { metaReducersFactory, META_REDUCER } from './meta-reducer';
import { stateMetaReducers } from './reducers/index';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ConfigModule.withConfig(defaultStateConfig),
  ],
  providers: [
    ...stateMetaReducers,
    {
      provide: USER_PROVIDED_META_REDUCERS,
      useFactory: metaReducersFactory,
      deps: [[new Optional(), META_REDUCER]],
    },
  ],
})
export class StateModule {}
