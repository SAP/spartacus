/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { take } from 'rxjs/operators';
import { Cpq } from '../cpq.models';
import * as i0 from "@angular/core";
import * as i1 from "./cpq-configurator-normalizer-utils.service";
import * as i2 from "@spartacus/core";
export class CpqConfiguratorNormalizer {
    constructor(cpqConfiguratorNormalizerUtilsService, translation) {
        this.cpqConfiguratorNormalizerUtilsService = cpqConfiguratorNormalizerUtilsService;
        this.translation = translation;
    }
    convert(source, target) {
        const resultTarget = {
            ...target,
            configId: source.configurationId ? source.configurationId : '',
            complete: !source.incompleteAttributes?.length,
            consistent: !source.invalidMessages?.length &&
                !source.failedValidations?.length &&
                !source.incompleteMessages?.length &&
                !source.errorMessages?.length,
            totalNumberOfIssues: this.generateTotalNumberOfIssues(source),
            productCode: source.productSystemId,
            priceSummary: this.cpqConfiguratorNormalizerUtilsService.convertPriceSummary(source),
            groups: [],
            flatGroups: [],
            owner: ConfiguratorModelUtils.createInitialOwner(),
            interactionState: {},
            errorMessages: this.generateErrorMessages(source),
            warningMessages: this.generateWarningMessages(source),
            pricingEnabled: true,
        };
        source.tabs?.forEach((tab) => this.convertGroup(tab, source.attributes ?? [], source.currencyISOCode, resultTarget.groups, resultTarget.flatGroups));
        if (!resultTarget.groups || resultTarget.groups.length === 0) {
            this.convertGenericGroup(source.attributes ?? [], source.incompleteAttributes ?? [], source.currencyISOCode, resultTarget.groups, resultTarget.flatGroups);
        }
        return resultTarget;
    }
    generateTotalNumberOfIssues(source) {
        const numberOfIssues = (source.incompleteAttributes?.length ?? 0) +
            (source.incompleteMessages?.length ?? 0) +
            (source.invalidMessages?.length ?? 0) +
            (source.failedValidations?.length ?? 0) +
            (source.errorMessages?.length ?? 0);
        return numberOfIssues;
    }
    generateWarningMessages(source) {
        let warnMsgs = [];
        warnMsgs = warnMsgs.concat(source.failedValidations ?? []);
        warnMsgs = warnMsgs.concat(source.incompleteMessages ?? []);
        return warnMsgs;
    }
    generateErrorMessages(source) {
        let errorMsgs = [];
        errorMsgs = errorMsgs.concat(source.errorMessages ?? []);
        errorMsgs = errorMsgs.concat(source.invalidMessages ?? []);
        return errorMsgs;
    }
    convertGroup(source, sourceAttributes, currency, groupList, flatGroupList) {
        const attributes = [];
        if (source.isSelected) {
            sourceAttributes.forEach((sourceAttribute) => this.convertAttribute(sourceAttribute, source.id, currency, attributes));
        }
        const group = {
            id: source.id.toString(),
            name: source.name,
            description: source.displayName,
            configurable: true,
            complete: !source.isIncomplete,
            consistent: true,
            groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
            attributes: attributes,
            subGroups: [],
        };
        flatGroupList.push(group);
        groupList.push(group);
    }
    convertGenericGroup(sourceAttributes, incompleteAttributes, currency, groupList, flatGroupList) {
        const attributes = [];
        sourceAttributes.forEach((sourceAttribute) => this.convertAttribute(sourceAttribute, 1, currency, attributes));
        const group = {
            id: '1',
            name: '_GEN',
            configurable: true,
            complete: incompleteAttributes.length === 0,
            consistent: true,
            groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
            attributes: attributes,
            subGroups: [],
        };
        this.translation
            .translate('configurator.group.general')
            .pipe(take(1))
            .subscribe((generalText) => (group.description = generalText));
        groupList.push(group);
        flatGroupList.push(group);
    }
    convertAttribute(sourceAttribute, groupId, currency, attributeList) {
        const attribute = {
            attrCode: sourceAttribute.stdAttrCode,
            name: this.mapPAId(sourceAttribute),
            description: sourceAttribute.description,
            label: this.cpqConfiguratorNormalizerUtilsService.convertAttributeLabel(sourceAttribute),
            required: sourceAttribute.required,
            isLineItem: sourceAttribute.isLineItem,
            uiType: this.convertAttributeType(sourceAttribute),
            dataType: this.cpqConfiguratorNormalizerUtilsService.convertDataType(sourceAttribute),
            quantity: Number(sourceAttribute.quantity),
            groupId: groupId.toString(),
            userInput: sourceAttribute.userInput,
            hasConflicts: sourceAttribute.hasConflict,
            selectedSingleValue: undefined,
            images: [],
            visible: true,
        };
        if (sourceAttribute.values &&
            sourceAttribute.displayAs !== Cpq.DisplayAs.INPUT) {
            const values = [];
            sourceAttribute.values.forEach((value) => this.convertValue(value, sourceAttribute, currency, values));
            attribute.values = values;
            this.setSelectedSingleValue(attribute);
        }
        attribute.attributePriceTotal =
            this.cpqConfiguratorNormalizerUtilsService.calculateAttributePriceTotal(attribute, currency);
        this.compileAttributeIncomplete(attribute);
        attributeList.push(attribute);
    }
    /**
     * In case the CPQ API is called via REST, the attribute id is returned using field name pA_ID.
     * If we call CPQ via OCC the attribute is mapped to field name PA_ID.
     * This can't be changed easily and is related to the non-standard conform name 'pA_ID';
     * @param sourceAttribute source attribute
     * @returns value of PA_ID or pA_ID, depending on which field is filled.
     */
    mapPAId(sourceAttribute) {
        return sourceAttribute.pA_ID
            ? sourceAttribute.pA_ID.toString()
            : sourceAttribute.PA_ID.toString();
    }
    setSelectedSingleValue(attribute) {
        const values = attribute.values;
        if (values) {
            const selectedValues = values
                .map((entry) => entry)
                .filter((entry) => entry.selected);
            if (selectedValues && selectedValues.length === 1) {
                attribute.selectedSingleValue = selectedValues[0].valueCode;
            }
        }
    }
    convertValueDisplay(sourceValue, sourceAttribute, value) {
        if (sourceAttribute.displayAs === Cpq.DisplayAs.DROPDOWN &&
            sourceValue.selected &&
            sourceValue.paV_ID === 0) {
            this.translation
                .translate('configurator.attribute.dropDownSelectMsg')
                .pipe(take(1))
                .subscribe((text) => (value.valueDisplay = text));
        }
        else {
            value.valueDisplay = sourceValue.valueDisplay;
        }
    }
    convertValueCode(valueCode) {
        return valueCode === 0
            ? Configurator.RetractValueCode
            : valueCode.toString();
    }
    convertValue(sourceValue, sourceAttribute, currency, values) {
        if (this.hasValueToBeIgnored(sourceAttribute, sourceValue)) {
            return;
        }
        const value = {
            valueCode: this.convertValueCode(sourceValue.paV_ID),
            name: sourceValue.valueCode,
            description: sourceValue.description,
            productSystemId: sourceValue.productSystemId,
            selected: sourceValue.selected,
            quantity: this.cpqConfiguratorNormalizerUtilsService.convertQuantity(sourceValue, sourceAttribute),
            valuePrice: this.cpqConfiguratorNormalizerUtilsService.convertValuePrice(sourceValue, currency),
            images: [],
        };
        this.convertValueDisplay(sourceValue, sourceAttribute, value);
        value.valuePriceTotal =
            this.cpqConfiguratorNormalizerUtilsService.calculateValuePriceTotal(value.quantity ?? 1, value.valuePrice);
        values.push(value);
    }
    convertAttributeType(sourceAttribute) {
        const displayAs = sourceAttribute.displayAs;
        const displayAsProduct = sourceAttribute.values &&
            this.cpqConfiguratorNormalizerUtilsService.hasAnyProducts(sourceAttribute.values)
            ? true
            : false;
        const isEnabled = sourceAttribute.isEnabled ?? false;
        if (!isEnabled &&
            (displayAs === Cpq.DisplayAs.RADIO_BUTTON ||
                displayAs === Cpq.DisplayAs.DROPDOWN ||
                displayAs === Cpq.DisplayAs.CHECK_BOX ||
                displayAs === Cpq.DisplayAs.INPUT)) {
            return Configurator.UiType.READ_ONLY;
        }
        return this.findUiTypeFromDisplayType(displayAs, displayAsProduct, sourceAttribute);
    }
    findUiTypeFromDisplayType(displayAs, displayAsProduct, sourceAttribute) {
        let uiType;
        switch (displayAs) {
            case Cpq.DisplayAs.RADIO_BUTTON: {
                uiType = displayAsProduct
                    ? Configurator.UiType.RADIOBUTTON_PRODUCT
                    : Configurator.UiType.RADIOBUTTON;
                break;
            }
            case Cpq.DisplayAs.DROPDOWN: {
                uiType = displayAsProduct
                    ? Configurator.UiType.DROPDOWN_PRODUCT
                    : Configurator.UiType.DROPDOWN;
                break;
            }
            case Cpq.DisplayAs.CHECK_BOX: {
                uiType = displayAsProduct
                    ? Configurator.UiType.CHECKBOXLIST_PRODUCT
                    : Configurator.UiType.CHECKBOXLIST;
                break;
            }
            case Cpq.DisplayAs.INPUT: {
                uiType =
                    sourceAttribute.dataType === Cpq.DataType.INPUT_STRING
                        ? Configurator.UiType.STRING
                        : Configurator.UiType.NOT_IMPLEMENTED;
                break;
            }
            default: {
                uiType = Configurator.UiType.NOT_IMPLEMENTED;
            }
        }
        return uiType;
    }
    compileAttributeIncomplete(attribute) {
        //Default value for incomplete is false
        attribute.incomplete = false;
        switch (attribute.uiType) {
            case Configurator.UiType.RADIOBUTTON:
            case Configurator.UiType.RADIOBUTTON_PRODUCT:
            case Configurator.UiType.DROPDOWN:
            case Configurator.UiType.DROPDOWN_PRODUCT:
            case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
                if (!attribute.selectedSingleValue ||
                    attribute.selectedSingleValue === Configurator.RetractValueCode) {
                    attribute.incomplete = true;
                }
                break;
            }
            case Configurator.UiType.NUMERIC:
            case Configurator.UiType.STRING: {
                if (!attribute.userInput) {
                    attribute.incomplete = true;
                }
                break;
            }
            case Configurator.UiType.CHECKBOXLIST:
            case Configurator.UiType.CHECKBOXLIST_PRODUCT:
            case Configurator.UiType.CHECKBOX:
            case Configurator.UiType.MULTI_SELECTION_IMAGE: {
                const isOneValueSelected = attribute.values?.find((value) => value.selected) !== undefined
                    ? true
                    : false;
                if (!isOneValueSelected) {
                    attribute.incomplete = true;
                }
                break;
            }
        }
    }
    hasValueToBeIgnored(attribute, value) {
        const selectedValues = attribute.values
            ?.map((entry) => entry)
            .filter((entry) => entry.selected && entry.paV_ID !== 0);
        return ((attribute.displayAs === Cpq.DisplayAs.DROPDOWN &&
            attribute.required &&
            selectedValues &&
            selectedValues.length > 0 &&
            value.paV_ID === 0) ??
            false);
    }
}
CpqConfiguratorNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorNormalizer, deps: [{ token: i1.CpqConfiguratorNormalizerUtilsService }, { token: i2.TranslationService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorNormalizer });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorNormalizer, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CpqConfiguratorNormalizerUtilsService }, { type: i2.TranslationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1ub3JtYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jcHEvY29tbW9uL2NvbnZlcnRlcnMvY3BxLWNvbmZpZ3VyYXRvci1ub3JtYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUlwQyxNQUFNLE9BQU8seUJBQXlCO0lBR3BDLFlBQ1kscUNBQTRFLEVBQzVFLFdBQStCO1FBRC9CLDBDQUFxQyxHQUFyQyxxQ0FBcUMsQ0FBdUM7UUFDNUUsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO0lBQ3hDLENBQUM7SUFFSixPQUFPLENBQ0wsTUFBeUIsRUFDekIsTUFBbUM7UUFFbkMsTUFBTSxZQUFZLEdBQStCO1lBQy9DLEdBQUcsTUFBTTtZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzlELFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxNQUFNO1lBQzlDLFVBQVUsRUFDUixDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsTUFBTTtnQkFDL0IsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsTUFBTTtnQkFDakMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsTUFBTTtn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QUFHLENBQUM7WUFDekIsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7WUFDckIsS0FBSyxDQUNOLENBQUM7SUFDSixDQUFDOztzSEF6WlUseUJBQXlCOzBIQUF6Qix5QkFBeUI7MkZBQXpCLHlCQUF5QjtrQkFEckMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnZlcnRlciwgVHJhbnNsYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvck1vZGVsVXRpbHMgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZCc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ3BxIH0gZnJvbSAnLi4vY3BxLm1vZGVscyc7XG5pbXBvcnQgeyBDcHFDb25maWd1cmF0b3JOb3JtYWxpemVyVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi9jcHEtY29uZmlndXJhdG9yLW5vcm1hbGl6ZXItdXRpbHMuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDcHFDb25maWd1cmF0b3JOb3JtYWxpemVyXG4gIGltcGxlbWVudHMgQ29udmVydGVyPENwcS5Db25maWd1cmF0aW9uLCBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbj5cbntcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNwcUNvbmZpZ3VyYXRvck5vcm1hbGl6ZXJVdGlsc1NlcnZpY2U6IENwcUNvbmZpZ3VyYXRvck5vcm1hbGl6ZXJVdGlsc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2VcbiAgKSB7fVxuXG4gIGNvbnZlcnQoXG4gICAgc291cmNlOiBDcHEuQ29uZmlndXJhdGlvbixcbiAgICB0YXJnZXQ/OiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvblxuICApOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbiB7XG4gICAgY29uc3QgcmVzdWx0VGFyZ2V0OiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgIC4uLnRhcmdldCxcbiAgICAgIGNvbmZpZ0lkOiBzb3VyY2UuY29uZmlndXJhdGlvbklkID8gc291cmNlLmNvbmZpZ3VyYXRpb25JZCA6ICcnLCAvL2lmIGVtcHR5LCB3aWxsIGxhdGVyIGJlIHBvcHVsYXRlZCB3aXRoIGZpbmFsIHZhbHVlXG4gICAgICBjb21wbGV0ZTogIXNvdXJjZS5pbmNvbXBsZXRlQXR0cmlidXRlcz8ubGVuZ3RoLFxuICAgICAgY29uc2lzdGVudDpcbiAgICAgICAgIXNvdXJjZS5pbnZhbGlkTWVzc2FnZXM/Lmxlbmd0aCAmJlxuICAgICAgICAhc291cmNlLmZhaWxlZFZhbGlkYXRpb25zPy5sZW5ndGggJiZcbiAgICAgICAgIXNvdXJjZS5pbmNvbXBsZXRlTWVzc2FnZXM/Lmxlbmd0aCAmJlxuICAgICAgICAhc291cmNlLmVycm9yTWVzc2FnZXM/Lmxlbmd0aCxcbiAgICAgIHRvdGFsTnVtYmVyT2ZJc3N1ZXM6IHRoaXMuZ2VuZXJhdGVUb3RhbE51bWJlck9mSXNzdWVzKHNvdXJjZSksXG4gICAgICBwcm9kdWN0Q29kZTogc291cmNlLnByb2R1Y3RTeXN0ZW1JZCxcbiAgICAgIHByaWNlU3VtbWFyeTpcbiAgICAgICAgdGhpcy5jcHFDb25maWd1cmF0b3JOb3JtYWxpemVyVXRpbHNTZXJ2aWNlLmNvbnZlcnRQcmljZVN1bW1hcnkoc291cmNlKSxcbiAgICAgIGdyb3VwczogW10sXG4gICAgICBmbGF0R3JvdXBzOiBbXSxcbiAgICAgIG93bmVyOiBDb25maWd1cmF0b3JNb2RlbFV0aWxzLmNyZWF0ZUluaXRpYWxPd25lcigpLFxuICAgICAgaW50ZXJhY3Rpb25TdGF0ZToge30sXG4gICAgICBlcnJvck1lc3NhZ2VzOiB0aGlzLmdlbmVyYXRlRXJyb3JNZXNzYWdlcyhzb3VyY2UpLFxuICAgICAgd2FybmluZ01lc3NhZ2VzOiB0aGlzLmdlbmVyYXRlV2FybmluZ01lc3NhZ2VzKHNvdXJjZSksXG4gICAgICBwcmljaW5nRW5hYmxlZDogdHJ1ZSxcbiAgICB9O1xuICAgIHNvdXJjZS50YWJzPy5mb3JFYWNoKCh0YWIpID0+XG4gICAgICB0aGlzLmNvbnZlcnRHcm91cChcbiAgICAgICAgdGFiLFxuICAgICAgICBzb3VyY2UuYXR0cmlidXRlcyA/PyBbXSxcbiAgICAgICAgc291cmNlLmN1cnJlbmN5SVNPQ29kZSxcbiAgICAgICAgcmVzdWx0VGFyZ2V0Lmdyb3VwcyxcbiAgICAgICAgcmVzdWx0VGFyZ2V0LmZsYXRHcm91cHNcbiAgICAgIClcbiAgICApO1xuXG4gICAgaWYgKCFyZXN1bHRUYXJnZXQuZ3JvdXBzIHx8IHJlc3VsdFRhcmdldC5ncm91cHMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmNvbnZlcnRHZW5lcmljR3JvdXAoXG4gICAgICAgIHNvdXJjZS5hdHRyaWJ1dGVzID8/IFtdLFxuICAgICAgICBzb3VyY2UuaW5jb21wbGV0ZUF0dHJpYnV0ZXMgPz8gW10sXG4gICAgICAgIHNvdXJjZS5jdXJyZW5jeUlTT0NvZGUsXG4gICAgICAgIHJlc3VsdFRhcmdldC5ncm91cHMsXG4gICAgICAgIHJlc3VsdFRhcmdldC5mbGF0R3JvdXBzXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRUYXJnZXQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2VuZXJhdGVUb3RhbE51bWJlck9mSXNzdWVzKHNvdXJjZTogQ3BxLkNvbmZpZ3VyYXRpb24pOiBudW1iZXIge1xuICAgIGNvbnN0IG51bWJlck9mSXNzdWVzOiBudW1iZXIgPVxuICAgICAgKHNvdXJjZS5pbmNvbXBsZXRlQXR0cmlidXRlcz8ubGVuZ3RoID8/IDApICtcbiAgICAgIChzb3VyY2UuaW5jb21wbGV0ZU1lc3NhZ2VzPy5sZW5ndGggPz8gMCkgK1xuICAgICAgKHNvdXJjZS5pbnZhbGlkTWVzc2FnZXM/Lmxlbmd0aCA/PyAwKSArXG4gICAgICAoc291cmNlLmZhaWxlZFZhbGlkYXRpb25zPy5sZW5ndGggPz8gMCkgK1xuICAgICAgKHNvdXJjZS5lcnJvck1lc3NhZ2VzPy5sZW5ndGggPz8gMCk7XG4gICAgcmV0dXJuIG51bWJlck9mSXNzdWVzO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdlbmVyYXRlV2FybmluZ01lc3NhZ2VzKHNvdXJjZTogQ3BxLkNvbmZpZ3VyYXRpb24pOiBzdHJpbmdbXSB7XG4gICAgbGV0IHdhcm5Nc2dzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHdhcm5Nc2dzID0gd2Fybk1zZ3MuY29uY2F0KHNvdXJjZS5mYWlsZWRWYWxpZGF0aW9ucyA/PyBbXSk7XG4gICAgd2Fybk1zZ3MgPSB3YXJuTXNncy5jb25jYXQoc291cmNlLmluY29tcGxldGVNZXNzYWdlcyA/PyBbXSk7XG4gICAgcmV0dXJuIHdhcm5Nc2dzO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdlbmVyYXRlRXJyb3JNZXNzYWdlcyhzb3VyY2U6IENwcS5Db25maWd1cmF0aW9uKTogc3RyaW5nW10ge1xuICAgIGxldCBlcnJvck1zZ3M6IHN0cmluZ1tdID0gW107XG4gICAgZXJyb3JNc2dzID0gZXJyb3JNc2dzLmNvbmNhdChzb3VyY2UuZXJyb3JNZXNzYWdlcyA/PyBbXSk7XG4gICAgZXJyb3JNc2dzID0gZXJyb3JNc2dzLmNvbmNhdChzb3VyY2UuaW52YWxpZE1lc3NhZ2VzID8/IFtdKTtcbiAgICByZXR1cm4gZXJyb3JNc2dzO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbnZlcnRHcm91cChcbiAgICBzb3VyY2U6IENwcS5UYWIsXG4gICAgc291cmNlQXR0cmlidXRlczogQ3BxLkF0dHJpYnV0ZVtdLFxuICAgIGN1cnJlbmN5OiBzdHJpbmcsXG4gICAgZ3JvdXBMaXN0OiBDb25maWd1cmF0b3IuR3JvdXBbXSxcbiAgICBmbGF0R3JvdXBMaXN0OiBDb25maWd1cmF0b3IuR3JvdXBbXVxuICApIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzOiBDb25maWd1cmF0b3IuQXR0cmlidXRlW10gPSBbXTtcbiAgICBpZiAoc291cmNlLmlzU2VsZWN0ZWQpIHtcbiAgICAgIHNvdXJjZUF0dHJpYnV0ZXMuZm9yRWFjaCgoc291cmNlQXR0cmlidXRlKSA9PlxuICAgICAgICB0aGlzLmNvbnZlcnRBdHRyaWJ1dGUoc291cmNlQXR0cmlidXRlLCBzb3VyY2UuaWQsIGN1cnJlbmN5LCBhdHRyaWJ1dGVzKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBncm91cDogQ29uZmlndXJhdG9yLkdyb3VwID0ge1xuICAgICAgaWQ6IHNvdXJjZS5pZC50b1N0cmluZygpLFxuICAgICAgbmFtZTogc291cmNlLm5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogc291cmNlLmRpc3BsYXlOYW1lLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgY29tcGxldGU6ICFzb3VyY2UuaXNJbmNvbXBsZXRlLFxuICAgICAgY29uc2lzdGVudDogdHJ1ZSxcbiAgICAgIGdyb3VwVHlwZTogQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5BVFRSSUJVVEVfR1JPVVAsXG4gICAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzLFxuICAgICAgc3ViR3JvdXBzOiBbXSxcbiAgICB9O1xuXG4gICAgZmxhdEdyb3VwTGlzdC5wdXNoKGdyb3VwKTtcbiAgICBncm91cExpc3QucHVzaChncm91cCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29udmVydEdlbmVyaWNHcm91cChcbiAgICBzb3VyY2VBdHRyaWJ1dGVzOiBDcHEuQXR0cmlidXRlW10sXG4gICAgaW5jb21wbGV0ZUF0dHJpYnV0ZXM6IHN0cmluZ1tdLFxuICAgIGN1cnJlbmN5OiBzdHJpbmcsXG4gICAgZ3JvdXBMaXN0OiBDb25maWd1cmF0b3IuR3JvdXBbXSxcbiAgICBmbGF0R3JvdXBMaXN0OiBDb25maWd1cmF0b3IuR3JvdXBbXVxuICApIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzOiBDb25maWd1cmF0b3IuQXR0cmlidXRlW10gPSBbXTtcbiAgICBzb3VyY2VBdHRyaWJ1dGVzLmZvckVhY2goKHNvdXJjZUF0dHJpYnV0ZSkgPT5cbiAgICAgIHRoaXMuY29udmVydEF0dHJpYnV0ZShzb3VyY2VBdHRyaWJ1dGUsIDEsIGN1cnJlbmN5LCBhdHRyaWJ1dGVzKVxuICAgICk7XG4gICAgY29uc3QgZ3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cCA9IHtcbiAgICAgIGlkOiAnMScsXG4gICAgICBuYW1lOiAnX0dFTicsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBjb21wbGV0ZTogaW5jb21wbGV0ZUF0dHJpYnV0ZXMubGVuZ3RoID09PSAwLFxuICAgICAgY29uc2lzdGVudDogdHJ1ZSxcbiAgICAgIGdyb3VwVHlwZTogQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5BVFRSSUJVVEVfR1JPVVAsXG4gICAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzLFxuICAgICAgc3ViR3JvdXBzOiBbXSxcbiAgICB9O1xuXG4gICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgLnRyYW5zbGF0ZSgnY29uZmlndXJhdG9yLmdyb3VwLmdlbmVyYWwnKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGdlbmVyYWxUZXh0KSA9PiAoZ3JvdXAuZGVzY3JpcHRpb24gPSBnZW5lcmFsVGV4dCkpO1xuXG4gICAgZ3JvdXBMaXN0LnB1c2goZ3JvdXApO1xuICAgIGZsYXRHcm91cExpc3QucHVzaChncm91cCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29udmVydEF0dHJpYnV0ZShcbiAgICBzb3VyY2VBdHRyaWJ1dGU6IENwcS5BdHRyaWJ1dGUsXG4gICAgZ3JvdXBJZDogbnVtYmVyLFxuICAgIGN1cnJlbmN5OiBzdHJpbmcsXG4gICAgYXR0cmlidXRlTGlzdDogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZVtdXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSA9IHtcbiAgICAgIGF0dHJDb2RlOiBzb3VyY2VBdHRyaWJ1dGUuc3RkQXR0ckNvZGUsXG4gICAgICBuYW1lOiB0aGlzLm1hcFBBSWQoc291cmNlQXR0cmlidXRlKSxcbiAgICAgIGRlc2NyaXB0aW9uOiBzb3VyY2VBdHRyaWJ1dGUuZGVzY3JpcHRpb24sXG4gICAgICBsYWJlbDpcbiAgICAgICAgdGhpcy5jcHFDb25maWd1cmF0b3JOb3JtYWxpemVyVXRpbHNTZXJ2aWNlLmNvbnZlcnRBdHRyaWJ1dGVMYWJlbChcbiAgICAgICAgICBzb3VyY2VBdHRyaWJ1dGVcbiAgICAgICAgKSxcbiAgICAgIHJlcXVpcmVkOiBzb3VyY2VBdHRyaWJ1dGUucmVxdWlyZWQsXG4gICAgICBpc0xpbmVJdGVtOiBzb3VyY2VBdHRyaWJ1dGUuaXNMaW5lSXRlbSxcbiAgICAgIHVpVHlwZTogdGhpcy5jb252ZXJ0QXR0cmlidXRlVHlwZShzb3VyY2VBdHRyaWJ1dGUpLFxuICAgICAgZGF0YVR5cGU6XG4gICAgICAgIHRoaXMuY3BxQ29uZmlndXJhdG9yTm9ybWFsaXplclV0aWxzU2VydmljZS5jb252ZXJ0RGF0YVR5cGUoXG4gICAgICAgICAgc291cmNlQXR0cmlidXRlXG4gICAgICAgICksXG4gICAgICBxdWFudGl0eTogTnVtYmVyKHNvdXJjZUF0dHJpYnV0ZS5xdWFudGl0eSksXG4gICAgICBncm91cElkOiBncm91cElkLnRvU3RyaW5nKCksXG4gICAgICB1c2VySW5wdXQ6IHNvdXJjZUF0dHJpYnV0ZS51c2VySW5wdXQsXG4gICAgICBoYXNDb25mbGljdHM6IHNvdXJjZUF0dHJpYnV0ZS5oYXNDb25mbGljdCxcbiAgICAgIHNlbGVjdGVkU2luZ2xlVmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgIGltYWdlczogW10sXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgIH07XG5cbiAgICBpZiAoXG4gICAgICBzb3VyY2VBdHRyaWJ1dGUudmFsdWVzICYmXG4gICAgICBzb3VyY2VBdHRyaWJ1dGUuZGlzcGxheUFzICE9PSBDcHEuRGlzcGxheUFzLklOUFVUXG4gICAgKSB7XG4gICAgICBjb25zdCB2YWx1ZXM6IENvbmZpZ3VyYXRvci5WYWx1ZVtdID0gW107XG4gICAgICBzb3VyY2VBdHRyaWJ1dGUudmFsdWVzLmZvckVhY2goKHZhbHVlKSA9PlxuICAgICAgICB0aGlzLmNvbnZlcnRWYWx1ZSh2YWx1ZSwgc291cmNlQXR0cmlidXRlLCBjdXJyZW5jeSwgdmFsdWVzKVxuICAgICAgKTtcbiAgICAgIGF0dHJpYnV0ZS52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICB0aGlzLnNldFNlbGVjdGVkU2luZ2xlVmFsdWUoYXR0cmlidXRlKTtcbiAgICB9XG4gICAgYXR0cmlidXRlLmF0dHJpYnV0ZVByaWNlVG90YWwgPVxuICAgICAgdGhpcy5jcHFDb25maWd1cmF0b3JOb3JtYWxpemVyVXRpbHNTZXJ2aWNlLmNhbGN1bGF0ZUF0dHJpYnV0ZVByaWNlVG90YWwoXG4gICAgICAgIGF0dHJpYnV0ZSxcbiAgICAgICAgY3VycmVuY3lcbiAgICAgICk7XG4gICAgdGhpcy5jb21waWxlQXR0cmlidXRlSW5jb21wbGV0ZShhdHRyaWJ1dGUpO1xuICAgIGF0dHJpYnV0ZUxpc3QucHVzaChhdHRyaWJ1dGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluIGNhc2UgdGhlIENQUSBBUEkgaXMgY2FsbGVkIHZpYSBSRVNULCB0aGUgYXR0cmlidXRlIGlkIGlzIHJldHVybmVkIHVzaW5nIGZpZWxkIG5hbWUgcEFfSUQuXG4gICAqIElmIHdlIGNhbGwgQ1BRIHZpYSBPQ0MgdGhlIGF0dHJpYnV0ZSBpcyBtYXBwZWQgdG8gZmllbGQgbmFtZSBQQV9JRC5cbiAgICogVGhpcyBjYW4ndCBiZSBjaGFuZ2VkIGVhc2lseSBhbmQgaXMgcmVsYXRlZCB0byB0aGUgbm9uLXN0YW5kYXJkIGNvbmZvcm0gbmFtZSAncEFfSUQnO1xuICAgKiBAcGFyYW0gc291cmNlQXR0cmlidXRlIHNvdXJjZSBhdHRyaWJ1dGVcbiAgICogQHJldHVybnMgdmFsdWUgb2YgUEFfSUQgb3IgcEFfSUQsIGRlcGVuZGluZyBvbiB3aGljaCBmaWVsZCBpcyBmaWxsZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgbWFwUEFJZChzb3VyY2VBdHRyaWJ1dGU6IENwcS5BdHRyaWJ1dGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBzb3VyY2VBdHRyaWJ1dGUucEFfSURcbiAgICAgID8gc291cmNlQXR0cmlidXRlLnBBX0lELnRvU3RyaW5nKClcbiAgICAgIDogKDxhbnk+c291cmNlQXR0cmlidXRlKS5QQV9JRC50b1N0cmluZygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFNlbGVjdGVkU2luZ2xlVmFsdWUoYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlKSB7XG4gICAgY29uc3QgdmFsdWVzID0gYXR0cmlidXRlLnZhbHVlcztcbiAgICBpZiAodmFsdWVzKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFZhbHVlcyA9IHZhbHVlc1xuICAgICAgICAubWFwKChlbnRyeSkgPT4gZW50cnkpXG4gICAgICAgIC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5zZWxlY3RlZCk7XG4gICAgICBpZiAoc2VsZWN0ZWRWYWx1ZXMgJiYgc2VsZWN0ZWRWYWx1ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGF0dHJpYnV0ZS5zZWxlY3RlZFNpbmdsZVZhbHVlID0gc2VsZWN0ZWRWYWx1ZXNbMF0udmFsdWVDb2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBjb252ZXJ0VmFsdWVEaXNwbGF5KFxuICAgIHNvdXJjZVZhbHVlOiBDcHEuVmFsdWUsXG4gICAgc291cmNlQXR0cmlidXRlOiBDcHEuQXR0cmlidXRlLFxuICAgIHZhbHVlOiBDb25maWd1cmF0b3IuVmFsdWVcbiAgKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgc291cmNlQXR0cmlidXRlLmRpc3BsYXlBcyA9PT0gQ3BxLkRpc3BsYXlBcy5EUk9QRE9XTiAmJlxuICAgICAgc291cmNlVmFsdWUuc2VsZWN0ZWQgJiZcbiAgICAgIHNvdXJjZVZhbHVlLnBhVl9JRCA9PT0gMFxuICAgICkge1xuICAgICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgICAudHJhbnNsYXRlKCdjb25maWd1cmF0b3IuYXR0cmlidXRlLmRyb3BEb3duU2VsZWN0TXNnJylcbiAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgLnN1YnNjcmliZSgodGV4dCkgPT4gKHZhbHVlLnZhbHVlRGlzcGxheSA9IHRleHQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUudmFsdWVEaXNwbGF5ID0gc291cmNlVmFsdWUudmFsdWVEaXNwbGF5O1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBjb252ZXJ0VmFsdWVDb2RlKHZhbHVlQ29kZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWVDb2RlID09PSAwXG4gICAgICA/IENvbmZpZ3VyYXRvci5SZXRyYWN0VmFsdWVDb2RlXG4gICAgICA6IHZhbHVlQ29kZS50b1N0cmluZygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbnZlcnRWYWx1ZShcbiAgICBzb3VyY2VWYWx1ZTogQ3BxLlZhbHVlLFxuICAgIHNvdXJjZUF0dHJpYnV0ZTogQ3BxLkF0dHJpYnV0ZSxcbiAgICBjdXJyZW5jeTogc3RyaW5nLFxuICAgIHZhbHVlczogQ29uZmlndXJhdG9yLlZhbHVlW11cbiAgKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaGFzVmFsdWVUb0JlSWdub3JlZChzb3VyY2VBdHRyaWJ1dGUsIHNvdXJjZVZhbHVlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZTogQ29uZmlndXJhdG9yLlZhbHVlID0ge1xuICAgICAgdmFsdWVDb2RlOiB0aGlzLmNvbnZlcnRWYWx1ZUNvZGUoc291cmNlVmFsdWUucGFWX0lEKSxcbiAgICAgIG5hbWU6IHNvdXJjZVZhbHVlLnZhbHVlQ29kZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBzb3VyY2VWYWx1ZS5kZXNjcmlwdGlvbixcbiAgICAgIHByb2R1Y3RTeXN0ZW1JZDogc291cmNlVmFsdWUucHJvZHVjdFN5c3RlbUlkLFxuICAgICAgc2VsZWN0ZWQ6IHNvdXJjZVZhbHVlLnNlbGVjdGVkLFxuICAgICAgcXVhbnRpdHk6IHRoaXMuY3BxQ29uZmlndXJhdG9yTm9ybWFsaXplclV0aWxzU2VydmljZS5jb252ZXJ0UXVhbnRpdHkoXG4gICAgICAgIHNvdXJjZVZhbHVlLFxuICAgICAgICBzb3VyY2VBdHRyaWJ1dGVcbiAgICAgICksXG4gICAgICB2YWx1ZVByaWNlOiB0aGlzLmNwcUNvbmZpZ3VyYXRvck5vcm1hbGl6ZXJVdGlsc1NlcnZpY2UuY29udmVydFZhbHVlUHJpY2UoXG4gICAgICAgIHNvdXJjZVZhbHVlLFxuICAgICAgICBjdXJyZW5jeVxuICAgICAgKSxcbiAgICAgIGltYWdlczogW10sXG4gICAgfTtcblxuICAgIHRoaXMuY29udmVydFZhbHVlRGlzcGxheShzb3VyY2VWYWx1ZSwgc291cmNlQXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgdmFsdWUudmFsdWVQcmljZVRvdGFsID1cbiAgICAgIHRoaXMuY3BxQ29uZmlndXJhdG9yTm9ybWFsaXplclV0aWxzU2VydmljZS5jYWxjdWxhdGVWYWx1ZVByaWNlVG90YWwoXG4gICAgICAgIHZhbHVlLnF1YW50aXR5ID8/IDEsXG4gICAgICAgIHZhbHVlLnZhbHVlUHJpY2VcbiAgICAgICk7XG5cbiAgICB2YWx1ZXMucHVzaCh2YWx1ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29udmVydEF0dHJpYnV0ZVR5cGUoXG4gICAgc291cmNlQXR0cmlidXRlOiBDcHEuQXR0cmlidXRlXG4gICk6IENvbmZpZ3VyYXRvci5VaVR5cGUge1xuICAgIGNvbnN0IGRpc3BsYXlBcyA9IHNvdXJjZUF0dHJpYnV0ZS5kaXNwbGF5QXM7XG5cbiAgICBjb25zdCBkaXNwbGF5QXNQcm9kdWN0OiBib29sZWFuID1cbiAgICAgIHNvdXJjZUF0dHJpYnV0ZS52YWx1ZXMgJiZcbiAgICAgIHRoaXMuY3BxQ29uZmlndXJhdG9yTm9ybWFsaXplclV0aWxzU2VydmljZS5oYXNBbnlQcm9kdWN0cyhcbiAgICAgICAgc291cmNlQXR0cmlidXRlLnZhbHVlc1xuICAgICAgKVxuICAgICAgICA/IHRydWVcbiAgICAgICAgOiBmYWxzZTtcbiAgICBjb25zdCBpc0VuYWJsZWQ6IGJvb2xlYW4gPSBzb3VyY2VBdHRyaWJ1dGUuaXNFbmFibGVkID8/IGZhbHNlO1xuXG4gICAgaWYgKFxuICAgICAgIWlzRW5hYmxlZCAmJlxuICAgICAgKGRpc3BsYXlBcyA9PT0gQ3BxLkRpc3BsYXlBcy5SQURJT19CVVRUT04gfHxcbiAgICAgICAgZGlzcGxheUFzID09PSBDcHEuRGlzcGxheUFzLkRST1BET1dOIHx8XG4gICAgICAgIGRpc3BsYXlBcyA9PT0gQ3BxLkRpc3BsYXlBcy5DSEVDS19CT1ggfHxcbiAgICAgICAgZGlzcGxheUFzID09PSBDcHEuRGlzcGxheUFzLklOUFVUKVxuICAgICkge1xuICAgICAgcmV0dXJuIENvbmZpZ3VyYXRvci5VaVR5cGUuUkVBRF9PTkxZO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmZpbmRVaVR5cGVGcm9tRGlzcGxheVR5cGUoXG4gICAgICBkaXNwbGF5QXMsXG4gICAgICBkaXNwbGF5QXNQcm9kdWN0LFxuICAgICAgc291cmNlQXR0cmlidXRlXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBmaW5kVWlUeXBlRnJvbURpc3BsYXlUeXBlKFxuICAgIGRpc3BsYXlBczogbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGRpc3BsYXlBc1Byb2R1Y3Q6IGJvb2xlYW4sXG4gICAgc291cmNlQXR0cmlidXRlOiBDcHEuQXR0cmlidXRlXG4gICk6IENvbmZpZ3VyYXRvci5VaVR5cGUge1xuICAgIGxldCB1aVR5cGU6IENvbmZpZ3VyYXRvci5VaVR5cGU7XG4gICAgc3dpdGNoIChkaXNwbGF5QXMpIHtcbiAgICAgIGNhc2UgQ3BxLkRpc3BsYXlBcy5SQURJT19CVVRUT046IHtcbiAgICAgICAgdWlUeXBlID0gZGlzcGxheUFzUHJvZHVjdFxuICAgICAgICAgID8gQ29uZmlndXJhdG9yLlVpVHlwZS5SQURJT0JVVFRPTl9QUk9EVUNUXG4gICAgICAgICAgOiBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSBDcHEuRGlzcGxheUFzLkRST1BET1dOOiB7XG4gICAgICAgIHVpVHlwZSA9IGRpc3BsYXlBc1Byb2R1Y3RcbiAgICAgICAgICA/IENvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV05fUFJPRFVDVFxuICAgICAgICAgIDogQ29uZmlndXJhdG9yLlVpVHlwZS5EUk9QRE9XTjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgQ3BxLkRpc3BsYXlBcy5DSEVDS19CT1g6IHtcbiAgICAgICAgdWlUeXBlID0gZGlzcGxheUFzUHJvZHVjdFxuICAgICAgICAgID8gQ29uZmlndXJhdG9yLlVpVHlwZS5DSEVDS0JPWExJU1RfUFJPRFVDVFxuICAgICAgICAgIDogQ29uZmlndXJhdG9yLlVpVHlwZS5DSEVDS0JPWExJU1Q7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlIENwcS5EaXNwbGF5QXMuSU5QVVQ6IHtcbiAgICAgICAgdWlUeXBlID1cbiAgICAgICAgICBzb3VyY2VBdHRyaWJ1dGUuZGF0YVR5cGUgPT09IENwcS5EYXRhVHlwZS5JTlBVVF9TVFJJTkdcbiAgICAgICAgICAgID8gQ29uZmlndXJhdG9yLlVpVHlwZS5TVFJJTkdcbiAgICAgICAgICAgIDogQ29uZmlndXJhdG9yLlVpVHlwZS5OT1RfSU1QTEVNRU5URUQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHVpVHlwZSA9IENvbmZpZ3VyYXRvci5VaVR5cGUuTk9UX0lNUExFTUVOVEVEO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdWlUeXBlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbXBpbGVBdHRyaWJ1dGVJbmNvbXBsZXRlKGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSkge1xuICAgIC8vRGVmYXVsdCB2YWx1ZSBmb3IgaW5jb21wbGV0ZSBpcyBmYWxzZVxuICAgIGF0dHJpYnV0ZS5pbmNvbXBsZXRlID0gZmFsc2U7XG5cbiAgICBzd2l0Y2ggKGF0dHJpYnV0ZS51aVR5cGUpIHtcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5SQURJT0JVVFRPTjpcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5SQURJT0JVVFRPTl9QUk9EVUNUOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLkRST1BET1dOOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLkRST1BET1dOX1BST0RVQ1Q6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuU0lOR0xFX1NFTEVDVElPTl9JTUFHRToge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWF0dHJpYnV0ZS5zZWxlY3RlZFNpbmdsZVZhbHVlIHx8XG4gICAgICAgICAgYXR0cmlidXRlLnNlbGVjdGVkU2luZ2xlVmFsdWUgPT09IENvbmZpZ3VyYXRvci5SZXRyYWN0VmFsdWVDb2RlXG4gICAgICAgICkge1xuICAgICAgICAgIGF0dHJpYnV0ZS5pbmNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5OVU1FUklDOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLlNUUklORzoge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZS51c2VySW5wdXQpIHtcbiAgICAgICAgICBhdHRyaWJ1dGUuaW5jb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5DSEVDS0JPWExJU1Q6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuQ0hFQ0tCT1hMSVNUX1BST0RVQ1Q6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuQ0hFQ0tCT1g6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuTVVMVElfU0VMRUNUSU9OX0lNQUdFOiB7XG4gICAgICAgIGNvbnN0IGlzT25lVmFsdWVTZWxlY3RlZCA9XG4gICAgICAgICAgYXR0cmlidXRlLnZhbHVlcz8uZmluZCgodmFsdWUpID0+IHZhbHVlLnNlbGVjdGVkKSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgIDogZmFsc2U7XG5cbiAgICAgICAgaWYgKCFpc09uZVZhbHVlU2VsZWN0ZWQpIHtcbiAgICAgICAgICBhdHRyaWJ1dGUuaW5jb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGhhc1ZhbHVlVG9CZUlnbm9yZWQoXG4gICAgYXR0cmlidXRlOiBDcHEuQXR0cmlidXRlLFxuICAgIHZhbHVlOiBDcHEuVmFsdWVcbiAgKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSBhdHRyaWJ1dGUudmFsdWVzXG4gICAgICA/Lm1hcCgoZW50cnkpID0+IGVudHJ5KVxuICAgICAgLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LnNlbGVjdGVkICYmIGVudHJ5LnBhVl9JRCAhPT0gMCk7XG4gICAgcmV0dXJuIChcbiAgICAgIChhdHRyaWJ1dGUuZGlzcGxheUFzID09PSBDcHEuRGlzcGxheUFzLkRST1BET1dOICYmXG4gICAgICAgIGF0dHJpYnV0ZS5yZXF1aXJlZCAmJlxuICAgICAgICBzZWxlY3RlZFZhbHVlcyAmJlxuICAgICAgICBzZWxlY3RlZFZhbHVlcy5sZW5ndGggPiAwICYmXG4gICAgICAgIHZhbHVlLnBhVl9JRCA9PT0gMCkgPz9cbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgfVxufVxuIl19