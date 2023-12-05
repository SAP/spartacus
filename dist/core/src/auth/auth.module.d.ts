import { ModuleWithProviders } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./user-auth/user-auth.module";
import * as i3 from "./client-auth/client-auth.module";
export declare class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AuthModule, never, [typeof i1.CommonModule, typeof i2.UserAuthModule, typeof i3.ClientAuthModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AuthModule>;
}
