import { EntitiesModel, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Budget } from '../../model/budget.model';
import { BudgetAdapter } from './budget.adapter';
import * as i0 from "@angular/core";
export declare class BudgetConnector {
    protected adapter: BudgetAdapter;
    constructor(adapter: BudgetAdapter);
    get(userId: string, budgetCode: string): Observable<Budget>;
    getList(userId: string, params?: SearchConfig): Observable<EntitiesModel<Budget>>;
    create(userId: string, budget: Budget): Observable<Budget>;
    update(userId: string, budgetCode: string, budget: Budget): Observable<Budget>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BudgetConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BudgetConnector>;
}
