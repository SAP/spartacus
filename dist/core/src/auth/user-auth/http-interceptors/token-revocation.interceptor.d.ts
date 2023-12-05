import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthConfigService } from '../services/auth-config.service';
import { AuthStorageService } from '../services/auth-storage.service';
import * as i0 from "@angular/core";
/**
 * This interceptor is dedicated for Hybris OAuth server which requires `Authorization` header for revoke token calls.
 */
export declare class TokenRevocationInterceptor implements HttpInterceptor {
    protected authStorageService: AuthStorageService;
    protected authConfigService: AuthConfigService;
    constructor(authStorageService: AuthStorageService, authConfigService: AuthConfigService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    protected isTokenRevocationRequest(request: HttpRequest<any>): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<TokenRevocationInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TokenRevocationInterceptor>;
}
