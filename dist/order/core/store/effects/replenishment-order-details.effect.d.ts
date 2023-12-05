import { Actions } from '@ngrx/effects';
import { GlobalMessageService, LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ReplenishmentOrderHistoryConnector } from '../../connectors/replenishment-order-history.connector';
import { OrderActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class ReplenishmentOrderDetailsEffect {
    private actions$;
    private replenishmentOrderConnector;
    private globalMessageService;
    protected logger: LoggerService;
    loadReplenishmentOrderDetails$: Observable<OrderActions.ReplenishmentOrderDetailsAction>;
    cancelReplenishmentOrder$: Observable<OrderActions.ReplenishmentOrderDetailsAction>;
    constructor(actions$: Actions, replenishmentOrderConnector: ReplenishmentOrderHistoryConnector, globalMessageService: GlobalMessageService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ReplenishmentOrderDetailsEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReplenishmentOrderDetailsEffect>;
}
