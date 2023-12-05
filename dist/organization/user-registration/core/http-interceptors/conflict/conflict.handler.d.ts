import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ErrorModel, HttpErrorHandler, Priority, HttpResponseStatus } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class OrganizationUserRegistrationConflictHandler extends HttpErrorHandler {
    responseStatus: HttpResponseStatus;
    handleError(request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected getErrors(response: HttpErrorResponse): ErrorModel[];
    getPriority(): Priority;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrganizationUserRegistrationConflictHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrganizationUserRegistrationConflictHandler>;
}
