import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ErrorModel } from '../../../../model/misc.model';
import { Priority } from '../../../../util/applicable';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';
import * as i0 from "@angular/core";
export declare class BadRequestHandler extends HttpErrorHandler {
    responseStatus: HttpResponseStatus;
    handleError(request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected handleBadPassword(request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected handleBadLoginResponse(_request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected handleValidationError(_request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected handleGuestDuplicateEmail(_request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected handleUnknownIdentifierError(_request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected getErrors(response: HttpErrorResponse): ErrorModel[];
    getPriority(): Priority;
    static ɵfac: i0.ɵɵFactoryDeclaration<BadRequestHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BadRequestHandler>;
}
