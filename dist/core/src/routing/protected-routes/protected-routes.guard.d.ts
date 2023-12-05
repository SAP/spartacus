import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard } from '../../auth/user-auth/guards/auth.guard';
import { ProtectedRoutesService } from './protected-routes.service';
import * as i0 from "@angular/core";
export declare class ProtectedRoutesGuard implements CanActivate {
    protected service: ProtectedRoutesService;
    protected authGuard: AuthGuard;
    constructor(service: ProtectedRoutesService, authGuard: AuthGuard);
    /**
     * When the anticipated url is protected, it switches to the AuthGuard. Otherwise emits true.
     */
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProtectedRoutesGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProtectedRoutesGuard>;
}
