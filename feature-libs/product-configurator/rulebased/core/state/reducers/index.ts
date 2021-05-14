import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorState, CONFIGURATOR_DATA } from '../configurator-state';
import {
  configuratorReducer,
  configuratorReducerCHHI,
} from './configurator.reducer';

export function getConfiguratorReducers() {
  return {
    configurations: StateUtils.entityProcessesLoaderReducer<Configurator.Configuration>(
      CONFIGURATOR_DATA,
      configuratorReducer
    ),
  };
}

export function getConfiguratorReducersChhi() {
  return {
    configurations: StateUtils.entityLoaderReducer<Configurator.Configuration>(
      CONFIGURATOR_DATA,
      configuratorReducerCHHI
    ),
  };
}

export const configuratorReducerToken: InjectionToken<
  ActionReducerMap<ConfiguratorState>
> = new InjectionToken<ActionReducerMap<ConfiguratorState>>(
  'ConfiguratorReducers'
);

export const configuratorReducerProvider: Provider = {
  provide: configuratorReducerToken,
  useFactory: getConfiguratorReducers,
};
