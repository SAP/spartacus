import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import { ClientToken } from '../models/client-token.model';
import { ClientErrorHandlingService } from '../services/client-error-handling.service';
import { ClientTokenService } from '../services/client-token.service';
import * as i0 from "@angular/core";
/**
 * Interceptor for handling requests with `USE_CLIENT_TOKEN` header.
 * Provides `Authorization` header with client token and handles errors related to client auth.
 */
export declare class ClientTokenInterceptor implements HttpInterceptor {
    protected clientTokenService: ClientTokenService;
    protected clientErrorHandlingService: ClientErrorHandlingService;
    protected occEndpoints: OccEndpointsService;
    constructor(clientTokenService: ClientTokenService, clientErrorHandlingService: ClientErrorHandlingService, occEndpoints: OccEndpointsService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    protected getClientToken(isClientTokenRequest: boolean): Observable<ClientToken | undefined>;
    protected isClientTokenRequest(request: HttpRequest<any>): boolean;
    protected isExpiredToken(resp: HttpErrorResponse): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClientTokenInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ClientTokenInterceptor>;
}
