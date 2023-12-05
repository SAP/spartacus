import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Config, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Looks for a specific key in the HttpRequest's context (OCC_ASM_TOKEN) to decide when to
 * configure a request with 'sap-commerce-cloud-user-id' header.
 */
export declare class UserIdHttpHeaderInterceptor implements HttpInterceptor {
    protected config: Config;
    protected userIdService: UserIdService;
    protected userIdConstants: {
        [identifier: string]: string;
    };
    protected readonly userIdHeader = "sap-commerce-cloud-user-id";
    protected readonly uniqueUserIdConstants: Set<string>;
    constructor(config: Config, userIdService: UserIdService, userIdConstants: {
        [identifier: string]: string;
    });
    intercept(httpRequest: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserIdHttpHeaderInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserIdHttpHeaderInterceptor>;
}
