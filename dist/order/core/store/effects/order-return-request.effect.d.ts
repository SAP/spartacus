import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
import { OrderActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class OrderReturnRequestEffect {
    private actions$;
    private orderConnector;
    protected logger: LoggerService;
    createReturnRequest$: Observable<OrderActions.OrderReturnRequestAction>;
    loadReturnRequest$: Observable<OrderActions.OrderReturnRequestAction>;
    cancelReturnRequest$: Observable<OrderActions.OrderReturnRequestAction>;
    loadReturnRequestList$: Observable<OrderActions.OrderReturnRequestAction>;
    constructor(actions$: Actions, orderConnector: OrderHistoryConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderReturnRequestEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderReturnRequestEffect>;
}
