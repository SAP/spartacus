/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ANONYMOUS_CONSENT_STATUS, } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class ConsentManagementFormComponent {
    constructor() {
        this.consentGiven = false;
        this.requiredConsents = [];
        this.consentChanged = new EventEmitter();
        // Intentional empty constructor
    }
    ngOnInit() {
        if (this.consent) {
            this.consentGiven = Boolean(this.consent.consentState === ANONYMOUS_CONSENT_STATUS.GIVEN);
        }
        else {
            if (this.consentTemplate && this.consentTemplate.currentConsent) {
                if (this.consentTemplate.currentConsent.consentWithdrawnDate) {
                    this.consentGiven = false;
                }
                else if (this.consentTemplate.currentConsent.consentGivenDate) {
                    this.consentGiven = true;
                }
            }
        }
    }
    onConsentChange() {
        this.consentGiven = !this.consentGiven;
        this.consentChanged.emit({
            given: this.consentGiven,
            template: this.consentTemplate,
        });
    }
    isRequired(templateId) {
        return templateId ? this.requiredConsents.includes(templateId) : false;
    }
}
ConsentManagementFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsentManagementFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ConsentManagementFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConsentManagementFormComponent, selector: "cx-consent-management-form", inputs: { consentTemplate: "consentTemplate", requiredConsents: "requiredConsents", consent: "consent" }, outputs: { consentChanged: "consentChanged" }, ngImport: i0, template: "<div class=\"form-check\">\n  <label>\n    <input\n      type=\"checkbox\"\n      class=\"form-check-input\"\n      (change)=\"onConsentChange()\"\n      [checked]=\"consentGiven\"\n      [name]=\"consentTemplate.id\"\n      [disabled]=\"isRequired(consentTemplate?.id)\"\n    />\n    <span class=\"form-check-label cx-be-bold\">\n      <ng-container *ngIf=\"consentTemplate?.name\">\n        {{ consentTemplate?.name }}\n        <br />\n      </ng-container>\n    </span>\n    <span class=\"form-check-label\">\n      {{ consentTemplate?.description }}\n    </span>\n  </label>\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsentManagementFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-consent-management-form', template: "<div class=\"form-check\">\n  <label>\n    <input\n      type=\"checkbox\"\n      class=\"form-check-input\"\n      (change)=\"onConsentChange()\"\n      [checked]=\"consentGiven\"\n      [name]=\"consentTemplate.id\"\n      [disabled]=\"isRequired(consentTemplate?.id)\"\n    />\n    <span class=\"form-check-label cx-be-bold\">\n      <ng-container *ngIf=\"consentTemplate?.name\">\n        {{ consentTemplate?.name }}\n        <br />\n      </ng-container>\n    </span>\n    <span class=\"form-check-label\">\n      {{ consentTemplate?.description }}\n    </span>\n  </label>\n</div>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { consentTemplate: [{
                type: Input
            }], requiredConsents: [{
                type: Input
            }], consent: [{
                type: Input
            }], consentChanged: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc2VudC1tYW5hZ2VtZW50LWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9teWFjY291bnQvY29uc2VudC1tYW5hZ2VtZW50L2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtbWFuYWdlbWVudC1mb3JtLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbXlhY2NvdW50L2NvbnNlbnQtbWFuYWdlbWVudC9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LW1hbmFnZW1lbnQtZm9ybS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBRUwsd0JBQXdCLEdBRXpCLE1BQU0saUJBQWlCLENBQUM7OztBQU16QixNQUFNLE9BQU8sOEJBQThCO0lBa0J6QztRQWpCQSxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQU1yQixxQkFBZ0IsR0FBYSxFQUFFLENBQUM7UUFNaEMsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFHN0IsQ0FBQztRQUdILGdDQUFnQztJQUNsQyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssd0JBQXdCLENBQUMsS0FBSyxDQUM3RCxDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRTtnQkFDL0QsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRTtvQkFDNUQsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7aUJBQzNCO3FCQUFNLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUU7b0JBQy9ELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2lCQUMxQjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBRXZDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWTtZQUN4QixRQUFRLEVBQUUsSUFBSSxDQUFDLGVBQWU7U0FDL0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxVQUE4QjtRQUN2QyxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3pFLENBQUM7OzJIQWpEVSw4QkFBOEI7K0dBQTlCLDhCQUE4QiwyTkNqQjNDLDhrQkFxQkE7MkZESmEsOEJBQThCO2tCQUoxQyxTQUFTOytCQUNFLDRCQUE0QjswRUFPdEMsZUFBZTtzQkFEZCxLQUFLO2dCQUlOLGdCQUFnQjtzQkFEZixLQUFLO2dCQUlOLE9BQU87c0JBRE4sS0FBSztnQkFJTixjQUFjO3NCQURiLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBbm9ueW1vdXNDb25zZW50LFxuICBBTk9OWU1PVVNfQ09OU0VOVF9TVEFUVVMsXG4gIENvbnNlbnRUZW1wbGF0ZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY29uc2VudC1tYW5hZ2VtZW50LWZvcm0nLFxuICB0ZW1wbGF0ZVVybDogJy4vY29uc2VudC1tYW5hZ2VtZW50LWZvcm0uY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBDb25zZW50TWFuYWdlbWVudEZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zZW50R2l2ZW4gPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBjb25zZW50VGVtcGxhdGU6IENvbnNlbnRUZW1wbGF0ZTtcblxuICBASW5wdXQoKVxuICByZXF1aXJlZENvbnNlbnRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIEBJbnB1dCgpXG4gIGNvbnNlbnQ6IEFub255bW91c0NvbnNlbnQgfCBudWxsO1xuXG4gIEBPdXRwdXQoKVxuICBjb25zZW50Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGdpdmVuOiBib29sZWFuO1xuICAgIHRlbXBsYXRlOiBDb25zZW50VGVtcGxhdGU7XG4gIH0+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgY29uc3RydWN0b3JcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbnNlbnQpIHtcbiAgICAgIHRoaXMuY29uc2VudEdpdmVuID0gQm9vbGVhbihcbiAgICAgICAgdGhpcy5jb25zZW50LmNvbnNlbnRTdGF0ZSA9PT0gQU5PTllNT1VTX0NPTlNFTlRfU1RBVFVTLkdJVkVOXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5jb25zZW50VGVtcGxhdGUgJiYgdGhpcy5jb25zZW50VGVtcGxhdGUuY3VycmVudENvbnNlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uc2VudFRlbXBsYXRlLmN1cnJlbnRDb25zZW50LmNvbnNlbnRXaXRoZHJhd25EYXRlKSB7XG4gICAgICAgICAgdGhpcy5jb25zZW50R2l2ZW4gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnNlbnRUZW1wbGF0ZS5jdXJyZW50Q29uc2VudC5jb25zZW50R2l2ZW5EYXRlKSB7XG4gICAgICAgICAgdGhpcy5jb25zZW50R2l2ZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Db25zZW50Q2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuY29uc2VudEdpdmVuID0gIXRoaXMuY29uc2VudEdpdmVuO1xuXG4gICAgdGhpcy5jb25zZW50Q2hhbmdlZC5lbWl0KHtcbiAgICAgIGdpdmVuOiB0aGlzLmNvbnNlbnRHaXZlbixcbiAgICAgIHRlbXBsYXRlOiB0aGlzLmNvbnNlbnRUZW1wbGF0ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGlzUmVxdWlyZWQodGVtcGxhdGVJZDogc3RyaW5nIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRlbXBsYXRlSWQgPyB0aGlzLnJlcXVpcmVkQ29uc2VudHMuaW5jbHVkZXModGVtcGxhdGVJZCkgOiBmYWxzZTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImZvcm0tY2hlY2tcIj5cbiAgPGxhYmVsPlxuICAgIDxpbnB1dFxuICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgIGNsYXNzPVwiZm9ybS1jaGVjay1pbnB1dFwiXG4gICAgICAoY2hhbmdlKT1cIm9uQ29uc2VudENoYW5nZSgpXCJcbiAgICAgIFtjaGVja2VkXT1cImNvbnNlbnRHaXZlblwiXG4gICAgICBbbmFtZV09XCJjb25zZW50VGVtcGxhdGUuaWRcIlxuICAgICAgW2Rpc2FibGVkXT1cImlzUmVxdWlyZWQoY29uc2VudFRlbXBsYXRlPy5pZClcIlxuICAgIC8+XG4gICAgPHNwYW4gY2xhc3M9XCJmb3JtLWNoZWNrLWxhYmVsIGN4LWJlLWJvbGRcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb25zZW50VGVtcGxhdGU/Lm5hbWVcIj5cbiAgICAgICAge3sgY29uc2VudFRlbXBsYXRlPy5uYW1lIH19XG4gICAgICAgIDxiciAvPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZm9ybS1jaGVjay1sYWJlbFwiPlxuICAgICAge3sgY29uc2VudFRlbXBsYXRlPy5kZXNjcmlwdGlvbiB9fVxuICAgIDwvc3Bhbj5cbiAgPC9sYWJlbD5cbjwvZGl2PlxuIl19