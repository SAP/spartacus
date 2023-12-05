import * as i0 from "@angular/core";
import * as i1 from "../../../cms-structure/page/page-layout/page-layout.module";
import * as i2 from "@angular/router";
/**
 * This module enables to quickly switch from Resource Owner Password Flow
 * to Implicit Flow or Authorization Code Flow. The `login` route in this case will be
 * responsible for initalizing the redirect to OAuth server to login.
 *
 * Instead of manually invoking OAuth redirect you only have to redirect to `login` page.
 */
export declare class LoginRouteModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<LoginRouteModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LoginRouteModule, never, [typeof i1.PageLayoutModule, typeof i2.RouterModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LoginRouteModule>;
}
