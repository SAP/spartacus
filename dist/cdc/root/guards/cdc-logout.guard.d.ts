import { Router } from '@angular/router';
import { AuthService, CmsService, ProtectedRoutesService, SemanticPathService, WindowRef } from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import * as i0 from "@angular/core";
/**
 * @override
 *
 * CDC version of logout guard. In addition to token revocation we invoke logout method from CDC JS lib.
 */
export declare class CdcLogoutGuard extends LogoutGuard {
    protected auth: AuthService;
    protected cms: CmsService;
    protected semanticPathService: SemanticPathService;
    protected protectedRoutes: ProtectedRoutesService;
    protected router: Router;
    protected winRef: WindowRef;
    constructor(auth: AuthService, cms: CmsService, semanticPathService: SemanticPathService, protectedRoutes: ProtectedRoutesService, router: Router, winRef: WindowRef);
    /**
     * Logout user from CDC
     */
    protected logoutFromCdc(): void;
    /**
     * @override
     * @returns promise to resolve after complete logout
     */
    protected logout(): Promise<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcLogoutGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcLogoutGuard>;
}
