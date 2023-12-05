import { ConfiguratorLogoutEventListener } from './events/configurator-logout-event.listener';
import * as i0 from "@angular/core";
import * as i1 from "./state/rulebased-configurator-state.module";
import * as i2 from "./facade/routing/configurator-router.module";
/**
 * Exposes the rulebased configurator core entities.
 * Explicit providing of connector because otherwise lazy loading does not work
 */
export declare class RulebasedConfiguratorCoreModule {
    constructor(_configuratorLogoutEventListener: ConfiguratorLogoutEventListener);
    static ɵfac: i0.ɵɵFactoryDeclaration<RulebasedConfiguratorCoreModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RulebasedConfiguratorCoreModule, never, [typeof i1.RulebasedConfiguratorStateModule, typeof i2.ConfiguratorRouterModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RulebasedConfiguratorCoreModule>;
}
