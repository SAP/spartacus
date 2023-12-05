import * as i0 from "@angular/core";
export declare abstract class StoreFinderConfig {
    googleMaps?: {
        apiUrl?: string;
        apiKey?: string;
        scale?: number;
        selectedMarkerScale?: number;
        radius?: number;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreFinderConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StoreFinderConfig>;
}
declare module '@spartacus/core' {
    interface Config extends StoreFinderConfig {
    }
}
