import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { loaderReducer } from '../../../../state/utils/loader/loader.reducer';
import {
  ConfigurationsTextfieldState,
  ConfigurationTextfieldState,
  CONFIGURATION_TEXTFIELD_DATA,
} from '../configuration-textfield-state';
import { reducer as configurationReducer } from './configurator-textfield.reducer';

export function getConfiguratorTextfieldReducers(): ActionReducerMap<
  ConfigurationsTextfieldState
> {
  return {
    active: loaderReducer<ConfigurationTextfieldState>(
      CONFIGURATION_TEXTFIELD_DATA,
      configurationReducer
    ),
  };
}

export const configuratorTextfieldReducerToken: InjectionToken<
  ActionReducerMap<ConfigurationsTextfieldState>
> = new InjectionToken<ActionReducerMap<ConfigurationsTextfieldState>>(
  'ConfiguratorReducers'
);

export const configuratorTextfieldReducerProvider: Provider = {
  provide: configuratorTextfieldReducerToken,
  useFactory: getConfiguratorTextfieldReducers,
};

export const metaConfiguratorTextfieldReducers: MetaReducer<any>[] = [];
