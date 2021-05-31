import { inject, Injectable, InjectFlags, InjectionToken } from '@angular/core';
import { deepMerge } from './utils/deep-merge';

/**
 * Global Configuration injection token, can be used to inject configuration to any part of the app
 */
// export const Config = new InjectionToken('Configuration', {
//   providedIn: 'root',
//   factory: () => deepMerge({}, inject(DefaultConfig), inject(RootConfig)),
// });

export function factory() {
  return deepMerge({}, inject(DefaultConfig), inject(RootConfig));
}

@Injectable({
  providedIn: 'root',
  useFactory: factory,
})
export abstract class Config {}

export function defaultFactory() {
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
  factory: defaultFactory,
});

export function rootFactory() {
  return deepMerge({}, ...(inject(ConfigChunk, InjectFlags.Optional) ?? []));
}

/**
 * Root Configuration token, used to build Global Configuration, built from ConfigChunks
 */
export const RootConfig = new InjectionToken('RootConfiguration', {
  providedIn: 'root',
  factory: rootFactory,
});

/**
 * Config chunk token, can be used to provide configuration chunk and contribute to the global configuration object.
 * Should not be used directly, use `provideConfig` or import `ConfigModule.withConfig` instead.
 */
export const ConfigChunk = new InjectionToken<object[]>('ConfigurationChunk');
/**
 * Config chunk token, can be used to provide configuration chunk and contribute to the default configuration.
 * Should not be used directly, use `provideDefaultConfig` or `provideDefaultConfigFactory` instead.
 *
 * General rule is, that all config provided in libraries should be provided as default config.
 */
export const DefaultConfigChunk = new InjectionToken<object[]>(
  'DefaultConfigurationChunk'
);
