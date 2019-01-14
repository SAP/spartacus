import { NgModule, Optional } from '@angular/core';
import { META_REDUCERS, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ConfigModule } from '../config/config.module';
import { stateMetaReducers } from './reducers';
import { defaultStateConfig } from './config/default-state-config';
import { META_REDUCER, metaReducersFactory } from './meta-reducer';


@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ConfigModule.withConfig(defaultStateConfig)
  ],
  providers: [
    ...stateMetaReducers,
    {
      provide: META_REDUCERS,
      useFactory: metaReducersFactory,
      deps: [[new Optional(), META_REDUCER]]
    }
  ]
})
export class StateModule {}
