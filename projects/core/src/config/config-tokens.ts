import { inject, Injectable, InjectFlags, InjectionToken } from '@angular/core';
import { deepMerge } from './utils/deep-merge';

export function configFactory() {
  return deepMerge({}, inject(DefaultConfig), inject(RootConfig));
}

/**
 * Global Configuration, can be used to inject configuration to any part of the app
 */
@Injectable({
  providedIn: 'root',
  useFactory: configFactory,
})
export abstract class Config {}

export function defaultConfigFactory() {
  return deepMerge(
    {},
    ...(inject(DefaultConfigChunk, InjectFlags.Optional) ?? [])
  );
}
/**
 * Default Configuration token, used to build Global Configuration, built from DefaultConfigChunks
 */
export const DefaultConfig = new InjectionToken('DefaultConfiguration', {
  providedIn: 'root',
  factory: defaultConfigFactory,
});

export function rootConfigFactory() {
  return deepMerge({}, ...(inject(ConfigChunk, InjectFlags.Optional) ?? []));
}

/**
 * Root Configuration token, used to build Global Configuration, built from ConfigChunks
 */
export const RootConfig = new InjectionToken('RootConfiguration', {
  providedIn: 'root',
  factory: rootConfigFactory,
});

/**
 * Config chunk token, can be used to provide configuration chunk and contribute to the global configuration object.
 * Should not be used directly, use `provideConfig` or import `ConfigModule.withConfig` instead.
 */
export const ConfigChunk = new InjectionToken<Config[]>('ConfigurationChunk');
/**
 * Config chunk token, can be used to provide configuration chunk and contribute to the default configuration.
 * Should not be used directly, use `provideDefaultConfig` or `provideDefaultConfigFactory` instead.
 *
 * General rule is, that all config provided in libraries should be provided as default config.
 */
export const DefaultConfigChunk = new InjectionToken<Config[]>(
  'DefaultConfigurationChunk'
);
