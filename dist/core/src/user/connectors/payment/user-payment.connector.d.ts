import { UserPaymentAdapter } from './user-payment.adapter';
import { Observable } from 'rxjs';
import { PaymentDetails } from '../../../model/payment.model';
import * as i0 from "@angular/core";
export declare class UserPaymentConnector {
    protected adapter: UserPaymentAdapter;
    constructor(adapter: UserPaymentAdapter);
    getAll(userId: string): Observable<PaymentDetails[]>;
    delete(userId: string, paymentMethodID: string): Observable<{}>;
    setDefault(userId: string, paymentMethodID: string): Observable<{}>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserPaymentConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserPaymentConnector>;
}
