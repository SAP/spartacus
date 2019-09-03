import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { loaderReducer } from '../../../../state/utils/loader/loader.reducer';
import {
  ConfigurationsState,
  ConfigurationState,
  CONFIGURATION_DATA,
} from './../configuration-state';
import { reducer as configurationReducer } from './configurator.reducer';

export function getReducers(): ActionReducerMap<ConfigurationsState> {
  return {
    active: loaderReducer<ConfigurationState>(
      CONFIGURATION_DATA,
      configurationReducer
    ),
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<ConfigurationsState>
> = new InjectionToken<ActionReducerMap<ConfigurationsState>>(
  'ConfigurationReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearConfigurationState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearConfigurationState];
