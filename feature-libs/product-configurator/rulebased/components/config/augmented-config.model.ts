import '@spartacus/product-configurator/common';
import { ConfiguratorAttributeComposition } from '../composition/configurator-attribute-composition.config';
import { ProductConfiguratorMessageConfig } from './configurator-message.config';
import { ProductConfiguratorUISettingsConfig } from './configurator-ui-settings.config';

declare module '@spartacus/product-configurator/common' {
  interface ProductConfiguratorConfig
    extends ProductConfiguratorUISettingsConfig,
      ProductConfiguratorMessageConfig,
      ConfiguratorAttributeComposition {}
}
