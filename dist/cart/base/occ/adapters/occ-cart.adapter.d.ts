import { HttpClient } from '@angular/common/http';
import { CartAdapter } from '@spartacus/cart/base/core';
import { Cart } from '@spartacus/cart/base/root';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccCartAdapter implements CartAdapter {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    protected converterService: ConverterService;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService, converterService: ConverterService);
    loadAll(userId: string): Observable<Cart[]>;
    load(userId: string, cartId: string): Observable<Cart | undefined>;
    create(userId: string, oldCartId?: string, toMergeCartGuid?: string): Observable<Cart>;
    delete(userId: string, cartId: string): Observable<{}>;
    save(userId: string, cartId: string, saveCartName: string, saveCartDescription: string): Observable<Cart>;
    addEmail(userId: string, cartId: string, email: string): Observable<{}>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccCartAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccCartAdapter>;
}
