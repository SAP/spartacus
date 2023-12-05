/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../shared/list/list.service';
import { CostCenterBudgetListService } from './cost-center-budget-list.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../shared/sub-list/sub-list.component";
import * as i3 from "@spartacus/core";
export class CostCenterBudgetListComponent {
}
CostCenterBudgetListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CostCenterBudgetListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CostCenterBudgetListComponent, selector: "cx-org-cost-center-budget-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: CostCenterBudgetListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list [previous]=\"false\">\n  <a actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i2.SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-cost-center-budget-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: CostCenterBudgetListService,
                        },
                    ], template: "<cx-org-sub-list [previous]=\"false\">\n  <a actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zdC1jZW50ZXItYnVkZ2V0LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL2Nvc3QtY2VudGVyL2J1ZGdldHMvY29zdC1jZW50ZXItYnVkZ2V0LWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL2Nvc3QtY2VudGVyL2J1ZGdldHMvY29zdC1jZW50ZXItYnVkZ2V0LWxpc3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7OztBQWNoRixNQUFNLE9BQU8sNkJBQTZCOzswSEFBN0IsNkJBQTZCOzhHQUE3Qiw2QkFBNkIsc0dBUDdCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsV0FBVztZQUNwQixXQUFXLEVBQUUsMkJBQTJCO1NBQ3pDO0tBQ0YsMEJDcEJILG9LQUtBOzJGRGlCYSw2QkFBNkI7a0JBWnpDLFNBQVM7K0JBQ0UsZ0NBQWdDLG1CQUV6Qix1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLGFBQ3ZCO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxXQUFXOzRCQUNwQixXQUFXLEVBQUUsMkJBQTJCO3lCQUN6QztxQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2xpc3QvbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IENvc3RDZW50ZXJCdWRnZXRMaXN0U2VydmljZSB9IGZyb20gJy4vY29zdC1jZW50ZXItYnVkZ2V0LWxpc3Quc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZy1jb3N0LWNlbnRlci1idWRnZXQtbGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb3N0LWNlbnRlci1idWRnZXQtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7IGNsYXNzOiAnY29udGVudC13cmFwcGVyJyB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBMaXN0U2VydmljZSxcbiAgICAgIHVzZUV4aXN0aW5nOiBDb3N0Q2VudGVyQnVkZ2V0TGlzdFNlcnZpY2UsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29zdENlbnRlckJ1ZGdldExpc3RDb21wb25lbnQge31cbiIsIjxjeC1vcmctc3ViLWxpc3QgW3ByZXZpb3VzXT1cImZhbHNlXCI+XG4gIDxhIGFjdGlvbnMgY2xhc3M9XCJsaW5rXCIgcm91dGVyTGluaz1cIi4uL1wiPlxuICAgIHt7ICdvcmdhbml6YXRpb24uZG9uZScgfCBjeFRyYW5zbGF0ZSB9fVxuICA8L2E+XG48L2N4LW9yZy1zdWItbGlzdD5cbiJdfQ==