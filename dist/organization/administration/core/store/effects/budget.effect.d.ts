import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { BudgetConnector } from '../../connectors/budget/budget.connector';
import { BudgetActions, OrganizationActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class BudgetEffects {
    private actions$;
    private budgetConnector;
    protected logger: LoggerService;
    loadBudget$: Observable<BudgetActions.LoadBudgetSuccess | BudgetActions.LoadBudgetFail>;
    loadBudgets$: Observable<BudgetActions.LoadBudgetsSuccess | BudgetActions.LoadBudgetSuccess | BudgetActions.LoadBudgetsFail>;
    createBudget$: Observable<BudgetActions.CreateBudgetSuccess | BudgetActions.CreateBudgetFail | OrganizationActions.OrganizationClearData>;
    updateBudget$: Observable<BudgetActions.UpdateBudgetSuccess | BudgetActions.UpdateBudgetFail | OrganizationActions.OrganizationClearData>;
    constructor(actions$: Actions, budgetConnector: BudgetConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<BudgetEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BudgetEffects>;
}
