import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsmAdapter } from '@spartacus/asm/core';
import { AsmConfig, BindCartParams, CustomerListsPage, CustomerRegistrationForm, CustomerSearchOptions, CustomerSearchPage } from '@spartacus/asm/root';
import { BaseSiteService, ConverterService, LoggerService, OccEndpointsService, User } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccAsmAdapter implements AsmAdapter {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    protected converterService: ConverterService;
    protected config: AsmConfig;
    protected baseSiteService: BaseSiteService;
    private activeBaseSite;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService, converterService: ConverterService, config: AsmConfig, baseSiteService: BaseSiteService);
    protected getHeaders(): HttpHeaders;
    customerLists(): Observable<CustomerListsPage>;
    customerSearch(options: CustomerSearchOptions): Observable<CustomerSearchPage>;
    bindCart({ cartId, customerId }: BindCartParams): Observable<unknown>;
    createCustomer(user: CustomerRegistrationForm): Observable<User>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccAsmAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccAsmAdapter>;
}
