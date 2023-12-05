import * as i0 from "@angular/core";
export interface ProductConfiguratorUISettingsConfig {
    updateDebounceTime?: {
        quantity?: number;
        input?: number;
    };
    addRetractOption?: boolean;
    enableNavigationToConflict?: boolean;
}
export declare abstract class ConfiguratorUISettingsConfig {
    productConfigurator?: ProductConfiguratorUISettingsConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorUISettingsConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorUISettingsConfig>;
}
