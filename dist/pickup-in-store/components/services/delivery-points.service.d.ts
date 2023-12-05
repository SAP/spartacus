import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { OrderFacade } from '@spartacus/order/root';
import { DeliveryPointOfService, PickupLocationsSearchFacade } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * A service to get the Delivery Points Of Service for items to be picked up in store for the active cart
 */
export declare class DeliveryPointsService {
    protected activeCartFacade: ActiveCartFacade;
    protected pickupLocationsSearchFacade: PickupLocationsSearchFacade;
    protected orderFacade: OrderFacade;
    constructor(activeCartFacade: ActiveCartFacade, pickupLocationsSearchFacade: PickupLocationsSearchFacade, orderFacade: OrderFacade);
    getDeliveryPointsOfServiceFromCart(): Observable<Array<DeliveryPointOfService>>;
    getDeliveryPointsOfServiceFromOrder(): Observable<Array<DeliveryPointOfService>>;
    getDeliveryPointsOfService(entries: Array<OrderEntry>): Observable<Array<DeliveryPointOfService>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DeliveryPointsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DeliveryPointsService>;
}
