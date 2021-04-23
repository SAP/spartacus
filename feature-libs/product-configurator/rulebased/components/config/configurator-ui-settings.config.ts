import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ConfiguratorUISettingsConfig {
  productConfigurator: {
    updateDebounceTime: {
      quantity?: number;
      input?: number;
    };
  };
}
