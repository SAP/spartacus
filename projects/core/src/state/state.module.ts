import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ConfigModule } from '../config/config.module';
import { stateMetaReducers } from './reducers/index';
import { defaultStateConfig } from './config/default-state-config';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ConfigModule.withConfig(defaultStateConfig),
  ],
  providers: [...stateMetaReducers],
})
export class StateModule {}
