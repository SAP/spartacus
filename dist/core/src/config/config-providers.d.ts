import { FactoryProvider, ValueProvider } from '@angular/core';
import { ConfigFactory } from './config-factory';
import { Config } from './config-tokens';
/**
 * Helper function to provide configuration chunk using ConfigChunk token
 *
 * To provide default configuration in libraries provideDefaultConfig should be used instead.
 *
 * @param config Config object to merge with the global configuration
 */
export declare function provideConfig(config?: Config, defaultConfig?: boolean): ValueProvider;
/**
 * Helper function to provide configuration with factory function, using ConfigChunk token
 *
 * To provide default configuration in libraries provideDefaultConfigFactory should be used instead.
 *
 * @param configFactory Factory Function that will generate config object
 * @param deps Optional dependencies to a factory function
 */
export declare function provideConfigFactory(configFactory: ConfigFactory, deps?: any[], defaultConfig?: boolean): FactoryProvider;
/**
 * Helper function to provide default configuration chunk using DefaultConfigChunk token
 *
 * @param config Config object to merge with the default configuration
 */
export declare function provideDefaultConfig(config?: Config): ValueProvider;
/**
 * Helper function to provide default configuration with factory function, using DefaultConfigChunk token
 *
 * @param configFactory Factory Function that will generate config object
 * @param deps Optional dependencies to a factory function
 */
export declare function provideDefaultConfigFactory(configFactory: ConfigFactory, deps?: any[]): FactoryProvider;
