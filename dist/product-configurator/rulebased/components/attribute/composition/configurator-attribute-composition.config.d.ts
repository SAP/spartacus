import * as i0 from "@angular/core";
export interface AttributeComponentAssignment {
    [componentType: string]: any;
}
export interface ConfiguratorAttributeComposition {
    assignment?: AttributeComponentAssignment;
}
export declare abstract class ConfiguratorAttributeCompositionConfig {
    productConfigurator?: ConfiguratorAttributeComposition;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeCompositionConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorAttributeCompositionConfig>;
}
