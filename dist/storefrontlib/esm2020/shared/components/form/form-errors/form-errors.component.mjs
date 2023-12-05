/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, Input, } from '@angular/core';
import { isObject } from '@spartacus/core';
import { map, startWith } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/core";
/**
 * Renders translated form errors for a given form control, based on its `errors` property.
 *
 * The translation key consists of the optional input `prefix`
 * concatenated with the error key.
 *
 * And the translation params object consist of the error details
 * (if only it's an object) merged with the optional input object `translationParams`.
 */
export class FormErrorsComponent {
    constructor(ChangeDetectionRef, keyValueDiffers) {
        this.ChangeDetectionRef = ChangeDetectionRef;
        this.keyValueDiffers = keyValueDiffers;
        /**
         * Prefix prepended to the translation key.
         */
        this.prefix = 'formErrors';
        this.role = 'alert';
    }
    set control(control) {
        if (!control) {
            return;
        }
        this._control = control;
        this.differ = this.keyValueDiffers.find(this.control).create();
        this.errorsDetails$ = control?.statusChanges.pipe(startWith({}), map(() => control.errors || {}), map((errors) => Object.entries(errors).filter(([_key, details]) => details)));
    }
    get control() {
        return this._control;
    }
    ngDoCheck() {
        const changes = this.differ?.diff(this.control);
        if (changes) {
            changes.forEachChangedItem((r) => {
                if (r?.key === 'touched') {
                    this.ChangeDetectionRef.markForCheck();
                }
            });
        }
    }
    /**
     * Returns translation params composed of
     * the argument `errorDetails` (if only is an object) merged with
     * the component input object `translationParams`.
     *
     * In case of a conflicting object key, the value from
     * `translationParams` takes precedence.
     */
    getTranslationParams(errorDetails) {
        errorDetails = isObject(errorDetails) ? errorDetails : {};
        return { ...errorDetails, ...this.translationParams };
    }
    get invalid() {
        return this.control?.invalid;
    }
    get dirty() {
        return this.control?.dirty;
    }
    get touched() {
        return this.control?.touched;
    }
    get hidden() {
        return !(this.invalid && (this.touched || this.dirty));
    }
}
FormErrorsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormErrorsComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.KeyValueDiffers }], target: i0.ɵɵFactoryTarget.Component });
FormErrorsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: FormErrorsComponent, selector: "cx-form-errors", inputs: { prefix: "prefix", translationParams: "translationParams", control: "control" }, host: { properties: { "class.control-invalid": "this.invalid", "class.control-dirty": "this.dirty", "class.control-touched": "this.touched", "class.cx-visually-hidden": "this.hidden", "attr.role": "this.role" } }, ngImport: i0, template: "<ng-container *ngIf=\"errorsDetails$ | async as errorDetails\">\n  <ng-container *ngIf=\"!hidden\">\n    <p *ngFor=\"let error of errorDetails\">\n      {{\n        prefix + '.' + error[0] | cxTranslate: getTranslationParams(error[1])\n      }}\n    </p>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormErrorsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-form-errors', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"errorsDetails$ | async as errorDetails\">\n  <ng-container *ngIf=\"!hidden\">\n    <p *ngFor=\"let error of errorDetails\">\n      {{\n        prefix + '.' + error[0] | cxTranslate: getTranslationParams(error[1])\n      }}\n    </p>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.KeyValueDiffers }]; }, propDecorators: { prefix: [{
                type: Input
            }], translationParams: [{
                type: Input
            }], control: [{
                type: Input
            }], invalid: [{
                type: HostBinding,
                args: ['class.control-invalid']
            }], dirty: [{
                type: HostBinding,
                args: ['class.control-dirty']
            }], touched: [{
                type: HostBinding,
                args: ['class.control-touched']
            }], hidden: [{
                type: HostBinding,
                args: ['class.cx-visually-hidden']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1lcnJvcnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9mb3JtL2Zvcm0tZXJyb3JzL2Zvcm0tZXJyb3JzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvZm9ybS9mb3JtLWVycm9ycy9mb3JtLWVycm9ycy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBRVQsV0FBVyxFQUNYLEtBQUssR0FHTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUVoRDs7Ozs7Ozs7R0FRRztBQU1ILE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFDWSxrQkFBcUMsRUFDckMsZUFBZ0M7UUFEaEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFhNUM7O1dBRUc7UUFDTSxXQUFNLEdBQUcsWUFBWSxDQUFDO1FBa0VMLFNBQUksR0FBRyxPQUFPLENBQUM7SUFqRnRDLENBQUM7SUF1QkosSUFDSSxPQUFPLENBQUMsT0FBb0Q7UUFDOUQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBRXhCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRS9ELElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQy9DLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFDYixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsRUFDL0IsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDYixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FDNUQsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsU0FBUztRQUNQLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxJQUFJLE9BQU8sRUFBRTtZQUNYLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssU0FBUyxFQUFFO29CQUN4QixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQ3hDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFDRDs7Ozs7OztPQU9HO0lBQ0gsb0JBQW9CLENBQUMsWUFBa0I7UUFDckMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDMUQsT0FBTyxFQUFFLEdBQUcsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUVELElBQTBDLE9BQU87UUFDL0MsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztJQUMvQixDQUFDO0lBQ0QsSUFBd0MsS0FBSztRQUMzQyxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUEwQyxPQUFPO1FBQy9DLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUNELElBQTZDLE1BQU07UUFDakQsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Z0hBcEZVLG1CQUFtQjtvR0FBbkIsbUJBQW1CLHNXQ25DaEMsc1NBU0E7MkZEMEJhLG1CQUFtQjtrQkFML0IsU0FBUzsrQkFDRSxnQkFBZ0IsbUJBRVQsdUJBQXVCLENBQUMsTUFBTTtzSUFxQnRDLE1BQU07c0JBQWQsS0FBSztnQkFNTixpQkFBaUI7c0JBRGhCLEtBQUs7Z0JBSUYsT0FBTztzQkFEVixLQUFLO2dCQThDb0MsT0FBTztzQkFBaEQsV0FBVzt1QkFBQyx1QkFBdUI7Z0JBR0ksS0FBSztzQkFBNUMsV0FBVzt1QkFBQyxxQkFBcUI7Z0JBR1EsT0FBTztzQkFBaEQsV0FBVzt1QkFBQyx1QkFBdUI7Z0JBR1MsTUFBTTtzQkFBbEQsV0FBVzt1QkFBQywwQkFBMEI7Z0JBR2IsSUFBSTtzQkFBN0IsV0FBVzt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIERvQ2hlY2ssXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgS2V5VmFsdWVEaWZmZXIsXG4gIEtleVZhbHVlRGlmZmVycyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIFVudHlwZWRGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFJlbmRlcnMgdHJhbnNsYXRlZCBmb3JtIGVycm9ycyBmb3IgYSBnaXZlbiBmb3JtIGNvbnRyb2wsIGJhc2VkIG9uIGl0cyBgZXJyb3JzYCBwcm9wZXJ0eS5cbiAqXG4gKiBUaGUgdHJhbnNsYXRpb24ga2V5IGNvbnNpc3RzIG9mIHRoZSBvcHRpb25hbCBpbnB1dCBgcHJlZml4YFxuICogY29uY2F0ZW5hdGVkIHdpdGggdGhlIGVycm9yIGtleS5cbiAqXG4gKiBBbmQgdGhlIHRyYW5zbGF0aW9uIHBhcmFtcyBvYmplY3QgY29uc2lzdCBvZiB0aGUgZXJyb3IgZGV0YWlsc1xuICogKGlmIG9ubHkgaXQncyBhbiBvYmplY3QpIG1lcmdlZCB3aXRoIHRoZSBvcHRpb25hbCBpbnB1dCBvYmplY3QgYHRyYW5zbGF0aW9uUGFyYW1zYC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtZm9ybS1lcnJvcnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vZm9ybS1lcnJvcnMuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUVycm9yc0NvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgQ2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQga2V5VmFsdWVEaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnNcbiAgKSB7fVxuXG4gIF9jb250cm9sOiBVbnR5cGVkRm9ybUNvbnRyb2wgfCBBYnN0cmFjdENvbnRyb2w7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGFycmF5IG9mIGVycm9ycywgZWFjaCByZXByZXNlbnRlZCBieSBhIHR1cGxlOlxuICAgKiB0aGUgZXJyb3Iga2V5IGFuZCBlcnJvciBkZXRhaWxzLlxuICAgKi9cbiAgZXJyb3JzRGV0YWlscyQ6IE9ic2VydmFibGU8QXJyYXk8W3N0cmluZywgc3RyaW5nIHwgYm9vbGVhbl0+PjtcblxuICBwcm90ZWN0ZWQgZGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxhbnksIGFueT47XG5cbiAgLyoqXG4gICAqIFByZWZpeCBwcmVwZW5kZWQgdG8gdGhlIHRyYW5zbGF0aW9uIGtleS5cbiAgICovXG4gIEBJbnB1dCgpIHByZWZpeCA9ICdmb3JtRXJyb3JzJztcblxuICAvKipcbiAgICogVHJhbnNsYXRpb24gcGFyYW1zIHRvIGVucmljaCB0aGUgZXJyb3IgZGV0YWlscyBvYmplY3QuXG4gICAqL1xuICBASW5wdXQoKVxuICB0cmFuc2xhdGlvblBhcmFtczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudWxsIH07XG5cbiAgQElucHV0KClcbiAgc2V0IGNvbnRyb2woY29udHJvbDogQWJzdHJhY3RDb250cm9sIHwgVW50eXBlZEZvcm1Db250cm9sIHwgbnVsbCkge1xuICAgIGlmICghY29udHJvbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbnRyb2wgPSBjb250cm9sO1xuXG4gICAgdGhpcy5kaWZmZXIgPSB0aGlzLmtleVZhbHVlRGlmZmVycy5maW5kKHRoaXMuY29udHJvbCkuY3JlYXRlKCk7XG5cbiAgICB0aGlzLmVycm9yc0RldGFpbHMkID0gY29udHJvbD8uc3RhdHVzQ2hhbmdlcy5waXBlKFxuICAgICAgc3RhcnRXaXRoKHt9KSxcbiAgICAgIG1hcCgoKSA9PiBjb250cm9sLmVycm9ycyB8fCB7fSksXG4gICAgICBtYXAoKGVycm9ycykgPT5cbiAgICAgICAgT2JqZWN0LmVudHJpZXMoZXJyb3JzKS5maWx0ZXIoKFtfa2V5LCBkZXRhaWxzXSkgPT4gZGV0YWlscylcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgZ2V0IGNvbnRyb2woKTogVW50eXBlZEZvcm1Db250cm9sIHwgQWJzdHJhY3RDb250cm9sIHtcbiAgICByZXR1cm4gdGhpcy5fY29udHJvbDtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5kaWZmZXI/LmRpZmYodGhpcy5jb250cm9sKTtcbiAgICBpZiAoY2hhbmdlcykge1xuICAgICAgY2hhbmdlcy5mb3JFYWNoQ2hhbmdlZEl0ZW0oKHIpID0+IHtcbiAgICAgICAgaWYgKHI/LmtleSA9PT0gJ3RvdWNoZWQnKSB7XG4gICAgICAgICAgdGhpcy5DaGFuZ2VEZXRlY3Rpb25SZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0cmFuc2xhdGlvbiBwYXJhbXMgY29tcG9zZWQgb2ZcbiAgICogdGhlIGFyZ3VtZW50IGBlcnJvckRldGFpbHNgIChpZiBvbmx5IGlzIGFuIG9iamVjdCkgbWVyZ2VkIHdpdGhcbiAgICogdGhlIGNvbXBvbmVudCBpbnB1dCBvYmplY3QgYHRyYW5zbGF0aW9uUGFyYW1zYC5cbiAgICpcbiAgICogSW4gY2FzZSBvZiBhIGNvbmZsaWN0aW5nIG9iamVjdCBrZXksIHRoZSB2YWx1ZSBmcm9tXG4gICAqIGB0cmFuc2xhdGlvblBhcmFtc2AgdGFrZXMgcHJlY2VkZW5jZS5cbiAgICovXG4gIGdldFRyYW5zbGF0aW9uUGFyYW1zKGVycm9yRGV0YWlscz86IGFueSk6IG9iamVjdCB7XG4gICAgZXJyb3JEZXRhaWxzID0gaXNPYmplY3QoZXJyb3JEZXRhaWxzKSA/IGVycm9yRGV0YWlscyA6IHt9O1xuICAgIHJldHVybiB7IC4uLmVycm9yRGV0YWlscywgLi4udGhpcy50cmFuc2xhdGlvblBhcmFtcyB9O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jb250cm9sLWludmFsaWQnKSBnZXQgaW52YWxpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250cm9sPy5pbnZhbGlkO1xuICB9XG4gIEBIb3N0QmluZGluZygnY2xhc3MuY29udHJvbC1kaXJ0eScpIGdldCBkaXJ0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250cm9sPy5kaXJ0eTtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNvbnRyb2wtdG91Y2hlZCcpIGdldCB0b3VjaGVkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2w/LnRvdWNoZWQ7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jeC12aXN1YWxseS1oaWRkZW4nKSBnZXQgaGlkZGVuKCkge1xuICAgIHJldHVybiAhKHRoaXMuaW52YWxpZCAmJiAodGhpcy50b3VjaGVkIHx8IHRoaXMuZGlydHkpKTtcbiAgfVxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpIHJvbGUgPSAnYWxlcnQnO1xufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImVycm9yc0RldGFpbHMkIHwgYXN5bmMgYXMgZXJyb3JEZXRhaWxzXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaGlkZGVuXCI+XG4gICAgPHAgKm5nRm9yPVwibGV0IGVycm9yIG9mIGVycm9yRGV0YWlsc1wiPlxuICAgICAge3tcbiAgICAgICAgcHJlZml4ICsgJy4nICsgZXJyb3JbMF0gfCBjeFRyYW5zbGF0ZTogZ2V0VHJhbnNsYXRpb25QYXJhbXMoZXJyb3JbMV0pXG4gICAgICB9fVxuICAgIDwvcD5cbiAgPC9uZy1jb250YWluZXI+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==