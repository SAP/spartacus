/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, ViewChild, } from '@angular/core';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../layout/launch-dialog/services/launch-dialog.service";
import * as i2 from "@spartacus/core";
export class AnonymousConsentOpenDialogComponent {
    constructor(vcr, launchDialogService) {
        this.vcr = vcr;
        this.launchDialogService = launchDialogService;
    }
    openDialog() {
        const dialog = this.launchDialogService.openDialog("ANONYMOUS_CONSENT" /* LAUNCH_CALLER.ANONYMOUS_CONSENT */, this.openElement, this.vcr);
        if (dialog) {
            dialog.pipe(take(1)).subscribe();
        }
    }
}
AnonymousConsentOpenDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AnonymousConsentOpenDialogComponent, deps: [{ token: i0.ViewContainerRef }, { token: i1.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
AnonymousConsentOpenDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AnonymousConsentOpenDialogComponent, selector: "cx-anonymous-consent-open-dialog", viewQueries: [{ propertyName: "openElement", first: true, predicate: ["open"], descendants: true }], ngImport: i0, template: "<button #open class=\"btn btn-link\" (click)=\"openDialog()\">\n  {{ 'anonymousConsents.preferences' | cxTranslate }}\n</button>\n", dependencies: [{ kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AnonymousConsentOpenDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-anonymous-consent-open-dialog', template: "<button #open class=\"btn btn-link\" (click)=\"openDialog()\">\n  {{ 'anonymousConsents.preferences' | cxTranslate }}\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i1.LaunchDialogService }]; }, propDecorators: { openElement: [{
                type: ViewChild,
                args: ['open']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5vbnltb3VzLWNvbnNlbnQtb3Blbi1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9hbm9ueW1vdXMtY29uc2VudC1tYW5hZ2VtZW50L29wZW4tZGlhbG9nL2Fub255bW91cy1jb25zZW50LW9wZW4tZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvYW5vbnltb3VzLWNvbnNlbnQtbWFuYWdlbWVudC9vcGVuLWRpYWxvZy9hbm9ueW1vdXMtY29uc2VudC1vcGVuLWRpYWxvZy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFFVCxTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBTXRDLE1BQU0sT0FBTyxtQ0FBbUM7SUFHOUMsWUFDWSxHQUFxQixFQUNyQixtQkFBd0M7UUFEeEMsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFDckIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtJQUNqRCxDQUFDO0lBRUosVUFBVTtRQUNSLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLDREQUVoRCxJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsR0FBRyxDQUNULENBQUM7UUFDRixJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDOztnSUFqQlUsbUNBQW1DO29IQUFuQyxtQ0FBbUMsNktDcEJoRCxvSUFHQTsyRkRpQmEsbUNBQW1DO2tCQUovQyxTQUFTOytCQUNFLGtDQUFrQzt5SUFJekIsV0FBVztzQkFBN0IsU0FBUzt1QkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGF1bmNoRGlhbG9nU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2xheW91dC9sYXVuY2gtZGlhbG9nL3NlcnZpY2VzL2xhdW5jaC1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBMQVVOQ0hfQ0FMTEVSIH0gZnJvbSAnLi4vLi4vLi4vbGF5b3V0L2xhdW5jaC1kaWFsb2cvY29uZmlnL2xhdW5jaC1jb25maWcnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtYW5vbnltb3VzLWNvbnNlbnQtb3Blbi1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJy4vYW5vbnltb3VzLWNvbnNlbnQtb3Blbi1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBBbm9ueW1vdXNDb25zZW50T3BlbkRpYWxvZ0NvbXBvbmVudCB7XG4gIEBWaWV3Q2hpbGQoJ29wZW4nKSBvcGVuRWxlbWVudDogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByb3RlY3RlZCBsYXVuY2hEaWFsb2dTZXJ2aWNlOiBMYXVuY2hEaWFsb2dTZXJ2aWNlXG4gICkge31cblxuICBvcGVuRGlhbG9nKCk6IHZvaWQge1xuICAgIGNvbnN0IGRpYWxvZyA9IHRoaXMubGF1bmNoRGlhbG9nU2VydmljZS5vcGVuRGlhbG9nKFxuICAgICAgTEFVTkNIX0NBTExFUi5BTk9OWU1PVVNfQ09OU0VOVCxcbiAgICAgIHRoaXMub3BlbkVsZW1lbnQsXG4gICAgICB0aGlzLnZjclxuICAgICk7XG4gICAgaWYgKGRpYWxvZykge1xuICAgICAgZGlhbG9nLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iLCI8YnV0dG9uICNvcGVuIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgKGNsaWNrKT1cIm9wZW5EaWFsb2coKVwiPlxuICB7eyAnYW5vbnltb3VzQ29uc2VudHMucHJlZmVyZW5jZXMnIHwgY3hUcmFuc2xhdGUgfX1cbjwvYnV0dG9uPlxuIl19