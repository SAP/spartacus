import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { OrderReturnRequestFacade, ReturnRequest } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ReturnRequestService {
    protected routingService: RoutingService;
    protected returnRequestService: OrderReturnRequestFacade;
    protected globalMessageService: GlobalMessageService;
    constructor(routingService: RoutingService, returnRequestService: OrderReturnRequestFacade, globalMessageService: GlobalMessageService);
    get isCancelling$(): Observable<boolean>;
    get isCancelSuccess$(): Observable<boolean>;
    getReturnRequest(): Observable<ReturnRequest>;
    clearReturnRequest(): void;
    cancelReturnRequest(returnRequestCode: string): void;
    cancelSuccess(rma: string): void;
    backToList(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReturnRequestService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReturnRequestService>;
}
