import { CartModificationList } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
export declare abstract class CartValidationAdapter {
    abstract validate(cartId: string, userId: string): Observable<CartModificationList>;
}
