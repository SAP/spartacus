import { Observable } from 'rxjs';
export declare abstract class RequestedDeliveryDateAdapter {
    /**
     * Abstract method used to set the requested delivery date for a cart entry
     */
    abstract setRequestedDeliveryDate(userId: string, cartId: string, requestedDate: string): Observable<{}>;
}
