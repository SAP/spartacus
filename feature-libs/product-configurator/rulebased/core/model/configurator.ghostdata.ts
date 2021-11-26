import { Configurator } from './configurator.model';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';

export const ghostConfigurationId: string = 'GHOST_CONFIGURATION';

export const ghostConfiguration: Configurator.Configuration = {
  configId: ghostConfigurationId,
  groups: [],
  flatGroups: [],
  interactionState: {},
  overview: { configId: ghostConfigurationId, groups: [] },
  owner: ConfiguratorModelUtils.createInitialOwner(),
};
