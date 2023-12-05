/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CellComponent } from '../cell.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "@spartacus/core";
export class StatusCellComponent extends CellComponent {
    get label() {
        if (this.isActive === undefined) {
            return;
        }
        return this.isActive ? 'organization.enabled' : 'organization.disabled';
    }
    get isActive() {
        return this.model.active;
    }
}
StatusCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StatusCellComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
StatusCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StatusCellComponent, selector: "cx-org-status-cell", usesInheritance: true, ngImport: i0, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabindex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span\n    class=\"text\"\n    title=\"{{ label | cxTranslate }}\"\n    [class.is-active]=\"isActive\"\n    *ngIf=\"label\"\n  >\n    {{ label | cxTranslate }}</span\n  >\n</ng-template>\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StatusCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-status-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabindex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span\n    class=\"text\"\n    title=\"{{ label | cxTranslate }}\"\n    [class.is-active]=\"isActive\"\n    *ngIf=\"label\"\n  >\n    {{ label | cxTranslate }}</span\n  >\n</ng-template>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC90YWJsZS9zdGF0dXMvc3RhdHVzLWNlbGwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC90YWJsZS9zdGF0dXMvc3RhdHVzLWNlbGwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7OztBQU9sRCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsYUFBYTtJQUNwRCxJQUFJLEtBQUs7UUFDUCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQy9CLE9BQU87U0FDUjtRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDO0lBQzFFLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzNCLENBQUM7O2dIQVZVLG1CQUFtQjtvR0FBbkIsbUJBQW1CLGlGQ2RoQywrWkFrQkE7MkZESmEsbUJBQW1CO2tCQUwvQixTQUFTOytCQUNFLG9CQUFvQixtQkFFYix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2VsbENvbXBvbmVudCB9IGZyb20gJy4uL2NlbGwuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtb3JnLXN0YXR1cy1jZWxsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3N0YXR1cy1jZWxsLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFN0YXR1c0NlbGxDb21wb25lbnQgZXh0ZW5kcyBDZWxsQ29tcG9uZW50IHtcbiAgZ2V0IGxhYmVsKCkge1xuICAgIGlmICh0aGlzLmlzQWN0aXZlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXNBY3RpdmUgPyAnb3JnYW5pemF0aW9uLmVuYWJsZWQnIDogJ29yZ2FuaXphdGlvbi5kaXNhYmxlZCc7XG4gIH1cblxuICBnZXQgaXNBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWwuYWN0aXZlO1xuICB9XG59XG4iLCI8YVxuICAqbmdJZj1cImxpbmthYmxlOyBlbHNlIHRleHRcIlxuICBbcm91dGVyTGlua109XCJ7IGN4Um91dGU6IHJvdXRlLCBwYXJhbXM6IHJvdXRlTW9kZWwgfSB8IGN4VXJsXCJcbiAgW3RhYmluZGV4XT1cInRhYkluZGV4XCJcbj5cbiAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRleHRcIj48L25nLWNvbnRhaW5lcj5cbjwvYT5cblxuPG5nLXRlbXBsYXRlICN0ZXh0PlxuICA8c3BhblxuICAgIGNsYXNzPVwidGV4dFwiXG4gICAgdGl0bGU9XCJ7eyBsYWJlbCB8IGN4VHJhbnNsYXRlIH19XCJcbiAgICBbY2xhc3MuaXMtYWN0aXZlXT1cImlzQWN0aXZlXCJcbiAgICAqbmdJZj1cImxhYmVsXCJcbiAgPlxuICAgIHt7IGxhYmVsIHwgY3hUcmFuc2xhdGUgfX08L3NwYW5cbiAgPlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==