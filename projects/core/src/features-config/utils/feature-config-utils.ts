import { FeaturesConfig } from '../config/features-config';

function isFeatureConfig(config: any): config is FeaturesConfig {
  return typeof config === 'object' && config.features;
}

export function isFeatureLevel(config: unknown, level: string): boolean {
  if (isFeatureConfig(config)) {
    return config.features.level >= level;
  }
}

export function isFeatureEnabled(config: unknown, feature: string): boolean {
  if (isFeatureConfig(config)) {
    const featureConfig = config.features[feature];
    return typeof featureConfig === 'string'
      ? isFeatureLevel(config, featureConfig)
      : featureConfig;
  }
}
