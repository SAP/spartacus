import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/index';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { AnonymousConsentsConfig } from '../config/anonymous-consents-config';
import { AnonymousConsentsService } from '../facade/anonymous-consents.service';
import * as i0 from "@angular/core";
export declare class AnonymousConsentsInterceptor implements HttpInterceptor {
    private anonymousConsentsService;
    private authService;
    private occEndpoints;
    private config;
    constructor(anonymousConsentsService: AnonymousConsentsService, authService: AuthService, occEndpoints: OccEndpointsService, config: AnonymousConsentsConfig);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private handleResponse;
    private handleRequest;
    private isOccUrl;
    private giveRequiredConsents;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnonymousConsentsInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AnonymousConsentsInterceptor>;
}
