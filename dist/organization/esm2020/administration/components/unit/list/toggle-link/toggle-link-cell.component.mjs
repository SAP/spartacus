/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CellComponent } from '../../../shared/table/cell.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "../../services/unit-tree.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/router";
import * as i5 from "@spartacus/core";
export class ToggleLinkCellComponent extends CellComponent {
    get depthLevel() {
        return this.model.depthLevel;
    }
    constructor(outlet, unitTreeService) {
        super(outlet);
        this.outlet = outlet;
        this.unitTreeService = unitTreeService;
    }
    get combinedName() {
        return this.property ? `${this.property} (${this.count})` : '';
    }
    get tabIndex() {
        return 0;
    }
    get expanded() {
        return this.model.expanded;
    }
    /**
     * Counts the number of descendants
     */
    get count() {
        return this.model.count;
    }
    toggleItem(event) {
        event.preventDefault();
        event.stopPropagation();
        this.unitTreeService.toggle(this.model);
    }
    /**
     * Indicates whether the tree item should have a toggle navigation.
     *
     * The toggle navigation is used in case the tree item has descendants,
     * and if the tree item level is not configured to be shown anyway.
     */
    get isSwitchable() {
        return this.count > 0;
    }
    // TODO: leverage these methods when available from future PR.
    get hasItem() {
        return !!this.item && Object.keys(this.item).length > 0;
    }
    get item() {
        if (!this.outlet.context) {
            return null;
        }
        const { _field, _options, _type, _i18nRoot, ...all } = this.outlet.context;
        return all;
    }
}
ToggleLinkCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ToggleLinkCellComponent, deps: [{ token: i1.OutletContextData }, { token: i2.UnitTreeService }], target: i0.ɵɵFactoryTarget.Component });
ToggleLinkCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ToggleLinkCellComponent, selector: "cx-org-toggle-link-cell", host: { properties: { "style.--cx-depth-level": "this.depthLevel" } }, usesInheritance: true, ngImport: i0, template: "<a\n  *ngIf=\"hasItem\"\n  class=\"hide-focus-border\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <button\n    *ngIf=\"isSwitchable\"\n    class=\"button tree-item-toggle\"\n    type=\"button\"\n    [attr.aria-label]=\"\n      expanded\n        ? ('orgUnit.tree.collapse' | cxTranslate)\n        : ('orgUnit.tree.expand' | cxTranslate)\n    \"\n    (click)=\"toggleItem($event)\"\n  >\n    <cx-icon [type]=\"expanded ? 'CARET_DOWN' : 'CARET_RIGHT'\"></cx-icon>\n  </button>\n  <span class=\"text\" title=\"{{ combinedName }}\">{{ combinedName }}</span>\n</a>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i5.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i5.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ToggleLinkCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-toggle-link-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  *ngIf=\"hasItem\"\n  class=\"hide-focus-border\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <button\n    *ngIf=\"isSwitchable\"\n    class=\"button tree-item-toggle\"\n    type=\"button\"\n    [attr.aria-label]=\"\n      expanded\n        ? ('orgUnit.tree.collapse' | cxTranslate)\n        : ('orgUnit.tree.expand' | cxTranslate)\n    \"\n    (click)=\"toggleItem($event)\"\n  >\n    <cx-icon [type]=\"expanded ? 'CARET_DOWN' : 'CARET_RIGHT'\"></cx-icon>\n  </button>\n  <span class=\"text\" title=\"{{ combinedName }}\">{{ combinedName }}</span>\n</a>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData }, { type: i2.UnitTreeService }]; }, propDecorators: { depthLevel: [{
                type: HostBinding,
                args: ['style.--cx-depth-level']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWxpbmstY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saXN0L3RvZ2dsZS1saW5rL3RvZ2dsZS1saW5rLWNlbGwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VuaXQvbGlzdC90b2dnbGUtbGluay90b2dnbGUtbGluay1jZWxsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU9oRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7Ozs7QUFRckUsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGFBQWE7SUFDeEQsSUFDSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRUQsWUFDWSxNQUFpRCxFQUNqRCxlQUFnQztRQUUxQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFISixXQUFNLEdBQU4sTUFBTSxDQUEyQztRQUNqRCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFHNUMsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFZO1FBQ3JCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQW1DLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCw4REFBOEQ7SUFDOUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxJQUFjLElBQUk7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDM0UsT0FBTyxHQUFjLENBQUM7SUFDeEIsQ0FBQzs7b0hBM0RVLHVCQUF1Qjt3R0FBdkIsdUJBQXVCLDZKQ3JCcEMsMm1CQXFCQTsyRkRBYSx1QkFBdUI7a0JBTG5DLFNBQVM7K0JBQ0UseUJBQXlCLG1CQUVsQix1QkFBdUIsQ0FBQyxNQUFNO3NJQUkzQyxVQUFVO3NCQURiLFdBQVc7dUJBQUMsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEIyQlVuaXQgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQjJCVW5pdFRyZWVOb2RlIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQge1xuICBPdXRsZXRDb250ZXh0RGF0YSxcbiAgVGFibGVEYXRhT3V0bGV0Q29udGV4dCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENlbGxDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdGFibGUvY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVW5pdFRyZWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdW5pdC10cmVlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmctdG9nZ2xlLWxpbmstY2VsbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi90b2dnbGUtbGluay1jZWxsLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFRvZ2dsZUxpbmtDZWxsQ29tcG9uZW50IGV4dGVuZHMgQ2VsbENvbXBvbmVudCB7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuLS1jeC1kZXB0aC1sZXZlbCcpXG4gIGdldCBkZXB0aExldmVsKCkge1xuICAgIHJldHVybiB0aGlzLm1vZGVsLmRlcHRoTGV2ZWw7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgb3V0bGV0OiBPdXRsZXRDb250ZXh0RGF0YTxUYWJsZURhdGFPdXRsZXRDb250ZXh0PixcbiAgICBwcm90ZWN0ZWQgdW5pdFRyZWVTZXJ2aWNlOiBVbml0VHJlZVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIob3V0bGV0KTtcbiAgfVxuXG4gIGdldCBjb21iaW5lZE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcGVydHkgPyBgJHt0aGlzLnByb3BlcnR5fSAoJHt0aGlzLmNvdW50fSlgIDogJyc7XG4gIH1cblxuICBnZXQgdGFiSW5kZXgoKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBnZXQgZXhwYW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWwuZXhwYW5kZWQ7XG4gIH1cblxuICAvKipcbiAgICogQ291bnRzIHRoZSBudW1iZXIgb2YgZGVzY2VuZGFudHNcbiAgICovXG4gIGdldCBjb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5jb3VudDtcbiAgfVxuXG4gIHRvZ2dsZUl0ZW0oZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnVuaXRUcmVlU2VydmljZS50b2dnbGUodGhpcy5tb2RlbCBhcyB1bmtub3duIGFzIEIyQlVuaXRUcmVlTm9kZSk7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRyZWUgaXRlbSBzaG91bGQgaGF2ZSBhIHRvZ2dsZSBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBUaGUgdG9nZ2xlIG5hdmlnYXRpb24gaXMgdXNlZCBpbiBjYXNlIHRoZSB0cmVlIGl0ZW0gaGFzIGRlc2NlbmRhbnRzLFxuICAgKiBhbmQgaWYgdGhlIHRyZWUgaXRlbSBsZXZlbCBpcyBub3QgY29uZmlndXJlZCB0byBiZSBzaG93biBhbnl3YXkuXG4gICAqL1xuICBnZXQgaXNTd2l0Y2hhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvdW50ID4gMDtcbiAgfVxuXG4gIC8vIFRPRE86IGxldmVyYWdlIHRoZXNlIG1ldGhvZHMgd2hlbiBhdmFpbGFibGUgZnJvbSBmdXR1cmUgUFIuXG4gIGdldCBoYXNJdGVtKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuaXRlbSAmJiBPYmplY3Qua2V5cyh0aGlzLml0ZW0pLmxlbmd0aCA+IDA7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IGl0ZW0oKTogQjJCVW5pdCB8IG51bGwge1xuICAgIGlmICghdGhpcy5vdXRsZXQuY29udGV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHsgX2ZpZWxkLCBfb3B0aW9ucywgX3R5cGUsIF9pMThuUm9vdCwgLi4uYWxsIH0gPSB0aGlzLm91dGxldC5jb250ZXh0O1xuICAgIHJldHVybiBhbGwgYXMgQjJCVW5pdDtcbiAgfVxufVxuIiwiPGFcbiAgKm5nSWY9XCJoYXNJdGVtXCJcbiAgY2xhc3M9XCJoaWRlLWZvY3VzLWJvcmRlclwiXG4gIFtyb3V0ZXJMaW5rXT1cInsgY3hSb3V0ZTogcm91dGUsIHBhcmFtczogcm91dGVNb2RlbCB9IHwgY3hVcmxcIlxuICBbdGFiSW5kZXhdPVwidGFiSW5kZXhcIlxuPlxuICA8YnV0dG9uXG4gICAgKm5nSWY9XCJpc1N3aXRjaGFibGVcIlxuICAgIGNsYXNzPVwiYnV0dG9uIHRyZWUtaXRlbS10b2dnbGVcIlxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICBleHBhbmRlZFxuICAgICAgICA/ICgnb3JnVW5pdC50cmVlLmNvbGxhcHNlJyB8IGN4VHJhbnNsYXRlKVxuICAgICAgICA6ICgnb3JnVW5pdC50cmVlLmV4cGFuZCcgfCBjeFRyYW5zbGF0ZSlcbiAgICBcIlxuICAgIChjbGljayk9XCJ0b2dnbGVJdGVtKCRldmVudClcIlxuICA+XG4gICAgPGN4LWljb24gW3R5cGVdPVwiZXhwYW5kZWQgPyAnQ0FSRVRfRE9XTicgOiAnQ0FSRVRfUklHSFQnXCI+PC9jeC1pY29uPlxuICA8L2J1dHRvbj5cbiAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCIgdGl0bGU9XCJ7eyBjb21iaW5lZE5hbWUgfX1cIj57eyBjb21iaW5lZE5hbWUgfX08L3NwYW4+XG48L2E+XG4iXX0=