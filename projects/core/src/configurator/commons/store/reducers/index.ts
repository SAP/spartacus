import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { Configurator } from '../../../../model/configurator.model';
import { entityLoaderReducer } from '../../../../state/utils/entity-loader/entity-loader.reducer';
import { entityReducer } from '../../../../state/utils/entity/entity.reducer';
import {
  ConfigurationState,
  CONFIGURATION_DATA,
  CONFIGURATION_UI_DATA,
  UiState,
} from './../configuration-state';
import * as UiStateReduce from './configurator-ui.reducer';
import * as StateReduce from './configurator.reducer';

export function getConfiguratorReducers(): ActionReducerMap<
  ConfigurationState
> {
  return {
    configurations: entityLoaderReducer<Configurator.Configuration>(
      CONFIGURATION_DATA,
      StateReduce.reducer
    ),

    uiState: entityReducer<UiState>(
      CONFIGURATION_UI_DATA,
      UiStateReduce.reducer
    ),

    pendingChangesCounter: StateReduce.reducerPendingChanges,
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
