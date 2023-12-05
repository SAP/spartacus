import { HttpClient } from '@angular/common/http';
import { CartEntryAdapter } from '@spartacus/cart/base/core';
import { CartModification } from '@spartacus/cart/base/root';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccCartEntryAdapter implements CartEntryAdapter {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    protected converterService: ConverterService;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService, converterService: ConverterService);
    add(userId: string, cartId: string, productCode: string, quantity?: number, pickupStore?: string): Observable<CartModification>;
    update(userId: string, cartId: string, entryNumber: string, qty?: number, pickupStore?: string, pickupToDelivery?: boolean): Observable<CartModification>;
    remove(userId: string, cartId: string, entryNumber: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccCartEntryAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccCartEntryAdapter>;
}
