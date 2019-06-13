import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfigModule } from '../config/config.module';
import { defaultStateConfig } from './config/default-state-config';
import { stateMetaReducers } from './reducers/index';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ConfigModule.withConfig(defaultStateConfig),
  ],
  providers: [...stateMetaReducers],
})
export class StateModule {}
