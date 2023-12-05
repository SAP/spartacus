/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@spartacus/core";
export class ConfiguratorTextfieldInputFieldComponent {
    constructor() {
        this.PREFIX_TEXTFIELD = 'cx-configurator-textfield';
        this.attributeInputForm = new UntypedFormControl('');
        this.inputChange = new EventEmitter();
        // Intentional empty constructor
    }
    ngOnInit() {
        this.attributeInputForm.setValue(this.attribute.configurationValue);
    }
    /**
     * Triggered if an attribute value is changed. Triggers the emission of the inputChange event emitter that is
     * in turn received in the form component
     */
    onInputChange() {
        const attribute = {
            configurationLabel: this.attribute.configurationLabel,
            configurationValue: this.attributeInputForm.value,
        };
        this.inputChange.emit(attribute);
    }
    /**
     * Compiles an ID for the attribute label by using the label from the backend and a prefix 'label'
     * @param attribute Textfield configurator attribute. Carries the attribute label information from the backend
     * @returns ID
     */
    getIdLabel(attribute) {
        return (this.PREFIX_TEXTFIELD + 'label' + this.getLabelForIdGeneration(attribute));
    }
    /**
     * Compiles an ID for the attribute value by using the label from the backend
     * @param attribute Textfield configurator attribute. Carries the attribute label information from the backend
     * @returns ID
     */
    getId(attribute) {
        return this.PREFIX_TEXTFIELD + this.getLabelForIdGeneration(attribute);
    }
    getLabelForIdGeneration(attribute) {
        //replace white spaces with an empty string
        return attribute.configurationLabel.replace(/\s/g, '');
    }
}
ConfiguratorTextfieldInputFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldInputFieldComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorTextfieldInputFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorTextfieldInputFieldComponent, selector: "cx-configurator-textfield-input-field", inputs: { attribute: "attribute" }, outputs: { inputChange: "inputChange" }, ngImport: i0, template: "<label\n  id=\"{{ getIdLabel(attribute) }}\"\n  class=\"cx-configurator-textfield-label\"\n  [attr.aria-label]=\"'configurator.a11y.nameOfAttribute' | cxTranslate\"\n  >{{ attribute.configurationLabel }}</label\n>\n<div class=\"form-group\">\n  <input\n    [formControl]=\"attributeInputForm\"\n    class=\"form-control\"\n    (change)=\"onInputChange()\"\n    [attr.aria-label]=\"\n      'configurator.a11y.valueOfAttributeFull'\n        | cxTranslate\n          : {\n              value: attribute.configurationValue,\n              attribute: attribute.configurationLabel\n            }\n    \"\n  />\n</div>\n", dependencies: [{ kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldInputFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-textfield-input-field', changeDetection: ChangeDetectionStrategy.OnPush, template: "<label\n  id=\"{{ getIdLabel(attribute) }}\"\n  class=\"cx-configurator-textfield-label\"\n  [attr.aria-label]=\"'configurator.a11y.nameOfAttribute' | cxTranslate\"\n  >{{ attribute.configurationLabel }}</label\n>\n<div class=\"form-group\">\n  <input\n    [formControl]=\"attributeInputForm\"\n    class=\"form-control\"\n    (change)=\"onInputChange()\"\n    [attr.aria-label]=\"\n      'configurator.a11y.valueOfAttributeFull'\n        | cxTranslate\n          : {\n              value: attribute.configurationValue,\n              attribute: attribute.configurationLabel\n            }\n    \"\n  />\n</div>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { attribute: [{
                type: Input
            }], inputChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXRleHRmaWVsZC1pbnB1dC1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvdGV4dGZpZWxkL2NvbXBvbmVudHMvaW5wdXQtZmllbGQvY29uZmlndXJhdG9yLXRleHRmaWVsZC1pbnB1dC1maWVsZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvdGV4dGZpZWxkL2NvbXBvbmVudHMvaW5wdXQtZmllbGQvY29uZmlndXJhdG9yLXRleHRmaWVsZC1pbnB1dC1maWVsZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFRcEQsTUFBTSxPQUFPLHdDQUF3QztJQVFuRDtRQVBBLHFCQUFnQixHQUFHLDJCQUEyQixDQUFDO1FBQy9DLHVCQUFrQixHQUFHLElBQUksa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFJaEQsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBMkMsQ0FBQztRQUd4RSxnQ0FBZ0M7SUFDbEMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsYUFBYTtRQUNYLE1BQU0sU0FBUyxHQUE0QztZQUN6RCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQjtZQUNyRCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztTQUNsRCxDQUFDO1FBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNEOzs7O09BSUc7SUFDSCxVQUFVLENBQUMsU0FBa0Q7UUFDM0QsT0FBTyxDQUNMLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUMxRSxDQUFDO0lBQ0osQ0FBQztJQUNEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsU0FBa0Q7UUFDdEQsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFUyx1QkFBdUIsQ0FDL0IsU0FBa0Q7UUFFbEQsMkNBQTJDO1FBQzNDLE9BQU8sU0FBUyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQzs7cUlBbkRVLHdDQUF3Qzt5SEFBeEMsd0NBQXdDLDBKQ3RCckQsdW1CQXFCQTsyRkRDYSx3Q0FBd0M7a0JBTHBELFNBQVM7K0JBQ0UsdUNBQXVDLG1CQUVoQyx1QkFBdUIsQ0FBQyxNQUFNOzBFQU10QyxTQUFTO3NCQUFqQixLQUFLO2dCQUVOLFdBQVc7c0JBRFYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVudHlwZWRGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclRleHRmaWVsZCB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLXRleHRmaWVsZC5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWNvbmZpZ3VyYXRvci10ZXh0ZmllbGQtaW5wdXQtZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29uZmlndXJhdG9yLXRleHRmaWVsZC1pbnB1dC1maWVsZC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JUZXh0ZmllbGRJbnB1dEZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgUFJFRklYX1RFWFRGSUVMRCA9ICdjeC1jb25maWd1cmF0b3ItdGV4dGZpZWxkJztcbiAgYXR0cmlidXRlSW5wdXRGb3JtID0gbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJyk7XG5cbiAgQElucHV0KCkgYXR0cmlidXRlOiBDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvbkluZm87XG4gIEBPdXRwdXQoKVxuICBpbnB1dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q29uZmlndXJhdG9yVGV4dGZpZWxkLkNvbmZpZ3VyYXRpb25JbmZvPigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIEludGVudGlvbmFsIGVtcHR5IGNvbnN0cnVjdG9yXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmF0dHJpYnV0ZUlucHV0Rm9ybS5zZXRWYWx1ZSh0aGlzLmF0dHJpYnV0ZS5jb25maWd1cmF0aW9uVmFsdWUpO1xuICB9XG4gIC8qKlxuICAgKiBUcmlnZ2VyZWQgaWYgYW4gYXR0cmlidXRlIHZhbHVlIGlzIGNoYW5nZWQuIFRyaWdnZXJzIHRoZSBlbWlzc2lvbiBvZiB0aGUgaW5wdXRDaGFuZ2UgZXZlbnQgZW1pdHRlciB0aGF0IGlzXG4gICAqIGluIHR1cm4gcmVjZWl2ZWQgaW4gdGhlIGZvcm0gY29tcG9uZW50XG4gICAqL1xuICBvbklucHV0Q2hhbmdlKCk6IHZvaWQge1xuICAgIGNvbnN0IGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yVGV4dGZpZWxkLkNvbmZpZ3VyYXRpb25JbmZvID0ge1xuICAgICAgY29uZmlndXJhdGlvbkxhYmVsOiB0aGlzLmF0dHJpYnV0ZS5jb25maWd1cmF0aW9uTGFiZWwsXG4gICAgICBjb25maWd1cmF0aW9uVmFsdWU6IHRoaXMuYXR0cmlidXRlSW5wdXRGb3JtLnZhbHVlLFxuICAgIH07XG5cbiAgICB0aGlzLmlucHV0Q2hhbmdlLmVtaXQoYXR0cmlidXRlKTtcbiAgfVxuICAvKipcbiAgICogQ29tcGlsZXMgYW4gSUQgZm9yIHRoZSBhdHRyaWJ1dGUgbGFiZWwgYnkgdXNpbmcgdGhlIGxhYmVsIGZyb20gdGhlIGJhY2tlbmQgYW5kIGEgcHJlZml4ICdsYWJlbCdcbiAgICogQHBhcmFtIGF0dHJpYnV0ZSBUZXh0ZmllbGQgY29uZmlndXJhdG9yIGF0dHJpYnV0ZS4gQ2FycmllcyB0aGUgYXR0cmlidXRlIGxhYmVsIGluZm9ybWF0aW9uIGZyb20gdGhlIGJhY2tlbmRcbiAgICogQHJldHVybnMgSURcbiAgICovXG4gIGdldElkTGFiZWwoYXR0cmlidXRlOiBDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvbkluZm8pOiBzdHJpbmcge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLlBSRUZJWF9URVhURklFTEQgKyAnbGFiZWwnICsgdGhpcy5nZXRMYWJlbEZvcklkR2VuZXJhdGlvbihhdHRyaWJ1dGUpXG4gICAgKTtcbiAgfVxuICAvKipcbiAgICogQ29tcGlsZXMgYW4gSUQgZm9yIHRoZSBhdHRyaWJ1dGUgdmFsdWUgYnkgdXNpbmcgdGhlIGxhYmVsIGZyb20gdGhlIGJhY2tlbmRcbiAgICogQHBhcmFtIGF0dHJpYnV0ZSBUZXh0ZmllbGQgY29uZmlndXJhdG9yIGF0dHJpYnV0ZS4gQ2FycmllcyB0aGUgYXR0cmlidXRlIGxhYmVsIGluZm9ybWF0aW9uIGZyb20gdGhlIGJhY2tlbmRcbiAgICogQHJldHVybnMgSURcbiAgICovXG4gIGdldElkKGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yVGV4dGZpZWxkLkNvbmZpZ3VyYXRpb25JbmZvKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5QUkVGSVhfVEVYVEZJRUxEICsgdGhpcy5nZXRMYWJlbEZvcklkR2VuZXJhdGlvbihhdHRyaWJ1dGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldExhYmVsRm9ySWRHZW5lcmF0aW9uKFxuICAgIGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yVGV4dGZpZWxkLkNvbmZpZ3VyYXRpb25JbmZvXG4gICk6IHN0cmluZyB7XG4gICAgLy9yZXBsYWNlIHdoaXRlIHNwYWNlcyB3aXRoIGFuIGVtcHR5IHN0cmluZ1xuICAgIHJldHVybiBhdHRyaWJ1dGUuY29uZmlndXJhdGlvbkxhYmVsLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gIH1cbn1cbiIsIjxsYWJlbFxuICBpZD1cInt7IGdldElkTGFiZWwoYXR0cmlidXRlKSB9fVwiXG4gIGNsYXNzPVwiY3gtY29uZmlndXJhdG9yLXRleHRmaWVsZC1sYWJlbFwiXG4gIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2NvbmZpZ3VyYXRvci5hMTF5Lm5hbWVPZkF0dHJpYnV0ZScgfCBjeFRyYW5zbGF0ZVwiXG4gID57eyBhdHRyaWJ1dGUuY29uZmlndXJhdGlvbkxhYmVsIH19PC9sYWJlbFxuPlxuPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgPGlucHV0XG4gICAgW2Zvcm1Db250cm9sXT1cImF0dHJpYnV0ZUlucHV0Rm9ybVwiXG4gICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgIChjaGFuZ2UpPVwib25JbnB1dENoYW5nZSgpXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIlxuICAgICAgJ2NvbmZpZ3VyYXRvci5hMTF5LnZhbHVlT2ZBdHRyaWJ1dGVGdWxsJ1xuICAgICAgICB8IGN4VHJhbnNsYXRlXG4gICAgICAgICAgOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiBhdHRyaWJ1dGUuY29uZmlndXJhdGlvblZhbHVlLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGU6IGF0dHJpYnV0ZS5jb25maWd1cmF0aW9uTGFiZWxcbiAgICAgICAgICAgIH1cbiAgICBcIlxuICAvPlxuPC9kaXY+XG4iXX0=