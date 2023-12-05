import { ModuleWithProviders } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./store/client-auth-store.module";
/**
 * Some of the OCC endpoints require Authorization header with the client token (eg. user registration).
 * This pattern should not be used in the frontend apps, but until OCC changes this requirement
 * we provide this module to support using those endpoints.
 *
 * After OCC improvements regarding client authentication this module can be safely removed.
 */
export declare class ClientAuthModule {
    static forRoot(): ModuleWithProviders<ClientAuthModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClientAuthModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ClientAuthModule, never, [typeof i1.CommonModule, typeof i2.ClientAuthStoreModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ClientAuthModule>;
}
