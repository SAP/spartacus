/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/asm/core";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/core";
export class AsmToggleUiComponent {
    constructor(asmService) {
        this.asmService = asmService;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.asmService.getAsmUiState().subscribe((uiState) => {
            this.isCollapsed =
                uiState.collapsed === undefined ? false : uiState.collapsed;
        }));
    }
    toggleUi() {
        this.asmService.updateAsmUiState({ collapsed: !this.isCollapsed });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmToggleUiComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmToggleUiComponent, deps: [{ token: i1.AsmService }], target: i0.ɵɵFactoryTarget.Component });
AsmToggleUiComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmToggleUiComponent, selector: "cx-asm-toggle-ui", ngImport: i0, template: "<a class=\"toggleUi\" (click)=\"toggleUi()\" tabindex=\"0\" role=\"button\">\n  <span [ngClass]=\"!isCollapsed ? 'collapseIcon' : 'expandIcon'\"></span>\n  <span *ngIf=\"!isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.collapse' | cxTranslate }}\n  </span>\n  <span *ngIf=\"isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.expand' | cxTranslate }}\n  </span>\n</a>\n", dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmToggleUiComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-toggle-ui', template: "<a class=\"toggleUi\" (click)=\"toggleUi()\" tabindex=\"0\" role=\"button\">\n  <span [ngClass]=\"!isCollapsed ? 'collapseIcon' : 'expandIcon'\"></span>\n  <span *ngIf=\"!isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.collapse' | cxTranslate }}\n  </span>\n  <span *ngIf=\"isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.expand' | cxTranslate }}\n  </span>\n</a>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AsmService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLXRvZ2dsZS11aS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2NvbXBvbmVudHMvYXNtLXRvZ2dsZS11aS9hc20tdG9nZ2xlLXVpLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9hc20tdG9nZ2xlLXVpL2FzbS10b2dnbGUtdWkuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBTXBDLE1BQU0sT0FBTyxvQkFBb0I7SUFJL0IsWUFBc0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUhsQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFHRyxDQUFDO0lBRWhELFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFjLEVBQUUsRUFBRTtZQUMzRCxJQUFJLENBQUMsV0FBVztnQkFDZCxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7aUhBckJVLG9CQUFvQjtxR0FBcEIsb0JBQW9CLHdEQ2ZqQyx5WEFTQTsyRkRNYSxvQkFBb0I7a0JBSmhDLFNBQVM7K0JBQ0Usa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXNtU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvYXNtL2NvcmUnO1xuaW1wb3J0IHsgQXNtVWkgfSBmcm9tICdAc3BhcnRhY3VzL2FzbS9yb290JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1hc20tdG9nZ2xlLXVpJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FzbS10b2dnbGUtdWkuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBBc21Ub2dnbGVVaUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgaXNDb2xsYXBzZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFzbVNlcnZpY2U6IEFzbVNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5hc21TZXJ2aWNlLmdldEFzbVVpU3RhdGUoKS5zdWJzY3JpYmUoKHVpU3RhdGU6IEFzbVVpKSA9PiB7XG4gICAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPVxuICAgICAgICAgIHVpU3RhdGUuY29sbGFwc2VkID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IHVpU3RhdGUuY29sbGFwc2VkO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgdG9nZ2xlVWkoKTogdm9pZCB7XG4gICAgdGhpcy5hc21TZXJ2aWNlLnVwZGF0ZUFzbVVpU3RhdGUoeyBjb2xsYXBzZWQ6ICF0aGlzLmlzQ29sbGFwc2VkIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPGEgY2xhc3M9XCJ0b2dnbGVVaVwiIChjbGljayk9XCJ0b2dnbGVVaSgpXCIgdGFiaW5kZXg9XCIwXCIgcm9sZT1cImJ1dHRvblwiPlxuICA8c3BhbiBbbmdDbGFzc109XCIhaXNDb2xsYXBzZWQgPyAnY29sbGFwc2VJY29uJyA6ICdleHBhbmRJY29uJ1wiPjwvc3Bhbj5cbiAgPHNwYW4gKm5nSWY9XCIhaXNDb2xsYXBzZWRcIiBjbGFzcz1cImxhYmVsXCI+XG4gICAge3sgJ2FzbS50b2dnbGVVaS5jb2xsYXBzZScgfCBjeFRyYW5zbGF0ZSB9fVxuICA8L3NwYW4+XG4gIDxzcGFuICpuZ0lmPVwiaXNDb2xsYXBzZWRcIiBjbGFzcz1cImxhYmVsXCI+XG4gICAge3sgJ2FzbS50b2dnbGVVaS5leHBhbmQnIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9zcGFuPlxuPC9hPlxuIl19