import '@spartacus/product-configurator/common';
import { ProductConfiguratorCoreConfig } from './../../core/config/configurator-core.config';
import { ProductConfiguratorMessageConfig } from './configurator-message.config';
import { ProductConfiguratorUISettingsConfig } from './configurator-ui-settings.config';

declare module '@spartacus/product-configurator/common' {
  interface ProductConfiguratorConfig
    extends ProductConfiguratorUISettingsConfig,
      ProductConfiguratorMessageConfig,
      ProductConfiguratorCoreConfig {}
}
