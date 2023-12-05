/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
import * as i1 from "./current-budget.service";
import * as i2 from "@spartacus/core";
import * as i3 from "../form/budget-form.service";
import * as i4 from "@spartacus/organization/administration/core";
export class BudgetItemService extends ItemService {
    constructor(currentItemService, routingService, formService, budgetService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.budgetService = budgetService;
    }
    /**
     * @override
     * Returns the budget for the given code.
     *
     * Loads the budget each time, to ensure accurate data is resolved.
     */
    load(code) {
        this.budgetService.loadBudget(code);
        return this.budgetService.get(code);
    }
    update(code, value) {
        this.budgetService.update(code, value);
        return this.budgetService.getLoadingStatus(value.code ?? '');
    }
    create(value) {
        this.budgetService.create(value);
        return this.budgetService.getLoadingStatus(value.code ?? '');
    }
    /**
     * @override
     * Returns 'budgetDetails'
     */
    getDetailsRoute() {
        return 'orgBudgetDetails';
    }
}
BudgetItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetItemService, deps: [{ token: i1.CurrentBudgetService }, { token: i2.RoutingService }, { token: i3.BudgetFormService }, { token: i4.BudgetService }], target: i0.ɵɵFactoryTarget.Injectable });
BudgetItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CurrentBudgetService }, { type: i2.RoutingService }, { type: i3.BudgetFormService }, { type: i4.BudgetService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LWl0ZW0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9idWRnZXQvc2VydmljZXMvYnVkZ2V0LWl0ZW0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVEzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQU94RCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsV0FBbUI7SUFDeEQsWUFDWSxrQkFBd0MsRUFDeEMsY0FBOEIsRUFDOUIsV0FBOEIsRUFDOUIsYUFBNEI7UUFFdEMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUw3Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXNCO1FBQ3hDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFHeEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsSUFBSSxDQUFDLElBQVk7UUFDZixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxNQUFNLENBQ0osSUFBWSxFQUNaLEtBQWE7UUFFYixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVTLE1BQU0sQ0FBQyxLQUFhO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRDs7O09BR0c7SUFDTyxlQUFlO1FBQ3ZCLE9BQU8sa0JBQWtCLENBQUM7SUFDNUIsQ0FBQzs7OEdBeENVLGlCQUFpQjtrSEFBakIsaUJBQWlCLGNBRmhCLE1BQU07MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRpbmdTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEJ1ZGdldCxcbiAgQnVkZ2V0U2VydmljZSxcbiAgT3JnYW5pemF0aW9uSXRlbVN0YXR1cyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgQnVkZ2V0Rm9ybVNlcnZpY2UgfSBmcm9tICcuLi9mb3JtL2J1ZGdldC1mb3JtLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3VycmVudEJ1ZGdldFNlcnZpY2UgfSBmcm9tICcuL2N1cnJlbnQtYnVkZ2V0LnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQnVkZ2V0SXRlbVNlcnZpY2UgZXh0ZW5kcyBJdGVtU2VydmljZTxCdWRnZXQ+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRJdGVtU2VydmljZTogQ3VycmVudEJ1ZGdldFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZm9ybVNlcnZpY2U6IEJ1ZGdldEZvcm1TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBidWRnZXRTZXJ2aWNlOiBCdWRnZXRTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGN1cnJlbnRJdGVtU2VydmljZSwgcm91dGluZ1NlcnZpY2UsIGZvcm1TZXJ2aWNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICogUmV0dXJucyB0aGUgYnVkZ2V0IGZvciB0aGUgZ2l2ZW4gY29kZS5cbiAgICpcbiAgICogTG9hZHMgdGhlIGJ1ZGdldCBlYWNoIHRpbWUsIHRvIGVuc3VyZSBhY2N1cmF0ZSBkYXRhIGlzIHJlc29sdmVkLlxuICAgKi9cbiAgbG9hZChjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEJ1ZGdldD4ge1xuICAgIHRoaXMuYnVkZ2V0U2VydmljZS5sb2FkQnVkZ2V0KGNvZGUpO1xuICAgIHJldHVybiB0aGlzLmJ1ZGdldFNlcnZpY2UuZ2V0KGNvZGUpO1xuICB9XG5cbiAgdXBkYXRlKFxuICAgIGNvZGU6IHN0cmluZyxcbiAgICB2YWx1ZTogQnVkZ2V0XG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxCdWRnZXQ+PiB7XG4gICAgdGhpcy5idWRnZXRTZXJ2aWNlLnVwZGF0ZShjb2RlLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuYnVkZ2V0U2VydmljZS5nZXRMb2FkaW5nU3RhdHVzKHZhbHVlLmNvZGUgPz8gJycpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZSh2YWx1ZTogQnVkZ2V0KTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPEJ1ZGdldD4+IHtcbiAgICB0aGlzLmJ1ZGdldFNlcnZpY2UuY3JlYXRlKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5idWRnZXRTZXJ2aWNlLmdldExvYWRpbmdTdGF0dXModmFsdWUuY29kZSA/PyAnJyk7XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqIFJldHVybnMgJ2J1ZGdldERldGFpbHMnXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0RGV0YWlsc1JvdXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdvcmdCdWRnZXREZXRhaWxzJztcbiAgfVxufVxuIl19