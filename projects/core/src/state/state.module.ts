import { NgModule, Optional } from '@angular/core';
import { StoreModule, USER_PROVIDED_META_REDUCERS } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ConfigModule } from '../config/config.module';
import { stateMetaReducers } from './reducers/index';
import { defaultStateConfig } from './config/default-state-config';
import { META_REDUCER, metaReducersFactory } from './meta-reducer';

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
