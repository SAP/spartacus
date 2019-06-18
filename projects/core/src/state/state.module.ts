import { NgModule } from '@angular/core';
import { ConfigModule } from '../config/config.module';
import { defaultStateConfig } from './config/default-state-config';
import { stateMetaReducers } from './reducers/index';

@NgModule({
  imports: [ConfigModule.withConfig(defaultStateConfig)],
  providers: [...stateMetaReducers],
})
export class StateModule {}
