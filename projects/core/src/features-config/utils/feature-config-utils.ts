import { Config } from '../../config/config-tokens';
import { FeaturesConfig } from '../config/features-config';

function isFeatureConfig(config: Config): config is Required<FeaturesConfig> {
  return typeof config === 'object' && !!config.features;
}

function isInLevel(level: string, version: string): boolean {
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

export function isFeatureLevel(config: Config, level: string): boolean {
  if (isFeatureConfig(config) && config.features.level) {
    return level.startsWith('!')
      ? !isInLevel(config.features.level, level.substr(1, level.length))
      : isInLevel(config.features.level, level);
  }
  return false;
}

export function isFeatureEnabled(config: Config, feature: string): boolean {
  if (isFeatureConfig(config)) {
    const featureConfig =
      feature[0] === '!'
        ? config.features[feature.substr(1, feature.length)]
        : config.features[feature];

    const result =
      typeof featureConfig === 'string'
        ? isFeatureLevel(config, featureConfig)
        : featureConfig;

    return feature.startsWith('!') ? !result : !!result;
  }
  return false;
}
