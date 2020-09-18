import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { ConfiguratorState, CONFIGURATOR_DATA } from '../configurator-state';
import { Configurator } from './../../model/configurator.model';
import { configuratorReducer } from './configurator.reducer';

export function getConfiguratorReducers(): ActionReducerMap<ConfiguratorState> {
  return {
    configurations: StateUtils.entityProcessesLoaderReducer<
      Configurator.Configuration
    >(CONFIGURATOR_DATA, configuratorReducer),
  };
}

export const configuratorReducerToken: InjectionToken<ActionReducerMap<
  ConfiguratorState
>> = new InjectionToken<ActionReducerMap<ConfiguratorState>>(
  'ConfiguratorReducers'
);

export const configuratorReducerProvider: Provider = {
  provide: configuratorReducerToken,
  useFactory: getConfiguratorReducers,
};
