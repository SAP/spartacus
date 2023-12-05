import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LoggerService, OccEndpointsService, WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PersonalizationConfig } from '../config/personalization-config';
import * as i0 from "@angular/core";
export declare class OccPersonalizationIdInterceptor implements HttpInterceptor {
    private config;
    private occEndpoints;
    private winRef;
    private personalizationId?;
    private requestHeader?;
    private enabled;
    protected readonly PERSONALIZATION_ID_KEY = "personalization-id";
    protected logger: LoggerService;
    constructor(config: PersonalizationConfig, occEndpoints: OccEndpointsService, winRef: WindowRef);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccPersonalizationIdInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccPersonalizationIdInterceptor>;
}
