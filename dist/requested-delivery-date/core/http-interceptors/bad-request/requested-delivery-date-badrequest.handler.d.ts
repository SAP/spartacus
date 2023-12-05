import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ErrorModel, HttpErrorHandler, HttpResponseStatus, Priority } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class RequestedDeliveryDateBadRequestHandler extends HttpErrorHandler {
    responseStatus: HttpResponseStatus;
    hasMatch(errorResponse: HttpErrorResponse): boolean;
    handleError(request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected getErrors(response: HttpErrorResponse): ErrorModel[];
    getPriority(): Priority;
    static ɵfac: i0.ɵɵFactoryDeclaration<RequestedDeliveryDateBadRequestHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RequestedDeliveryDateBadRequestHandler>;
}
