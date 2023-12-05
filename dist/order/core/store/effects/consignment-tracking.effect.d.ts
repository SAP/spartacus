import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
import { OrderActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class ConsignmentTrackingEffects {
    private actions$;
    private orderConnector;
    protected logger: LoggerService;
    loadConsignmentTracking$: Observable<OrderActions.ConsignmentTrackingAction>;
    constructor(actions$: Actions, orderConnector: OrderHistoryConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConsignmentTrackingEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConsignmentTrackingEffects>;
}
