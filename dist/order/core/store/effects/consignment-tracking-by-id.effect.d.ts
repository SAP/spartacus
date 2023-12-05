import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { OrderHistoryConnector } from '../../connectors';
import { OrderActions } from '../actions';
import * as i0 from "@angular/core";
export declare class ConsignmentTrackingByIdEffects {
    protected actions$: Actions<any>;
    protected orderConnector: OrderHistoryConnector;
    loadConsignmentTrackingById$: Observable<OrderActions.ConsignmentTrackingByIdAction>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConsignmentTrackingByIdEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConsignmentTrackingByIdEffects>;
}
