/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { getLocaleId } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, isDevMode, Optional, } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { LoggerService, } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { timer } from 'rxjs';
import { debounce, take } from 'rxjs/operators';
import { ConfiguratorAttributeInputFieldComponent } from '../input-field/configurator-attribute-input-field.component';
import * as i0 from "@angular/core";
import * as i1 from "./configurator-attribute-numeric-input-field.component.service";
import * as i2 from "../../../config/configurator-ui-settings.config";
import * as i3 from "@spartacus/core";
import * as i4 from "../../composition/configurator-attribute-composition.model";
import * as i5 from "../../../../core/facade/configurator-commons.service";
import * as i6 from "../../../service/configurator-storefront-utils.service";
import * as i7 from "@spartacus/storefront";
import * as i8 from "@angular/forms";
import * as i9 from "@angular/common";
class DefaultSettings {
}
export class ConfiguratorAttributeNumericInputFieldComponent extends ConfiguratorAttributeInputFieldComponent {
    // TODO (CXSPA-3392): make ConfiguratorStorefrontUtilsService a required dependency
    constructor(configAttributeNumericInputFieldService, config, translation, attributeComponentContext, configuratorCommonsService, configuratorStorefrontUtilsService, 
    // TODO:(CXSPA-3392) for next major release remove feature config service
    featureConfigService) {
        super(config, attributeComponentContext, configuratorCommonsService, configuratorStorefrontUtilsService);
        this.configAttributeNumericInputFieldService = configAttributeNumericInputFieldService;
        this.config = config;
        this.translation = translation;
        this.attributeComponentContext = attributeComponentContext;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;
        this.featureConfigService = featureConfigService;
        this.iconType = ICON_TYPE;
        this.intervals = [];
        this.logger = inject(LoggerService);
        this.language = attributeComponentContext.language;
    }
    /**
     * Do we need to display a validation message
     */
    mustDisplayValidationMessage() {
        const wrongFormat = (this.attributeInputForm.dirty || this.attributeInputForm.touched) &&
            this.attributeInputForm.errors?.wrongFormat;
        return wrongFormat;
    }
    /**
     * Do we need to display a validation message concerning intervals
     */
    mustDisplayIntervalMessage() {
        const intervalNotMet = (this.attributeInputForm.dirty || this.attributeInputForm.touched) &&
            this.attributeInputForm.errors?.intervalNotMet;
        return intervalNotMet;
    }
    ngOnInit() {
        this.initializeValidation();
        if (this.attribute.userInput) {
            this.attributeInputForm.setValue(this.attribute.userInput);
        }
        if (this.ownerType === CommonConfigurator.OwnerType.CART_ENTRY &&
            this.attribute.required &&
            this.attribute.incomplete &&
            !this.attributeInputForm.value) {
            this.attributeInputForm.markAsTouched();
        }
        this.sub = this.attributeInputForm.valueChanges
            .pipe(debounce(() => timer(this.config.productConfigurator?.updateDebounceTime?.input ??
            this.FALLBACK_DEBOUNCE_TIME)))
            .subscribe(() => this.onChange());
    }
    initializeValidation() {
        //locales are available as 'languages' in the commerce backend
        this.locale = this.getInstalledLocale(this.language);
        let numDecimalPlaces = this.attribute.numDecimalPlaces;
        let numTotalLength = this.attribute.numTotalLength;
        let negativeAllowed = this.attribute.negativeAllowed;
        if (numDecimalPlaces === undefined ||
            numTotalLength === undefined ||
            negativeAllowed === undefined) {
            //This won't happen in environments with the standard configurators deployed, as numeric
            //attributes do carry these settings. We still introduce default values to ease development
            //of extension use cases, but log a warning
            const defaultSettings = this.getDefaultSettings();
            numDecimalPlaces = defaultSettings.numDecimalPlaces;
            numTotalLength = defaultSettings.numTotalLength;
            negativeAllowed = defaultSettings.negativeAllowed;
            if (isDevMode()) {
                this.logger.warn('Meta data for numeric attribute not present, falling back to defaults');
            }
        }
        if (this.attribute.intervalInDomain) {
            this.intervals =
                this.configAttributeNumericInputFieldService.getIntervals(this.attribute.values);
        }
        const numberFormatValidator = this.configAttributeNumericInputFieldService.getNumberFormatValidator(this.locale, numDecimalPlaces, numTotalLength, negativeAllowed);
        // TODO (CXSPA-3392): for next major release remove feature level
        const validatorArray = this.featureConfigService?.isLevel('6.2')
            ? [
                numberFormatValidator,
                this.configAttributeNumericInputFieldService.getIntervalValidator(this.locale, numDecimalPlaces, numTotalLength, negativeAllowed, this.intervals, this.attribute.userInput),
            ]
            : [numberFormatValidator];
        this.attributeInputForm = new UntypedFormControl('', validatorArray);
        this.numericFormatPattern =
            this.configAttributeNumericInputFieldService.getPatternForValidationMessage(numDecimalPlaces, numTotalLength, negativeAllowed, this.locale);
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
    /**
     * Returns a concatenated help text for multiple intervals.
     */
    getHelpTextForInterval() {
        let intervalText = '';
        let concatenatedIntervalText = '';
        this.intervals.forEach((interval, index) => {
            intervalText = this.getIntervalText(interval);
            if (index > 0) {
                intervalText =
                    intervalText.charAt(0).toLowerCase() + intervalText.slice(1);
                this.translation
                    .translate('configurator.a11y.combinedIntervalsText', {
                    combinedInterval: concatenatedIntervalText,
                    newInterval: intervalText,
                })
                    .pipe(take(1))
                    .subscribe((text) => (concatenatedIntervalText = text));
            }
            else {
                concatenatedIntervalText = intervalText;
            }
        });
        return concatenatedIntervalText.trim();
    }
    /**
     * Returns the combined aria text for attribute and value and the interval help text
     */
    getAriaLabelComplete() {
        let completeAriaText = '';
        if (this.attribute.userInput?.length === 0) {
            this.translation
                .translate('configurator.a11y.valueOfAttributeBlank', {
                attribute: this.attribute.label,
            })
                .pipe(take(1))
                .subscribe((text) => (completeAriaText = text));
        }
        else {
            this.translation
                .translate('configurator.a11y.valueOfAttributeFull', {
                value: this.attribute.userInput,
                attribute: this.attribute.label,
            })
                .pipe(take(1))
                .subscribe((text) => (completeAriaText = text));
        }
        completeAriaText += ' ';
        completeAriaText += this.getHelpTextForInterval();
        return completeAriaText;
    }
    getIntervalText(interval) {
        let intervalText = '';
        let formattedMinValue = '';
        let formattedMaxValue = '';
        if (interval.minValue) {
            formattedMinValue =
                this.configAttributeNumericInputFieldService.formatIntervalValue(interval.minValue, this.attribute.numDecimalPlaces, this.locale);
        }
        if (interval.maxValue) {
            formattedMaxValue =
                this.configAttributeNumericInputFieldService.formatIntervalValue(interval.maxValue, this.attribute.numDecimalPlaces, this.locale);
        }
        if (interval.minValue && interval.maxValue) {
            if (interval.minValue === interval.maxValue) {
                this.translation
                    .translate('configurator.a11y.numericIntervalSingleValue', {
                    value: formattedMinValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (intervalText = text));
                return intervalText;
            }
            intervalText = this.getTextForRealInterval(formattedMinValue, formattedMaxValue, intervalText, interval);
        }
        else {
            intervalText = this.getTextForPartialInterval(interval, intervalText, formattedMinValue, formattedMaxValue);
        }
        return intervalText;
    }
    getTextForPartialInterval(interval, intervalText, formattedMinValue, formattedMaxValue) {
        if (interval.minValue) {
            if (interval.minValueIncluded) {
                intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMinValueIncluded', formattedMinValue);
            }
            else {
                intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMinValue', formattedMinValue);
            }
        }
        else {
            if (interval.maxValue) {
                if (interval.maxValueIncluded) {
                    intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMaxValueIncluded', formattedMaxValue);
                }
                else {
                    intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMaxValue', formattedMaxValue);
                }
            }
        }
        return intervalText;
    }
    getTextForRealInterval(formattedMinValue, formattedMaxValue, intervalText, interval) {
        let textToReturn = intervalText;
        this.translation
            .translate('configurator.a11y.numericIntervalStandard', {
            minValue: formattedMinValue,
            maxValue: formattedMaxValue,
        })
            .pipe(take(1))
            .subscribe((text) => (textToReturn = text));
        if (!interval.minValueIncluded || !interval.maxValueIncluded) {
            if (!interval.minValueIncluded && !interval.maxValueIncluded) {
                textToReturn += ' ';
                textToReturn += this.getAdditionalIntervalText('configurator.a11y.numericIntervalStandardOpen');
            }
            else {
                if (!interval.minValueIncluded) {
                    textToReturn += ' ';
                    textToReturn += this.getAdditionalIntervalText('configurator.a11y.numericIntervalStandardLowerEndpointNotIncluded');
                }
                if (!interval.maxValueIncluded) {
                    textToReturn += ' ';
                    textToReturn += this.getAdditionalIntervalText('configurator.a11y.numericIntervalStandardUpperEndpointNotIncluded');
                }
            }
        }
        return textToReturn;
    }
    getAdditionalIntervalText(key) {
        let intervalText = '';
        this.translation
            .translate(key)
            .pipe(take(1))
            .subscribe((text) => (intervalText = text));
        return intervalText;
    }
    getInfiniteIntervalText(key, value) {
        let intervalText = '';
        this.translation
            .translate(key, {
            value: value,
        })
            .pipe(take(1))
            .subscribe((text) => (intervalText = text));
        return intervalText;
    }
    getDefaultSettings() {
        return { numDecimalPlaces: 2, numTotalLength: 6, negativeAllowed: false };
    }
    getInstalledLocale(locale) {
        try {
            getLocaleId(locale);
            return locale;
        }
        catch {
            this.reportMissingLocaleData(locale);
            return 'en';
        }
    }
    reportMissingLocaleData(lang) {
        if (isDevMode()) {
            this.logger.warn(`ConfigAttributeNumericInputFieldComponent: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`);
        }
    }
}
ConfiguratorAttributeNumericInputFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldComponent, deps: [{ token: i1.ConfiguratorAttributeNumericInputFieldService }, { token: i2.ConfiguratorUISettingsConfig }, { token: i3.TranslationService }, { token: i4.ConfiguratorAttributeCompositionContext }, { token: i5.ConfiguratorCommonsService }, { token: i6.ConfiguratorStorefrontUtilsService, optional: true }, { token: i3.FeatureConfigService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeNumericInputFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeNumericInputFieldComponent, selector: "cx-configurator-attribute-numeric-input-field", usesInheritance: true, ngImport: i0, template: "<label *ngIf=\"attribute.intervalInDomain\" class=\"cx-intervalHelpText\">{{\n  this.getHelpTextForInterval()\n}}</label>\n<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"form-group\">\n  <ng-container *cxFeatureLevel=\"'!6.2'\">\n    <input\n      [formControl]=\"attributeInputForm\"\n      [required]=\"isRequired\"\n      class=\"form-control\"\n      [attr.aria-describedby]=\"\n        mustDisplayValidationMessage()\n          ? createAttributeUiKey('label', attribute.name) +\n            ' ' +\n            createAttributeUiKey('attribute-msg', attribute.name)\n          : createAttributeUiKey('label', attribute.name)\n      \"\n      attr.role=\"{{ attribute.dataType }}\"\n      attr.required=\"{{ attribute.required }}\"\n      (change)=\"onChange()\"\n      maxlength=\"{{ attribute.maxlength }}\"\n      [attr.aria-label]=\"getAriaLabelComplete()\"\n      [cxFocus]=\"{\n        key: createAttributeIdForConfigurator(attribute)\n      }\"\n    />\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <input\n      [formControl]=\"attributeInputForm\"\n      class=\"form-control\"\n      [ngClass]=\"{\n        'cx-required-error-msg ': (showRequiredErrorMessage$ | async)\n      }\"\n      [class.ng-invalid]=\"isRequired && isUserInputEmpty\"\n      [attr.aria-describedby]=\"\n        mustDisplayValidationMessage()\n          ? createAttributeUiKey('label', attribute.name) +\n            ' ' +\n            createAttributeUiKey('attribute-msg', attribute.name)\n          : createAttributeUiKey('label', attribute.name)\n      \"\n      attr.role=\"{{ attribute.dataType }}\"\n      attr.required=\"{{ attribute.required }}\"\n      (change)=\"onChange()\"\n      maxlength=\"{{ attribute.maxlength }}\"\n      [attr.aria-label]=\"getAriaLabelComplete()\"\n      [cxFocus]=\"{\n        key: createAttributeIdForConfigurator(attribute)\n      }\"\n    />\n  </ng-container>\n</div>\n<div\n  class=\"cx-validation-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  *ngIf=\"mustDisplayValidationMessage()\"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <ng-container *cxFeatureLevel=\"'!6.2'\">\n    <cx-icon [type]=\"iconType.WARNING\"></cx-icon>\n    {{\n      'configurator.attribute.wrongNumericFormat'\n        | cxTranslate: { pattern: numericFormatPattern }\n    }}\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n    {{\n      'configurator.attribute.wrongNumericFormatMessage'\n        | cxTranslate: { pattern: numericFormatPattern }\n    }}\n  </ng-container>\n</div>\n<div\n  class=\"cx-validation-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  *ngIf=\"mustDisplayIntervalMessage()\"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n  {{ 'configurator.attribute.wrongIntervalFormat' | cxTranslate }}\n</div>\n", dependencies: [{ kind: "directive", type: i7.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i8.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i8.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i8.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i9.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i7.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i3.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "pipe", type: i9.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-numeric-input-field', changeDetection: ChangeDetectionStrategy.OnPush, template: "<label *ngIf=\"attribute.intervalInDomain\" class=\"cx-intervalHelpText\">{{\n  this.getHelpTextForInterval()\n}}</label>\n<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"form-group\">\n  <ng-container *cxFeatureLevel=\"'!6.2'\">\n    <input\n      [formControl]=\"attributeInputForm\"\n      [required]=\"isRequired\"\n      class=\"form-control\"\n      [attr.aria-describedby]=\"\n        mustDisplayValidationMessage()\n          ? createAttributeUiKey('label', attribute.name) +\n            ' ' +\n            createAttributeUiKey('attribute-msg', attribute.name)\n          : createAttributeUiKey('label', attribute.name)\n      \"\n      attr.role=\"{{ attribute.dataType }}\"\n      attr.required=\"{{ attribute.required }}\"\n      (change)=\"onChange()\"\n      maxlength=\"{{ attribute.maxlength }}\"\n      [attr.aria-label]=\"getAriaLabelComplete()\"\n      [cxFocus]=\"{\n        key: createAttributeIdForConfigurator(attribute)\n      }\"\n    />\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <input\n      [formControl]=\"attributeInputForm\"\n      class=\"form-control\"\n      [ngClass]=\"{\n        'cx-required-error-msg ': (showRequiredErrorMessage$ | async)\n      }\"\n      [class.ng-invalid]=\"isRequired && isUserInputEmpty\"\n      [attr.aria-describedby]=\"\n        mustDisplayValidationMessage()\n          ? createAttributeUiKey('label', attribute.name) +\n            ' ' +\n            createAttributeUiKey('attribute-msg', attribute.name)\n          : createAttributeUiKey('label', attribute.name)\n      \"\n      attr.role=\"{{ attribute.dataType }}\"\n      attr.required=\"{{ attribute.required }}\"\n      (change)=\"onChange()\"\n      maxlength=\"{{ attribute.maxlength }}\"\n      [attr.aria-label]=\"getAriaLabelComplete()\"\n      [cxFocus]=\"{\n        key: createAttributeIdForConfigurator(attribute)\n      }\"\n    />\n  </ng-container>\n</div>\n<div\n  class=\"cx-validation-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  *ngIf=\"mustDisplayValidationMessage()\"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <ng-container *cxFeatureLevel=\"'!6.2'\">\n    <cx-icon [type]=\"iconType.WARNING\"></cx-icon>\n    {{\n      'configurator.attribute.wrongNumericFormat'\n        | cxTranslate: { pattern: numericFormatPattern }\n    }}\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n    {{\n      'configurator.attribute.wrongNumericFormatMessage'\n        | cxTranslate: { pattern: numericFormatPattern }\n    }}\n  </ng-container>\n</div>\n<div\n  class=\"cx-validation-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  *ngIf=\"mustDisplayIntervalMessage()\"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n  {{ 'configurator.attribute.wrongIntervalFormat' | cxTranslate }}\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorAttributeNumericInputFieldService }, { type: i2.ConfiguratorUISettingsConfig }, { type: i3.TranslationService }, { type: i4.ConfiguratorAttributeCompositionContext }, { type: i5.ConfiguratorCommonsService }, { type: i6.ConfiguratorStorefrontUtilsService, decorators: [{
                    type: Optional
                }] }, { type: i3.FeatureConfigService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1udW1lcmljLWlucHV0LWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9hdHRyaWJ1dGUvdHlwZXMvbnVtZXJpYy1pbnB1dC1maWVsZC9jb25maWd1cmF0b3ItYXR0cmlidXRlLW51bWVyaWMtaW5wdXQtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS90eXBlcy9udW1lcmljLWlucHV0LWZpZWxkL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtbnVtZXJpYy1pbnB1dC1maWVsZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEVBR1QsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BELE9BQU8sRUFFTCxhQUFhLEdBRWQsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSWhELE9BQU8sRUFB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LFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVc7YUFDYixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNiLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM5QyxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRVMsa0JBQWtCO1FBQzFCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDNUUsQ0FBQztJQUVTLGtCQUFrQixDQUFDLE1BQWM7UUFDekMsSUFBSTtZQUNGLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixPQUFPLE1BQU0sQ0FBQztTQUNmO1FBQUMsTUFBTTtZQUNOLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQyxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVTLHVCQUF1QixDQUFDLElBQVk7UUFDNUMsSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNkLDZFQUE2RSxJQUFJLDJEQUEyRCxDQUM3SSxDQUFDO1NBQ0g7SUFDSCxDQUFDOzs0SUE3WVUsK0NBQStDO2dJQUEvQywrQ0FBK0MsNEdDL0M1RCwrN0ZBc0ZBOzJGRHZDYSwrQ0FBK0M7a0JBTDNELFNBQVM7K0JBQ0UsK0NBQStDLG1CQUV4Qyx1QkFBdUIsQ0FBQyxNQUFNOzswQkE0QzVDLFFBQVE7OzBCQUdSLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBnZXRMb2NhbGVJZCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBpbmplY3QsXG4gIGlzRGV2TW9kZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVudHlwZWRGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIEZlYXR1cmVDb25maWdTZXJ2aWNlLFxuICBMb2dnZXJTZXJ2aWNlLFxuICBUcmFuc2xhdGlvblNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Db25maWd1cmF0b3IgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbic7XG5pbXBvcnQgeyBJQ09OX1RZUEUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL2ZhY2FkZS9jb25maWd1cmF0b3ItY29tbW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclVJU2V0dGluZ3NDb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb25maWcvY29uZmlndXJhdG9yLXVpLXNldHRpbmdzLmNvbmZpZyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVDb21wb3NpdGlvbkNvbnRleHQgfSBmcm9tICcuLi8uLi9jb21wb3NpdGlvbi9jb25maWd1cmF0b3ItYXR0cmlidXRlLWNvbXBvc2l0aW9uLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUlucHV0RmllbGRDb21wb25lbnQgfSBmcm9tICcuLi9pbnB1dC1maWVsZC9jb25maWd1cmF0b3ItYXR0cmlidXRlLWlucHV0LWZpZWxkLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBDb25maWd1cmF0b3JBdHRyaWJ1dGVOdW1lcmljSW5wdXRGaWVsZFNlcnZpY2UsXG4gIENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnRlcnZhbCxcbn0gZnJvbSAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLW51bWVyaWMtaW5wdXQtZmllbGQuY29tcG9uZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2UvY29uZmlndXJhdG9yLXN0b3JlZnJvbnQtdXRpbHMuc2VydmljZSc7XG5cbmNsYXNzIERlZmF1bHRTZXR0aW5ncyB7XG4gIG51bURlY2ltYWxQbGFjZXM6IG51bWJlcjtcbiAgbnVtVG90YWxMZW5ndGg6IG51bWJlcjtcbiAgbmVnYXRpdmVBbGxvd2VkOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jb25maWd1cmF0b3ItYXR0cmlidXRlLW51bWVyaWMtaW5wdXQtZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1udW1lcmljLWlucHV0LWZpZWxkLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnB1dEZpZWxkQ29tcG9uZW50XG4gIGV4dGVuZHMgQ29uZmlndXJhdG9yQXR0cmlidXRlSW5wdXRGaWVsZENvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XG57XG4gIG51bWVyaWNGb3JtYXRQYXR0ZXJuOiBzdHJpbmc7XG4gIGxvY2FsZTogc3RyaW5nO1xuICBpY29uVHlwZSA9IElDT05fVFlQRTtcbiAgaW50ZXJ2YWxzOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVOdW1lcmljSW50ZXJ2YWxbXSA9IFtdO1xuICBsYW5ndWFnZTogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY29uZmlnQXR0cmlidXRlTnVtZXJpY0lucHV0RmllbGRTZXJ2aWNlOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVOdW1lcmljSW5wdXRGaWVsZFNlcnZpY2UsXG4gICAgY29uZmlnOiBDb25maWd1cmF0b3JVSVNldHRpbmdzQ29uZmlnLFxuICAgIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgYXR0cmlidXRlQ29tcG9uZW50Q29udGV4dDogQ29uZmlndXJhdG9yQXR0cmlidXRlQ29tcG9zaXRpb25Db250ZXh0LFxuICAgIGNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlOiBDb25maWd1cmF0b3JDb21tb25zU2VydmljZSxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3VuaWZpZWQtc2lnbmF0dXJlc1xuICAgIGNvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2U6IENvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2UsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC91bmlmaWVkLXNpZ25hdHVyZXNcbiAgICBmZWF0dXJlQ29uZmlnU2VydmljZTogRmVhdHVyZUNvbmZpZ1NlcnZpY2VcbiAgKTtcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgc2luY2UgNi4yXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBjb25maWdBdHRyaWJ1dGVOdW1lcmljSW5wdXRGaWVsZFNlcnZpY2U6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnB1dEZpZWxkU2VydmljZSxcbiAgICBjb25maWc6IENvbmZpZ3VyYXRvclVJU2V0dGluZ3NDb25maWcsXG4gICAgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uU2VydmljZSxcbiAgICBhdHRyaWJ1dGVDb21wb25lbnRDb250ZXh0OiBDb25maWd1cmF0b3JBdHRyaWJ1dGVDb21wb3NpdGlvbkNvbnRleHQsXG4gICAgY29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2U6IENvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlXG4gICk7XG5cbiAgLy8gVE9ETyAoQ1hTUEEtMzM5Mik6IG1ha2UgQ29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZSBhIHJlcXVpcmVkIGRlcGVuZGVuY3lcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbmZpZ0F0dHJpYnV0ZU51bWVyaWNJbnB1dEZpZWxkU2VydmljZTogQ29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0lucHV0RmllbGRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb25maWc6IENvbmZpZ3VyYXRvclVJU2V0dGluZ3NDb25maWcsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF0dHJpYnV0ZUNvbXBvbmVudENvbnRleHQ6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29udGV4dCxcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2U6IENvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2U/OiBDb25maWd1cmF0b3JTdG9yZWZyb250VXRpbHNTZXJ2aWNlLFxuICAgIC8vIFRPRE86KENYU1BBLTMzOTIpIGZvciBuZXh0IG1ham9yIHJlbGVhc2UgcmVtb3ZlIGZlYXR1cmUgY29uZmlnIHNlcnZpY2VcbiAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgZmVhdHVyZUNvbmZpZ1NlcnZpY2U/OiBGZWF0dXJlQ29uZmlnU2VydmljZVxuICApIHtcbiAgICBzdXBlcihcbiAgICAgIGNvbmZpZyxcbiAgICAgIGF0dHJpYnV0ZUNvbXBvbmVudENvbnRleHQsXG4gICAgICBjb25maWd1cmF0b3JDb21tb25zU2VydmljZSxcbiAgICAgIGNvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2VcbiAgICApO1xuICAgIHRoaXMubGFuZ3VhZ2UgPSBhdHRyaWJ1dGVDb21wb25lbnRDb250ZXh0Lmxhbmd1YWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIERvIHdlIG5lZWQgdG8gZGlzcGxheSBhIHZhbGlkYXRpb24gbWVzc2FnZVxuICAgKi9cbiAgbXVzdERpc3BsYXlWYWxpZGF0aW9uTWVzc2FnZSgpOiBib29sZWFuIHtcbiAgICBjb25zdCB3cm9uZ0Zvcm1hdDogYm9vbGVhbiA9XG4gICAgICAodGhpcy5hdHRyaWJ1dGVJbnB1dEZvcm0uZGlydHkgfHwgdGhpcy5hdHRyaWJ1dGVJbnB1dEZvcm0udG91Y2hlZCkgJiZcbiAgICAgIHRoaXMuYXR0cmlidXRlSW5wdXRGb3JtLmVycm9ycz8ud3JvbmdGb3JtYXQ7XG5cbiAgICByZXR1cm4gd3JvbmdGb3JtYXQ7XG4gIH1cblxuICAvKipcbiAgICogRG8gd2UgbmVlZCB0byBkaXNwbGF5IGEgdmFsaWRhdGlvbiBtZXNzYWdlIGNvbmNlcm5pbmcgaW50ZXJ2YWxzXG4gICAqL1xuICBtdXN0RGlzcGxheUludGVydmFsTWVzc2FnZSgpOiBib29sZWFuIHtcbiAgICBjb25zdCBpbnRlcnZhbE5vdE1ldDogYm9vbGVhbiA9XG4gICAgICAodGhpcy5hdHRyaWJ1dGVJbnB1dEZvcm0uZGlydHkgfHwgdGhpcy5hdHRyaWJ1dGVJbnB1dEZvcm0udG91Y2hlZCkgJiZcbiAgICAgIHRoaXMuYXR0cmlidXRlSW5wdXRGb3JtLmVycm9ycz8uaW50ZXJ2YWxOb3RNZXQ7XG4gICAgcmV0dXJuIGludGVydmFsTm90TWV0O1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplVmFsaWRhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuYXR0cmlidXRlLnVzZXJJbnB1dCkge1xuICAgICAgdGhpcy5hdHRyaWJ1dGVJbnB1dEZvcm0uc2V0VmFsdWUodGhpcy5hdHRyaWJ1dGUudXNlcklucHV0KTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLm93bmVyVHlwZSA9PT0gQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyVHlwZS5DQVJUX0VOVFJZICYmXG4gICAgICB0aGlzLmF0dHJpYnV0ZS5yZXF1aXJlZCAmJlxuICAgICAgdGhpcy5hdHRyaWJ1dGUuaW5jb21wbGV0ZSAmJlxuICAgICAgIXRoaXMuYXR0cmlidXRlSW5wdXRGb3JtLnZhbHVlXG4gICAgKSB7XG4gICAgICB0aGlzLmF0dHJpYnV0ZUlucHV0Rm9ybS5tYXJrQXNUb3VjaGVkKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zdWIgPSB0aGlzLmF0dHJpYnV0ZUlucHV0Rm9ybS52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBkZWJvdW5jZSgoKSA9PlxuICAgICAgICAgIHRpbWVyKFxuICAgICAgICAgICAgdGhpcy5jb25maWcucHJvZHVjdENvbmZpZ3VyYXRvcj8udXBkYXRlRGVib3VuY2VUaW1lPy5pbnB1dCA/P1xuICAgICAgICAgICAgICB0aGlzLkZBTExCQUNLX0RFQk9VTkNFX1RJTUVcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vbkNoYW5nZSgpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0aWFsaXplVmFsaWRhdGlvbigpIHtcbiAgICAvL2xvY2FsZXMgYXJlIGF2YWlsYWJsZSBhcyAnbGFuZ3VhZ2VzJyBpbiB0aGUgY29tbWVyY2UgYmFja2VuZFxuICAgIHRoaXMubG9jYWxlID0gdGhpcy5nZXRJbnN0YWxsZWRMb2NhbGUodGhpcy5sYW5ndWFnZSk7XG5cbiAgICBsZXQgbnVtRGVjaW1hbFBsYWNlcyA9IHRoaXMuYXR0cmlidXRlLm51bURlY2ltYWxQbGFjZXM7XG4gICAgbGV0IG51bVRvdGFsTGVuZ3RoID0gdGhpcy5hdHRyaWJ1dGUubnVtVG90YWxMZW5ndGg7XG4gICAgbGV0IG5lZ2F0aXZlQWxsb3dlZCA9IHRoaXMuYXR0cmlidXRlLm5lZ2F0aXZlQWxsb3dlZDtcblxuICAgIGlmIChcbiAgICAgIG51bURlY2ltYWxQbGFjZXMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgbnVtVG90YWxMZW5ndGggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgbmVnYXRpdmVBbGxvd2VkID09PSB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgIC8vVGhpcyB3b24ndCBoYXBwZW4gaW4gZW52aXJvbm1lbnRzIHdpdGggdGhlIHN0YW5kYXJkIGNvbmZpZ3VyYXRvcnMgZGVwbG95ZWQsIGFzIG51bWVyaWNcbiAgICAgIC8vYXR0cmlidXRlcyBkbyBjYXJyeSB0aGVzZSBzZXR0aW5ncy4gV2Ugc3RpbGwgaW50cm9kdWNlIGRlZmF1bHQgdmFsdWVzIHRvIGVhc2UgZGV2ZWxvcG1lbnRcbiAgICAgIC8vb2YgZXh0ZW5zaW9uIHVzZSBjYXNlcywgYnV0IGxvZyBhIHdhcm5pbmdcbiAgICAgIGNvbnN0IGRlZmF1bHRTZXR0aW5ncyA9IHRoaXMuZ2V0RGVmYXVsdFNldHRpbmdzKCk7XG4gICAgICBudW1EZWNpbWFsUGxhY2VzID0gZGVmYXVsdFNldHRpbmdzLm51bURlY2ltYWxQbGFjZXM7XG4gICAgICBudW1Ub3RhbExlbmd0aCA9IGRlZmF1bHRTZXR0aW5ncy5udW1Ub3RhbExlbmd0aDtcbiAgICAgIG5lZ2F0aXZlQWxsb3dlZCA9IGRlZmF1bHRTZXR0aW5ncy5uZWdhdGl2ZUFsbG93ZWQ7XG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihcbiAgICAgICAgICAnTWV0YSBkYXRhIGZvciBudW1lcmljIGF0dHJpYnV0ZSBub3QgcHJlc2VudCwgZmFsbGluZyBiYWNrIHRvIGRlZmF1bHRzJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5hdHRyaWJ1dGUuaW50ZXJ2YWxJbkRvbWFpbikge1xuICAgICAgdGhpcy5pbnRlcnZhbHMgPVxuICAgICAgICB0aGlzLmNvbmZpZ0F0dHJpYnV0ZU51bWVyaWNJbnB1dEZpZWxkU2VydmljZS5nZXRJbnRlcnZhbHMoXG4gICAgICAgICAgdGhpcy5hdHRyaWJ1dGUudmFsdWVzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgbnVtYmVyRm9ybWF0VmFsaWRhdG9yID1cbiAgICAgIHRoaXMuY29uZmlnQXR0cmlidXRlTnVtZXJpY0lucHV0RmllbGRTZXJ2aWNlLmdldE51bWJlckZvcm1hdFZhbGlkYXRvcihcbiAgICAgICAgdGhpcy5sb2NhbGUsXG4gICAgICAgIG51bURlY2ltYWxQbGFjZXMsXG4gICAgICAgIG51bVRvdGFsTGVuZ3RoLFxuICAgICAgICBuZWdhdGl2ZUFsbG93ZWRcbiAgICAgICk7XG5cbiAgICAvLyBUT0RPIChDWFNQQS0zMzkyKTogZm9yIG5leHQgbWFqb3IgcmVsZWFzZSByZW1vdmUgZmVhdHVyZSBsZXZlbFxuICAgIGNvbnN0IHZhbGlkYXRvckFycmF5ID0gdGhpcy5mZWF0dXJlQ29uZmlnU2VydmljZT8uaXNMZXZlbCgnNi4yJylcbiAgICAgID8gW1xuICAgICAgICAgIG51bWJlckZvcm1hdFZhbGlkYXRvcixcbiAgICAgICAgICB0aGlzLmNvbmZpZ0F0dHJpYnV0ZU51bWVyaWNJbnB1dEZpZWxkU2VydmljZS5nZXRJbnRlcnZhbFZhbGlkYXRvcihcbiAgICAgICAgICAgIHRoaXMubG9jYWxlLFxuICAgICAgICAgICAgbnVtRGVjaW1hbFBsYWNlcyxcbiAgICAgICAgICAgIG51bVRvdGFsTGVuZ3RoLFxuICAgICAgICAgICAgbmVnYXRpdmVBbGxvd2VkLFxuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbHMsXG4gICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZS51c2VySW5wdXRcbiAgICAgICAgICApLFxuICAgICAgICBdXG4gICAgICA6IFtudW1iZXJGb3JtYXRWYWxpZGF0b3JdO1xuXG4gICAgdGhpcy5hdHRyaWJ1dGVJbnB1dEZvcm0gPSBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCB2YWxpZGF0b3JBcnJheSk7XG5cbiAgICB0aGlzLm51bWVyaWNGb3JtYXRQYXR0ZXJuID1cbiAgICAgIHRoaXMuY29uZmlnQXR0cmlidXRlTnVtZXJpY0lucHV0RmllbGRTZXJ2aWNlLmdldFBhdHRlcm5Gb3JWYWxpZGF0aW9uTWVzc2FnZShcbiAgICAgICAgbnVtRGVjaW1hbFBsYWNlcyxcbiAgICAgICAgbnVtVG90YWxMZW5ndGgsXG4gICAgICAgIG5lZ2F0aXZlQWxsb3dlZCxcbiAgICAgICAgdGhpcy5sb2NhbGVcbiAgICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjb25jYXRlbmF0ZWQgaGVscCB0ZXh0IGZvciBtdWx0aXBsZSBpbnRlcnZhbHMuXG4gICAqL1xuICBnZXRIZWxwVGV4dEZvckludGVydmFsKCk6IHN0cmluZyB7XG4gICAgbGV0IGludGVydmFsVGV4dCA9ICcnO1xuICAgIGxldCBjb25jYXRlbmF0ZWRJbnRlcnZhbFRleHQgPSAnJztcblxuICAgIHRoaXMuaW50ZXJ2YWxzLmZvckVhY2goKGludGVydmFsLCBpbmRleCkgPT4ge1xuICAgICAgaW50ZXJ2YWxUZXh0ID0gdGhpcy5nZXRJbnRlcnZhbFRleHQoaW50ZXJ2YWwpO1xuICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICBpbnRlcnZhbFRleHQgPVxuICAgICAgICAgIGludGVydmFsVGV4dC5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIGludGVydmFsVGV4dC5zbGljZSgxKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgICAgIC50cmFuc2xhdGUoJ2NvbmZpZ3VyYXRvci5hMTF5LmNvbWJpbmVkSW50ZXJ2YWxzVGV4dCcsIHtcbiAgICAgICAgICAgIGNvbWJpbmVkSW50ZXJ2YWw6IGNvbmNhdGVuYXRlZEludGVydmFsVGV4dCxcbiAgICAgICAgICAgIG5ld0ludGVydmFsOiBpbnRlcnZhbFRleHQsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHRleHQpID0+IChjb25jYXRlbmF0ZWRJbnRlcnZhbFRleHQgPSB0ZXh0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25jYXRlbmF0ZWRJbnRlcnZhbFRleHQgPSBpbnRlcnZhbFRleHQ7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29uY2F0ZW5hdGVkSW50ZXJ2YWxUZXh0LnRyaW0oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb21iaW5lZCBhcmlhIHRleHQgZm9yIGF0dHJpYnV0ZSBhbmQgdmFsdWUgYW5kIHRoZSBpbnRlcnZhbCBoZWxwIHRleHRcbiAgICovXG4gIGdldEFyaWFMYWJlbENvbXBsZXRlKCk6IHN0cmluZyB7XG4gICAgbGV0IGNvbXBsZXRlQXJpYVRleHQgPSAnJztcbiAgICBpZiAodGhpcy5hdHRyaWJ1dGUudXNlcklucHV0Py5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMudHJhbnNsYXRpb25cbiAgICAgICAgLnRyYW5zbGF0ZSgnY29uZmlndXJhdG9yLmExMXkudmFsdWVPZkF0dHJpYnV0ZUJsYW5rJywge1xuICAgICAgICAgIGF0dHJpYnV0ZTogdGhpcy5hdHRyaWJ1dGUubGFiZWwsXG4gICAgICAgIH0pXG4gICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHRleHQpID0+IChjb21wbGV0ZUFyaWFUZXh0ID0gdGV4dCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRyYW5zbGF0aW9uXG4gICAgICAgIC50cmFuc2xhdGUoJ2NvbmZpZ3VyYXRvci5hMTF5LnZhbHVlT2ZBdHRyaWJ1dGVGdWxsJywge1xuICAgICAgICAgIHZhbHVlOiB0aGlzLmF0dHJpYnV0ZS51c2VySW5wdXQsXG4gICAgICAgICAgYXR0cmlidXRlOiB0aGlzLmF0dHJpYnV0ZS5sYWJlbCxcbiAgICAgICAgfSlcbiAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgLnN1YnNjcmliZSgodGV4dCkgPT4gKGNvbXBsZXRlQXJpYVRleHQgPSB0ZXh0KSk7XG4gICAgfVxuXG4gICAgY29tcGxldGVBcmlhVGV4dCArPSAnICc7XG4gICAgY29tcGxldGVBcmlhVGV4dCArPSB0aGlzLmdldEhlbHBUZXh0Rm9ySW50ZXJ2YWwoKTtcblxuICAgIHJldHVybiBjb21wbGV0ZUFyaWFUZXh0O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEludGVydmFsVGV4dChcbiAgICBpbnRlcnZhbDogQ29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0ludGVydmFsXG4gICk6IHN0cmluZyB7XG4gICAgbGV0IGludGVydmFsVGV4dCA9ICcnO1xuICAgIGxldCBmb3JtYXR0ZWRNaW5WYWx1ZSA9ICcnO1xuICAgIGxldCBmb3JtYXR0ZWRNYXhWYWx1ZSA9ICcnO1xuXG4gICAgaWYgKGludGVydmFsLm1pblZhbHVlKSB7XG4gICAgICBmb3JtYXR0ZWRNaW5WYWx1ZSA9XG4gICAgICAgIHRoaXMuY29uZmlnQXR0cmlidXRlTnVtZXJpY0lucHV0RmllbGRTZXJ2aWNlLmZvcm1hdEludGVydmFsVmFsdWUoXG4gICAgICAgICAgaW50ZXJ2YWwubWluVmFsdWUsXG4gICAgICAgICAgdGhpcy5hdHRyaWJ1dGUubnVtRGVjaW1hbFBsYWNlcyxcbiAgICAgICAgICB0aGlzLmxvY2FsZVxuICAgICAgICApO1xuICAgIH1cbiAgICBpZiAoaW50ZXJ2YWwubWF4VmFsdWUpIHtcbiAgICAgIGZvcm1hdHRlZE1heFZhbHVlID1cbiAgICAgICAgdGhpcy5jb25maWdBdHRyaWJ1dGVOdW1lcmljSW5wdXRGaWVsZFNlcnZpY2UuZm9ybWF0SW50ZXJ2YWxWYWx1ZShcbiAgICAgICAgICBpbnRlcnZhbC5tYXhWYWx1ZSxcbiAgICAgICAgICB0aGlzLmF0dHJpYnV0ZS5udW1EZWNpbWFsUGxhY2VzLFxuICAgICAgICAgIHRoaXMubG9jYWxlXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGludGVydmFsLm1pblZhbHVlICYmIGludGVydmFsLm1heFZhbHVlKSB7XG4gICAgICBpZiAoaW50ZXJ2YWwubWluVmFsdWUgPT09IGludGVydmFsLm1heFZhbHVlKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25cbiAgICAgICAgICAudHJhbnNsYXRlKCdjb25maWd1cmF0b3IuYTExeS5udW1lcmljSW50ZXJ2YWxTaW5nbGVWYWx1ZScsIHtcbiAgICAgICAgICAgIHZhbHVlOiBmb3JtYXR0ZWRNaW5WYWx1ZSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgodGV4dCkgPT4gKGludGVydmFsVGV4dCA9IHRleHQpKTtcbiAgICAgICAgcmV0dXJuIGludGVydmFsVGV4dDtcbiAgICAgIH1cbiAgICAgIGludGVydmFsVGV4dCA9IHRoaXMuZ2V0VGV4dEZvclJlYWxJbnRlcnZhbChcbiAgICAgICAgZm9ybWF0dGVkTWluVmFsdWUsXG4gICAgICAgIGZvcm1hdHRlZE1heFZhbHVlLFxuICAgICAgICBpbnRlcnZhbFRleHQsXG4gICAgICAgIGludGVydmFsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnRlcnZhbFRleHQgPSB0aGlzLmdldFRleHRGb3JQYXJ0aWFsSW50ZXJ2YWwoXG4gICAgICAgIGludGVydmFsLFxuICAgICAgICBpbnRlcnZhbFRleHQsXG4gICAgICAgIGZvcm1hdHRlZE1pblZhbHVlLFxuICAgICAgICBmb3JtYXR0ZWRNYXhWYWx1ZVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGludGVydmFsVGV4dDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRUZXh0Rm9yUGFydGlhbEludGVydmFsKFxuICAgIGludGVydmFsOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVOdW1lcmljSW50ZXJ2YWwsXG4gICAgaW50ZXJ2YWxUZXh0OiBzdHJpbmcsXG4gICAgZm9ybWF0dGVkTWluVmFsdWU6IHN0cmluZyxcbiAgICBmb3JtYXR0ZWRNYXhWYWx1ZTogc3RyaW5nXG4gICkge1xuICAgIGlmIChpbnRlcnZhbC5taW5WYWx1ZSkge1xuICAgICAgaWYgKGludGVydmFsLm1pblZhbHVlSW5jbHVkZWQpIHtcbiAgICAgICAgaW50ZXJ2YWxUZXh0ID0gdGhpcy5nZXRJbmZpbml0ZUludGVydmFsVGV4dChcbiAgICAgICAgICAnY29uZmlndXJhdG9yLmExMXkubnVtZXJpY0luZmluaXRlSW50ZXJ2YWxNaW5WYWx1ZUluY2x1ZGVkJyxcbiAgICAgICAgICBmb3JtYXR0ZWRNaW5WYWx1ZVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW50ZXJ2YWxUZXh0ID0gdGhpcy5nZXRJbmZpbml0ZUludGVydmFsVGV4dChcbiAgICAgICAgICAnY29uZmlndXJhdG9yLmExMXkubnVtZXJpY0luZmluaXRlSW50ZXJ2YWxNaW5WYWx1ZScsXG4gICAgICAgICAgZm9ybWF0dGVkTWluVmFsdWVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGludGVydmFsLm1heFZhbHVlKSB7XG4gICAgICAgIGlmIChpbnRlcnZhbC5tYXhWYWx1ZUluY2x1ZGVkKSB7XG4gICAgICAgICAgaW50ZXJ2YWxUZXh0ID0gdGhpcy5nZXRJbmZpbml0ZUludGVydmFsVGV4dChcbiAgICAgICAgICAgICdjb25maWd1cmF0b3IuYTExeS5udW1lcmljSW5maW5pdGVJbnRlcnZhbE1heFZhbHVlSW5jbHVkZWQnLFxuICAgICAgICAgICAgZm9ybWF0dGVkTWF4VmFsdWVcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGludGVydmFsVGV4dCA9IHRoaXMuZ2V0SW5maW5pdGVJbnRlcnZhbFRleHQoXG4gICAgICAgICAgICAnY29uZmlndXJhdG9yLmExMXkubnVtZXJpY0luZmluaXRlSW50ZXJ2YWxNYXhWYWx1ZScsXG4gICAgICAgICAgICBmb3JtYXR0ZWRNYXhWYWx1ZVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGludGVydmFsVGV4dDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRUZXh0Rm9yUmVhbEludGVydmFsKFxuICAgIGZvcm1hdHRlZE1pblZhbHVlOiBzdHJpbmcsXG4gICAgZm9ybWF0dGVkTWF4VmFsdWU6IHN0cmluZyxcbiAgICBpbnRlcnZhbFRleHQ6IHN0cmluZyxcbiAgICBpbnRlcnZhbDogQ29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0ludGVydmFsXG4gICkge1xuICAgIGxldCB0ZXh0VG9SZXR1cm4gPSBpbnRlcnZhbFRleHQ7XG4gICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgLnRyYW5zbGF0ZSgnY29uZmlndXJhdG9yLmExMXkubnVtZXJpY0ludGVydmFsU3RhbmRhcmQnLCB7XG4gICAgICAgIG1pblZhbHVlOiBmb3JtYXR0ZWRNaW5WYWx1ZSxcbiAgICAgICAgbWF4VmFsdWU6IGZvcm1hdHRlZE1heFZhbHVlLFxuICAgICAgfSlcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKCh0ZXh0KSA9PiAodGV4dFRvUmV0dXJuID0gdGV4dCkpO1xuXG4gICAgaWYgKCFpbnRlcnZhbC5taW5WYWx1ZUluY2x1ZGVkIHx8ICFpbnRlcnZhbC5tYXhWYWx1ZUluY2x1ZGVkKSB7XG4gICAgICBpZiAoIWludGVydmFsLm1pblZhbHVlSW5jbHVkZWQgJiYgIWludGVydmFsLm1heFZhbHVlSW5jbHVkZWQpIHtcbiAgICAgICAgdGV4dFRvUmV0dXJuICs9ICcgJztcbiAgICAgICAgdGV4dFRvUmV0dXJuICs9IHRoaXMuZ2V0QWRkaXRpb25hbEludGVydmFsVGV4dChcbiAgICAgICAgICAnY29uZmlndXJhdG9yLmExMXkubnVtZXJpY0ludGVydmFsU3RhbmRhcmRPcGVuJ1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFpbnRlcnZhbC5taW5WYWx1ZUluY2x1ZGVkKSB7XG4gICAgICAgICAgdGV4dFRvUmV0dXJuICs9ICcgJztcbiAgICAgICAgICB0ZXh0VG9SZXR1cm4gKz0gdGhpcy5nZXRBZGRpdGlvbmFsSW50ZXJ2YWxUZXh0KFxuICAgICAgICAgICAgJ2NvbmZpZ3VyYXRvci5hMTF5Lm51bWVyaWNJbnRlcnZhbFN0YW5kYXJkTG93ZXJFbmRwb2ludE5vdEluY2x1ZGVkJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpbnRlcnZhbC5tYXhWYWx1ZUluY2x1ZGVkKSB7XG4gICAgICAgICAgdGV4dFRvUmV0dXJuICs9ICcgJztcbiAgICAgICAgICB0ZXh0VG9SZXR1cm4gKz0gdGhpcy5nZXRBZGRpdGlvbmFsSW50ZXJ2YWxUZXh0KFxuICAgICAgICAgICAgJ2NvbmZpZ3VyYXRvci5hMTF5Lm51bWVyaWNJbnRlcnZhbFN0YW5kYXJkVXBwZXJFbmRwb2ludE5vdEluY2x1ZGVkJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRleHRUb1JldHVybjtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRBZGRpdGlvbmFsSW50ZXJ2YWxUZXh0KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgaW50ZXJ2YWxUZXh0ID0gJyc7XG4gICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgLnRyYW5zbGF0ZShrZXkpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgodGV4dCkgPT4gKGludGVydmFsVGV4dCA9IHRleHQpKTtcbiAgICByZXR1cm4gaW50ZXJ2YWxUZXh0O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEluZmluaXRlSW50ZXJ2YWxUZXh0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgaW50ZXJ2YWxUZXh0ID0gJyc7XG4gICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgLnRyYW5zbGF0ZShrZXksIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgfSlcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKCh0ZXh0KSA9PiAoaW50ZXJ2YWxUZXh0ID0gdGV4dCkpO1xuICAgIHJldHVybiBpbnRlcnZhbFRleHQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdFNldHRpbmdzKCk6IERlZmF1bHRTZXR0aW5ncyB7XG4gICAgcmV0dXJuIHsgbnVtRGVjaW1hbFBsYWNlczogMiwgbnVtVG90YWxMZW5ndGg6IDYsIG5lZ2F0aXZlQWxsb3dlZDogZmFsc2UgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRJbnN0YWxsZWRMb2NhbGUobG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHRyeSB7XG4gICAgICBnZXRMb2NhbGVJZChsb2NhbGUpO1xuICAgICAgcmV0dXJuIGxvY2FsZTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHRoaXMucmVwb3J0TWlzc2luZ0xvY2FsZURhdGEobG9jYWxlKTtcbiAgICAgIHJldHVybiAnZW4nO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCByZXBvcnRNaXNzaW5nTG9jYWxlRGF0YShsYW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgIGBDb25maWdBdHRyaWJ1dGVOdW1lcmljSW5wdXRGaWVsZENvbXBvbmVudDogTm8gbG9jYWxlIGRhdGEgcmVnaXN0ZXJlZCBmb3IgJyR7bGFuZ30nIChzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9jb21tb24vcmVnaXN0ZXJMb2NhbGVEYXRhKS5gXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIiwiPGxhYmVsICpuZ0lmPVwiYXR0cmlidXRlLmludGVydmFsSW5Eb21haW5cIiBjbGFzcz1cImN4LWludGVydmFsSGVscFRleHRcIj57e1xuICB0aGlzLmdldEhlbHBUZXh0Rm9ySW50ZXJ2YWwoKVxufX08L2xhYmVsPlxuPGRpdiBpZD1cInt7IGNyZWF0ZUF0dHJpYnV0ZUlkRm9yQ29uZmlndXJhdG9yKGF0dHJpYnV0ZSkgfX1cIiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgPG5nLWNvbnRhaW5lciAqY3hGZWF0dXJlTGV2ZWw9XCInITYuMidcIj5cbiAgICA8aW5wdXRcbiAgICAgIFtmb3JtQ29udHJvbF09XCJhdHRyaWJ1dGVJbnB1dEZvcm1cIlxuICAgICAgW3JlcXVpcmVkXT1cImlzUmVxdWlyZWRcIlxuICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCJcbiAgICAgICAgbXVzdERpc3BsYXlWYWxpZGF0aW9uTWVzc2FnZSgpXG4gICAgICAgICAgPyBjcmVhdGVBdHRyaWJ1dGVVaUtleSgnbGFiZWwnLCBhdHRyaWJ1dGUubmFtZSkgK1xuICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgIGNyZWF0ZUF0dHJpYnV0ZVVpS2V5KCdhdHRyaWJ1dGUtbXNnJywgYXR0cmlidXRlLm5hbWUpXG4gICAgICAgICAgOiBjcmVhdGVBdHRyaWJ1dGVVaUtleSgnbGFiZWwnLCBhdHRyaWJ1dGUubmFtZSlcbiAgICAgIFwiXG4gICAgICBhdHRyLnJvbGU9XCJ7eyBhdHRyaWJ1dGUuZGF0YVR5cGUgfX1cIlxuICAgICAgYXR0ci5yZXF1aXJlZD1cInt7IGF0dHJpYnV0ZS5yZXF1aXJlZCB9fVwiXG4gICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKClcIlxuICAgICAgbWF4bGVuZ3RoPVwie3sgYXR0cmlidXRlLm1heGxlbmd0aCB9fVwiXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImdldEFyaWFMYWJlbENvbXBsZXRlKClcIlxuICAgICAgW2N4Rm9jdXNdPVwie1xuICAgICAgICBrZXk6IGNyZWF0ZUF0dHJpYnV0ZUlkRm9yQ29uZmlndXJhdG9yKGF0dHJpYnV0ZSlcbiAgICAgIH1cIlxuICAgIC8+XG4gIDwvbmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyICpjeEZlYXR1cmVMZXZlbD1cIic2LjInXCI+XG4gICAgPGlucHV0XG4gICAgICBbZm9ybUNvbnRyb2xdPVwiYXR0cmlidXRlSW5wdXRGb3JtXCJcbiAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgJ2N4LXJlcXVpcmVkLWVycm9yLW1zZyAnOiAoc2hvd1JlcXVpcmVkRXJyb3JNZXNzYWdlJCB8IGFzeW5jKVxuICAgICAgfVwiXG4gICAgICBbY2xhc3MubmctaW52YWxpZF09XCJpc1JlcXVpcmVkICYmIGlzVXNlcklucHV0RW1wdHlcIlxuICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCJcbiAgICAgICAgbXVzdERpc3BsYXlWYWxpZGF0aW9uTWVzc2FnZSgpXG4gICAgICAgICAgPyBjcmVhdGVBdHRyaWJ1dGVVaUtleSgnbGFiZWwnLCBhdHRyaWJ1dGUubmFtZSkgK1xuICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgIGNyZWF0ZUF0dHJpYnV0ZVVpS2V5KCdhdHRyaWJ1dGUtbXNnJywgYXR0cmlidXRlLm5hbWUpXG4gICAgICAgICAgOiBjcmVhdGVBdHRyaWJ1dGVVaUtleSgnbGFiZWwnLCBhdHRyaWJ1dGUubmFtZSlcbiAgICAgIFwiXG4gICAgICBhdHRyLnJvbGU9XCJ7eyBhdHRyaWJ1dGUuZGF0YVR5cGUgfX1cIlxuICAgICAgYXR0ci5yZXF1aXJlZD1cInt7IGF0dHJpYnV0ZS5yZXF1aXJlZCB9fVwiXG4gICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKClcIlxuICAgICAgbWF4bGVuZ3RoPVwie3sgYXR0cmlidXRlLm1heGxlbmd0aCB9fVwiXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImdldEFyaWFMYWJlbENvbXBsZXRlKClcIlxuICAgICAgW2N4Rm9jdXNdPVwie1xuICAgICAgICBrZXk6IGNyZWF0ZUF0dHJpYnV0ZUlkRm9yQ29uZmlndXJhdG9yKGF0dHJpYnV0ZSlcbiAgICAgIH1cIlxuICAgIC8+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG48ZGl2XG4gIGNsYXNzPVwiY3gtdmFsaWRhdGlvbi1tc2dcIlxuICBpZD1cInt7IGNyZWF0ZUF0dHJpYnV0ZVVpS2V5KCdhdHRyaWJ1dGUtbXNnJywgYXR0cmlidXRlLm5hbWUpIH19XCJcbiAgKm5nSWY9XCJtdXN0RGlzcGxheVZhbGlkYXRpb25NZXNzYWdlKClcIlxuICBhcmlhLWxpdmU9XCJhc3NlcnRpdmVcIlxuICBhcmlhLWF0b21pYz1cInRydWVcIlxuICByb2xlPVwiYWxlcnRcIlxuPlxuICA8bmctY29udGFpbmVyICpjeEZlYXR1cmVMZXZlbD1cIichNi4yJ1wiPlxuICAgIDxjeC1pY29uIFt0eXBlXT1cImljb25UeXBlLldBUk5JTkdcIj48L2N4LWljb24+XG4gICAge3tcbiAgICAgICdjb25maWd1cmF0b3IuYXR0cmlidXRlLndyb25nTnVtZXJpY0Zvcm1hdCdcbiAgICAgICAgfCBjeFRyYW5zbGF0ZTogeyBwYXR0ZXJuOiBudW1lcmljRm9ybWF0UGF0dGVybiB9XG4gICAgfX1cbiAgPC9uZy1jb250YWluZXI+XG4gIDxuZy1jb250YWluZXIgKmN4RmVhdHVyZUxldmVsPVwiJzYuMidcIj5cbiAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZS5FUlJPUlwiPjwvY3gtaWNvbj5cbiAgICB7e1xuICAgICAgJ2NvbmZpZ3VyYXRvci5hdHRyaWJ1dGUud3JvbmdOdW1lcmljRm9ybWF0TWVzc2FnZSdcbiAgICAgICAgfCBjeFRyYW5zbGF0ZTogeyBwYXR0ZXJuOiBudW1lcmljRm9ybWF0UGF0dGVybiB9XG4gICAgfX1cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cbjxkaXZcbiAgY2xhc3M9XCJjeC12YWxpZGF0aW9uLW1zZ1wiXG4gIGlkPVwie3sgY3JlYXRlQXR0cmlidXRlVWlLZXkoJ2F0dHJpYnV0ZS1tc2cnLCBhdHRyaWJ1dGUubmFtZSkgfX1cIlxuICAqbmdJZj1cIm11c3REaXNwbGF5SW50ZXJ2YWxNZXNzYWdlKClcIlxuICBhcmlhLWxpdmU9XCJhc3NlcnRpdmVcIlxuICBhcmlhLWF0b21pYz1cInRydWVcIlxuICByb2xlPVwiYWxlcnRcIlxuPlxuICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZS5FUlJPUlwiPjwvY3gtaWNvbj5cbiAge3sgJ2NvbmZpZ3VyYXRvci5hdHRyaWJ1dGUud3JvbmdJbnRlcnZhbEZvcm1hdCcgfCBjeFRyYW5zbGF0ZSB9fVxuPC9kaXY+XG4iXX0=