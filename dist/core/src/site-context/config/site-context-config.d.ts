import * as i0 from "@angular/core";
export declare abstract class SiteContextConfig {
    context?: {
        urlParameters?: string[];
        [contextName: string]: string[] | undefined;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<SiteContextConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SiteContextConfig>;
}
declare module '../../config/config-tokens' {
    interface Config extends SiteContextConfig {
    }
}
