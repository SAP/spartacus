import { Configurator, StateUtils } from '@spartacus/core';

export const CONFIGURATOR_FEATURE = 'productConfigurator';
export const CONFIGURATOR_DATA = '[Configurator] Configuration Data';

export interface StateWithConfiguration {
  [CONFIGURATOR_FEATURE]: ConfigurationState;
}

export interface ConfigurationState {
  configurations?: StateUtils.EntityProcessesLoaderState<
    Configurator.Configuration
  >;
}
