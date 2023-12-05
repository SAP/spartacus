import { PointOfService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PickupLocationAdapter } from './pickup-location.adapter';
import * as i0 from "@angular/core";
/**
 * Connector for getting store details.
 */
export declare class PickupLocationConnector {
    protected adapter: PickupLocationAdapter;
    constructor(adapter: PickupLocationAdapter);
    /**
     * Get the store details by store name.
     * @param storeName The store name to get details for
     */
    getStoreDetails(storeName: string): Observable<PointOfService>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PickupLocationConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PickupLocationConnector>;
}
