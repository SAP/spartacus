import { HttpClient } from '@angular/common/http';
import { Cart } from '@spartacus/cart/base/root';
import { SavedCartAdapter } from '@spartacus/cart/saved-cart/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccSavedCartAdapter implements SavedCartAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    load(userId: string, cartId: string): Observable<Cart>;
    loadList(userId: string): Observable<Cart[]>;
    restoreSavedCart(userId: string, cartId: string): Observable<Cart>;
    cloneSavedCart(userId: string, cartId: string, saveCartName: string): Observable<Cart>;
    protected getSavedCartEndpoint(userId: string, cartId: string): string;
    protected getSavedCartListEndpoint(userId: string): string;
    protected getRestoreSavedCartEndpoint(userId: string, cartId: string): string;
    protected getCloneSavedCartEndpoint(userId: string, cartId: string, saveCartName: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccSavedCartAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccSavedCartAdapter>;
}
