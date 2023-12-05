import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../../shared/organization.model';
import { CostCenterBudgetListService } from '../cost-center-budget-list.service';
import * as i0 from "@angular/core";
export declare class CostCenterAssignedBudgetListService extends CostCenterBudgetListService {
    protected tableType: OrganizationTableType;
    protected load(pagination: PaginationModel, code: string): Observable<EntitiesModel<Budget> | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CostCenterAssignedBudgetListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CostCenterAssignedBudgetListService>;
}
