import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SemanticPathService } from '../../../routing/configurable-routes/url-translation/semantic-path.service';
import { AuthService } from '../facade/auth.service';
import * as i0 from "@angular/core";
/**
 * Checks if there isn't any logged in user.
 * Use to protect pages dedicated only for guests (eg. login page).
 */
export declare class NotAuthGuard implements CanActivate {
    protected authService: AuthService;
    protected semanticPathService: SemanticPathService;
    protected router: Router;
    constructor(authService: AuthService, semanticPathService: SemanticPathService, router: Router);
    canActivate(): Observable<boolean | UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotAuthGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotAuthGuard>;
}
