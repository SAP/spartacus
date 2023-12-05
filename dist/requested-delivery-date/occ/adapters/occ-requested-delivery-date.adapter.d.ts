import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { RequestedDeliveryDateAdapter } from '@spartacus/requested-delivery-date/core';
import * as i0 from "@angular/core";
export declare class OccRequestedDeliveryDateAdapter implements RequestedDeliveryDateAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService);
    setRequestedDeliveryDate(userId: string, cartId: string, requestedRetrievalAt: string): import("rxjs").Observable<Object>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccRequestedDeliveryDateAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccRequestedDeliveryDateAdapter>;
}
