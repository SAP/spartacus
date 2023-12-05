/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../shared/list/list.service';
import { BudgetCostCenterListService } from './budget-cost-center-list.service';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/sub-list/sub-list.component";
export class BudgetCostCenterListComponent {
}
BudgetCostCenterListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetCostCenterListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
BudgetCostCenterListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: BudgetCostCenterListComponent, selector: "cx-org-budget-cost-center-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: BudgetCostCenterListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list></cx-org-sub-list>\n", dependencies: [{ kind: "component", type: i1.SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetCostCenterListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-budget-cost-center-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: BudgetCostCenterListService,
                        },
                    ], template: "<cx-org-sub-list></cx-org-sub-list>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LWNvc3QtY2VudGVyLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL2J1ZGdldC9jb3N0LWNlbnRlcnMvYnVkZ2V0LWNvc3QtY2VudGVyLWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL2J1ZGdldC9jb3N0LWNlbnRlcnMvYnVkZ2V0LWNvc3QtY2VudGVyLWxpc3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7QUFjaEYsTUFBTSxPQUFPLDZCQUE2Qjs7MEhBQTdCLDZCQUE2Qjs4R0FBN0IsNkJBQTZCLHNHQVA3QjtRQUNUO1lBQ0UsT0FBTyxFQUFFLFdBQVc7WUFDcEIsV0FBVyxFQUFFLDJCQUEyQjtTQUN6QztLQUNGLDBCQ3BCSCx1Q0FDQTsyRkRxQmEsNkJBQTZCO2tCQVp6QyxTQUFTOytCQUNFLGdDQUFnQyxtQkFFekIsdUJBQXVCLENBQUMsTUFBTSxRQUN6QyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxhQUN2Qjt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsV0FBVzs0QkFDcEIsV0FBVyxFQUFFLDJCQUEyQjt5QkFDekM7cUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMaXN0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9saXN0L2xpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBCdWRnZXRDb3N0Q2VudGVyTGlzdFNlcnZpY2UgfSBmcm9tICcuL2J1ZGdldC1jb3N0LWNlbnRlci1saXN0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmctYnVkZ2V0LWNvc3QtY2VudGVyLWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vYnVkZ2V0LWNvc3QtY2VudGVyLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDogeyBjbGFzczogJ2NvbnRlbnQtd3JhcHBlcicgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTGlzdFNlcnZpY2UsXG4gICAgICB1c2VFeGlzdGluZzogQnVkZ2V0Q29zdENlbnRlckxpc3RTZXJ2aWNlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEJ1ZGdldENvc3RDZW50ZXJMaXN0Q29tcG9uZW50IHt9XG4iLCI8Y3gtb3JnLXN1Yi1saXN0PjwvY3gtb3JnLXN1Yi1saXN0PlxuIl19