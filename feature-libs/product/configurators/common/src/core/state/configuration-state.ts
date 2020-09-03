import { Configurator, StateUtils } from '@spartacus/core';

export const CONFIGURATION_FEATURE = 'productConfiguration';
export const CONFIGURATION_DATA = '[Configurator] Configuration Data';
export const CONFIGURATION_UI_DATA = '[Configurator] Configuration UI Data';
export const CONFIGURATION_PENDING_CHANGES =
  '[Configurator] Configuration Pending Changes';

export interface StateWithConfiguration {
  [CONFIGURATION_FEATURE]: ConfigurationState;
}

export interface ConfigurationState {
  configurations?: StateUtils.EntityProcessesLoaderState<
    Configurator.Configuration
  >;
}
