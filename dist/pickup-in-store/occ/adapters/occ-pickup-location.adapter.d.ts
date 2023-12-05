import { HttpClient } from '@angular/common/http';
import { LoggerService, OccEndpointsService, PointOfService } from '@spartacus/core';
import { PickupLocationAdapter } from '@spartacus/pickup-in-store/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccPickupLocationAdapter implements PickupLocationAdapter {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService);
    getStoreDetails(storeName: string): Observable<PointOfService>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccPickupLocationAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccPickupLocationAdapter>;
}
