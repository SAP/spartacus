import * as i0 from "@angular/core";
export declare abstract class CdcConfig {
    cdc?: {
        baseSite: string;
        javascriptUrl: string;
        sessionExpiration: number;
    }[];
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcConfig>;
}
declare module '@spartacus/core' {
    interface Config extends CdcConfig {
    }
}
