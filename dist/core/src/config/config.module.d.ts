import { ModuleWithProviders } from '@angular/core';
import { ConfigFactory } from './config-factory';
import { Config } from './config-tokens';
import { ConfigurationService } from './services/configuration.service';
import * as i0 from "@angular/core";
export declare class ConfigModule {
    constructor(_configurationService: ConfigurationService);
    /**
     * Import ConfigModule and contribute config to the global configuration
     *
     * To provide default configuration in libraries provideDefaultConfig should be used instead.
     *
     * @param config Config object to merge with the global configuration
     */
    static withConfig(config: Config): ModuleWithProviders<ConfigModule>;
    /**
     * Import ConfigModule and contribute config to the global configuration using factory function
     *
     * To provide default configuration in libraries provideDefaultConfigFactory should be used instead.
     *
     * @param configFactory Factory function that will generate configuration
     * @param deps Optional dependencies to factory function
     */
    static withConfigFactory(configFactory: ConfigFactory, deps?: any[]): ModuleWithProviders<ConfigModule>;
    /**
     * Module with providers, should be imported only once, if possible, at the root of the app.
     *
     * @param config
     */
    static forRoot(config?: Config): ModuleWithProviders<ConfigModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ConfigModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ConfigModule>;
}
