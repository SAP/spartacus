import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorState, CONFIGURATOR_DATA } from '../configurator-state';
import { configuratorReducer } from './configurator.reducer';

export function getConfiguratorReducers(): ActionReducerMap<ConfiguratorState> {
  return {
    // @ts-ignore product-configurators
    configurations: StateUtils.entityProcessesLoaderReducer<Configurator.Configuration>(
      CONFIGURATOR_DATA,
      // @ts-ignore product-configurators
      configuratorReducer
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
