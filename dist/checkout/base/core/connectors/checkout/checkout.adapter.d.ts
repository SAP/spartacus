import { CheckoutState } from '@spartacus/checkout/base/root';
import { Observable } from 'rxjs';
export declare abstract class CheckoutAdapter {
    /**
     * Abstract method used to get checkout details
     *
     * @param userId
     * @param cartId
     */
    abstract getCheckoutDetails(userId: string, cartId: string): Observable<CheckoutState>;
}
