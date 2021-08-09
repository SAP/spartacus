import '@spartacus/core';

export interface ProductConfiguratorConfig {}

declare module '@spartacus/core' {
  interface Config {
    productConfigurator?: ProductConfiguratorConfig;
  }
}
