import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare function requestedDeliveryDateFacadeFactory(): RequestedDeliveryDateFacade;
export declare abstract class RequestedDeliveryDateFacade {
    /**
     * Set the requested delivery date
     */
    abstract setRequestedDeliveryDate(userId: string, cartId: string, requestedDate: string): Observable<{}>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RequestedDeliveryDateFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RequestedDeliveryDateFacade>;
}
