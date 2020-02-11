import { Configurator } from '../../../model/configurator.model';
import { EntityProcessesLoaderState } from '../../../state/utils/entity-processes-loader/entity-processes-loader-state';
import { EntityState } from '../../../state/utils/entity/entity-state';

export const CONFIGURATION_FEATURE = 'productConfiguration';
export const CONFIGURATION_DATA = '[Configurator] Configuration Data';
export const CONFIGURATION_UI_DATA = '[Configurator] Configuration UI Data';
export const CONFIGURATION_PENDING_CHANGES =
  '[Configurator] Configuration Pending Changes';

export interface StateWithConfiguration {
  [CONFIGURATION_FEATURE]: ConfigurationState;
}

export interface ConfigurationState {
  configurations?: EntityProcessesLoaderState<Configurator.Configuration>;
  uiState?: EntityState<UiState>;
}

export interface UiState {
  currentGroup: string;
  menuParentGroup: string;
}
