import { ModuleWithProviders } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./store/user-store.module";
import * as i2 from "./events/user-event.module";
export declare class UserModule {
    static forRoot(): ModuleWithProviders<UserModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<UserModule, never, [typeof i1.UserStoreModule, typeof i2.UserEventModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<UserModule>;
}
