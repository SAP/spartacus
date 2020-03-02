import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { loaderReducer } from '../../../../state/utils/loader/loader.reducer';
import {
  ConfigurationTextfieldLoaderState,
  ConfigurationTextfieldState,
  CONFIGURATION_TEXTFIELD_DATA,
} from '../configuration-textfield-state';
import { reducer as configurationReducer } from './configurator-textfield.reducer';

export function getConfiguratorTextfieldReducers(): ActionReducerMap<
  ConfigurationTextfieldLoaderState
> {
  return {
    active: loaderReducer<ConfigurationTextfieldState>(
      CONFIGURATION_TEXTFIELD_DATA,
      configurationReducer
    ),
  };
}

export const configuratorTextfieldReducerToken: InjectionToken<ActionReducerMap<
  ConfigurationTextfieldLoaderState
>> = new InjectionToken<ActionReducerMap<ConfigurationTextfieldLoaderState>>(
  'ConfiguratorReducers'
);

export const configuratorTextfieldReducerProvider: Provider = {
  provide: configuratorTextfieldReducerToken,
  useFactory: getConfiguratorTextfieldReducers,
};
