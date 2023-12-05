import * as i0 from "@angular/core";
import * as i1 from "./cpq-configurator-interactive.module";
import * as i2 from "./cpq-configurator-overview.module";
import * as i3 from "./interceptor/cpq-configurator-interceptor.module";
/**
 * Exposes the CPQ aspects that we need to load eagerly, like page mappings, routing
 * and interceptor related entities
 */
export declare class CpqConfiguratorRootModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorRootModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CpqConfiguratorRootModule, never, [typeof i1.CpqConfiguratorInteractiveModule, typeof i2.CpqConfiguratorOverviewModule, typeof i3.CpqConfiguratorInterceptorModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CpqConfiguratorRootModule>;
}
