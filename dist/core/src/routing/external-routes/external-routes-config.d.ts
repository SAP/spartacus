import * as i0 from "@angular/core";
interface ExternalRoutesConfigDefinition {
    internal?: string[];
}
export declare abstract class ExternalRoutesConfig {
    routing?: ExternalRoutesConfigDefinition;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExternalRoutesConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ExternalRoutesConfig>;
}
declare module '../configurable-routes/config/routing-config' {
    interface RoutingConfigDefinition extends ExternalRoutesConfigDefinition {
    }
}
export {};
