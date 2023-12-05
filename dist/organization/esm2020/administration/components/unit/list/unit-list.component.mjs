/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/unit-tree.service";
import * as i2 from "@spartacus/organization/administration/core";
import * as i3 from "../../shared/list/list.component";
import * as i4 from "@spartacus/core";
export class UnitListComponent {
    constructor(unitTreeService, orgUnitService) {
        this.unitTreeService = unitTreeService;
        this.orgUnitService = orgUnitService;
        this.isUpdatingUnitAllowed = this.orgUnitService
            ? this.orgUnitService.isUpdatingUnitAllowed()
            : true;
    }
    expandAll() {
        this.unitTreeService.expandAll();
    }
    collapseAll() {
        this.unitTreeService.collapseAll();
    }
}
UnitListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListComponent, deps: [{ token: i1.UnitTreeService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Component });
UnitListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitListComponent, selector: "cx-org-unit-list", ngImport: i0, template: "<cx-org-list [hideAddButton]=\"!isUpdatingUnitAllowed\">\n  <ng-container actions>\n    <button class=\"link\" (click)=\"expandAll()\">\n      {{ 'orgUnit.tree.expandAll' | cxTranslate }}\n    </button>\n    <button class=\"link\" (click)=\"collapseAll()\">\n      {{ 'orgUnit.tree.collapseAll' | cxTranslate }}\n    </button>\n  </ng-container>\n</cx-org-list>\n", dependencies: [{ kind: "component", type: i3.ListComponent, selector: "cx-org-list", inputs: ["key", "hideAddButton"] }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cx-org-list [hideAddButton]=\"!isUpdatingUnitAllowed\">\n  <ng-container actions>\n    <button class=\"link\" (click)=\"expandAll()\">\n      {{ 'orgUnit.tree.expandAll' | cxTranslate }}\n    </button>\n    <button class=\"link\" (click)=\"collapseAll()\">\n      {{ 'orgUnit.tree.collapseAll' | cxTranslate }}\n    </button>\n  </ng-container>\n</cx-org-list>\n" }]
        }], ctorParameters: function () { return [{ type: i1.UnitTreeService }, { type: i2.OrgUnitService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpc3QvdW5pdC1saXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpc3QvdW5pdC1saXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFTbkUsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUNZLGVBQWdDLEVBQ2hDLGNBQStCO1FBRC9CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFHbEMsMEJBQXFCLEdBQUcsSUFBSSxDQUFDLGNBQWM7WUFDbEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLEVBQUU7WUFDN0MsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUpOLENBQUM7SUFNSixTQUFTO1FBQ1AsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckMsQ0FBQzs7OEdBaEJVLGlCQUFpQjtrR0FBakIsaUJBQWlCLHdEQ2Y5Qiw2V0FVQTsyRkRLYSxpQkFBaUI7a0JBTDdCLFNBQVM7K0JBQ0Usa0JBQWtCLG1CQUVYLHVCQUF1QixDQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPcmdVbml0U2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgVW5pdFRyZWVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdW5pdC10cmVlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmctdW5pdC1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VuaXQtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0TGlzdENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB1bml0VHJlZVNlcnZpY2U6IFVuaXRUcmVlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgb3JnVW5pdFNlcnZpY2U/OiBPcmdVbml0U2VydmljZVxuICApIHt9XG5cbiAgcmVhZG9ubHkgaXNVcGRhdGluZ1VuaXRBbGxvd2VkID0gdGhpcy5vcmdVbml0U2VydmljZVxuICAgID8gdGhpcy5vcmdVbml0U2VydmljZS5pc1VwZGF0aW5nVW5pdEFsbG93ZWQoKVxuICAgIDogdHJ1ZTtcblxuICBleHBhbmRBbGwoKSB7XG4gICAgdGhpcy51bml0VHJlZVNlcnZpY2UuZXhwYW5kQWxsKCk7XG4gIH1cblxuICBjb2xsYXBzZUFsbCgpIHtcbiAgICB0aGlzLnVuaXRUcmVlU2VydmljZS5jb2xsYXBzZUFsbCgpO1xuICB9XG59XG4iLCI8Y3gtb3JnLWxpc3QgW2hpZGVBZGRCdXR0b25dPVwiIWlzVXBkYXRpbmdVbml0QWxsb3dlZFwiPlxuICA8bmctY29udGFpbmVyIGFjdGlvbnM+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImxpbmtcIiAoY2xpY2spPVwiZXhwYW5kQWxsKClcIj5cbiAgICAgIHt7ICdvcmdVbml0LnRyZWUuZXhwYW5kQWxsJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImxpbmtcIiAoY2xpY2spPVwiY29sbGFwc2VBbGwoKVwiPlxuICAgICAge3sgJ29yZ1VuaXQudHJlZS5jb2xsYXBzZUFsbCcgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDwvYnV0dG9uPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvY3gtb3JnLWxpc3Q+XG4iXX0=