import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import '@spartacus/product-configurator/common';

export interface ProductConfiguratorCoreConfig {
  enableVariantSearch?: boolean;
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ConfiguratorCoreConfig {
  productConfigurator?: ProductConfiguratorCoreConfig;
}

declare module '@spartacus/product-configurator/common' {
  interface ProductConfiguratorConfig extends ProductConfiguratorCoreConfig {}
}
