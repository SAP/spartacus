import { Configuration } from '../../../model/configurator.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';

export const CONFIGURATION_FEATURE = 'productConfiguration';
export const CONFIGURATION_DATA = '[Configurator] Configuration Data';

export interface StateWithConfiguration {
  [CONFIGURATION_FEATURE]: ConfigurationsState;
}

export interface ConfigurationsState {
  active: LoaderState<ConfigurationState>;
}

export interface ConfigurationState {
  content: Configuration;
  refresh: boolean;
}
