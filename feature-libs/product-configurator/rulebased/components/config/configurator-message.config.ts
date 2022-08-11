export interface ProductConfiguratorMessageConfig {
  updateConfigurationMessage?: {
    waitingTime?: number;
  };
}

export abstract class ConfiguratorMessageConfig {
  productConfigurator?: ProductConfiguratorMessageConfig;
}
