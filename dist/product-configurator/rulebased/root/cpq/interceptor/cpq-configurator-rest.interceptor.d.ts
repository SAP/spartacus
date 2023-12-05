import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CpqAccessData } from './cpq-access-data.models';
import { CpqAccessStorageService } from './cpq-access-storage.service';
import * as i0 from "@angular/core";
/**
 * This header attribute shall be used to mark any request made to the CPQ System.
 * The presence of it enables this interceptor to actually intercept
 * this request and to decorate it with the authentication related attributes.
 */
export declare const MARKER_HEADER_CPQ_CONFIGURATOR = "x-cpq-configurator";
export declare class CpqConfiguratorRestInterceptor implements HttpInterceptor {
    protected cpqAccessStorageService: CpqAccessStorageService;
    protected readonly HEADER_ATTR_CPQ_SESSION_ID = "x-cpq-session-id";
    protected readonly HEADER_ATTR_CPQ_NO_COOKIES = "x-cpq-disable-cookies";
    /**
     * Although CPQ API is stateless and can work without session id, it's recommended to always append the CPQ session id to any request.
     * It enables CPQ load balancer to redirect the request always to the same node, so that configuration related data is already in memory
     * and does not need to be reloaded from DB. This can have a significant impact on performance nd reduce load in the CPQ system.
     */
    protected cpqSessionId: string | null;
    constructor(cpqAccessStorageService: CpqAccessStorageService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    protected handleError(errorResponse: any, next: HttpHandler, request: HttpRequest<any>): Observable<HttpEvent<any>>;
    protected extractCpqSessionId(response: HttpEvent<any>): void;
    protected enrichHeaders(request: HttpRequest<any>, cpqData: CpqAccessData): HttpRequest<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorRestInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqConfiguratorRestInterceptor>;
}
