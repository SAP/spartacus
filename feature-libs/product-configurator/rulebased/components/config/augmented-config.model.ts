import '@spartacus/product-configurator/common';
import { ProductConfiguratorUISettingsConfig } from './configurator-ui-settings.config';
import { ProductConfiguratorMessageConfig } from './message.config';

declare module '@spartacus/product-configurator/common' {
  interface ProductConfiguratorConfig
    extends ProductConfiguratorUISettingsConfig,
      ProductConfiguratorMessageConfig {}
}
