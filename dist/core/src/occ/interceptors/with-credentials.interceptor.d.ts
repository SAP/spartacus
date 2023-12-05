import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OccConfig } from '../config/occ-config';
import * as i0 from "@angular/core";
/**
 * Http interceptor to add cookies to all cross-site requests.
 */
export declare class WithCredentialsInterceptor implements HttpInterceptor {
    protected config: OccConfig;
    constructor(config: OccConfig);
    /**
     * Intercepts each request and adds the `withCredential` flag to it
     * if it hasn't been added already.
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    /**
     * indicates whether the request should use the WithCredentials flag.
     */
    protected requiresWithCredentials(request: HttpRequest<any>): boolean;
    private get occConfig();
    static ɵfac: i0.ɵɵFactoryDeclaration<WithCredentialsInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WithCredentialsInterceptor>;
}
