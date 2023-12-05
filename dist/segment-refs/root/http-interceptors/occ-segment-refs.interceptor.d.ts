import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService, OccEndpointsService, WindowRef } from '@spartacus/core';
import { SegmentRefsConfig } from '../config/segment-refs-config';
import * as i0 from "@angular/core";
export declare class OccSegmentRefsInterceptor implements HttpInterceptor {
    protected config: SegmentRefsConfig;
    protected occEndpoints: OccEndpointsService;
    protected winRef: WindowRef;
    private segmentRefs?;
    private requestHeader?;
    protected readonly SEGMENT_REFS_KEY = "segment-refs";
    protected readonly SEGMENT_REFS_QUERY_PARAM = "segmentrefs";
    protected logger: LoggerService;
    constructor(config: SegmentRefsConfig, occEndpoints: OccEndpointsService, winRef: WindowRef);
    /**
     * Fetched the segment reference ID from URL query parameter and saves it into
     * browser local storage
     */
    protected initialize(): void;
    /**
     * Adds a new request header 'Segmentrefs' to the given HTTP request.
     * @param request The outgoing request object to handle.
     * @param next The next interceptor in the chain, or the backend
     * if no interceptors remain in the chain.
     * @returns An observable of the event stream.
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccSegmentRefsInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccSegmentRefsInterceptor>;
}
