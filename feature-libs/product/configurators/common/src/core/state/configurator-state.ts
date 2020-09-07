import { Configurator, StateUtils } from '@spartacus/core';

export const CONFIGURATOR_FEATURE = 'productConfigurator';
export const CONFIGURATOR_DATA = '[Configurator] Configuration Data';

export interface StateWithConfigurator {
  [CONFIGURATOR_FEATURE]: ConfiguratorState;
}

export interface ConfiguratorState {
  configurations?: StateUtils.EntityProcessesLoaderState<
    Configurator.Configuration
  >;
}
