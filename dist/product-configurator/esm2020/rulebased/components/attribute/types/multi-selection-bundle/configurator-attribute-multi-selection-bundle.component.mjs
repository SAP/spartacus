/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeMultiSelectionBaseComponent } from '../base/configurator-attribute-multi-selection-base.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../product-card/configurator-attribute-product-card.component";
import * as i3 from "../../quantity/configurator-attribute-quantity.component";
import * as i4 from "../../../price/configurator-price.component";
export class ConfiguratorAttributeMultiSelectionBundleComponent extends ConfiguratorAttributeMultiSelectionBaseComponent {
    constructor() {
        super(...arguments);
        this.preventAction$ = new BehaviorSubject(false);
        this.multipleSelectionValues = [];
    }
    ngOnInit() {
        this.initialize();
    }
    /**
     * Initializes selection values and peventAction observable
     */
    initialize() {
        if (this.attribute.values && this.attribute.values.length > 0) {
            this.multipleSelectionValues = this.attribute.values.map(({ name, quantity, selected, valueCode }) => ({
                name,
                quantity,
                selected,
                valueCode,
            }));
        }
        if (this.attribute.required &&
            this.multipleSelectionValues.filter((value) => value.selected).length < 2) {
            this.preventAction$.next(true);
        }
    }
    /**
     * Updates the value dependent on the provided state
     *
     * @param  {any} valueCode - value code to be updated
     * @param  {any} state - selected state
     *
     * @return {ConfigFormUpdateEvent} - form update event
     */
    updateMultipleSelectionValues(valueCode, state) {
        const index = this.multipleSelectionValues.findIndex((value) => value.valueCode === valueCode);
        this.multipleSelectionValues[index] = {
            ...this.multipleSelectionValues[index],
            selected: state,
        };
        const event = {
            changedAttribute: {
                ...this.attribute,
                values: this.multipleSelectionValues,
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.ATTRIBUTE,
        };
        return event;
    }
    /**
     * Updates the quantity of the given value
     *
     * @param  eventValue - event value
     *
     * @return {ConfigFormUpdateEvent} - form update event
     */
    updateMultipleSelectionValuesQuantity(eventValue) {
        const value = this.multipleSelectionValues.find((selectionValue) => selectionValue.valueCode === eventValue.valueCode);
        if (!value) {
            return;
        }
        value.quantity = eventValue.quantity;
        const event = {
            changedAttribute: {
                ...this.attribute,
                values: [value],
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.VALUE_QUANTITY,
        };
        return event;
    }
    onSelect(eventValue) {
        this.loading$.next(true);
        const changes = this.updateMultipleSelectionValues(eventValue, true);
        this.configuratorCommonsService.updateConfiguration(changes.ownerKey, changes.changedAttribute, changes.updateType);
    }
    onDeselect(eventValue) {
        this.loading$.next(true);
        const changes = this.updateMultipleSelectionValues(eventValue, false);
        this.configuratorCommonsService.updateConfiguration(changes.ownerKey, changes.changedAttribute, changes.updateType);
    }
    onDeselectAll() {
        this.loading$.next(true);
        this.configuratorCommonsService.updateConfiguration(this.ownerKey, {
            ...this.attribute,
            values: [],
        }, Configurator.UpdateType.ATTRIBUTE);
    }
    onChangeValueQuantity(eventValue) {
        this.loading$.next(true);
        const changes = this.updateMultipleSelectionValuesQuantity(eventValue);
        if (changes) {
            this.configuratorCommonsService.updateConfiguration(changes.ownerKey, changes.changedAttribute, changes.updateType);
        }
    }
    onChangeAttributeQuantity(eventObject) {
        this.loading$.next(true);
        if (!eventObject) {
            this.onDeselectAll();
        }
        else {
            this.onHandleAttributeQuantity(eventObject);
        }
    }
    /**
     * Extract corresponding price formula parameters
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        return {
            quantity: 0,
            price: {
                value: 0,
                currencyIso: '',
            },
            priceTotal: this.attribute.attributePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Extract corresponding product card parameters
     * @param {boolean} disableAllButtons - Prevent all actions, e.g. while loading
     * @param {boolean} hideRemoveButton - hide remove action, e.g. if only value required attribute
     * @param {Configurator.Value} value - Value
     * @param {number} index - index of current value in list of values of attribute
     * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
     */
    extractProductCardParameters(disableAllButtons, hideRemoveButton, value, index) {
        return {
            disableAllButtons: disableAllButtons ?? false,
            hideRemoveButton: hideRemoveButton ?? false,
            productBoundValue: value,
            multiSelect: true,
            withQuantity: this.withQuantity,
            loading$: this.loading$,
            attributeId: this.getAttributeCode(this.attribute),
            attributeLabel: this.attribute.label,
            attributeName: this.attribute.name,
            itemCount: this.attribute.values?.length
                ? this.attribute.values.length
                : 0,
            itemIndex: index,
        };
    }
}
ConfiguratorAttributeMultiSelectionBundleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeMultiSelectionBundleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeMultiSelectionBundleComponent, selector: "cx-configurator-attribute-multi-selection-bundle", usesInheritance: true, ngImport: i0, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  *ngIf=\"attribute?.values?.length\"\n>\n  <div\n    *ngIf=\"withQuantityOnAttributeLevel\"\n    class=\"cx-attribute-level-quantity-price\"\n  >\n    <cx-configurator-attribute-quantity\n      (changeQuantity)=\"onChangeAttributeQuantity($event)\"\n      [quantityOptions]=\"extractQuantityParameters(attribute.quantity)\"\n    ></cx-configurator-attribute-quantity>\n\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n\n  <cx-configurator-attribute-product-card\n    id=\"{{ createAttributeValueIdForConfigurator(attribute, value.valueCode) }}\"\n    (handleDeselect)=\"onDeselect($event)\"\n    (handleQuantity)=\"onChangeValueQuantity($event)\"\n    (handleSelect)=\"onSelect($event)\"\n    *ngFor=\"let value of attribute?.values; let i = index\"\n    [productCardOptions]=\"\n      extractProductCardParameters(\n        loading$ | async,\n        preventAction$ | async,\n        value,\n        i\n      )\n    \"\n  >\n  </cx-configurator-attribute-product-card>\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.ConfiguratorAttributeProductCardComponent, selector: "cx-configurator-attribute-product-card", inputs: ["productCardOptions"], outputs: ["handleDeselect", "handleQuantity", "handleSelect"] }, { kind: "component", type: i3.ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "component", type: i4.ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-multi-selection-bundle', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  *ngIf=\"attribute?.values?.length\"\n>\n  <div\n    *ngIf=\"withQuantityOnAttributeLevel\"\n    class=\"cx-attribute-level-quantity-price\"\n  >\n    <cx-configurator-attribute-quantity\n      (changeQuantity)=\"onChangeAttributeQuantity($event)\"\n      [quantityOptions]=\"extractQuantityParameters(attribute.quantity)\"\n    ></cx-configurator-attribute-quantity>\n\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n\n  <cx-configurator-attribute-product-card\n    id=\"{{ createAttributeValueIdForConfigurator(attribute, value.valueCode) }}\"\n    (handleDeselect)=\"onDeselect($event)\"\n    (handleQuantity)=\"onChangeValueQuantity($event)\"\n    (handleSelect)=\"onSelect($event)\"\n    *ngFor=\"let value of attribute?.values; let i = index\"\n    [productCardOptions]=\"\n      extractProductCardParameters(\n        loading$ | async,\n        preventAction$ | async,\n        value,\n        i\n      )\n    \"\n  >\n  </cx-configurator-attribute-product-card>\n</div>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1tdWx0aS1zZWxlY3Rpb24tYnVuZGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9hdHRyaWJ1dGUvdHlwZXMvbXVsdGktc2VsZWN0aW9uLWJ1bmRsZS9jb25maWd1cmF0b3ItYXR0cmlidXRlLW11bHRpLXNlbGVjdGlvbi1idW5kbGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS90eXBlcy9tdWx0aS1zZWxlY3Rpb24tYnVuZGxlL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtbXVsdGktc2VsZWN0aW9uLWJ1bmRsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUl6RSxPQUFPLEVBQUUsZ0RBQWdELEVBQUUsTUFBTSwrREFBK0QsQ0FBQzs7Ozs7O0FBY2pJLE1BQU0sT0FBTyxrREFDWCxTQUFRLGdEQUFnRDtJQU4xRDs7UUFTRSxtQkFBYyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBQ3JELDRCQUF1QixHQUFxQixFQUFFLENBQUM7S0F1TWhEO0lBck1DLFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHO0lBQ08sVUFBVTtRQUNsQixJQUFJLElB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aHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5pbXBvcnQgeyBDb25maWdGb3JtVXBkYXRlRXZlbnQgfSBmcm9tICcuLi8uLi8uLi9mb3JtL2NvbmZpZ3VyYXRvci1mb3JtLmV2ZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclByaWNlQ29tcG9uZW50T3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL3ByaWNlL2NvbmZpZ3VyYXRvci1wcmljZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlUHJvZHVjdENhcmRDb21wb25lbnRPcHRpb25zIH0gZnJvbSAnLi4vLi4vcHJvZHVjdC1jYXJkL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcHJvZHVjdC1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVNdWx0aVNlbGVjdGlvbkJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtbXVsdGktc2VsZWN0aW9uLWJhc2UuY29tcG9uZW50JztcblxuaW50ZXJmYWNlIFNlbGVjdGlvblZhbHVlIHtcbiAgbmFtZT86IHN0cmluZztcbiAgcXVhbnRpdHk/OiBudW1iZXI7XG4gIHNlbGVjdGVkPzogYm9vbGVhbjtcbiAgdmFsdWVDb2RlOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWNvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtbXVsdGktc2VsZWN0aW9uLWJ1bmRsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLW11bHRpLXNlbGVjdGlvbi1idW5kbGUuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlTXVsdGlTZWxlY3Rpb25CdW5kbGVDb21wb25lbnRcbiAgZXh0ZW5kcyBDb25maWd1cmF0b3JBdHRyaWJ1dGVNdWx0aVNlbGVjdGlvbkJhc2VDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXRcbntcbiAgcHJldmVudEFjdGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgbXVsdGlwbGVTZWxlY3Rpb25WYWx1ZXM6IFNlbGVjdGlvblZhbHVlW10gPSBbXTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBzZWxlY3Rpb24gdmFsdWVzIGFuZCBwZXZlbnRBY3Rpb24gb2JzZXJ2YWJsZVxuICAgKi9cbiAgcHJvdGVjdGVkIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYXR0cmlidXRlLnZhbHVlcyAmJiB0aGlzLmF0dHJpYnV0ZS52YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5tdWx0aXBsZVNlbGVjdGlvblZhbHVlcyA9IHRoaXMuYXR0cmlidXRlLnZhbHVlcy5tYXAoXG4gICAgICAgICh7IG5hbWUsIHF1YW50aXR5LCBzZWxlY3RlZCwgdmFsdWVDb2RlIH0pID0+ICh7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBxdWFudGl0eSxcbiAgICAgICAgICBzZWxlY3RlZCxcbiAgICAgICAgICB2YWx1ZUNvZGUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHRoaXMuYXR0cmlidXRlLnJlcXVpcmVkICYmXG4gICAgICB0aGlzLm11bHRpcGxlU2VsZWN0aW9uVmFsdWVzLmZpbHRlcigodmFsdWUpID0+IHZhbHVlLnNlbGVjdGVkKS5sZW5ndGggPCAyXG4gICAgKSB7XG4gICAgICB0aGlzLnByZXZlbnRBY3Rpb24kLm5leHQodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHZhbHVlIGRlcGVuZGVudCBvbiB0aGUgcHJvdmlkZWQgc3RhdGVcbiAgICpcbiAgICogQHBhcmFtICB7YW55fSB2YWx1ZUNvZGUgLSB2YWx1ZSBjb2RlIHRvIGJlIHVwZGF0ZWRcbiAgICogQHBhcmFtICB7YW55fSBzdGF0ZSAtIHNlbGVjdGVkIHN0YXRlXG4gICAqXG4gICAqIEByZXR1cm4ge0NvbmZpZ0Zvcm1VcGRhdGVFdmVudH0gLSBmb3JtIHVwZGF0ZSBldmVudFxuICAgKi9cbiAgcHJvdGVjdGVkIHVwZGF0ZU11bHRpcGxlU2VsZWN0aW9uVmFsdWVzKFxuICAgIHZhbHVlQ29kZTogYW55LFxuICAgIHN0YXRlOiBhbnlcbiAgKTogQ29uZmlnRm9ybVVwZGF0ZUV2ZW50IHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMubXVsdGlwbGVTZWxlY3Rpb25WYWx1ZXMuZmluZEluZGV4KFxuICAgICAgKHZhbHVlKSA9PiB2YWx1ZS52YWx1ZUNvZGUgPT09IHZhbHVlQ29kZVxuICAgICk7XG5cbiAgICB0aGlzLm11bHRpcGxlU2VsZWN0aW9uVmFsdWVzW2luZGV4XSA9IHtcbiAgICAgIC4uLnRoaXMubXVsdGlwbGVTZWxlY3Rpb25WYWx1ZXNbaW5kZXhdLFxuICAgICAgc2VsZWN0ZWQ6IHN0YXRlLFxuICAgIH07XG5cbiAgICBjb25zdCBldmVudDogQ29uZmlnRm9ybVVwZGF0ZUV2ZW50ID0ge1xuICAgICAgY2hhbmdlZEF0dHJpYnV0ZToge1xuICAgICAgICAuLi50aGlzLmF0dHJpYnV0ZSxcbiAgICAgICAgdmFsdWVzOiB0aGlzLm11bHRpcGxlU2VsZWN0aW9uVmFsdWVzLFxuICAgICAgfSxcbiAgICAgIG93bmVyS2V5OiB0aGlzLm93bmVyS2V5LFxuICAgICAgdXBkYXRlVHlwZTogQ29uZmlndXJhdG9yLlVwZGF0ZVR5cGUuQVRUUklCVVRFLFxuICAgIH07XG5cbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcXVhbnRpdHkgb2YgdGhlIGdpdmVuIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSAgZXZlbnRWYWx1ZSAtIGV2ZW50IHZhbHVlXG4gICAqXG4gICAqIEByZXR1cm4ge0NvbmZpZ0Zvcm1VcGRhdGVFdmVudH0gLSBmb3JtIHVwZGF0ZSBldmVudFxuICAgKi9cbiAgcHJvdGVjdGVkIHVwZGF0ZU11bHRpcGxlU2VsZWN0aW9uVmFsdWVzUXVhbnRpdHkoZXZlbnRWYWx1ZToge1xuICAgIHZhbHVlQ29kZTogc3RyaW5nO1xuICAgIHF1YW50aXR5OiBudW1iZXI7XG4gIH0pOiBDb25maWdGb3JtVXBkYXRlRXZlbnQgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHZhbHVlOiBDb25maWd1cmF0b3IuVmFsdWUgfCB1bmRlZmluZWQgPVxuICAgICAgdGhpcy5tdWx0aXBsZVNlbGVjdGlvblZhbHVlcy5maW5kKFxuICAgICAgICAoc2VsZWN0aW9uVmFsdWUpID0+IHNlbGVjdGlvblZhbHVlLnZhbHVlQ29kZSA9PT0gZXZlbnRWYWx1ZS52YWx1ZUNvZGVcbiAgICAgICk7XG5cbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFsdWUucXVhbnRpdHkgPSBldmVudFZhbHVlLnF1YW50aXR5O1xuXG4gICAgY29uc3QgZXZlbnQ6IENvbmZpZ0Zvcm1VcGRhdGVFdmVudCA9IHtcbiAgICAgIGNoYW5nZWRBdHRyaWJ1dGU6IHtcbiAgICAgICAgLi4udGhpcy5hdHRyaWJ1dGUsXG4gICAgICAgIHZhbHVlczogW3ZhbHVlXSxcbiAgICAgIH0sXG4gICAgICBvd25lcktleTogdGhpcy5vd25lcktleSxcbiAgICAgIHVwZGF0ZVR5cGU6IENvbmZpZ3VyYXRvci5VcGRhdGVUeXBlLlZBTFVFX1FVQU5USVRZLFxuICAgIH07XG5cbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBvblNlbGVjdChldmVudFZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmckLm5leHQodHJ1ZSk7XG4gICAgY29uc3QgY2hhbmdlcyA9IHRoaXMudXBkYXRlTXVsdGlwbGVTZWxlY3Rpb25WYWx1ZXMoZXZlbnRWYWx1ZSwgdHJ1ZSk7XG5cbiAgICB0aGlzLmNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlLnVwZGF0ZUNvbmZpZ3VyYXRpb24oXG4gICAgICBjaGFuZ2VzLm93bmVyS2V5LFxuICAgICAgY2hhbmdlcy5jaGFuZ2VkQXR0cmlidXRlLFxuICAgICAgY2hhbmdlcy51cGRhdGVUeXBlXG4gICAgKTtcbiAgfVxuXG4gIG9uRGVzZWxlY3QoZXZlbnRWYWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpO1xuICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLnVwZGF0ZU11bHRpcGxlU2VsZWN0aW9uVmFsdWVzKGV2ZW50VmFsdWUsIGZhbHNlKTtcbiAgICB0aGlzLmNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlLnVwZGF0ZUNvbmZpZ3VyYXRpb24oXG4gICAgICBjaGFuZ2VzLm93bmVyS2V5LFxuICAgICAgY2hhbmdlcy5jaGFuZ2VkQXR0cmlidXRlLFxuICAgICAgY2hhbmdlcy51cGRhdGVUeXBlXG4gICAgKTtcbiAgfVxuXG4gIG9uRGVzZWxlY3RBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpO1xuICAgIHRoaXMuY29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2UudXBkYXRlQ29uZmlndXJhdGlvbihcbiAgICAgIHRoaXMub3duZXJLZXksXG4gICAgICB7XG4gICAgICAgIC4uLnRoaXMuYXR0cmlidXRlLFxuICAgICAgICB2YWx1ZXM6IFtdLFxuICAgICAgfSxcbiAgICAgIENvbmZpZ3VyYXRvci5VcGRhdGVUeXBlLkFUVFJJQlVURVxuICAgICk7XG4gIH1cblxuICBvbkNoYW5nZVZhbHVlUXVhbnRpdHkoZXZlbnRWYWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpO1xuICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLnVwZGF0ZU11bHRpcGxlU2VsZWN0aW9uVmFsdWVzUXVhbnRpdHkoZXZlbnRWYWx1ZSk7XG5cbiAgICBpZiAoY2hhbmdlcykge1xuICAgICAgdGhpcy5jb25maWd1cmF0b3JDb21tb25zU2VydmljZS51cGRhdGVDb25maWd1cmF0aW9uKFxuICAgICAgICBjaGFuZ2VzLm93bmVyS2V5LFxuICAgICAgICBjaGFuZ2VzLmNoYW5nZWRBdHRyaWJ1dGUsXG4gICAgICAgIGNoYW5nZXMudXBkYXRlVHlwZVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBvbkNoYW5nZUF0dHJpYnV0ZVF1YW50aXR5KGV2ZW50T2JqZWN0OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmckLm5leHQodHJ1ZSk7XG5cbiAgICBpZiAoIWV2ZW50T2JqZWN0KSB7XG4gICAgICB0aGlzLm9uRGVzZWxlY3RBbGwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbkhhbmRsZUF0dHJpYnV0ZVF1YW50aXR5KGV2ZW50T2JqZWN0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCBjb3JyZXNwb25kaW5nIHByaWNlIGZvcm11bGEgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcmV0dXJuIHtDb25maWd1cmF0b3JQcmljZUNvbXBvbmVudE9wdGlvbnN9IC0gTmV3IHByaWNlIGZvcm11bGFcbiAgICovXG4gIGV4dHJhY3RQcmljZUZvcm11bGFQYXJhbWV0ZXJzKCk6IENvbmZpZ3VyYXRvclByaWNlQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHF1YW50aXR5OiAwLFxuICAgICAgcHJpY2U6IHtcbiAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgIGN1cnJlbmN5SXNvOiAnJyxcbiAgICAgIH0sXG4gICAgICBwcmljZVRvdGFsOiB0aGlzLmF0dHJpYnV0ZS5hdHRyaWJ1dGVQcmljZVRvdGFsLFxuICAgICAgaXNMaWdodGVkVXA6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0IGNvcnJlc3BvbmRpbmcgcHJvZHVjdCBjYXJkIHBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlQWxsQnV0dG9ucyAtIFByZXZlbnQgYWxsIGFjdGlvbnMsIGUuZy4gd2hpbGUgbG9hZGluZ1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGhpZGVSZW1vdmVCdXR0b24gLSBoaWRlIHJlbW92ZSBhY3Rpb24sIGUuZy4gaWYgb25seSB2YWx1ZSByZXF1aXJlZCBhdHRyaWJ1dGVcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuVmFsdWV9IHZhbHVlIC0gVmFsdWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gaW5kZXggb2YgY3VycmVudCB2YWx1ZSBpbiBsaXN0IG9mIHZhbHVlcyBvZiBhdHRyaWJ1dGVcbiAgICogQHJldHVybiB7Q29uZmlndXJhdG9yQXR0cmlidXRlUHJvZHVjdENhcmRDb21wb25lbnRPcHRpb25zfSAtIE5ldyBwcm9kdWN0IGNhcmQgb3B0aW9uc1xuICAgKi9cbiAgZXh0cmFjdFByb2R1Y3RDYXJkUGFyYW1ldGVycyhcbiAgICBkaXNhYmxlQWxsQnV0dG9uczogYm9vbGVhbiB8IG51bGwsXG4gICAgaGlkZVJlbW92ZUJ1dHRvbjogYm9vbGVhbiB8IG51bGwsXG4gICAgdmFsdWU6IENvbmZpZ3VyYXRvci5WYWx1ZSxcbiAgICBpbmRleDogbnVtYmVyXG4gICk6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVByb2R1Y3RDYXJkQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRpc2FibGVBbGxCdXR0b25zOiBkaXNhYmxlQWxsQnV0dG9ucyA/PyBmYWxzZSxcbiAgICAgIGhpZGVSZW1vdmVCdXR0b246IGhpZGVSZW1vdmVCdXR0b24gPz8gZmFsc2UsXG4gICAgICBwcm9kdWN0Qm91bmRWYWx1ZTogdmFsdWUsXG4gICAgICBtdWx0aVNlbGVjdDogdHJ1ZSxcbiAgICAgIHdpdGhRdWFudGl0eTogdGhpcy53aXRoUXVhbnRpdHksXG4gICAgICBsb2FkaW5nJDogdGhpcy5sb2FkaW5nJCxcbiAgICAgIGF0dHJpYnV0ZUlkOiB0aGlzLmdldEF0dHJpYnV0ZUNvZGUodGhpcy5hdHRyaWJ1dGUpLFxuICAgICAgYXR0cmlidXRlTGFiZWw6IHRoaXMuYXR0cmlidXRlLmxhYmVsLFxuICAgICAgYXR0cmlidXRlTmFtZTogdGhpcy5hdHRyaWJ1dGUubmFtZSxcbiAgICAgIGl0ZW1Db3VudDogdGhpcy5hdHRyaWJ1dGUudmFsdWVzPy5sZW5ndGhcbiAgICAgICAgPyB0aGlzLmF0dHJpYnV0ZS52YWx1ZXMubGVuZ3RoXG4gICAgICAgIDogMCxcbiAgICAgIGl0ZW1JbmRleDogaW5kZXgsXG4gICAgfTtcbiAgfVxufVxuIiwiPGRpdlxuICBpZD1cInt7IGNyZWF0ZUF0dHJpYnV0ZUlkRm9yQ29uZmlndXJhdG9yKGF0dHJpYnV0ZSkgfX1cIlxuICAqbmdJZj1cImF0dHJpYnV0ZT8udmFsdWVzPy5sZW5ndGhcIlxuPlxuICA8ZGl2XG4gICAgKm5nSWY9XCJ3aXRoUXVhbnRpdHlPbkF0dHJpYnV0ZUxldmVsXCJcbiAgICBjbGFzcz1cImN4LWF0dHJpYnV0ZS1sZXZlbC1xdWFudGl0eS1wcmljZVwiXG4gID5cbiAgICA8Y3gtY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1xdWFudGl0eVxuICAgICAgKGNoYW5nZVF1YW50aXR5KT1cIm9uQ2hhbmdlQXR0cmlidXRlUXVhbnRpdHkoJGV2ZW50KVwiXG4gICAgICBbcXVhbnRpdHlPcHRpb25zXT1cImV4dHJhY3RRdWFudGl0eVBhcmFtZXRlcnMoYXR0cmlidXRlLnF1YW50aXR5KVwiXG4gICAgPjwvY3gtY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1xdWFudGl0eT5cblxuICAgIDxjeC1jb25maWd1cmF0b3ItcHJpY2VcbiAgICAgIFtmb3JtdWxhXT1cImV4dHJhY3RQcmljZUZvcm11bGFQYXJhbWV0ZXJzKClcIlxuICAgID48L2N4LWNvbmZpZ3VyYXRvci1wcmljZT5cbiAgPC9kaXY+XG5cbiAgPGN4LWNvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcHJvZHVjdC1jYXJkXG4gICAgaWQ9XCJ7eyBjcmVhdGVBdHRyaWJ1dGVWYWx1ZUlkRm9yQ29uZmlndXJhdG9yKGF0dHJpYnV0ZSwgdmFsdWUudmFsdWVDb2RlKSB9fVwiXG4gICAgKGhhbmRsZURlc2VsZWN0KT1cIm9uRGVzZWxlY3QoJGV2ZW50KVwiXG4gICAgKGhhbmRsZVF1YW50aXR5KT1cIm9uQ2hhbmdlVmFsdWVRdWFudGl0eSgkZXZlbnQpXCJcbiAgICAoaGFuZGxlU2VsZWN0KT1cIm9uU2VsZWN0KCRldmVudClcIlxuICAgICpuZ0Zvcj1cImxldCB2YWx1ZSBvZiBhdHRyaWJ1dGU/LnZhbHVlczsgbGV0IGkgPSBpbmRleFwiXG4gICAgW3Byb2R1Y3RDYXJkT3B0aW9uc109XCJcbiAgICAgIGV4dHJhY3RQcm9kdWN0Q2FyZFBhcmFtZXRlcnMoXG4gICAgICAgIGxvYWRpbmckIHwgYXN5bmMsXG4gICAgICAgIHByZXZlbnRBY3Rpb24kIHwgYXN5bmMsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBpXG4gICAgICApXG4gICAgXCJcbiAgPlxuICA8L2N4LWNvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcHJvZHVjdC1jYXJkPlxuPC9kaXY+XG4iXX0=