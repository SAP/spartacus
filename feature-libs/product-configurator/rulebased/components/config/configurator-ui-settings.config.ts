import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

export interface ProductConfiguratorUISettingsConfig {
  updateDebounceTime?: {
    quantity?: number;
    input?: number;
  };
  addRetractOption?: boolean;
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ConfiguratorUISettingsConfig {
  productConfigurator?: ProductConfiguratorUISettingsConfig;
}
