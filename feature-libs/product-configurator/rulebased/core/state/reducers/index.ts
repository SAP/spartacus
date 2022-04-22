import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorState, CONFIGURATOR_DATA } from '../configurator-state';
import { configuratorReducer } from './configurator.reducer';

export function getConfiguratorReducers(): ActionReducerMap<ConfiguratorState> {
  return {
    // @ts-ignore TODO (#12620)
    configurations:
      StateUtils.entityProcessesLoaderReducer<Configurator.Configuration>(
        CONFIGURATOR_DATA,
        // @ts-ignore TODO (#12620)
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
