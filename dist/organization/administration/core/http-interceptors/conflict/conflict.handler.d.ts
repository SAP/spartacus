import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ErrorModel, HttpErrorHandler, HttpResponseStatus, Priority } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class OrganizationConflictHandler extends HttpErrorHandler {
    responseStatus: HttpResponseStatus;
    protected budgetMask: RegExp;
    protected userMask: RegExp;
    protected userGroupMask: RegExp;
    protected unitMask: RegExp;
    hasMatch(errorResponse: HttpErrorResponse): boolean;
    handleError(request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected matchMask(response: HttpErrorResponse): boolean;
    protected handleConflict(message: string, mask: RegExp, key: string, code?: string): void;
    protected getErrors(response: HttpErrorResponse): ErrorModel[];
    getPriority(): Priority;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrganizationConflictHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrganizationConflictHandler>;
}
