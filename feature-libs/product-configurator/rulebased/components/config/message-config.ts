interface ProductConfiguratorMessageConfig {
  updateConfigurationMessage?: {
    waitingTime?: number;
  };
}

export abstract class MessageConfig {
  productConfigurator?: ProductConfiguratorMessageConfig;
}

declare module '@spartacus/product-configurator/rulebased/root' {
  interface ProductConfiguratorConfig
    extends ProductConfiguratorMessageConfig {}
}
