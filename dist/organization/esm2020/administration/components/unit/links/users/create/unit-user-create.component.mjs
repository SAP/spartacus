/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserItemService } from '../../../../user/services/user-item.service';
import { UnitUserItemService } from './unit-user-item.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/current-unit.service";
import * as i2 from "../../../../user/form/user-form.component";
import * as i3 from "@angular/common";
export class UnitUserCreateComponent {
    constructor(unitService) {
        this.unitService = unitService;
        this.unitKey$ = this.unitService.key$;
    }
}
UnitUserCreateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserCreateComponent, deps: [{ token: i1.CurrentUnitService }], target: i0.ɵɵFactoryTarget.Component });
UnitUserCreateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitUserCreateComponent, selector: "cx-org-unit-user-create", host: { classAttribute: "content-wrapper" }, providers: [
        // we provide a specific version of the `UnitItemService` to
        // let the form component work with child units.
        {
            provide: UserItemService,
            useExisting: UnitUserItemService,
        },
    ], ngImport: i0, template: "<cx-org-user-form\n  [unitKey]=\"unitKey$ | async\"\n  i18nRoot=\"orgUnit.users\"\n></cx-org-user-form>\n", dependencies: [{ kind: "component", type: i2.UserFormComponent, selector: "cx-org-user-form", inputs: ["unitKey"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserCreateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-user-create', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        // we provide a specific version of the `UnitItemService` to
                        // let the form component work with child units.
                        {
                            provide: UserItemService,
                            useExisting: UnitUserItemService,
                        },
                    ], template: "<cx-org-user-form\n  [unitKey]=\"unitKey$ | async\"\n  i18nRoot=\"orgUnit.users\"\n></cx-org-user-form>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentUnitService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC11c2VyLWNyZWF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saW5rcy91c2Vycy9jcmVhdGUvdW5pdC11c2VyLWNyZWF0ZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saW5rcy91c2Vycy9jcmVhdGUvdW5pdC11c2VyLWNyZWF0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFOUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7O0FBZ0IvRCxNQUFNLE9BQU8sdUJBQXVCO0lBRWxDLFlBQXNCLFdBQStCO1FBQS9CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQURyRCxhQUFRLEdBQXVCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBQ0csQ0FBQzs7b0hBRjlDLHVCQUF1Qjt3R0FBdkIsdUJBQXVCLCtGQVR2QjtRQUNULDREQUE0RDtRQUM1RCxnREFBZ0Q7UUFDaEQ7WUFDRSxPQUFPLEVBQUUsZUFBZTtZQUN4QixXQUFXLEVBQUUsbUJBQW1CO1NBQ2pDO0tBQ0YsMEJDeEJILDJHQUlBOzJGRHNCYSx1QkFBdUI7a0JBZG5DLFNBQVM7K0JBQ0UseUJBQXlCLG1CQUVsQix1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLGFBQ3ZCO3dCQUNULDREQUE0RDt3QkFDNUQsZ0RBQWdEO3dCQUNoRDs0QkFDRSxPQUFPLEVBQUUsZUFBZTs0QkFDeEIsV0FBVyxFQUFFLG1CQUFtQjt5QkFDakM7cUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBVc2VySXRlbVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi91c2VyL3NlcnZpY2VzL3VzZXItaXRlbS5zZXJ2aWNlJztcbmltcG9ydCB7IEN1cnJlbnRVbml0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2N1cnJlbnQtdW5pdC5zZXJ2aWNlJztcbmltcG9ydCB7IFVuaXRVc2VySXRlbVNlcnZpY2UgfSBmcm9tICcuL3VuaXQtdXNlci1pdGVtLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmctdW5pdC11c2VyLWNyZWF0ZScsXG4gIHRlbXBsYXRlVXJsOiAnLi91bml0LXVzZXItY3JlYXRlLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHsgY2xhc3M6ICdjb250ZW50LXdyYXBwZXInIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIC8vIHdlIHByb3ZpZGUgYSBzcGVjaWZpYyB2ZXJzaW9uIG9mIHRoZSBgVW5pdEl0ZW1TZXJ2aWNlYCB0b1xuICAgIC8vIGxldCB0aGUgZm9ybSBjb21wb25lbnQgd29yayB3aXRoIGNoaWxkIHVuaXRzLlxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFVzZXJJdGVtU2VydmljZSxcbiAgICAgIHVzZUV4aXN0aW5nOiBVbml0VXNlckl0ZW1TZXJ2aWNlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRVc2VyQ3JlYXRlQ29tcG9uZW50IHtcbiAgdW5pdEtleSQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMudW5pdFNlcnZpY2Uua2V5JDtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHVuaXRTZXJ2aWNlOiBDdXJyZW50VW5pdFNlcnZpY2UpIHt9XG59XG4iLCI8Y3gtb3JnLXVzZXItZm9ybVxuICBbdW5pdEtleV09XCJ1bml0S2V5JCB8IGFzeW5jXCJcbiAgaTE4blJvb3Q9XCJvcmdVbml0LnVzZXJzXCJcbj48L2N4LW9yZy11c2VyLWZvcm0+XG4iXX0=