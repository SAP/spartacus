import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Country } from '../../model/address.model';
import { PaymentDetails } from '../../model/payment.model';
import { StateWithUser } from '../store/user-state';
import * as i0 from "@angular/core";
export declare class UserPaymentService {
    protected store: Store<StateWithUser>;
    protected userIdService: UserIdService;
    constructor(store: Store<StateWithUser>, userIdService: UserIdService);
    /**
     * Loads all user's payment methods.
     */
    loadPaymentMethods(): void;
    /**
     * Returns all user's payment methods
     */
    getPaymentMethods(): Observable<PaymentDetails[]>;
    /**
     * Returns a loading flag for payment methods
     */
    getPaymentMethodsLoading(): Observable<boolean>;
    getPaymentMethodsLoadedSuccess(): Observable<boolean>;
    /**
     * Sets the payment as a default one
     * @param paymentMethodId a payment method ID
     */
    setPaymentMethodAsDefault(paymentMethodId: string): void;
    /**
     * Deletes the payment method
     *
     * @param paymentMethodId a payment method ID
     */
    deletePaymentMethod(paymentMethodId: string): void;
    /**
     * Returns all billing countries
     */
    getAllBillingCountries(): Observable<Country[]>;
    /**
     * Retrieves billing countries
     */
    loadBillingCountries(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserPaymentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserPaymentService>;
}
