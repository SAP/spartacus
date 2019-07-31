import { Inject, Injectable } from '@angular/core';
import { FeaturesConfig } from '../config/features-config';
import { Config } from '../../config/config.module';
import {
  isFeatureEnabled,
  isFeatureLevel,
} from '../utils/feature-config-utils';

@Injectable({
  providedIn: 'root',
})
export class FeatureConfigService {
  constructor(@Inject(Config) protected config: FeaturesConfig) {}

  isLevel(version: string): boolean {
    return isFeatureLevel(this.config, version);
  }

  isEnabled(feature: string) {
    return isFeatureEnabled(this.config, feature);
  }
}
