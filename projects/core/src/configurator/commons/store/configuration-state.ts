import { Configurator } from '../../../model/configurator.model';
import { EntityLoaderState } from '../../../state/utils/entity-loader/entity-loader-state';

export const CONFIGURATION_FEATURE = 'productConfiguration';
export const CONFIGURATION_DATA = '[Configurator] Configuration Data';

export interface StateWithConfiguration {
  [CONFIGURATION_FEATURE]: ConfigurationState;
}

export interface ConfigurationState {
  content: EntityLoaderState<Configurator.Configuration>;
}
