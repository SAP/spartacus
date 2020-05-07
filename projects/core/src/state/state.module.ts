import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '../config/config.module';
import { defaultStateConfig } from './config/default-state-config';
import { stateMetaReducers } from './reducers/index';

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
