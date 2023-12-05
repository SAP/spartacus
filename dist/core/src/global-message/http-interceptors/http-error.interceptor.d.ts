import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnifiedInjector } from '../../lazy-loading/unified-injector';
import { HttpErrorHandler } from './handlers/http-error.handler';
import * as i0 from "@angular/core";
export declare class HttpErrorInterceptor implements HttpInterceptor {
    protected unifiedInjector: UnifiedInjector;
    constructor(unifiedInjector: UnifiedInjector);
    protected handlers$: Observable<HttpErrorHandler[]>;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    protected handleErrorResponse(request: HttpRequest<any>, response: HttpErrorResponse): void;
    /**
     * return the error handler that matches the `HttpResponseStatus` code.
     * If no handler is available, the UNKNOWN handler is returned.
     */
    protected getResponseHandler(response: HttpErrorResponse): HttpErrorHandler | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpErrorInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpErrorInterceptor>;
}
