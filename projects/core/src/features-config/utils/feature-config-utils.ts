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
    return level[0] === '!'
      ? !isInLevel(config.features.level, level.substr(1, level.length))
      : isInLevel(config.features.level, level);
  }
}

export function isFeatureEnabled(config: unknown, feature: string): boolean {
  if (isFeatureConfig(config)) {
    const featureConfig =
      feature[0] === '!'
        ? config.features[feature.substr(1, feature.length)]
        : config.features[feature];

    const result =
      typeof featureConfig === 'string'
        ? isFeatureLevel(config, featureConfig)
        : featureConfig;

    return feature[0] === '!' ? !result : result;
  }
}
