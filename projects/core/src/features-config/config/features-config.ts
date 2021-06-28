import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class FeaturesConfig {
  features?: {
    level?: string;
    [featureToggle: string]: string | boolean | undefined;
  };
}

declare module '../../config/config-tokens' {
  interface Config extends FeaturesConfig {}
}
