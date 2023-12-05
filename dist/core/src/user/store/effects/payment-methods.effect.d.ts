import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
import { LoggerService } from '../../../logger';
import { UserPaymentConnector } from '../../connectors/payment/user-payment.connector';
import * as i0 from "@angular/core";
export declare class UserPaymentMethodsEffects {
    private actions$;
    private userPaymentMethodConnector;
    private globalMessageService;
    protected logger: LoggerService;
    loadUserPaymentMethods$: Observable<Action>;
    setDefaultUserPaymentMethod$: Observable<Action>;
    deleteUserPaymentMethod$: Observable<Action>;
    constructor(actions$: Actions, userPaymentMethodConnector: UserPaymentConnector, globalMessageService: GlobalMessageService);
    static ɵfac: i0.ɵɵFactoryDeclaration<UserPaymentMethodsEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserPaymentMethodsEffects>;
}
