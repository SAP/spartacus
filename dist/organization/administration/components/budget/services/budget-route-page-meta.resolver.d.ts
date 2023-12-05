import { DefaultRoutePageMetaResolver, TranslationService } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentBudgetService } from './current-budget.service';
import * as i0 from "@angular/core";
export declare class BudgetRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    protected currentItemService: CurrentBudgetService;
    constructor(translation: TranslationService, currentItemService: CurrentBudgetService);
    protected getParams(): Observable<Budget | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BudgetRoutePageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BudgetRoutePageMetaResolver>;
}
