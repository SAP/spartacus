import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class FeaturesConfig {
  features?: {
    [featureToggle: string]: string | boolean;
  };
}

declare module '../../config/config-tokens' {
  interface Config extends FeaturesConfig {}
}
