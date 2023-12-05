import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartVoucherAdapter } from '@spartacus/cart/base/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccCartVoucherAdapter implements CartVoucherAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    protected getCartVoucherEndpoint(userId: string, cartId: string): string;
    protected getHeaders(userId: string): HttpHeaders;
    add(userId: string, cartId: string, voucherId: string): Observable<{}>;
    remove(userId: string, cartId: string, voucherId: string): Observable<{}>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccCartVoucherAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccCartVoucherAdapter>;
}
