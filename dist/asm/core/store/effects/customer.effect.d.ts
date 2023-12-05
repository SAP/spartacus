import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../../connectors/asm.connector';
import { AsmActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class CustomerEffects {
    private actions$;
    private asmConnector;
    protected logger: LoggerService;
    customerSearch$: Observable<AsmActions.CustomerAction>;
    customerListCustomersSearch$: Observable<AsmActions.CustomerAction>;
    constructor(actions$: Actions, asmConnector: AsmConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CustomerEffects>;
}
