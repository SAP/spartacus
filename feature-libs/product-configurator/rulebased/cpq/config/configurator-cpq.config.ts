import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

export interface ProductConfiguratorCpqConfig {
  cpqOrchestration?: {
    cpqOverOcc?: boolean;
  };
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ConfiguratorCpqConfig {
  productConfigurator: ProductConfiguratorCpqConfig;
}

declare module '@spartacus/product-configurator/common' {
  interface ProductConfiguratorConfig extends ProductConfiguratorCpqConfig {}
}
