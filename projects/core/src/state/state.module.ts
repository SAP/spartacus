import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig } from '../config/config.module';
import { defaultStateConfig } from './config/default-state-config';
import { StateConfig } from './config/state-config';
import { stateMetaReducers } from './reducers/index';
import { PersistenceService } from './services/persistence.service';

@NgModule({})
export class StateModule {
  static forRoot(): ModuleWithProviders<StateModule> {
    return {
      ngModule: StateModule,
      providers: [
        ...stateMetaReducers,
        PersistenceService,
        provideConfig(defaultStateConfig),
        { provide: StateConfig, useExisting: Config },
      ],
    };
  }
}
