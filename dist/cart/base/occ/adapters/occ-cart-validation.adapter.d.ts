import { HttpClient } from '@angular/common/http';
import { CartValidationAdapter } from '@spartacus/cart/base/core';
import { CartModificationList } from '@spartacus/cart/base/root';
import { ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccCartValidationAdapter implements CartValidationAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    validate(cartId: string, userId: string): Observable<CartModificationList>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccCartValidationAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccCartValidationAdapter>;
}
