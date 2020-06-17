import { StateUtils } from '@spartacus/core';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';

export const CONFIGURATION_TEXTFIELD_FEATURE = 'productConfigurationTextfield';
export const CONFIGURATION_TEXTFIELD_DATA =
  '[ConfiguratorTextfield] Configuration Data';

export interface StateWithConfigurationTextfield {
  [CONFIGURATION_TEXTFIELD_FEATURE]: ConfigurationTextfieldLoaderState;
}

export interface ConfigurationTextfieldLoaderState {
  active: StateUtils.LoaderState<ConfigurationTextfieldState>;
}

export interface ConfigurationTextfieldState {
  content: ConfiguratorTextfield.Configuration;
}
