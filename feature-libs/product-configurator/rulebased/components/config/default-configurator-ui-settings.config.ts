import { ConfiguratorUISettingsConfig } from './configurator-ui-settings.config';

export const defaultConfiguratorUISettingsConfig: ConfiguratorUISettingsConfig =
  {
    productConfigurator: {
      updateDebounceTime: {
        quantity: 750,
        input: 500,
      },
      addRetractOption: false,
    },
  };
