import { Store } from '@ngrx/store';
import { CostCenter, EntitiesModel, SearchConfig, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Budget } from '../model/budget.model';
import { OrganizationItemStatus } from '../model/organization-item-status';
import { StateWithOrganization } from '../store/index';
import * as i0 from "@angular/core";
export declare class BudgetService {
    protected store: Store<StateWithOrganization>;
    protected userIdService: UserIdService;
    constructor(store: Store<StateWithOrganization>, userIdService: UserIdService);
    loadBudget(budgetCode: string): void;
    loadBudgets(params: SearchConfig): void;
    private getBudgetState;
    private getBudgetValue;
    private getBudgetList;
    get(budgetCode: string): Observable<Budget>;
    getList(params: SearchConfig): Observable<EntitiesModel<Budget> | undefined>;
    getCostCenters(budgetCode: string): Observable<EntitiesModel<CostCenter>>;
    getErrorState(budgetCode: string): Observable<boolean>;
    create(budget: Budget): void;
    update(budgetCode: string, budget: Budget): void;
    getLoadingStatus(budgetCode: string): Observable<OrganizationItemStatus<Budget>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BudgetService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BudgetService>;
}
