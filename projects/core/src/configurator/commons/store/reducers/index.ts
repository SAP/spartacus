import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { Configurator } from '../../../../model/configurator.model';
import { entityLoaderReducer } from '../../../../state/utils/entity-loader/entity-loader.reducer';
import {
  ConfigurationState,
  CONFIGURATION_DATA,
} from './../configuration-state';

export function getConfiguratorReducers(): ActionReducerMap<
  ConfigurationState
> {
  return {
    content: entityLoaderReducer<Configurator.Configuration>(
      CONFIGURATION_DATA
    ),
  };
}

export const configuratorReducerToken: InjectionToken<
  ActionReducerMap<ConfigurationState>
> = new InjectionToken<ActionReducerMap<ConfigurationState>>(
  'ConfiguratorReducers'
);

export const configuratorReducerProvider: Provider = {
  provide: configuratorReducerToken,
  useFactory: getConfiguratorReducers,
};

export function clearConfigurationState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    return reducer(state, action);
  };
}

export const metaConfiguratorReducers: MetaReducer<any>[] = [
  clearConfigurationState,
];
