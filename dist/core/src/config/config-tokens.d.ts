import { InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
export declare function configFactory(): any;
/**
 * Global Configuration, can be used to inject configuration to any part of the app
 */
export declare abstract class Config {
    static ɵfac: i0.ɵɵFactoryDeclaration<Config, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Config>;
}
export declare function defaultConfigFactory(): any;
/**
 * Default Configuration token, used to build Global Configuration, built from DefaultConfigChunks
 */
export declare const DefaultConfig: InjectionToken<any>;
export declare function rootConfigFactory(): any;
/**
 * Root Configuration token, used to build Global Configuration, built from ConfigChunks
 */
export declare const RootConfig: InjectionToken<any>;
/**
 * Config chunk token, can be used to provide configuration chunk and contribute to the global configuration object.
 * Should not be used directly, use `provideConfig` or import `ConfigModule.withConfig` instead.
 */
export declare const ConfigChunk: InjectionToken<Config[]>;
/**
 * Config chunk token, can be used to provide configuration chunk and contribute to the default configuration.
 * Should not be used directly, use `provideDefaultConfig` or `provideDefaultConfigFactory` instead.
 *
 * General rule is, that all config provided in libraries should be provided as default config.
 */
export declare const DefaultConfigChunk: InjectionToken<Config[]>;
