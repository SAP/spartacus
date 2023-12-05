import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger';
import { OccConfig } from '../../occ/config/occ-config';
import { WindowRef } from '../../window/window-ref';
import * as i0 from "@angular/core";
/**
 * It throws an error when a request takes longer than the specified time.
 */
export declare class HttpTimeoutInterceptor implements HttpInterceptor {
    protected windowRef: WindowRef;
    protected config: OccConfig;
    protected logger: LoggerService;
    constructor(windowRef: WindowRef, config: OccConfig);
    /**
     * It throws an error when a request takes longer than the specified time.
     *
     * It starts counting time for timeout only after the request is sent.
     */
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>;
    /**
     * Returns the configured timeout value for the given request.
     *
     * The timeout can be configured specifically for a certain request
     * via HttpContextToken `HTTP_TIMEOUT_CONFIG`. When it's not available,
     * the value is taken from the global config `config.backend.timeout`.
     *
     * Depending on the platform (browser or server), the configured timeout value can be different.
     */
    protected getTimeoutValue(request: HttpRequest<unknown>): number | undefined;
    /**
     * It converts an RxJs `TimeoutError` (caused by the `timeout()` operator),
     * to a manually crafted `HttpErrorResponse` object.
     *
     * If the error is not an RxJs `TimeoutError`, it just returns the original error.
     */
    protected convertTimeoutToHttpErrorResponse({ error, request, timeoutValue, }: {
        error: unknown;
        request: HttpRequest<unknown>;
        timeoutValue: number;
    }): unknown | HttpErrorResponse;
    protected buildError(request: HttpRequest<unknown>, timeoutValue: number): Error;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpTimeoutInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpTimeoutInterceptor>;
}
