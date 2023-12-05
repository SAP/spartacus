import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientToken } from '../models/client-token.model';
import { ClientTokenService } from './client-token.service';
import * as i0 from "@angular/core";
/**
 * Service for handling `Authorization` header and errors for requests that
 * require client token (eg. user registration).
 */
export declare class ClientErrorHandlingService {
    protected clientTokenService: ClientTokenService;
    constructor(clientTokenService: ClientTokenService);
    /**
     * Refreshes client token and retries the request with the new token.
     *
     * @param request
     * @param httpHandler
     */
    handleExpiredClientToken(request: HttpRequest<any>, next: HttpHandler): Observable<any>;
    /**
     * Clones the requests and provided `Authorization` header.
     *
     * @param request
     * @param token
     */
    protected createNewRequestWithNewToken(request: HttpRequest<any>, token: ClientToken): HttpRequest<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClientErrorHandlingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ClientErrorHandlingService>;
}
