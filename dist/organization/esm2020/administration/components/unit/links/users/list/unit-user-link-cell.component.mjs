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
import * as i3 from "@spartacus/organization/administration/core";
import * as i4 from "@angular/common";
import * as i5 from "@angular/router";
import * as i6 from "@spartacus/core";
export class UnitUserRolesCellComponent extends CellComponent {
    constructor(outlet, itemService, b2bUserService) {
        super(outlet);
        this.outlet = outlet;
        this.itemService = itemService;
        this.b2bUserService = b2bUserService;
        this.unitKey$ = this.itemService.key$;
        this.isUpdatingUserAllowed = this.b2bUserService.isUpdatingUserAllowed();
    }
    getRouterModel(uid) {
        return { ...this.outlet.context, uid };
    }
}
UnitUserRolesCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesCellComponent, deps: [{ token: i1.OutletContextData }, { token: i2.ItemService }, { token: i3.B2BUserService }], target: i0.ɵɵFactoryTarget.Component });
UnitUserRolesCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitUserRolesCellComponent, selector: "cx-org-unit-user-link-cell", usesInheritance: true, ngImport: i0, template: `
    <a
      *ngIf="isUpdatingUserAllowed && hasItem && (unitKey$ | async) as uid"
      [routerLink]="
        { cxRoute: 'orgUnitUserRoles', params: getRouterModel(uid) } | cxUrl
      "
    >
      {{ 'orgUser.links.rolesAndRights' | cxTranslate }}
    </a>
  `, isInline: true, dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i6.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i6.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-org-unit-user-link-cell',
                    template: `
    <a
      *ngIf="isUpdatingUserAllowed && hasItem && (unitKey$ | async) as uid"
      [routerLink]="
        { cxRoute: 'orgUnitUserRoles', params: getRouterModel(uid) } | cxUrl
      "
    >
      {{ 'orgUser.links.rolesAndRights' | cxTranslate }}
    </a>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData }, { type: i2.ItemService }, { type: i3.B2BUserService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC11c2VyLWxpbmstY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saW5rcy91c2Vycy9saXN0L3VuaXQtdXNlci1saW5rLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBU25FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7Ozs7Ozs7QUFnQnhFLE1BQU0sT0FBTywwQkFBMkIsU0FBUSxhQUFhO0lBRTNELFlBQ1ksTUFBaUQsRUFDakQsV0FBaUMsRUFDakMsY0FBOEI7UUFFeEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBSkosV0FBTSxHQUFOLE1BQU0sQ0FBMkM7UUFDakQsZ0JBQVcsR0FBWCxXQUFXLENBQXNCO1FBQ2pDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUoxQyxhQUFRLEdBQXVCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBUXJELDBCQUFxQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQURwRSxDQUFDO0lBRUQsY0FBYyxDQUFDLEdBQVc7UUFDeEIsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDekMsQ0FBQzs7dUhBWlUsMEJBQTBCOzJHQUExQiwwQkFBMEIseUZBWjNCOzs7Ozs7Ozs7R0FTVDsyRkFHVSwwQkFBMEI7a0JBZHRDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCMkJVbml0IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEIyQlVzZXJTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQge1xuICBPdXRsZXRDb250ZXh0RGF0YSxcbiAgVGFibGVEYXRhT3V0bGV0Q29udGV4dCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2l0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3RhYmxlL2NlbGwuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtb3JnLXVuaXQtdXNlci1saW5rLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxhXG4gICAgICAqbmdJZj1cImlzVXBkYXRpbmdVc2VyQWxsb3dlZCAmJiBoYXNJdGVtICYmICh1bml0S2V5JCB8IGFzeW5jKSBhcyB1aWRcIlxuICAgICAgW3JvdXRlckxpbmtdPVwiXG4gICAgICAgIHsgY3hSb3V0ZTogJ29yZ1VuaXRVc2VyUm9sZXMnLCBwYXJhbXM6IGdldFJvdXRlck1vZGVsKHVpZCkgfSB8IGN4VXJsXG4gICAgICBcIlxuICAgID5cbiAgICAgIHt7ICdvcmdVc2VyLmxpbmtzLnJvbGVzQW5kUmlnaHRzJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgPC9hPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVW5pdFVzZXJSb2xlc0NlbGxDb21wb25lbnQgZXh0ZW5kcyBDZWxsQ29tcG9uZW50IHtcbiAgdW5pdEtleSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuaXRlbVNlcnZpY2Uua2V5JDtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIG91dGxldDogT3V0bGV0Q29udGV4dERhdGE8VGFibGVEYXRhT3V0bGV0Q29udGV4dD4sXG4gICAgcHJvdGVjdGVkIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZTxCMkJVbml0PixcbiAgICBwcm90ZWN0ZWQgYjJiVXNlclNlcnZpY2U6IEIyQlVzZXJTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKG91dGxldCk7XG4gIH1cbiAgaXNVcGRhdGluZ1VzZXJBbGxvd2VkID0gdGhpcy5iMmJVc2VyU2VydmljZS5pc1VwZGF0aW5nVXNlckFsbG93ZWQoKTtcbiAgZ2V0Um91dGVyTW9kZWwodWlkOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB7IC4uLnRoaXMub3V0bGV0LmNvbnRleHQsIHVpZCB9O1xuICB9XG59XG4iXX0=