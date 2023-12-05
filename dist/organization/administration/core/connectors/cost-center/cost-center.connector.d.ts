import { CostCenter, EntitiesModel, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Budget } from '../../model/budget.model';
import { CostCenterAdapter } from './cost-center.adapter';
import * as i0 from "@angular/core";
export declare class CostCenterConnector {
    protected adapter: CostCenterAdapter;
    constructor(adapter: CostCenterAdapter);
    get(userId: string, costCenterCode: string): Observable<CostCenter>;
    getList(userId: string, params?: SearchConfig): Observable<EntitiesModel<CostCenter>>;
    create(userId: string, costCenter: CostCenter): Observable<CostCenter>;
    update(userId: string, costCenterCode: string, costCenter: CostCenter): Observable<CostCenter>;
    getBudgets(userId: string, costCenterCode: string, params?: SearchConfig): Observable<EntitiesModel<Budget>>;
    assignBudget(userId: string, costCenterCode: string, budgetCode: string): Observable<any>;
    unassignBudget(userId: string, costCenterCode: string, budgetCode: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CostCenterConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CostCenterConnector>;
}
