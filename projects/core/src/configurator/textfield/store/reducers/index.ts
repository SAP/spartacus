import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { loaderReducer } from '../../../../state/utils/loader/loader.reducer';
import {
  ConfigurationsState,
  ConfigurationState,
  CONFIGURATION_DATA,
} from '../configuration-textfield-state';
import { reducer as configurationReducer } from './configurator-textfield.reducer';

export function getConfiguratorReducers(): ActionReducerMap<
  ConfigurationsState
> {
  return {
    active: loaderReducer<ConfigurationState>(
      CONFIGURATION_DATA,
      configurationReducer
    ),
  };
}

export const configuratorReducerToken: InjectionToken<
  ActionReducerMap<ConfigurationsState>
> = new InjectionToken<ActionReducerMap<ConfigurationsState>>(
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
