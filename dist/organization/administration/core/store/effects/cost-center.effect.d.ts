import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CostCenterConnector } from '../../connectors/cost-center/cost-center.connector';
import { BudgetActions, CostCenterActions, OrganizationActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class CostCenterEffects {
    private actions$;
    private costCenterConnector;
    protected logger: LoggerService;
    loadCostCenter$: Observable<CostCenterActions.LoadCostCenterSuccess | CostCenterActions.LoadCostCenterFail>;
    loadCostCenters$: Observable<CostCenterActions.LoadCostCentersSuccess | CostCenterActions.LoadCostCenterSuccess | CostCenterActions.LoadCostCentersFail>;
    createCostCenter$: Observable<CostCenterActions.CreateCostCenterSuccess | CostCenterActions.CreateCostCenterFail | OrganizationActions.OrganizationClearData>;
    updateCostCenter$: Observable<CostCenterActions.UpdateCostCenterSuccess | CostCenterActions.UpdateCostCenterFail | OrganizationActions.OrganizationClearData>;
    loadAssignedBudgets$: Observable<CostCenterActions.LoadAssignedBudgetsSuccess | BudgetActions.LoadBudgetSuccess | CostCenterActions.LoadAssignedBudgetsFail>;
    assignBudgetToCostCenter$: Observable<CostCenterActions.AssignBudgetSuccess | CostCenterActions.AssignBudgetFail | OrganizationActions.OrganizationClearData>;
    unassignBudgetToCostCenter$: Observable<CostCenterActions.UnassignBudgetSuccess | CostCenterActions.UnassignBudgetFail | OrganizationActions.OrganizationClearData>;
    constructor(actions$: Actions, costCenterConnector: CostCenterConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<CostCenterEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CostCenterEffects>;
}
