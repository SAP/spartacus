import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { LoggerService } from '../../../../logger';
import { Priority } from '../../../../util/applicable';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';
import * as i0 from "@angular/core";
/**
 * Unknown Error Handler works as an fallback, to handle errors that were
 * not handled by any other error handlers
 */
export declare class UnknownErrorHandler extends HttpErrorHandler {
    responseStatus: HttpResponseStatus;
    protected logger: LoggerService;
    /**
     * hasMatch always returns true, to mach all errors
     */
    hasMatch(_errorResponse: HttpErrorResponse): boolean;
    handleError(_request: HttpRequest<any>, errorResponse: HttpErrorResponse): void;
    /**
     * Fallback priority assures that the handler is used as a last resort
     */
    getPriority(): Priority;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnknownErrorHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnknownErrorHandler>;
}
