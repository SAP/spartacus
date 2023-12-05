/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CellComponent } from '../../../../shared/table/cell.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "../../../../shared/item.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/router";
import * as i5 from "@spartacus/core";
export class LinkCellComponent extends CellComponent {
    constructor(outlet, itemService) {
        super(outlet);
        this.outlet = outlet;
        this.itemService = itemService;
        this.unitKey$ = this.itemService.key$;
    }
    get tabIndex() {
        return 0;
    }
    getRouterModel(uid) {
        return { ...this.outlet.context, uid };
    }
}
LinkCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LinkCellComponent, deps: [{ token: i1.OutletContextData }, { token: i2.ItemService }], target: i0.ɵɵFactoryTarget.Component });
LinkCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: LinkCellComponent, selector: "cx-org-link-cell", usesInheritance: true, ngImport: i0, template: `
    <ng-container *ngIf="unitKey$ | async as uid">
      <a
        *ngIf="linkable; else text"
        [routerLink]="{ cxRoute: route, params: getRouterModel(uid) } | cxUrl"
        [tabIndex]="tabIndex"
      >
        <ng-container *ngTemplateOutlet="text"></ng-container>
      </a>
    </ng-container>

    <ng-template #text>
      <span class="text" title="{{ property }}">{{ property }}</span>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i5.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LinkCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-org-link-cell',
                    template: `
    <ng-container *ngIf="unitKey$ | async as uid">
      <a
        *ngIf="linkable; else text"
        [routerLink]="{ cxRoute: route, params: getRouterModel(uid) } | cxUrl"
        [tabIndex]="tabIndex"
      >
        <ng-container *ngTemplateOutlet="text"></ng-container>
      </a>
    </ng-container>

    <ng-template #text>
      <span class="text" title="{{ property }}">{{ property }}</span>
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData }, { type: i2.ItemService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL2FkZHJlc3Nlcy9saXN0L2xpbmstY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRbkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOzs7Ozs7O0FBcUJ4RSxNQUFNLE9BQU8saUJBQWtCLFNBQVEsYUFBYTtJQUVsRCxZQUNZLE1BQWlELEVBQ2pELFdBQWlDO1FBRTNDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUhKLFdBQU0sR0FBTixNQUFNLENBQTJDO1FBQ2pELGdCQUFXLEdBQVgsV0FBVyxDQUFzQjtRQUg3QyxhQUFRLEdBQXVCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBTXJELENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxjQUFjLENBQUMsR0FBVztRQUN4QixPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUN6QyxDQUFDOzs4R0FmVSxpQkFBaUI7a0dBQWpCLGlCQUFpQiwrRUFqQmxCOzs7Ozs7Ozs7Ozs7OztHQWNUOzJGQUdVLGlCQUFpQjtrQkFuQjdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztHQWNUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEIyQlVuaXQgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgT3V0bGV0Q29udGV4dERhdGEsXG4gIFRhYmxlRGF0YU91dGxldENvbnRleHQsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2VsbENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC90YWJsZS9jZWxsLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZy1saW5rLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ1bml0S2V5JCB8IGFzeW5jIGFzIHVpZFwiPlxuICAgICAgPGFcbiAgICAgICAgKm5nSWY9XCJsaW5rYWJsZTsgZWxzZSB0ZXh0XCJcbiAgICAgICAgW3JvdXRlckxpbmtdPVwieyBjeFJvdXRlOiByb3V0ZSwgcGFyYW1zOiBnZXRSb3V0ZXJNb2RlbCh1aWQpIH0gfCBjeFVybFwiXG4gICAgICAgIFt0YWJJbmRleF09XCJ0YWJJbmRleFwiXG4gICAgICA+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZXh0XCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8L2E+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8bmctdGVtcGxhdGUgI3RleHQ+XG4gICAgICA8c3BhbiBjbGFzcz1cInRleHRcIiB0aXRsZT1cInt7IHByb3BlcnR5IH19XCI+e3sgcHJvcGVydHkgfX08L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIExpbmtDZWxsQ29tcG9uZW50IGV4dGVuZHMgQ2VsbENvbXBvbmVudCB7XG4gIHVuaXRLZXkkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLml0ZW1TZXJ2aWNlLmtleSQ7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBvdXRsZXQ6IE91dGxldENvbnRleHREYXRhPFRhYmxlRGF0YU91dGxldENvbnRleHQ+LFxuICAgIHByb3RlY3RlZCBpdGVtU2VydmljZTogSXRlbVNlcnZpY2U8QjJCVW5pdD5cbiAgKSB7XG4gICAgc3VwZXIob3V0bGV0KTtcbiAgfVxuXG4gIGdldCB0YWJJbmRleCgpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGdldFJvdXRlck1vZGVsKHVpZDogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4geyAuLi50aGlzLm91dGxldC5jb250ZXh0LCB1aWQgfTtcbiAgfVxufVxuIl19