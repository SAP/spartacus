import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ConfiguratorUISettings {
  rulebasedConfigurator: {
    quantityDebounceTime?: number;
    inputDebounceTime?: number;
  };
}

export const DefaultConfiguratorUISettings: ConfiguratorUISettings = {
  rulebasedConfigurator: {
    quantityDebounceTime: 750,
    inputDebounceTime: 500,
  },
};
