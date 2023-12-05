import * as i0 from "@angular/core";
interface CpqConfiguratorBackendConfig {
    cpq?: {
        endpoints: {
            configurationInit: string;
            configurationDisplay: string;
            attributeUpdate: string;
            valueUpdate: string;
        };
        prefix: string;
    };
}
export declare abstract class CpqConfiguratorEndpointConfig {
    backend?: CpqConfiguratorBackendConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorEndpointConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqConfiguratorEndpointConfig>;
}
declare module '@spartacus/core' {
    interface BackendConfig extends CpqConfiguratorBackendConfig {
    }
}
export {};
