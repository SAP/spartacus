/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./date-picker.service";
import * as i2 from "@angular/forms";
import * as i3 from "../form-errors/form-errors.component";
import * as i4 from "@spartacus/core";
/**
 * Component that adds a date control. While the native date picker works in most
 * modern browsers, some browsers need more guidance (placeholder), validation and
 * date conversion.
 *
 * The data picker supports (optional) min and max form controls, so that you can
 * limit the start and/or end date.
 *
 * Most of the implementation is done in the `DatePickerFallbackDirective`.
 */
export class DatePickerComponent {
    constructor(service) {
        this.service = service;
        this.update = new EventEmitter();
    }
    change() {
        this.update.emit();
    }
    get placeholder() {
        return this.service.placeholder;
    }
    get pattern() {
        return this.service.pattern;
    }
    /**
     * Only returns the date if we have a valid format. We do this to avoid
     * loads of console errors coming from the datePipe while the user is typing
     * (in those browsers where the date picker isn't supported).
     */
    getDate(date) {
        return date && this.service.isValidFormat(date) ? date : undefined;
    }
}
DatePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DatePickerComponent, deps: [{ token: i1.DatePickerService }], target: i0.ɵɵFactoryTarget.Component });
DatePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: DatePickerComponent, selector: "cx-date-picker", inputs: { control: "control", min: "min", max: "max", required: "required" }, outputs: { update: "update" }, ngImport: i0, template: "<input\n  class=\"form-control\"\n  type=\"date\"\n  [formControl]=\"control\"\n  [attr.min]=\"min\"\n  [attr.max]=\"max\"\n  [attr.required]=\"required === false ? undefined : required\"\n  (change)=\"change()\"\n  [placeholder]=\"placeholder\"\n  [pattern]=\"pattern\"\n/>\n<cx-form-errors\n  [control]=\"control\"\n  prefix=\"formErrors.date\"\n  [translationParams]=\"{\n    max: getDate(max) | cxDate,\n    min: getDate(min) | cxDate\n  }\"\n></cx-form-errors>\n", dependencies: [{ kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2.PatternValidator, selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]", inputs: ["pattern"] }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i3.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "pipe", type: i4.CxDatePipe, name: "cxDate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DatePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-date-picker', template: "<input\n  class=\"form-control\"\n  type=\"date\"\n  [formControl]=\"control\"\n  [attr.min]=\"min\"\n  [attr.max]=\"max\"\n  [attr.required]=\"required === false ? undefined : required\"\n  (change)=\"change()\"\n  [placeholder]=\"placeholder\"\n  [pattern]=\"pattern\"\n/>\n<cx-form-errors\n  [control]=\"control\"\n  prefix=\"formErrors.date\"\n  [translationParams]=\"{\n    max: getDate(max) | cxDate,\n    min: getDate(min) | cxDate\n  }\"\n></cx-form-errors>\n" }]
        }], ctorParameters: function () { return [{ type: i1.DatePickerService }]; }, propDecorators: { control: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], required: [{
                type: Input
            }], update: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9mb3JtL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvZm9ybS9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBSXZFOzs7Ozs7Ozs7R0FTRztBQU9ILE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFBc0IsT0FBMEI7UUFBMUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFNdEMsV0FBTSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBTlAsQ0FBQztJQVFwRCxNQUFNO1FBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUM5QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUVILE9BQU8sQ0FBQyxJQUFhO1FBQ25CLE9BQU8sSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNyRSxDQUFDOztnSEE3QlUsbUJBQW1CO29HQUFuQixtQkFBbUIsbUtDMUJoQyxxZEFtQkE7MkZET2EsbUJBQW1CO2tCQU4vQixTQUFTOytCQUNFLGdCQUFnQjt3R0FPakIsT0FBTztzQkFBZixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVW50eXBlZEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuL2RhdGUtcGlja2VyLnNlcnZpY2UnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGFkZHMgYSBkYXRlIGNvbnRyb2wuIFdoaWxlIHRoZSBuYXRpdmUgZGF0ZSBwaWNrZXIgd29ya3MgaW4gbW9zdFxuICogbW9kZXJuIGJyb3dzZXJzLCBzb21lIGJyb3dzZXJzIG5lZWQgbW9yZSBndWlkYW5jZSAocGxhY2Vob2xkZXIpLCB2YWxpZGF0aW9uIGFuZFxuICogZGF0ZSBjb252ZXJzaW9uLlxuICpcbiAqIFRoZSBkYXRhIHBpY2tlciBzdXBwb3J0cyAob3B0aW9uYWwpIG1pbiBhbmQgbWF4IGZvcm0gY29udHJvbHMsIHNvIHRoYXQgeW91IGNhblxuICogbGltaXQgdGhlIHN0YXJ0IGFuZC9vciBlbmQgZGF0ZS5cbiAqXG4gKiBNb3N0IG9mIHRoZSBpbXBsZW1lbnRhdGlvbiBpcyBkb25lIGluIHRoZSBgRGF0ZVBpY2tlckZhbGxiYWNrRGlyZWN0aXZlYC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtZGF0ZS1waWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF0ZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICAvLyB3ZSBjYW5ub3QgdXNlIG9uUHVzaCBjaGFuZ2UgZGV0ZWN0aW9uIGFzIHRoZSBmb3JtIHN0YXRlIGlzbid0IHVwZGF0ZWQgd2l0aG91dCBleHBsaWNpdFxuICAvLyBjaGFuZ2UgZGV0ZWN0aW9uLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTA4MTZcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVBpY2tlckNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzZXJ2aWNlOiBEYXRlUGlja2VyU2VydmljZSkge31cbiAgQElucHV0KCkgY29udHJvbDogVW50eXBlZEZvcm1Db250cm9sO1xuICBASW5wdXQoKSBtaW4/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1heD86IHN0cmluZztcbiAgQElucHV0KCkgcmVxdWlyZWQ/OiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSB1cGRhdGU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjaGFuZ2UoKSB7XG4gICAgdGhpcy51cGRhdGUuZW1pdCgpO1xuICB9XG5cbiAgZ2V0IHBsYWNlaG9sZGVyKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UucGxhY2Vob2xkZXI7XG4gIH1cblxuICBnZXQgcGF0dGVybigpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLnBhdHRlcm47XG4gIH1cblxuICAvKipcbiAgICogT25seSByZXR1cm5zIHRoZSBkYXRlIGlmIHdlIGhhdmUgYSB2YWxpZCBmb3JtYXQuIFdlIGRvIHRoaXMgdG8gYXZvaWRcbiAgICogbG9hZHMgb2YgY29uc29sZSBlcnJvcnMgY29taW5nIGZyb20gdGhlIGRhdGVQaXBlIHdoaWxlIHRoZSB1c2VyIGlzIHR5cGluZ1xuICAgKiAoaW4gdGhvc2UgYnJvd3NlcnMgd2hlcmUgdGhlIGRhdGUgcGlja2VyIGlzbid0IHN1cHBvcnRlZCkuXG4gICAqL1xuXG4gIGdldERhdGUoZGF0ZT86IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGRhdGUgJiYgdGhpcy5zZXJ2aWNlLmlzVmFsaWRGb3JtYXQoZGF0ZSkgPyBkYXRlIDogdW5kZWZpbmVkO1xuICB9XG59XG4iLCI8aW5wdXRcbiAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICB0eXBlPVwiZGF0ZVwiXG4gIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCJcbiAgW2F0dHIubWluXT1cIm1pblwiXG4gIFthdHRyLm1heF09XCJtYXhcIlxuICBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZCA9PT0gZmFsc2UgPyB1bmRlZmluZWQgOiByZXF1aXJlZFwiXG4gIChjaGFuZ2UpPVwiY2hhbmdlKClcIlxuICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICBbcGF0dGVybl09XCJwYXR0ZXJuXCJcbi8+XG48Y3gtZm9ybS1lcnJvcnNcbiAgW2NvbnRyb2xdPVwiY29udHJvbFwiXG4gIHByZWZpeD1cImZvcm1FcnJvcnMuZGF0ZVwiXG4gIFt0cmFuc2xhdGlvblBhcmFtc109XCJ7XG4gICAgbWF4OiBnZXREYXRlKG1heCkgfCBjeERhdGUsXG4gICAgbWluOiBnZXREYXRlKG1pbikgfCBjeERhdGVcbiAgfVwiXG4+PC9jeC1mb3JtLWVycm9ycz5cbiJdfQ==