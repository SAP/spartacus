/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, HostBinding, HostListener, Input, ViewChild, } from '@angular/core';
import { startWith } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@spartacus/core";
/**
 * Provides a UI to manage the count of the quantity, typically by using
 * increase and decrease functionality. The item counter expects an input `FormControl`
 * so that the state of the control can be managed outside of this component.
 */
export class ItemCounterComponent {
    constructor() {
        /**
         * This can be used in case an item has a minmum order quantity.
         * @default 1
         */
        this.min = 1;
        /**
         * The step is used to increment the count. It is supposed to be a
         * positive integer or float.
         * @default 1
         */
        this.step = 1;
        /**
         * Indicates that the input can be manually set to zero,
         * despite the fact that the input controls will be limited to
         * the minimum. The zero value can be used to remove an item.
         */
        this.allowZero = false;
        /**
         * In readonly mode the item counter will only be shown as a label,
         * the form controls are not rendered.
         * Please not that readonly is different from the `disabled` form state.
         * @default false
         */
        this.readonly = false;
    }
    handleClick() {
        this.input.nativeElement.focus();
    }
    ngOnInit() {
        this.sub = this.control.valueChanges
            .pipe(startWith(this.control.value))
            .subscribe((value) => this.control.setValue(this.getValidCount(value), { emitEvent: false }));
    }
    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    increment() {
        // it's too early to use the `stepUp` and `stepDown` API...
        // let's wait for FF: https://caniuse.com/#search=stepUp
        this.control.setValue(this.control.value + this.step);
        this.control.markAsDirty();
    }
    decrement() {
        this.control.setValue(this.control.value - this.step);
        this.control.markAsDirty();
    }
    /**
     * Validate that the given value is in between
     * the `min` and `max` value. If the value is out
     * of  the min/max range, it will be altered.
     * If `allowZero` is set to true, the 0 value is ignored.
     *
     */
    getValidCount(value) {
        if (value < this.min && !(value === 0 && this.allowZero)) {
            value = this.min;
        }
        if (this.max && value > this.max) {
            value = this.max;
        }
        return value;
    }
}
ItemCounterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemCounterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ItemCounterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ItemCounterComponent, selector: "cx-item-counter", inputs: { control: "control", min: "min", max: "max", step: "step", allowZero: "allowZero", readonly: "readonly" }, host: { listeners: { "click": "handleClick()" }, properties: { "class.readonly": "this.readonly" } }, viewQueries: [{ propertyName: "input", first: true, predicate: ["qty"], descendants: true }], ngImport: i0, template: "<button\n  type=\"button\"\n  (click)=\"decrement()\"\n  [disabled]=\"control.disabled || control.value <= min\"\n  [tabindex]=\"control.disabled || control.value <= min ? -1 : 0\"\n  attr.aria-label=\"{{ 'itemCounter.removeOne' | cxTranslate }}\"\n>\n  -\n</button>\n<input\n  #qty\n  type=\"number\"\n  [min]=\"min\"\n  [max]=\"max\"\n  [step]=\"step\"\n  [readonly]=\"readonly\"\n  [tabindex]=\"readonly ? -1 : 0\"\n  [formControl]=\"control\"\n  attr.aria-label=\"{{ 'itemCounter.quantity' | cxTranslate }}\"\n/>\n<button\n  type=\"button\"\n  (click)=\"increment()\"\n  [disabled]=\"control.disabled || control.value >= max\"\n  tabindex=\"0\"\n  attr.aria-label=\"{{ 'itemCounter.addOneMore' | cxTranslate }}\"\n>\n  +\n</button>\n", dependencies: [{ kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.MinValidator, selector: "input[type=number][min][formControlName],input[type=number][min][formControl],input[type=number][min][ngModel]", inputs: ["min"] }, { kind: "directive", type: i1.MaxValidator, selector: "input[type=number][max][formControlName],input[type=number][max][formControl],input[type=number][max][ngModel]", inputs: ["max"] }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemCounterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-item-counter', template: "<button\n  type=\"button\"\n  (click)=\"decrement()\"\n  [disabled]=\"control.disabled || control.value <= min\"\n  [tabindex]=\"control.disabled || control.value <= min ? -1 : 0\"\n  attr.aria-label=\"{{ 'itemCounter.removeOne' | cxTranslate }}\"\n>\n  -\n</button>\n<input\n  #qty\n  type=\"number\"\n  [min]=\"min\"\n  [max]=\"max\"\n  [step]=\"step\"\n  [readonly]=\"readonly\"\n  [tabindex]=\"readonly ? -1 : 0\"\n  [formControl]=\"control\"\n  attr.aria-label=\"{{ 'itemCounter.quantity' | cxTranslate }}\"\n/>\n<button\n  type=\"button\"\n  (click)=\"increment()\"\n  [disabled]=\"control.disabled || control.value >= max\"\n  tabindex=\"0\"\n  attr.aria-label=\"{{ 'itemCounter.addOneMore' | cxTranslate }}\"\n>\n  +\n</button>\n" }]
        }], propDecorators: { control: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], step: [{
                type: Input
            }], allowZero: [{
                type: Input
            }], readonly: [{
                type: HostBinding,
                args: ['class.readonly']
            }, {
                type: Input
            }], input: [{
                type: ViewChild,
                args: ['qty']
            }], handleClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1jb3VudGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvaXRlbS1jb3VudGVyL2l0ZW0tY291bnRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL2l0ZW0tY291bnRlci9pdGVtLWNvdW50ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBRVQsV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBR0wsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUUzQzs7OztHQUlHO0FBU0gsTUFBTSxPQUFPLG9CQUFvQjtJQVJqQztRQWVFOzs7V0FHRztRQUNNLFFBQUcsR0FBRyxDQUFDLENBQUM7UUFPakI7Ozs7V0FJRztRQUNNLFNBQUksR0FBRyxDQUFDLENBQUM7UUFFbEI7Ozs7V0FJRztRQUNNLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFM0I7Ozs7O1dBS0c7UUFDcUMsYUFBUSxHQUFHLEtBQUssQ0FBQztLQXVEMUQ7SUE5Q3dCLFdBQVc7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWTthQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUN2RSxDQUFDO0lBQ04sQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVELFNBQVM7UUFDUCwyREFBMkQ7UUFDM0Qsd0RBQXdEO1FBQ3hELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLGFBQWEsQ0FBQyxLQUFhO1FBQ2pDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3hELEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2hDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOztpSEE1RlUsb0JBQW9CO3FHQUFwQixvQkFBb0IsK1dDakNqQyxtdUJBNkJBOzJGRElhLG9CQUFvQjtrQkFSaEMsU0FBUzsrQkFDRSxpQkFBaUI7OEJBWWxCLE9BQU87c0JBQWYsS0FBSztnQkFNRyxHQUFHO3NCQUFYLEtBQUs7Z0JBS0csR0FBRztzQkFBWCxLQUFLO2dCQU9HLElBQUk7c0JBQVosS0FBSztnQkFPRyxTQUFTO3NCQUFqQixLQUFLO2dCQVFrQyxRQUFRO3NCQUEvQyxXQUFXO3VCQUFDLGdCQUFnQjs7c0JBQUcsS0FBSztnQkFFWCxLQUFLO3NCQUE5QixTQUFTO3VCQUFDLEtBQUs7Z0JBT08sV0FBVztzQkFBakMsWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBQcm92aWRlcyBhIFVJIHRvIG1hbmFnZSB0aGUgY291bnQgb2YgdGhlIHF1YW50aXR5LCB0eXBpY2FsbHkgYnkgdXNpbmdcbiAqIGluY3JlYXNlIGFuZCBkZWNyZWFzZSBmdW5jdGlvbmFsaXR5LiBUaGUgaXRlbSBjb3VudGVyIGV4cGVjdHMgYW4gaW5wdXQgYEZvcm1Db250cm9sYFxuICogc28gdGhhdCB0aGUgc3RhdGUgb2YgdGhlIGNvbnRyb2wgY2FuIGJlIG1hbmFnZWQgb3V0c2lkZSBvZiB0aGlzIGNvbXBvbmVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtaXRlbS1jb3VudGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2l0ZW0tY291bnRlci5jb21wb25lbnQuaHRtbCcsXG4gIC8vIGRvIG5vdCB1c2UgT25QdXNoIGNoYW5nZSBkZXRlY3Rpb24gc3RyYXRlZ3kgYXMgd2Ugd291bGQgbm90XG4gIC8vIGdldCB1cGRhdGVzIG9mIG90aGVyIGZvcm0gY29udHJvbCBzdGF0ZSAoZGlzYWJsZWQpLiBXZSB3YW50IHRvIGhhdmUgYVxuICAvLyBkaXNhYmxlZCBzdGF0ZSBpbiBvcmRlciB0byBlbnN1cmUgdGhhdCB0aGUgY29udHJvbCBjYW5ub3QgYmUgdXNlZCB3aGlsZVxuICAvLyB0aGUgY2FydCBpcyB1cGRhdGVkLlxufSlcbmV4cG9ydCBjbGFzcyBJdGVtQ291bnRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIEhvbGRzIHRoZSB2YWx1ZSBvZiB0aGUgY291bnRlciwgdGhlIHN0YXRlIG9mIHRoZSBgRm9ybUNvbnRyb2xgXG4gICAqIGNhbiBiZSBtYW5hZ2VkIG91dHNpZGUgb2YgdGhlIGl0ZW0gY291bnRlci5cbiAgICovXG4gIEBJbnB1dCgpIGNvbnRyb2w6IFVudHlwZWRGb3JtQ29udHJvbDtcblxuICAvKipcbiAgICogVGhpcyBjYW4gYmUgdXNlZCBpbiBjYXNlIGFuIGl0ZW0gaGFzIGEgbWlubXVtIG9yZGVyIHF1YW50aXR5LlxuICAgKiBAZGVmYXVsdCAxXG4gICAqL1xuICBASW5wdXQoKSBtaW4gPSAxO1xuXG4gIC8qKlxuICAgKiBUaGlzIGNhbiBiZSB1c2VkIGluIGNhc2UgYW4gaXRlbSBoYXMgYSBtYXhpbXVtIG9yZGVyIHF1YW50aXR5LlxuICAgKi9cbiAgQElucHV0KCkgbWF4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBzdGVwIGlzIHVzZWQgdG8gaW5jcmVtZW50IHRoZSBjb3VudC4gSXQgaXMgc3VwcG9zZWQgdG8gYmUgYVxuICAgKiBwb3NpdGl2ZSBpbnRlZ2VyIG9yIGZsb2F0LlxuICAgKiBAZGVmYXVsdCAxXG4gICAqL1xuICBASW5wdXQoKSBzdGVwID0gMTtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoYXQgdGhlIGlucHV0IGNhbiBiZSBtYW51YWxseSBzZXQgdG8gemVybyxcbiAgICogZGVzcGl0ZSB0aGUgZmFjdCB0aGF0IHRoZSBpbnB1dCBjb250cm9scyB3aWxsIGJlIGxpbWl0ZWQgdG9cbiAgICogdGhlIG1pbmltdW0uIFRoZSB6ZXJvIHZhbHVlIGNhbiBiZSB1c2VkIHRvIHJlbW92ZSBhbiBpdGVtLlxuICAgKi9cbiAgQElucHV0KCkgYWxsb3daZXJvID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEluIHJlYWRvbmx5IG1vZGUgdGhlIGl0ZW0gY291bnRlciB3aWxsIG9ubHkgYmUgc2hvd24gYXMgYSBsYWJlbCxcbiAgICogdGhlIGZvcm0gY29udHJvbHMgYXJlIG5vdCByZW5kZXJlZC5cbiAgICogUGxlYXNlIG5vdCB0aGF0IHJlYWRvbmx5IGlzIGRpZmZlcmVudCBmcm9tIHRoZSBgZGlzYWJsZWRgIGZvcm0gc3RhdGUuXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnJlYWRvbmx5JykgQElucHV0KCkgcmVhZG9ubHkgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCdxdHknKSBwcml2YXRlIGlucHV0OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gcmVzcG9uc2libGUgZm9yIGF1dG8tY29ycmVjdGluZyBjb250cm9sJ3MgdmFsdWUgd2hlbiBpdCdzIGludmFsaWQuXG4gICAqL1xuICBwcml2YXRlIHN1YjogU3Vic2NyaXB0aW9uO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgaGFuZGxlQ2xpY2soKSB7XG4gICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YiA9IHRoaXMuY29udHJvbC52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKHN0YXJ0V2l0aCh0aGlzLmNvbnRyb2wudmFsdWUpKVxuICAgICAgLnN1YnNjcmliZSgodmFsdWUpID0+XG4gICAgICAgIHRoaXMuY29udHJvbC5zZXRWYWx1ZSh0aGlzLmdldFZhbGlkQ291bnQodmFsdWUpLCB7IGVtaXRFdmVudDogZmFsc2UgfSlcbiAgICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWIpIHtcbiAgICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgaW5jcmVtZW50KCkge1xuICAgIC8vIGl0J3MgdG9vIGVhcmx5IHRvIHVzZSB0aGUgYHN0ZXBVcGAgYW5kIGBzdGVwRG93bmAgQVBJLi4uXG4gICAgLy8gbGV0J3Mgd2FpdCBmb3IgRkY6IGh0dHBzOi8vY2FuaXVzZS5jb20vI3NlYXJjaD1zdGVwVXBcbiAgICB0aGlzLmNvbnRyb2wuc2V0VmFsdWUodGhpcy5jb250cm9sLnZhbHVlICsgdGhpcy5zdGVwKTtcbiAgICB0aGlzLmNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgfVxuXG4gIGRlY3JlbWVudCgpIHtcbiAgICB0aGlzLmNvbnRyb2wuc2V0VmFsdWUodGhpcy5jb250cm9sLnZhbHVlIC0gdGhpcy5zdGVwKTtcbiAgICB0aGlzLmNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSB0aGF0IHRoZSBnaXZlbiB2YWx1ZSBpcyBpbiBiZXR3ZWVuXG4gICAqIHRoZSBgbWluYCBhbmQgYG1heGAgdmFsdWUuIElmIHRoZSB2YWx1ZSBpcyBvdXRcbiAgICogb2YgIHRoZSBtaW4vbWF4IHJhbmdlLCBpdCB3aWxsIGJlIGFsdGVyZWQuXG4gICAqIElmIGBhbGxvd1plcm9gIGlzIHNldCB0byB0cnVlLCB0aGUgMCB2YWx1ZSBpcyBpZ25vcmVkLlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRWYWxpZENvdW50KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPCB0aGlzLm1pbiAmJiAhKHZhbHVlID09PSAwICYmIHRoaXMuYWxsb3daZXJvKSkge1xuICAgICAgdmFsdWUgPSB0aGlzLm1pbjtcbiAgICB9XG4gICAgaWYgKHRoaXMubWF4ICYmIHZhbHVlID4gdGhpcy5tYXgpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5tYXg7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuIiwiPGJ1dHRvblxuICB0eXBlPVwiYnV0dG9uXCJcbiAgKGNsaWNrKT1cImRlY3JlbWVudCgpXCJcbiAgW2Rpc2FibGVkXT1cImNvbnRyb2wuZGlzYWJsZWQgfHwgY29udHJvbC52YWx1ZSA8PSBtaW5cIlxuICBbdGFiaW5kZXhdPVwiY29udHJvbC5kaXNhYmxlZCB8fCBjb250cm9sLnZhbHVlIDw9IG1pbiA/IC0xIDogMFwiXG4gIGF0dHIuYXJpYS1sYWJlbD1cInt7ICdpdGVtQ291bnRlci5yZW1vdmVPbmUnIHwgY3hUcmFuc2xhdGUgfX1cIlxuPlxuICAtXG48L2J1dHRvbj5cbjxpbnB1dFxuICAjcXR5XG4gIHR5cGU9XCJudW1iZXJcIlxuICBbbWluXT1cIm1pblwiXG4gIFttYXhdPVwibWF4XCJcbiAgW3N0ZXBdPVwic3RlcFwiXG4gIFtyZWFkb25seV09XCJyZWFkb25seVwiXG4gIFt0YWJpbmRleF09XCJyZWFkb25seSA/IC0xIDogMFwiXG4gIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCJcbiAgYXR0ci5hcmlhLWxhYmVsPVwie3sgJ2l0ZW1Db3VudGVyLnF1YW50aXR5JyB8IGN4VHJhbnNsYXRlIH19XCJcbi8+XG48YnV0dG9uXG4gIHR5cGU9XCJidXR0b25cIlxuICAoY2xpY2spPVwiaW5jcmVtZW50KClcIlxuICBbZGlzYWJsZWRdPVwiY29udHJvbC5kaXNhYmxlZCB8fCBjb250cm9sLnZhbHVlID49IG1heFwiXG4gIHRhYmluZGV4PVwiMFwiXG4gIGF0dHIuYXJpYS1sYWJlbD1cInt7ICdpdGVtQ291bnRlci5hZGRPbmVNb3JlJyB8IGN4VHJhbnNsYXRlIH19XCJcbj5cbiAgK1xuPC9idXR0b24+XG4iXX0=