import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Optional, PLATFORM_ID, Provider, SkipSelf } from '@angular/core';
import { provideConfigFactory } from '../config/config.module';
import { TransferData } from '../util/transfer-data';
import { ExternalConfig } from './external-config';
import { ExternalConfigConverter } from './external-config-converter';
import { EXTERNAL_CONFIG_TRANSFER_ID } from './server-external-config.module';

export const deps = [[new Optional(), ExternalConfig]];

export function externalSiteContextConfigFactory(config?: ExternalConfig) {
  return (config && ExternalConfigConverter.toSiteContextConfig(config)) || {};
}

export function externalI18nConfigFactory(config?: ExternalConfig) {
  return (config && ExternalConfigConverter.toI18nConfig(config)) || {};
}

/**
 * Returns the external config provided on Angular bootstrap.
 *
 * When no external config was provided on Angular bootstrap,
 * it tries to rehydrate the config (from the JSON script in DOM).
 *
 * @param config external config
 * @param document document object
 */
export function externalConfigFactory(
  platform: any,
  document: Document,
  config?: ExternalConfig
): ExternalConfig | null {
  if (config) {
    return config;
  }
  if (isPlatformBrowser(platform)) {
    return TransferData.rehydrate(EXTERNAL_CONFIG_TRANSFER_ID, document);
  }
}

export const providers: Provider[] = [
  {
    provide: ExternalConfig,
    useFactory: externalConfigFactory,
    deps: [
      PLATFORM_ID,
      DOCUMENT,
      [new Optional(), new SkipSelf(), ExternalConfig],
    ],
  },
  provideConfigFactory(externalSiteContextConfigFactory, deps),
  provideConfigFactory(externalI18nConfigFactory, deps),
];
