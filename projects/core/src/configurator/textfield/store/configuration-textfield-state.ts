import { ConfiguratorTextfield } from '../../../model/configurator-textfield.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';

export const CONFIGURATION_FEATURE = 'productConfigurationTextfield';
export const CONFIGURATION_DATA = '[ConfiguratorTextfield] Configuration Data';

export interface StateWithConfiguration {
  [CONFIGURATION_FEATURE]: ConfigurationsState;
}

export interface ConfigurationsState {
  active: LoaderState<ConfigurationState>;
}

export interface ConfigurationState {
  content: ConfiguratorTextfield.Configuration;
  refresh: boolean;
}
