import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig } from '../config/config.module';
import { defaultStateConfig } from './config/default-state-config';
import { StateConfig } from './config/state-config';
import { StateEventModule } from './event';
import { stateMetaReducers } from './reducers/index';

@NgModule({
  imports: [StateEventModule.forRoot()],
})
export class StateModule {
  static forRoot(): ModuleWithProviders<StateModule> {
    return {
      ngModule: StateModule,
      providers: [
        ...stateMetaReducers,
        provideConfig(defaultStateConfig),
        { provide: StateConfig, useExisting: Config },
      ],
    };
  }
}
