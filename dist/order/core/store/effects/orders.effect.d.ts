import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderHistoryConnector, ReplenishmentOrderHistoryConnector } from '../../connectors/index';
import { OrderActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class OrdersEffect {
    private actions$;
    private orderConnector;
    private replenishmentOrderConnector;
    protected logger: LoggerService;
    constructor(actions$: Actions, orderConnector: OrderHistoryConnector, replenishmentOrderConnector: ReplenishmentOrderHistoryConnector);
    loadUserOrders$: Observable<OrderActions.UserOrdersAction>;
    resetUserOrders$: Observable<OrderActions.ClearUserOrders>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrdersEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrdersEffect>;
}
