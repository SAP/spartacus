import { HttpClient } from '@angular/common/http';
import { CheckoutDeliveryAddressAdapter } from '@spartacus/checkout/base/core';
import { Address, ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccCheckoutDeliveryAddressAdapter implements CheckoutDeliveryAddressAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    createAddress(userId: string, cartId: string, address: Address): Observable<Address>;
    protected getCreateDeliveryAddressEndpoint(userId: string, cartId: string): string;
    setAddress(userId: string, cartId: string, addressId: string): Observable<unknown>;
    protected getSetDeliveryAddressEndpoint(userId: string, cartId: string, addressId?: string): string;
    clearCheckoutDeliveryAddress(userId: string, cartId: string): Observable<unknown>;
    protected getRemoveDeliveryAddressEndpoint(userId: string, cartId: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccCheckoutDeliveryAddressAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccCheckoutDeliveryAddressAdapter>;
}
