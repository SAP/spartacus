import { HttpClient } from '@angular/common/http';
import { ConverterService, EntitiesModel, OccEndpointsService, SearchConfig } from '@spartacus/core';
import { Budget, BudgetAdapter } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccBudgetAdapter implements BudgetAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    load(userId: string, budgetCode: string): Observable<Budget>;
    loadList(userId: string, params?: SearchConfig): Observable<EntitiesModel<Budget>>;
    create(userId: string, budget: Budget): Observable<Budget>;
    update(userId: string, budgetCode: string, budget: Budget): Observable<Budget>;
    protected getBudgetEndpoint(userId: string, budgetCode: string): string;
    protected getBudgetsEndpoint(userId: string, params?: SearchConfig): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccBudgetAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccBudgetAdapter>;
}
