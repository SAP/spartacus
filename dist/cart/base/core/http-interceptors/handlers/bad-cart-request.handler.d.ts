import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ErrorModel, HttpErrorHandler, HttpResponseStatus, Priority } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class BadCartRequestHandler extends HttpErrorHandler {
    responseStatus: HttpResponseStatus;
    getPriority(): Priority;
    hasMatch(errorResponse: HttpErrorResponse): boolean;
    handleError(request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected handleCartNotFoundError(_request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected handleOtherCartErrors(_request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected getErrors(response: HttpErrorResponse): ErrorModel[];
    static ɵfac: i0.ɵɵFactoryDeclaration<BadCartRequestHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BadCartRequestHandler>;
}
