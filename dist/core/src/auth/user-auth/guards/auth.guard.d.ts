import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SemanticPathService } from '../../../routing/configurable-routes/url-translation/semantic-path.service';
import { AuthService } from '../facade/auth.service';
import { AuthRedirectService } from '../services/auth-redirect.service';
import * as i0 from "@angular/core";
/**
 * Checks if there is currently logged in user.
 * Use to protect pages dedicated only for logged in users.
 */
export declare class AuthGuard implements CanActivate {
    protected authService: AuthService;
    protected authRedirectService: AuthRedirectService;
    protected router: Router;
    protected semanticPathService: SemanticPathService;
    constructor(authService: AuthService, authRedirectService: AuthRedirectService, router: Router, semanticPathService: SemanticPathService);
    canActivate(): Observable<boolean | UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthGuard>;
}
