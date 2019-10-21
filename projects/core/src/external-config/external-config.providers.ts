import { Optional, Provider } from '@angular/core';
import { provideConfigFactory } from '../config/config.module';
import { ExternalConfig } from './external-config';
import { ExternalConfigConverter } from './external-config-converter';

export const deps = [[new Optional(), ExternalConfig]];

export function siteContextConfigFactory(config?: ExternalConfig) {
  return (config && ExternalConfigConverter.toSiteContextConfig(config)) || {};
}

export function i18nConfigFactory(config?: ExternalConfig) {
  return (config && ExternalConfigConverter.toI18nConfig(config)) || {};
}

export const providers: Provider[] = [
  provideConfigFactory(siteContextConfigFactory, deps),
  provideConfigFactory(i18nConfigFactory, deps),
];
