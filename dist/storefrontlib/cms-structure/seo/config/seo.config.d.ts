import * as i0 from "@angular/core";
export declare abstract class SeoConfig {
    seo?: SeoOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<SeoConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SeoConfig>;
}
export interface SeoOptions {
    structuredData?: StructuredData;
}
export interface StructuredData {
    disableInDevMode?: boolean;
}
declare module '@spartacus/core' {
    interface Config extends SeoConfig {
    }
}
