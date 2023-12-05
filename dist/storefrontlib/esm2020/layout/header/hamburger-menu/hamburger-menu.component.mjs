/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./hamburger-menu.service";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/core";
export class HamburgerMenuComponent {
    constructor(hamburgerMenuService) {
        this.hamburgerMenuService = hamburgerMenuService;
    }
    toggle() {
        this.hamburgerMenuService.toggle();
    }
    get isExpanded() {
        return this.hamburgerMenuService.isExpanded;
    }
}
HamburgerMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: HamburgerMenuComponent, deps: [{ token: i1.HamburgerMenuService }], target: i0.ɵɵFactoryTarget.Component });
HamburgerMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: HamburgerMenuComponent, selector: "cx-hamburger-menu", ngImport: i0, template: "<button\n  class=\"cx-hamburger\"\n  type=\"button\"\n  (click)=\"toggle()\"\n  [class.is-active]=\"isExpanded | async\"\n  [attr.aria-expanded]=\"isExpanded | async\"\n  [attr.aria-label]=\"'common.menu' | cxTranslate\"\n  aria-controls=\"cx-header\"\n>\n  <span class=\"hamburger-box\">\n    <span class=\"hamburger-inner\"></span>\n  </span>\n</button>\n", dependencies: [{ kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: HamburgerMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-hamburger-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  class=\"cx-hamburger\"\n  type=\"button\"\n  (click)=\"toggle()\"\n  [class.is-active]=\"isExpanded | async\"\n  [attr.aria-expanded]=\"isExpanded | async\"\n  [attr.aria-label]=\"'common.menu' | cxTranslate\"\n  aria-controls=\"cx-header\"\n>\n  <span class=\"hamburger-box\">\n    <span class=\"hamburger-inner\"></span>\n  </span>\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.HamburgerMenuService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtYnVyZ2VyLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9sYXlvdXQvaGVhZGVyL2hhbWJ1cmdlci1tZW51L2hhbWJ1cmdlci1tZW51LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L2hlYWRlci9oYW1idXJnZXItbWVudS9oYW1idXJnZXItbWVudS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFTbkUsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxZQUFvQixvQkFBMEM7UUFBMUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtJQUFHLENBQUM7SUFFbEUsTUFBTTtRQUNKLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDO0lBQzlDLENBQUM7O21IQVRVLHNCQUFzQjt1R0FBdEIsc0JBQXNCLHlEQ2ZuQyx1V0FhQTsyRkRFYSxzQkFBc0I7a0JBTGxDLFNBQVM7K0JBQ0UsbUJBQW1CLG1CQUVaLHVCQUF1QixDQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIYW1idXJnZXJNZW51U2VydmljZSB9IGZyb20gJy4vaGFtYnVyZ2VyLW1lbnUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWhhbWJ1cmdlci1tZW51JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2hhbWJ1cmdlci1tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEhhbWJ1cmdlck1lbnVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGhhbWJ1cmdlck1lbnVTZXJ2aWNlOiBIYW1idXJnZXJNZW51U2VydmljZSkge31cblxuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5oYW1idXJnZXJNZW51U2VydmljZS50b2dnbGUoKTtcbiAgfVxuXG4gIGdldCBpc0V4cGFuZGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmhhbWJ1cmdlck1lbnVTZXJ2aWNlLmlzRXhwYW5kZWQ7XG4gIH1cbn1cbiIsIjxidXR0b25cbiAgY2xhc3M9XCJjeC1oYW1idXJnZXJcIlxuICB0eXBlPVwiYnV0dG9uXCJcbiAgKGNsaWNrKT1cInRvZ2dsZSgpXCJcbiAgW2NsYXNzLmlzLWFjdGl2ZV09XCJpc0V4cGFuZGVkIHwgYXN5bmNcIlxuICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImlzRXhwYW5kZWQgfCBhc3luY1wiXG4gIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2NvbW1vbi5tZW51JyB8IGN4VHJhbnNsYXRlXCJcbiAgYXJpYS1jb250cm9scz1cImN4LWhlYWRlclwiXG4+XG4gIDxzcGFuIGNsYXNzPVwiaGFtYnVyZ2VyLWJveFwiPlxuICAgIDxzcGFuIGNsYXNzPVwiaGFtYnVyZ2VyLWlubmVyXCI+PC9zcGFuPlxuICA8L3NwYW4+XG48L2J1dHRvbj5cbiJdfQ==