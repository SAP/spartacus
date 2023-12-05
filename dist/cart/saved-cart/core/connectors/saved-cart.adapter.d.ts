import { Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
export declare abstract class SavedCartAdapter {
    /**
     *
     * Abstract method used to load a single saved cart
     */
    abstract load(userId: String, cartId: String): Observable<Cart>;
    /**
     *
     * Abstract method used to load a list of saved carts
     */
    abstract loadList(userId: string): Observable<Cart[]>;
    /**
     *
     * Abstract method used to restore a saved cart to an active cart
     */
    abstract restoreSavedCart(userId: string, cartId: string): Observable<Cart>;
    /**
     *
     * Abstract method used to clone a saved cart
     */
    abstract cloneSavedCart(userId: string, cartId: string, saveCartName?: string): Observable<Cart>;
}
