import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

export interface ProductConfiguratorCpqConfig {
  cpq?: {
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
