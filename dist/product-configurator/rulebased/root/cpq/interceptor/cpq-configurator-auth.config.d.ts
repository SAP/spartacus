import '@spartacus/product-configurator/common';
import * as i0 from "@angular/core";
export interface ProductConfiguratorCpqAuthConfig {
    cpq?: {
        authentication: {
            /** We should stop using/sending a token shortly before expiration,
             * to avoid that it is actually expired when evaluated in the target system.
             * Time given in ms. */
            tokenExpirationBuffer: number;
            /** max time in ms to pass until a token is considered expired and re-fetched,
             * even if token expiration time is longer */
            tokenMaxValidity: number;
            /** min time to pass until a token is re-fetched, even if token expiration time is shorter */
            tokenMinValidity: number;
        };
    };
}
export declare abstract class CpqConfiguratorAuthConfig {
    productConfigurator: ProductConfiguratorCpqAuthConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorAuthConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqConfiguratorAuthConfig>;
}
declare module '@spartacus/product-configurator/common' {
    interface ProductConfiguratorConfig extends ProductConfiguratorCpqAuthConfig {
    }
}
