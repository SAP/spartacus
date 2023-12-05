import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
import { OrderActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class OrderByIdEffect {
    protected actions$: Actions<any>;
    protected orderConnector: OrderHistoryConnector;
    loadOrderById$: Observable<OrderActions.LoadOrderByIdSuccess | OrderActions.LoadOrderByIdFail>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderByIdEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderByIdEffect>;
}
