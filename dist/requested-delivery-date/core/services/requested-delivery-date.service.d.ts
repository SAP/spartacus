import { RequestedDeliveryDateFacade } from '@spartacus/requested-delivery-date/root';
import { Observable } from 'rxjs';
import { RequestedDeliveryDateConnector } from '../connectors/requested-delivery-date.connector';
import * as i0 from "@angular/core";
export declare class RequestedDeliveryDateService implements RequestedDeliveryDateFacade {
    protected requestedDeliveryDateConnector: RequestedDeliveryDateConnector;
    /**
     * Set requested delivery date
     */
    setRequestedDeliveryDate(userId: string, cartId: string, requestedDate: string): Observable<{}>;
    constructor(requestedDeliveryDateConnector: RequestedDeliveryDateConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<RequestedDeliveryDateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RequestedDeliveryDateService>;
}
