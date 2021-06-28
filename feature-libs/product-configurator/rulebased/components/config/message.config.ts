export interface ProductConfiguratorMessageConfig {
  updateConfigurationMessage?: {
    waitingTime?: number;
  };
}

export abstract class MessageConfig {
  productConfigurator?: ProductConfiguratorMessageConfig;
}
