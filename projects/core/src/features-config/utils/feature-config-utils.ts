import { FeaturesConfig } from '../config/features-config';

function isFeatureConfig(config: any): config is FeaturesConfig {
  return typeof config === 'object' && config.features;
}

function isInLevel(level, version) {
  if (level === '*') {
    return true;
  }
  const levelParts = level.split('.');
  const versionParts = version.split('.');

  for (let i = 0; i < versionParts.length; i++) {
    const versionNumberPart = Number(versionParts[i]);
    const levelNumberPart = Number(levelParts[i]) || 0;

    if (versionNumberPart !== levelNumberPart) {
      return levelNumberPart > versionNumberPart;
    }
  }
  return true;
}

export function isFeatureLevel(config: unknown, level: string): boolean {
  if (isFeatureConfig(config)) {
    return level.indexOf('!') !== -1
      ? !isInLevel(config.features.level, level.substr(1, level.length))
      : isInLevel(config.features.level, level);
  }
}

export function isFeatureEnabled(config: unknown, feature: string): boolean {
  if (isFeatureConfig(config)) {
    const featureConfig = config.features[feature];
    return typeof featureConfig === 'string'
      ? isFeatureLevel(config, featureConfig)
      : feature.indexOf('!') !== -1
      ? !featureConfig
      : featureConfig;
  }
}
