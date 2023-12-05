import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsmCustomer360Adapter } from '@spartacus/asm/customer-360/core';
import { AsmCustomer360Request, AsmCustomer360Response } from '@spartacus/asm/customer-360/root';
import { BaseSiteService, ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccAsmCustomer360Adapter implements AsmCustomer360Adapter {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    protected converterService: ConverterService;
    protected baseSiteService: BaseSiteService;
    private activeBaseSite;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService, converterService: ConverterService, baseSiteService: BaseSiteService);
    protected getHeaders(): HttpHeaders;
    getAsmCustomer360Data(request: AsmCustomer360Request): Observable<AsmCustomer360Response>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccAsmCustomer360Adapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccAsmCustomer360Adapter>;
}
