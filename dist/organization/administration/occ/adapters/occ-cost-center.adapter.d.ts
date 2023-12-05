import { HttpClient } from '@angular/common/http';
import { ConverterService, CostCenter, EntitiesModel, OccEndpointsService, SearchConfig } from '@spartacus/core';
import { Budget, CostCenterAdapter } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccCostCenterAdapter implements CostCenterAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    load(userId: string, costCenterCode: string): Observable<CostCenter>;
    loadList(userId: string, params?: SearchConfig): Observable<EntitiesModel<CostCenter>>;
    create(userId: string, costCenter: CostCenter): Observable<CostCenter>;
    update(userId: string, costCenterCode: string, costCenter: CostCenter): Observable<CostCenter>;
    loadBudgets(userId: string, costCenterCode: string, params?: SearchConfig): Observable<EntitiesModel<Budget>>;
    assignBudget(userId: string, costCenterCode: string, budgetCode: string): Observable<any>;
    unassignBudget(userId: string, costCenterCode: string, budgetCode: string): Observable<any>;
    protected getCostCenterEndpoint(userId: string, costCenterCode: string): string;
    protected getCostCentersEndpoint(userId: string, params?: SearchConfig): string;
    protected getAllCostCentersEndpoint(userId: string, params?: SearchConfig): string;
    protected getBudgetsEndpoint(userId: string, costCenterCode: string, params?: SearchConfig | {
        budgetCode: string;
    }): string;
    protected getBudgetEndpoint(userId: string, costCenterCode: string, budgetCode: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccCostCenterAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccCostCenterAdapter>;
}
