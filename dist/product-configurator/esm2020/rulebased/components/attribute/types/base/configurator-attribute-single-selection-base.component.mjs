/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, Optional } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';
import * as i0 from "@angular/core";
import * as i1 from "../../quantity/configurator-attribute-quantity.service";
import * as i2 from "@spartacus/core";
import * as i3 from "../../composition/configurator-attribute-composition.model";
import * as i4 from "../../../../core/facade/configurator-commons.service";
import * as i5 from "../../../service/configurator-storefront-utils.service";
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ConfiguratorAttributeSingleSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
    constructor(quantityService, translation, attributeComponentContext, configuratorCommonsService, configuratorStorefrontUtilsService) {
        super();
        this.quantityService = quantityService;
        this.translation = translation;
        this.attributeComponentContext = attributeComponentContext;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;
        this.loading$ = new BehaviorSubject(false);
        this.showRequiredErrorMessage$ = of(false);
        this.attribute = attributeComponentContext.attribute;
        this.ownerKey = attributeComponentContext.owner.key;
        this.ownerType = attributeComponentContext.owner.type;
        this.language = attributeComponentContext.language;
        this.expMode = attributeComponentContext.expMode;
        if (this.configuratorStorefrontUtilsService) {
            this.showRequiredErrorMessage$ = this.configuratorStorefrontUtilsService
                .isCartEntryOrGroupVisited(attributeComponentContext.owner, attributeComponentContext.group.id)
                .pipe(map((result) => (result &&
                this.isRequiredErrorMsg(this.attribute) &&
                this.isDropDown(this.attribute) &&
                this.isNoValueSelected(this.attribute)) ||
                false));
        }
    }
    /**
     * Checks if we are supposed to render a quantity control, which
     * can be derived from the attribute meta data
     *
     * @return {boolean} - Display quantity picker?
     */
    get withQuantity() {
        return this.quantityService.withQuantity(this.attribute.dataType ?? Configurator.DataType.NOT_IMPLEMENTED, this.attribute.uiType ?? Configurator.UiType.NOT_IMPLEMENTED);
    }
    /**
     * Checks if quantity control should be disabled
     *
     * @return {boolean} - Disable quantity picker?
     */
    get disableQuantityActions() {
        return this.quantityService.disableQuantityActions(this.attribute.selectedSingleValue);
    }
    onSelect(value) {
        this.loading$.next(true);
        this.configuratorCommonsService.updateConfiguration(this.ownerKey, {
            ...this.attribute,
            selectedSingleValue: value,
        }, Configurator.UpdateType.ATTRIBUTE);
    }
    onSelectAdditionalValue(event) {
        const userInput = event.changedAttribute.userInput;
        if (userInput) {
            this.loading$.next(true);
            event.changedAttribute.selectedSingleValue = userInput;
            this.configuratorCommonsService.updateConfiguration(event.ownerKey, event.changedAttribute, Configurator.UpdateType.ATTRIBUTE);
        }
    }
    onHandleQuantity(quantity) {
        this.loading$.next(true);
        this.configuratorCommonsService.updateConfiguration(this.ownerKey, {
            ...this.attribute,
            quantity,
        }, Configurator.UpdateType.ATTRIBUTE_QUANTITY);
    }
    onChangeQuantity(eventObject, form) {
        if (!eventObject) {
            if (form) {
                form.setValue('0');
            }
            this.onSelect('');
        }
        else {
            this.onHandleQuantity(eventObject);
        }
    }
    getInitialQuantity(form) {
        const quantity = this.attribute.quantity ?? 0;
        if (form) {
            return form.value !== '0' ? quantity : 0;
        }
        else {
            return this.attribute.selectedSingleValue ? quantity : 0;
        }
    }
    /**
     *  Extract corresponding quantity parameters
     *
     * @param {FormControl} form - Form control
     * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
     */
    extractQuantityParameters(form) {
        const initialQuantity = this.getInitialQuantity(form);
        const disableQuantityActions$ = this.loading$.pipe(map((loading) => {
            return loading || this.disableQuantityActions;
        }));
        return {
            allowZero: !this.attribute.required,
            initialQuantity: initialQuantity,
            disableQuantityActions$: disableQuantityActions$,
        };
    }
    /**
     * Extract corresponding price formula parameters.
     * For the single-selection attribute types the complete price formula should be displayed at the attribute level.
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        return {
            quantity: this.attribute.quantity,
            price: this.getSelectedValuePrice(),
            priceTotal: this.attribute.attributePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Extract corresponding value price formula parameters.
     * For the single-selection attribute types only value price should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value) {
        return {
            price: value?.valuePrice,
            isLightedUp: value ? value.selected : false,
        };
    }
    getSelectedValuePrice() {
        return this.attribute.values?.find((value) => value.selected)?.valuePrice;
    }
    get isAdditionalValueNumeric() {
        return (this.isWithAdditionalValues(this.attribute) &&
            this.attribute.validationType === Configurator.ValidationType.NUMERIC);
    }
    get isAdditionalValueAlphaNumeric() {
        return (this.isWithAdditionalValues(this.attribute) &&
            this.attribute.validationType === Configurator.ValidationType.NONE);
    }
    getAriaLabel(value, attribute) {
        const ariaLabel = this.getAriaLabelWithoutAdditionalValue(value, attribute);
        if (this.isWithAdditionalValues(this.attribute)) {
            const ariaLabelWithAdditionalValue = this.getAdditionalValueAriaLabel();
            return ariaLabel + ' ' + ariaLabelWithAdditionalValue;
        }
        else {
            return ariaLabel;
        }
    }
    getAdditionalValueAriaLabel() {
        let ariaLabel = '';
        this.translation
            .translate('configurator.a11y.additionalValue')
            .pipe(take(1))
            .subscribe((text) => (ariaLabel = text));
        return ariaLabel;
    }
    getAriaLabelWithoutAdditionalValue(value, attribute) {
        let ariaLabel = '';
        if (value.valuePrice && value.valuePrice?.value !== 0) {
            if (value.valuePriceTotal && value.valuePriceTotal?.value !== 0) {
                this.translation
                    .translate('configurator.a11y.selectedValueOfAttributeFullWithPrice', {
                    value: value.valueDisplay,
                    attribute: attribute.label,
                    price: value.valuePriceTotal.formattedValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (ariaLabel = text));
            }
            else {
                this.translation
                    .translate('configurator.a11y.selectedValueOfAttributeFullWithPrice', {
                    value: value.valueDisplay,
                    attribute: attribute.label,
                    price: value.valuePrice.formattedValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (ariaLabel = text));
            }
        }
        else {
            this.translation
                .translate('configurator.a11y.selectedValueOfAttributeFull', {
                value: value.valueDisplay,
                attribute: attribute.label,
            })
                .pipe(take(1))
                .subscribe((text) => (ariaLabel = text));
        }
        return ariaLabel;
    }
}
ConfiguratorAttributeSingleSelectionBaseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBaseComponent, deps: [{ token: i1.ConfiguratorAttributeQuantityService }, { token: i2.TranslationService }, { token: i3.ConfiguratorAttributeCompositionContext }, { token: i4.ConfiguratorCommonsService }, { token: i5.ConfiguratorStorefrontUtilsService, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
ConfiguratorAttributeSingleSelectionBaseComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeSingleSelectionBaseComponent, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBaseComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorAttributeQuantityService }, { type: i2.TranslationService }, { type: i3.ConfiguratorAttributeCompositionContext }, { type: i4.ConfiguratorCommonsService }, { type: i5.ConfiguratorStorefrontUtilsService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1zaW5nbGUtc2VsZWN0aW9uLWJhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS90eXBlcy9iYXNlL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtc2luZ2xlLXNlbGVjdGlvbi1iYXNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHcEQsT0FBTyxFQUFFLGVBQWUsRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFNekUsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7Ozs7Ozs7QUFJN0Ysa0VBQWtFO0FBQ2xFLE1BQU0sT0FBZ0IsaURBQWtELFNBQVEsa0NBQWtDO0lBK0JoSCxZQUNZLGVBQXFELEVBQ3JELFdBQStCLEVBQy9CLHlCQUFrRSxFQUNsRSwwQkFBc0QsRUFFdEQsa0NBQXVFO1FBRWpGLEtBQUssRUFBRSxDQUFDO1FBUEUsb0JBQWUsR0FBZixlQUFlLENBQXNDO1FBQ3JELGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQiw4QkFBeUIsR0FBekIseUJBQXlCLENBQXlDO1FBQ2xFLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUFFdEQsdUNBQWtDLEdBQWxDLGtDQUFrQyxDQUFxQztRQXBDbkYsYUFBUSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBUS9DLDhCQUF5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QUFDO3FCQUNiLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsV0FBVztxQkFDYixTQUFTLENBQ1IseURBQXlELEVBQ3pEO29CQUNFLEtBQUssRUFBRSxLQUFLLENBQUMsWUFBWTtvQkFDekIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxLQUFLO29CQUMxQixLQUFLLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxjQUFjO2lCQUN2QyxDQUNGO3FCQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2IsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzVDO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXO2lCQUNiLFNBQVMsQ0FBQyxnREFBZ0QsRUFBRTtnQkFDM0QsS0FBSyxFQUFFLEtBQUssQ0FBQyxZQUFZO2dCQUN6QixTQUFTLEVBQUUsU0FBUyxDQUFDLEtBQUs7YUFDM0IsQ0FBQztpQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7OzhJQTVSbUIsaURBQWlEO2tJQUFqRCxpREFBaUQ7MkZBQWpELGlEQUFpRDtrQkFGdEUsU0FBUzs7MEJBc0NMLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBUcmFuc2xhdGlvblNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL2ZhY2FkZS9jb25maWd1cmF0b3ItY29tbW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IG1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29udGV4dCB9IGZyb20gJy4uLy4uL2NvbXBvc2l0aW9uL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtY29tcG9zaXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgQ29uZmlnRm9ybVVwZGF0ZUV2ZW50IH0gZnJvbSAnLi4vLi4vLi4vZm9ybS9jb25maWd1cmF0b3ItZm9ybS5ldmVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JQcmljZUNvbXBvbmVudE9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9wcmljZS9jb25maWd1cmF0b3ItcHJpY2UuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5Q29tcG9uZW50T3B0aW9ucyB9IGZyb20gJy4uLy4uL3F1YW50aXR5L2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcXVhbnRpdHkuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5U2VydmljZSB9IGZyb20gJy4uLy4uL3F1YW50aXR5L2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcXVhbnRpdHkuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLWJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlL2NvbmZpZ3VyYXRvci1zdG9yZWZyb250LXV0aWxzLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKClcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbmZpZ3VyYXRvckF0dHJpYnV0ZVNpbmdsZVNlbGVjdGlvbkJhc2VDb21wb25lbnQgZXh0ZW5kcyBDb25maWd1cmF0b3JBdHRyaWJ1dGVCYXNlQ29tcG9uZW50IHtcbiAgbG9hZGluZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBhdHRyaWJ1dGU6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGU7XG4gIG93bmVyS2V5OiBzdHJpbmc7XG4gIG93bmVyVHlwZTogc3RyaW5nO1xuICBsYW5ndWFnZTogc3RyaW5nO1xuICBleHBNb2RlOiBib29sZWFuO1xuXG4gIHNob3dSZXF1aXJlZEVycm9yTWVzc2FnZSQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSBvZihmYWxzZSk7XG5cbiAgLy8gVE9ETyAoQ1hTUEEtMzM5Mik6IG1ha2UgQ29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZSBhIHJlcXVpcmVkIGRlcGVuZGVuY3lcbiAgY29uc3RydWN0b3IoXG4gICAgcXVhbnRpdHlTZXJ2aWNlOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eVNlcnZpY2UsXG4gICAgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uU2VydmljZSxcbiAgICBhdHRyaWJ1dGVDb21wb25lbnRDb250ZXh0OiBDb25maWd1cmF0b3JBdHRyaWJ1dGVDb21wb3NpdGlvbkNvbnRleHQsXG4gICAgY29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2U6IENvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvdW5pZmllZC1zaWduYXR1cmVzXG4gICAgY29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZT86IENvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2VcbiAgKTtcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgc2luY2UgNi4yXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBxdWFudGl0eVNlcnZpY2U6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5U2VydmljZSxcbiAgICB0cmFuc2xhdGlvbjogVHJhbnNsYXRpb25TZXJ2aWNlLFxuICAgIGF0dHJpYnV0ZUNvbXBvbmVudENvbnRleHQ6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29udGV4dCxcbiAgICBjb25maWd1cmF0b3JDb21tb25zU2VydmljZTogQ29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2VcbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcXVhbnRpdHlTZXJ2aWNlOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF0dHJpYnV0ZUNvbXBvbmVudENvbnRleHQ6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUNvbXBvc2l0aW9uQ29udGV4dCxcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2U6IENvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2U/OiBDb25maWd1cmF0b3JTdG9yZWZyb250VXRpbHNTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmF0dHJpYnV0ZSA9IGF0dHJpYnV0ZUNvbXBvbmVudENvbnRleHQuYXR0cmlidXRlO1xuICAgIHRoaXMub3duZXJLZXkgPSBhdHRyaWJ1dGVDb21wb25lbnRDb250ZXh0Lm93bmVyLmtleTtcbiAgICB0aGlzLm93bmVyVHlwZSA9IGF0dHJpYnV0ZUNvbXBvbmVudENvbnRleHQub3duZXIudHlwZTtcbiAgICB0aGlzLmxhbmd1YWdlID0gYXR0cmlidXRlQ29tcG9uZW50Q29udGV4dC5sYW5ndWFnZTtcbiAgICB0aGlzLmV4cE1vZGUgPSBhdHRyaWJ1dGVDb21wb25lbnRDb250ZXh0LmV4cE1vZGU7XG5cbiAgICBpZiAodGhpcy5jb25maWd1cmF0b3JTdG9yZWZyb250VXRpbHNTZXJ2aWNlKSB7XG4gICAgICB0aGlzLnNob3dSZXF1aXJlZEVycm9yTWVzc2FnZSQgPSB0aGlzLmNvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2VcbiAgICAgICAgLmlzQ2FydEVudHJ5T3JHcm91cFZpc2l0ZWQoXG4gICAgICAgICAgYXR0cmlidXRlQ29tcG9uZW50Q29udGV4dC5vd25lcixcbiAgICAgICAgICBhdHRyaWJ1dGVDb21wb25lbnRDb250ZXh0Lmdyb3VwLmlkXG4gICAgICAgIClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKFxuICAgICAgICAgICAgKHJlc3VsdCkgPT5cbiAgICAgICAgICAgICAgKHJlc3VsdCAmJlxuICAgICAgICAgICAgICAgIHRoaXMuaXNSZXF1aXJlZEVycm9yTXNnKHRoaXMuYXR0cmlidXRlKSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuaXNEcm9wRG93bih0aGlzLmF0dHJpYnV0ZSkgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmlzTm9WYWx1ZVNlbGVjdGVkKHRoaXMuYXR0cmlidXRlKSkgfHxcbiAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB3ZSBhcmUgc3VwcG9zZWQgdG8gcmVuZGVyIGEgcXVhbnRpdHkgY29udHJvbCwgd2hpY2hcbiAgICogY2FuIGJlIGRlcml2ZWQgZnJvbSB0aGUgYXR0cmlidXRlIG1ldGEgZGF0YVxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtIERpc3BsYXkgcXVhbnRpdHkgcGlja2VyP1xuICAgKi9cbiAgZ2V0IHdpdGhRdWFudGl0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5xdWFudGl0eVNlcnZpY2Uud2l0aFF1YW50aXR5KFxuICAgICAgdGhpcy5hdHRyaWJ1dGUuZGF0YVR5cGUgPz8gQ29uZmlndXJhdG9yLkRhdGFUeXBlLk5PVF9JTVBMRU1FTlRFRCxcbiAgICAgIHRoaXMuYXR0cmlidXRlLnVpVHlwZSA/PyBDb25maWd1cmF0b3IuVWlUeXBlLk5PVF9JTVBMRU1FTlRFRFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHF1YW50aXR5IGNvbnRyb2wgc2hvdWxkIGJlIGRpc2FibGVkXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gRGlzYWJsZSBxdWFudGl0eSBwaWNrZXI/XG4gICAqL1xuICBnZXQgZGlzYWJsZVF1YW50aXR5QWN0aW9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5xdWFudGl0eVNlcnZpY2UuZGlzYWJsZVF1YW50aXR5QWN0aW9ucyhcbiAgICAgIHRoaXMuYXR0cmlidXRlLnNlbGVjdGVkU2luZ2xlVmFsdWVcbiAgICApO1xuICB9XG5cbiAgb25TZWxlY3QodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyQubmV4dCh0cnVlKTtcbiAgICB0aGlzLmNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlLnVwZGF0ZUNvbmZpZ3VyYXRpb24oXG4gICAgICB0aGlzLm93bmVyS2V5LFxuICAgICAge1xuICAgICAgICAuLi50aGlzLmF0dHJpYnV0ZSxcbiAgICAgICAgc2VsZWN0ZWRTaW5nbGVWYWx1ZTogdmFsdWUsXG4gICAgICB9LFxuICAgICAgQ29uZmlndXJhdG9yLlVwZGF0ZVR5cGUuQVRUUklCVVRFXG4gICAgKTtcbiAgfVxuXG4gIG9uU2VsZWN0QWRkaXRpb25hbFZhbHVlKGV2ZW50OiBDb25maWdGb3JtVXBkYXRlRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB1c2VySW5wdXQgPSBldmVudC5jaGFuZ2VkQXR0cmlidXRlLnVzZXJJbnB1dDtcblxuICAgIGlmICh1c2VySW5wdXQpIHtcbiAgICAgIHRoaXMubG9hZGluZyQubmV4dCh0cnVlKTtcbiAgICAgIGV2ZW50LmNoYW5nZWRBdHRyaWJ1dGUuc2VsZWN0ZWRTaW5nbGVWYWx1ZSA9IHVzZXJJbnB1dDtcbiAgICAgIHRoaXMuY29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2UudXBkYXRlQ29uZmlndXJhdGlvbihcbiAgICAgICAgZXZlbnQub3duZXJLZXksXG4gICAgICAgIGV2ZW50LmNoYW5nZWRBdHRyaWJ1dGUsXG4gICAgICAgIENvbmZpZ3VyYXRvci5VcGRhdGVUeXBlLkFUVFJJQlVURVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBvbkhhbmRsZVF1YW50aXR5KHF1YW50aXR5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmckLm5leHQodHJ1ZSk7XG5cbiAgICB0aGlzLmNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlLnVwZGF0ZUNvbmZpZ3VyYXRpb24oXG4gICAgICB0aGlzLm93bmVyS2V5LFxuICAgICAge1xuICAgICAgICAuLi50aGlzLmF0dHJpYnV0ZSxcbiAgICAgICAgcXVhbnRpdHksXG4gICAgICB9LFxuICAgICAgQ29uZmlndXJhdG9yLlVwZGF0ZVR5cGUuQVRUUklCVVRFX1FVQU5USVRZXG4gICAgKTtcbiAgfVxuXG4gIG9uQ2hhbmdlUXVhbnRpdHkoZXZlbnRPYmplY3Q6IGFueSwgZm9ybT86IFVudHlwZWRGb3JtQ29udHJvbCk6IHZvaWQge1xuICAgIGlmICghZXZlbnRPYmplY3QpIHtcbiAgICAgIGlmIChmb3JtKSB7XG4gICAgICAgIGZvcm0uc2V0VmFsdWUoJzAnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25TZWxlY3QoJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uSGFuZGxlUXVhbnRpdHkoZXZlbnRPYmplY3QpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRJbml0aWFsUXVhbnRpdHkoZm9ybT86IFVudHlwZWRGb3JtQ29udHJvbCk6IG51bWJlciB7XG4gICAgY29uc3QgcXVhbnRpdHk6IG51bWJlciA9IHRoaXMuYXR0cmlidXRlLnF1YW50aXR5ID8/IDA7XG4gICAgaWYgKGZvcm0pIHtcbiAgICAgIHJldHVybiBmb3JtLnZhbHVlICE9PSAnMCcgPyBxdWFudGl0eSA6IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZS5zZWxlY3RlZFNpbmdsZVZhbHVlID8gcXVhbnRpdHkgOiAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAgRXh0cmFjdCBjb3JyZXNwb25kaW5nIHF1YW50aXR5IHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtGb3JtQ29udHJvbH0gZm9ybSAtIEZvcm0gY29udHJvbFxuICAgKiBAcmV0dXJuIHtDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eUNvbXBvbmVudE9wdGlvbnN9IC0gTmV3IHF1YW50aXR5IG9wdGlvbnNcbiAgICovXG4gIGV4dHJhY3RRdWFudGl0eVBhcmFtZXRlcnMoXG4gICAgZm9ybT86IFVudHlwZWRGb3JtQ29udHJvbFxuICApOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eUNvbXBvbmVudE9wdGlvbnMge1xuICAgIGNvbnN0IGluaXRpYWxRdWFudGl0eSA9IHRoaXMuZ2V0SW5pdGlhbFF1YW50aXR5KGZvcm0pO1xuICAgIGNvbnN0IGRpc2FibGVRdWFudGl0eUFjdGlvbnMkID0gdGhpcy5sb2FkaW5nJC5waXBlKFxuICAgICAgbWFwKChsb2FkaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiBsb2FkaW5nIHx8IHRoaXMuZGlzYWJsZVF1YW50aXR5QWN0aW9ucztcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHJldHVybiB7XG4gICAgICBhbGxvd1plcm86ICF0aGlzLmF0dHJpYnV0ZS5yZXF1aXJlZCxcbiAgICAgIGluaXRpYWxRdWFudGl0eTogaW5pdGlhbFF1YW50aXR5LFxuICAgICAgZGlzYWJsZVF1YW50aXR5QWN0aW9ucyQ6IGRpc2FibGVRdWFudGl0eUFjdGlvbnMkLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCBjb3JyZXNwb25kaW5nIHByaWNlIGZvcm11bGEgcGFyYW1ldGVycy5cbiAgICogRm9yIHRoZSBzaW5nbGUtc2VsZWN0aW9uIGF0dHJpYnV0ZSB0eXBlcyB0aGUgY29tcGxldGUgcHJpY2UgZm9ybXVsYSBzaG91bGQgYmUgZGlzcGxheWVkIGF0IHRoZSBhdHRyaWJ1dGUgbGV2ZWwuXG4gICAqXG4gICAqIEByZXR1cm4ge0NvbmZpZ3VyYXRvclByaWNlQ29tcG9uZW50T3B0aW9uc30gLSBOZXcgcHJpY2UgZm9ybXVsYVxuICAgKi9cbiAgZXh0cmFjdFByaWNlRm9ybXVsYVBhcmFtZXRlcnMoKTogQ29uZmlndXJhdG9yUHJpY2VDb21wb25lbnRPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVhbnRpdHk6IHRoaXMuYXR0cmlidXRlLnF1YW50aXR5LFxuICAgICAgcHJpY2U6IHRoaXMuZ2V0U2VsZWN0ZWRWYWx1ZVByaWNlKCksXG4gICAgICBwcmljZVRvdGFsOiB0aGlzLmF0dHJpYnV0ZS5hdHRyaWJ1dGVQcmljZVRvdGFsLFxuICAgICAgaXNMaWdodGVkVXA6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0IGNvcnJlc3BvbmRpbmcgdmFsdWUgcHJpY2UgZm9ybXVsYSBwYXJhbWV0ZXJzLlxuICAgKiBGb3IgdGhlIHNpbmdsZS1zZWxlY3Rpb24gYXR0cmlidXRlIHR5cGVzIG9ubHkgdmFsdWUgcHJpY2Ugc2hvdWxkIGJlIGRpc3BsYXllZCBhdCB0aGUgdmFsdWUgbGV2ZWwuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLlZhbHVlfSB2YWx1ZSAtIENvbmZpZ3VyYXRvciB2YWx1ZVxuICAgKiBAcmV0dXJuIHtDb25maWd1cmF0b3JQcmljZUNvbXBvbmVudE9wdGlvbnN9IC0gTmV3IHByaWNlIGZvcm11bGFcbiAgICovXG4gIGV4dHJhY3RWYWx1ZVByaWNlRm9ybXVsYVBhcmFtZXRlcnMoXG4gICAgdmFsdWU/OiBDb25maWd1cmF0b3IuVmFsdWVcbiAgKTogQ29uZmlndXJhdG9yUHJpY2VDb21wb25lbnRPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJpY2U6IHZhbHVlPy52YWx1ZVByaWNlLFxuICAgICAgaXNMaWdodGVkVXA6IHZhbHVlID8gdmFsdWUuc2VsZWN0ZWQgOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFNlbGVjdGVkVmFsdWVQcmljZSgpOiBDb25maWd1cmF0b3IuUHJpY2VEZXRhaWxzIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGUudmFsdWVzPy5maW5kKCh2YWx1ZSkgPT4gdmFsdWUuc2VsZWN0ZWQpPy52YWx1ZVByaWNlO1xuICB9XG5cbiAgZ2V0IGlzQWRkaXRpb25hbFZhbHVlTnVtZXJpYygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5pc1dpdGhBZGRpdGlvbmFsVmFsdWVzKHRoaXMuYXR0cmlidXRlKSAmJlxuICAgICAgdGhpcy5hdHRyaWJ1dGUudmFsaWRhdGlvblR5cGUgPT09IENvbmZpZ3VyYXRvci5WYWxpZGF0aW9uVHlwZS5OVU1FUklDXG4gICAgKTtcbiAgfVxuXG4gIGdldCBpc0FkZGl0aW9uYWxWYWx1ZUFscGhhTnVtZXJpYygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5pc1dpdGhBZGRpdGlvbmFsVmFsdWVzKHRoaXMuYXR0cmlidXRlKSAmJlxuICAgICAgdGhpcy5hdHRyaWJ1dGUudmFsaWRhdGlvblR5cGUgPT09IENvbmZpZ3VyYXRvci5WYWxpZGF0aW9uVHlwZS5OT05FXG4gICAgKTtcbiAgfVxuXG4gIGdldEFyaWFMYWJlbChcbiAgICB2YWx1ZTogQ29uZmlndXJhdG9yLlZhbHVlLFxuICAgIGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZVxuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IGFyaWFMYWJlbCA9IHRoaXMuZ2V0QXJpYUxhYmVsV2l0aG91dEFkZGl0aW9uYWxWYWx1ZSh2YWx1ZSwgYXR0cmlidXRlKTtcbiAgICBpZiAodGhpcy5pc1dpdGhBZGRpdGlvbmFsVmFsdWVzKHRoaXMuYXR0cmlidXRlKSkge1xuICAgICAgY29uc3QgYXJpYUxhYmVsV2l0aEFkZGl0aW9uYWxWYWx1ZSA9IHRoaXMuZ2V0QWRkaXRpb25hbFZhbHVlQXJpYUxhYmVsKCk7XG4gICAgICByZXR1cm4gYXJpYUxhYmVsICsgJyAnICsgYXJpYUxhYmVsV2l0aEFkZGl0aW9uYWxWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFyaWFMYWJlbDtcbiAgICB9XG4gIH1cblxuICBnZXRBZGRpdGlvbmFsVmFsdWVBcmlhTGFiZWwoKTogc3RyaW5nIHtcbiAgICBsZXQgYXJpYUxhYmVsID0gJyc7XG4gICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgLnRyYW5zbGF0ZSgnY29uZmlndXJhdG9yLmExMXkuYWRkaXRpb25hbFZhbHVlJylcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKCh0ZXh0KSA9PiAoYXJpYUxhYmVsID0gdGV4dCkpO1xuICAgIHJldHVybiBhcmlhTGFiZWw7XG4gIH1cblxuICBnZXRBcmlhTGFiZWxXaXRob3V0QWRkaXRpb25hbFZhbHVlKFxuICAgIHZhbHVlOiBDb25maWd1cmF0b3IuVmFsdWUsXG4gICAgYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlXG4gICk6IHN0cmluZyB7XG4gICAgbGV0IGFyaWFMYWJlbCA9ICcnO1xuICAgIGlmICh2YWx1ZS52YWx1ZVByaWNlICYmIHZhbHVlLnZhbHVlUHJpY2U/LnZhbHVlICE9PSAwKSB7XG4gICAgICBpZiAodmFsdWUudmFsdWVQcmljZVRvdGFsICYmIHZhbHVlLnZhbHVlUHJpY2VUb3RhbD8udmFsdWUgIT09IDApIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgICAgIC50cmFuc2xhdGUoXG4gICAgICAgICAgICAnY29uZmlndXJhdG9yLmExMXkuc2VsZWN0ZWRWYWx1ZU9mQXR0cmlidXRlRnVsbFdpdGhQcmljZScsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZS52YWx1ZURpc3BsYXksXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlLmxhYmVsLFxuICAgICAgICAgICAgICBwcmljZTogdmFsdWUudmFsdWVQcmljZVRvdGFsLmZvcm1hdHRlZFZhbHVlLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHRleHQpID0+IChhcmlhTGFiZWwgPSB0ZXh0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uXG4gICAgICAgICAgLnRyYW5zbGF0ZShcbiAgICAgICAgICAgICdjb25maWd1cmF0b3IuYTExeS5zZWxlY3RlZFZhbHVlT2ZBdHRyaWJ1dGVGdWxsV2l0aFByaWNlJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLnZhbHVlRGlzcGxheSxcbiAgICAgICAgICAgICAgYXR0cmlidXRlOiBhdHRyaWJ1dGUubGFiZWwsXG4gICAgICAgICAgICAgIHByaWNlOiB2YWx1ZS52YWx1ZVByaWNlLmZvcm1hdHRlZFZhbHVlLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHRleHQpID0+IChhcmlhTGFiZWwgPSB0ZXh0KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudHJhbnNsYXRpb25cbiAgICAgICAgLnRyYW5zbGF0ZSgnY29uZmlndXJhdG9yLmExMXkuc2VsZWN0ZWRWYWx1ZU9mQXR0cmlidXRlRnVsbCcsIHtcbiAgICAgICAgICB2YWx1ZTogdmFsdWUudmFsdWVEaXNwbGF5LFxuICAgICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlLmxhYmVsLFxuICAgICAgICB9KVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKCh0ZXh0KSA9PiAoYXJpYUxhYmVsID0gdGV4dCkpO1xuICAgIH1cbiAgICByZXR1cm4gYXJpYUxhYmVsO1xuICB9XG59XG4iXX0=