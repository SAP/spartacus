import { HttpClient } from '@angular/common/http';
import { DeliveryMode } from '@spartacus/cart/base/root';
import { CheckoutDeliveryModesAdapter } from '@spartacus/checkout/base/core';
import { ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccCheckoutDeliveryModesAdapter implements CheckoutDeliveryModesAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    setMode(userId: string, cartId: string, deliveryModeId: string): Observable<unknown>;
    protected getSetDeliveryModeEndpoint(userId: string, cartId: string, deliveryModeId?: string): string;
    getSupportedModes(userId: string, cartId: string): Observable<DeliveryMode[]>;
    protected getDeliveryModesEndpoint(userId: string, cartId: string): string;
    clearCheckoutDeliveryMode(userId: string, cartId: string): Observable<unknown>;
    protected getClearDeliveryModeEndpoint(userId: string, cartId: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccCheckoutDeliveryModesAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccCheckoutDeliveryModesAdapter>;
}
