import { RoutingService } from '@spartacus/core';
import { Budget, BudgetService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';
import * as i0 from "@angular/core";
export declare class CurrentBudgetService extends CurrentItemService<Budget> {
    protected routingService: RoutingService;
    protected budgetService: BudgetService;
    constructor(routingService: RoutingService, budgetService: BudgetService);
    protected getDetailsRoute(): string;
    protected getParamKey(): string;
    protected getItem(code: string): Observable<Budget>;
    getError(code: string): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrentBudgetService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CurrentBudgetService>;
}
