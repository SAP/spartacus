import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthConfigService } from '../services/auth-config.service';
import { AuthHttpHeaderService } from '../services/auth-http-header.service';
import * as i0 from "@angular/core";
/**
 * Responsible for catching auth errors and providing `Authorization` header for API calls.
 * Uses AuthHttpHeaderService for request manipulation and error handling. Interceptor only hooks into request send/received events.
 */
export declare class AuthInterceptor implements HttpInterceptor {
    protected authHttpHeaderService: AuthHttpHeaderService;
    protected authConfigService: AuthConfigService;
    constructor(authHttpHeaderService: AuthHttpHeaderService, authConfigService: AuthConfigService);
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    protected errorIsInvalidToken(errResponse: HttpErrorResponse): boolean;
    protected errorIsInvalidGrant(errResponse: HttpErrorResponse): boolean;
    protected isExpiredToken(resp: HttpErrorResponse): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthInterceptor>;
}
