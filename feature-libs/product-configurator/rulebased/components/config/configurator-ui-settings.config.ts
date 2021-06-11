import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

interface ProductConfiguratorUISettingsConfig {
  updateDebounceTime?: {
    quantity?: number;
    input?: number;
  };
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ConfiguratorUISettingsConfig {
  productConfigurator?: ProductConfiguratorUISettingsConfig;
}

declare module '@spartacus/product-configurator/rulebased/root' {
  interface ProductConfiguratorConfig
    extends ProductConfiguratorUISettingsConfig {}
}
