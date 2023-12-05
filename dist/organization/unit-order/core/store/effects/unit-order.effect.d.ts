import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { UnitOrderConnector } from '../../connectors/unit-order.connector';
import { UnitOrderActions } from '../actions';
import * as i0 from "@angular/core";
export declare class UnitOrderEffect {
    private actions$;
    private orderConnector;
    protected logger: LoggerService;
    constructor(actions$: Actions, orderConnector: UnitOrderConnector);
    loadUnitOrders$: Observable<UnitOrderActions.UnitOrdersAction>;
    resetUserOrders$: Observable<UnitOrderActions.ClearUnitOrders>;
    loadOrderDetails$: Observable<UnitOrderActions.UnitOrdersAction>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitOrderEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitOrderEffect>;
}
