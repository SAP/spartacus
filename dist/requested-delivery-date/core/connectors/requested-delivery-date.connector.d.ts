import { Observable } from 'rxjs';
import { RequestedDeliveryDateAdapter } from './requested-delivery-date.adapter';
import * as i0 from "@angular/core";
export declare class RequestedDeliveryDateConnector {
    protected adapter: RequestedDeliveryDateAdapter;
    constructor(adapter: RequestedDeliveryDateAdapter);
    setRequestedDeliveryDate(userId: string, cartId: string, requestedDate: string): Observable<{}>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RequestedDeliveryDateConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RequestedDeliveryDateConnector>;
}
