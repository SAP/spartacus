import { RoutingService } from '@spartacus/core';
import { Budget, BudgetService, OrganizationItemStatus } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { BudgetFormService } from '../form/budget-form.service';
import { CurrentBudgetService } from './current-budget.service';
import * as i0 from "@angular/core";
export declare class BudgetItemService extends ItemService<Budget> {
    protected currentItemService: CurrentBudgetService;
    protected routingService: RoutingService;
    protected formService: BudgetFormService;
    protected budgetService: BudgetService;
    constructor(currentItemService: CurrentBudgetService, routingService: RoutingService, formService: BudgetFormService, budgetService: BudgetService);
    /**
     * @override
     * Returns the budget for the given code.
     *
     * Loads the budget each time, to ensure accurate data is resolved.
     */
    load(code: string): Observable<Budget>;
    update(code: string, value: Budget): Observable<OrganizationItemStatus<Budget>>;
    protected create(value: Budget): Observable<OrganizationItemStatus<Budget>>;
    /**
     * @override
     * Returns 'budgetDetails'
     */
    protected getDetailsRoute(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BudgetItemService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BudgetItemService>;
}
