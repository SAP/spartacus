import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig } from '../config/config.module';
import { defaultStateConfig } from './config/default-state-config';
import { StateConfig } from './config/state-config';
import { stateMetaReducers } from './reducers/index';
import { PersistanceService } from './services/persistance.service';

export function persistanceFactory(persistanceService): any {
  const result = () => persistanceService;
  return result;
}

@NgModule({})
export class StateModule {
  static forRoot(): ModuleWithProviders<StateModule> {
    return {
      ngModule: StateModule,
      providers: [
        ...stateMetaReducers,
        provideConfig(defaultStateConfig),
        { provide: StateConfig, useExisting: Config },
        {
          provide: APP_INITIALIZER,
          useFactory: persistanceFactory,
          deps: [PersistanceService],
          multi: true,
        },
      ],
    };
  }
}
