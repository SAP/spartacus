import { ModuleWithProviders, NgModule } from '@angular/core';
import { defaultStateConfig } from './config/default-state-config';
import { stateMetaReducers } from './reducers/index';
import { provideDefaultConfig } from '../config/config-providers';

@NgModule({})
export class StateModule {
  static forRoot(): ModuleWithProviders<StateModule> {
    return {
      ngModule: StateModule,
      providers: [
        ...stateMetaReducers,
        provideDefaultConfig(defaultStateConfig),
      ],
    };
  }
}
