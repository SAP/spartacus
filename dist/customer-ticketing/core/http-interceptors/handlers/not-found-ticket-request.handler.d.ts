import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ErrorModel, HttpErrorHandler, HttpResponseStatus, Priority, RoutingService, GlobalMessageService } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class NotFoundTicketRequestHandler extends HttpErrorHandler {
    protected globalMessageService: GlobalMessageService;
    protected routingService: RoutingService;
    protected platformId?: Object | undefined;
    responseStatus: HttpResponseStatus;
    constructor(globalMessageService: GlobalMessageService, routingService: RoutingService, platformId?: Object | undefined);
    getPriority(): Priority;
    hasMatch(errorResponse: HttpErrorResponse): boolean;
    handleError(request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected isCustomerTicketingDetailsRoute(): boolean;
    protected handleTicketNotFoundError(_request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected getErrors(response: HttpErrorResponse): ErrorModel[];
    static ɵfac: i0.ɵɵFactoryDeclaration<NotFoundTicketRequestHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotFoundTicketRequestHandler>;
}
