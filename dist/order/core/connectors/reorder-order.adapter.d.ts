import { CartModificationList } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
export declare abstract class ReorderOrderAdapter {
    /**
     * Abstract method used to reorder an order.
     *
     * @param orderId The `orderId` of an existing order to update the cart
     * @param userId The `userId` for given user
     */
    abstract reorder(orderId: string, userId: string): Observable<CartModificationList>;
}
