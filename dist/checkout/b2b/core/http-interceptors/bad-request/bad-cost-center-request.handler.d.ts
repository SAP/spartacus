import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ErrorModel, GlobalMessageService, HttpErrorHandler, HttpResponseStatus, Priority } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class BadCostCenterRequestHandler extends HttpErrorHandler {
    protected globalMessageService: GlobalMessageService;
    responseStatus: HttpResponseStatus;
    constructor(globalMessageService: GlobalMessageService);
    getPriority(): Priority;
    hasMatch(errorResponse: HttpErrorResponse): boolean;
    handleError(_request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected getErrors(response: HttpErrorResponse): ErrorModel[];
    protected isCostCenterRequest(errorResponse: HttpErrorResponse): boolean;
    protected isEntityValidationError(error: ErrorModel): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BadCostCenterRequestHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BadCostCenterRequestHandler>;
}
