import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GlobalMessageService, LoggerService, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
import { OrderActions } from '../actions/index';
import { StateWithOrder } from '../order-state';
import * as i0 from "@angular/core";
export declare class OrderDetailsEffect {
    private actions$;
    private orderConnector;
    private globalMessageService;
    private userIdService;
    private store;
    protected logger: LoggerService;
    loadOrderDetails$: Observable<OrderActions.OrderDetailsAction>;
    cancelOrder$: Observable<OrderActions.OrderDetailsAction>;
    resetOrderDetails$: Observable<OrderActions.LoadOrderDetailsSuccess | OrderActions.LoadOrderDetailsFail>;
    constructor(actions$: Actions, orderConnector: OrderHistoryConnector, globalMessageService: GlobalMessageService, userIdService: UserIdService, store: Store<StateWithOrder>);
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderDetailsEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderDetailsEffect>;
}
