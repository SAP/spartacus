import { ModuleWithProviders, NgModule } from '@angular/core';
import { stateMetaReducers } from './reducers/index';

@NgModule({})
export class StateModule {
  static forRoot(): ModuleWithProviders<StateModule> {
    return {
      ngModule: StateModule,
      providers: [...stateMetaReducers],
    };
  }
}
