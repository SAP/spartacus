import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { ConfiguratorTextfield } from '../../model/configurator-textfield.model';
import {
  ConfigurationTextfieldState,
  CONFIGURATION_TEXTFIELD_DATA,
} from '../configuration-textfield-state';
import { reducer as configuratorTextfieldReducer } from './configurator-textfield.reducer';

export function getConfiguratorTextfieldReducers(): ActionReducerMap<ConfigurationTextfieldState> {
  return {
    loaderState: StateUtils.loaderReducer<ConfiguratorTextfield.Configuration>(
      CONFIGURATION_TEXTFIELD_DATA,
      // @ts-ignore TODO (#12620)
      configuratorTextfieldReducer
    ),
  };
}

export const configuratorTextfieldReducerToken: InjectionToken<
  ActionReducerMap<ConfigurationTextfieldState>
> = new InjectionToken<ActionReducerMap<ConfigurationTextfieldState>>(
  'ConfiguratorReducers'
);

export const configuratorTextfieldReducerProvider: Provider = {
  provide: configuratorTextfieldReducerToken,
  useFactory: getConfiguratorTextfieldReducers,
};
