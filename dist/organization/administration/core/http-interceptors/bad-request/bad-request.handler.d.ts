import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ErrorModel, HttpErrorHandler, HttpResponseStatus, Priority } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class OrganizationBadRequestHandler extends HttpErrorHandler {
    responseStatus: HttpResponseStatus;
    protected costCenterMask: RegExp;
    protected unitMask: RegExp;
    protected permissionMask: RegExp;
    protected unknownMask: RegExp;
    hasMatch(errorResponse: HttpErrorResponse): boolean;
    handleError(_request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected matchMask(response: HttpErrorResponse): boolean;
    protected handleOrganizationConflict(message: string, mask: RegExp, key: string): void;
    protected getErrors(response: HttpErrorResponse): ErrorModel[];
    getPriority(): Priority;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrganizationBadRequestHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrganizationBadRequestHandler>;
}
