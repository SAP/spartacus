import * as i0 from '@angular/core';
import { inject, isDevMode, Injectable, InjectionToken, NgModule } from '@angular/core';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import { Configurator, RulebasedConfiguratorConnector } from '@spartacus/product-configurator/rulebased';
import { take, map, switchMap } from 'rxjs/operators';
import { getCurrencySymbol, formatCurrency, getLocaleId, CommonModule } from '@angular/common';
import * as i2 from '@spartacus/core';
import { LoggerService, provideDefaultConfigFactory, Config, StringTemplate, provideDefaultConfig } from '@spartacus/core';
import { of, forkJoin } from 'rxjs';
import { CART_MODIFICATION_NORMALIZER } from '@spartacus/cart/base/root';
import * as i1 from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MARKER_HEADER_CPQ_CONFIGURATOR } from '@spartacus/product-configurator/rulebased/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 *
 * An interface representing the models used for the communication with the CPQ configurator
 */
var Cpq;
(function (Cpq) {
    /**
     *
     * An enum representing possible displayAs value.
     */
    let DisplayAs;
    (function (DisplayAs) {
        DisplayAs[DisplayAs["RADIO_BUTTON"] = 1] = "RADIO_BUTTON";
        DisplayAs[DisplayAs["CHECK_BOX"] = 2] = "CHECK_BOX";
        DisplayAs[DisplayAs["DROPDOWN"] = 3] = "DROPDOWN";
        DisplayAs[DisplayAs["LIST_BOX"] = 4] = "LIST_BOX";
        DisplayAs[DisplayAs["LIST_BOX_MULTI"] = 5] = "LIST_BOX_MULTI";
        DisplayAs[DisplayAs["READ_ONLY"] = 71] = "READ_ONLY";
        DisplayAs[DisplayAs["INPUT"] = 95] = "INPUT";
        DisplayAs[DisplayAs["AUTO_COMPLETE_CUSTOM"] = 102] = "AUTO_COMPLETE_CUSTOM";
    })(DisplayAs = Cpq.DisplayAs || (Cpq.DisplayAs = {}));
    let DataType;
    (function (DataType) {
        DataType["INPUT_STRING"] = "String";
        DataType["INPUT_NUMBER"] = "Number";
        DataType["QTY_ATTRIBUTE_LEVEL"] = "Quantity";
        DataType["QTY_VALUE_LEVEL"] = "Attr.Quantity";
        DataType["N_A"] = "N/A";
    })(DataType = Cpq.DataType || (Cpq.DataType = {}));
})(Cpq || (Cpq = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Utilities for CPQ configuration
 */
class CpqConfiguratorNormalizerUtilsService {
    constructor(languageService) {
        this.languageService = languageService;
        this.logger = inject(LoggerService);
    }
    /**
     * Converts quantity to be shown in the overview page
     *
     * @param {Cpq.Value} value - CPQ Value
     * @param {Cpq.Attribute} attribute - CPQ Attribute
     * @returns {number} - Quantity
     */
    convertQuantity(value, attribute) {
        if (!value.selected) {
            return undefined;
        }
        const configuratorDataType = this.convertDataType(attribute);
        let quantity;
        switch (configuratorDataType) {
            case Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL:
                quantity = Number(attribute.quantity);
                break;
            case Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL:
                quantity = Number(value.quantity);
                break;
            default:
                quantity = undefined;
        }
        return quantity;
    }
    /**
     * Converts value price
     *
     * @param { Cpq.Value} value - CPQ Value
     * @param {string} currency - Currency code ISO
     * @returns {Configurator.PriceDetails}
     */
    convertValuePrice(value, currency) {
        let price;
        if (value.price) {
            price = {
                currencyIso: currency,
                value: parseFloat(value.price),
            };
            this.formatPriceForLocale(price, this.getLanguage());
        }
        return price;
    }
    /**
     * Calculates total value price
     *
     * @param {number} quantity - Quantity
     * @param {Configurator.PriceDetails} valuePrice - PriceDetails of the single value price
     * @returns {Configurator.PriceDetails } - total value price
     */
    calculateValuePriceTotal(quantity, valuePrice) {
        let valuePriceTotal;
        if (valuePrice) {
            const calculationQuantity = quantity ? quantity : 1;
            valuePriceTotal = {
                currencyIso: valuePrice.currencyIso,
                value: calculationQuantity * valuePrice.value,
            };
            this.formatPriceForLocale(valuePriceTotal, this.getLanguage());
        }
        return valuePriceTotal;
    }
    /**
     * Calculates total attribute price
     *
     * @param {Configurator.Attribute} attribute - Configurator Attribute
     * @param {string} currency - Currency
     * @returns {Configurator.PriceDetails} - total attribute price
     */
    calculateAttributePriceTotal(attribute, currency) {
        var _a;
        const priceTotal = (_a = attribute.values) === null || _a === void 0 ? void 0 : _a.filter((entry) => entry.selected && entry.valuePriceTotal).reduce((total, item) => { var _a, _b; return total + ((_b = (_a = item.valuePriceTotal) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0); }, 0);
        const attributePriceTotal = {
            currencyIso: currency,
            value: priceTotal !== null && priceTotal !== void 0 ? priceTotal : 0,
        };
        this.formatPriceForLocale(attributePriceTotal, this.getLanguage());
        return attributePriceTotal;
    }
    /**
     * Formats price for given PriceDetails object and Locale
     *
     * @param {Configurator.PriceDetails} price - Price details
     * @param {string} availableLocale - Original locale
     */
    formatPriceForLocale(price, availableLocale) {
        const currencySymbol = getCurrencySymbol(price.currencyIso, 'narrow', availableLocale);
        price.formattedValue = formatCurrency(price.value, availableLocale, currencySymbol, price.currencyIso);
    }
    /**
     * Converts the CPQ Attribute data type into the Configurator Attribute data type
     *
     * @param {Cpq.Attribute} cpqAttribute - CPQ Attribute
     * @returns {Configurator.DataType} Data type of the configurator attribute
     */
    convertDataType(cpqAttribute) {
        let dataType;
        switch (cpqAttribute.dataType) {
            case Cpq.DataType.INPUT_STRING: {
                dataType = Configurator.DataType.INPUT_STRING;
                break;
            }
            case Cpq.DataType.INPUT_NUMBER: {
                dataType = Configurator.DataType.INPUT_NUMBER;
                break;
            }
            case Cpq.DataType.N_A: {
                dataType = Configurator.DataType.USER_SELECTION_NO_QTY;
                break;
            }
            case Cpq.DataType.QTY_ATTRIBUTE_LEVEL: {
                dataType = Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL;
                break;
            }
            case Cpq.DataType.QTY_VALUE_LEVEL: {
                if (cpqAttribute.displayAs === Cpq.DisplayAs.RADIO_BUTTON ||
                    cpqAttribute.displayAs === Cpq.DisplayAs.DROPDOWN) {
                    dataType = Configurator.DataType.USER_SELECTION_NO_QTY;
                }
                else if (cpqAttribute.displayAs === Cpq.DisplayAs.CHECK_BOX &&
                    !cpqAttribute.isLineItem) {
                    dataType = Configurator.DataType.USER_SELECTION_NO_QTY;
                }
                else {
                    dataType = Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL;
                }
                break;
            }
            default: {
                dataType = Configurator.DataType.NOT_IMPLEMENTED;
            }
        }
        return dataType;
    }
    /**
     * Converts price summary
     *
     * @param {cpqConfiguration: Cpq.Configuration} cpqConfiguration - CPQ configuration
     * @returns {Configurator.PriceSummary} - price summary
     */
    convertPriceSummary(cpqConfiguration) {
        var _a, _b;
        const priceSummary = {};
        if (cpqConfiguration.currencyISOCode) {
            const currency = cpqConfiguration.currencyISOCode;
            if (((_a = cpqConfiguration === null || cpqConfiguration === void 0 ? void 0 : cpqConfiguration.responder) === null || _a === void 0 ? void 0 : _a.totalPrice) &&
                (cpqConfiguration === null || cpqConfiguration === void 0 ? void 0 : cpqConfiguration.currencySign)) {
                const currencySign = cpqConfiguration === null || cpqConfiguration === void 0 ? void 0 : cpqConfiguration.currencySign;
                const totalPriceAsString = cpqConfiguration.responder.totalPrice.replace(currencySign, '');
                const totalPrice = {
                    currencyIso: currency,
                    value: parseFloat(totalPriceAsString),
                };
                this.formatPriceForLocale(totalPrice, this.getLanguage());
                priceSummary.currentTotal = totalPrice;
            }
            if ((_b = cpqConfiguration === null || cpqConfiguration === void 0 ? void 0 : cpqConfiguration.responder) === null || _b === void 0 ? void 0 : _b.baseProductPrice) {
                const basePriceAsString = cpqConfiguration.responder.baseProductPrice;
                const basePrice = {
                    currencyIso: currency,
                    value: parseFloat(basePriceAsString),
                };
                this.formatPriceForLocale(basePrice, this.getLanguage());
                priceSummary.basePrice = basePrice;
            }
            if (priceSummary.currentTotal && priceSummary.basePrice) {
                const selectedOptionsPrice = {
                    currencyIso: currency,
                    value: priceSummary.currentTotal.value - priceSummary.basePrice.value,
                };
                this.formatPriceForLocale(selectedOptionsPrice, this.getLanguage());
                priceSummary.selectedOptions = selectedOptionsPrice;
            }
        }
        return priceSummary;
    }
    /**
     * Verifies whether at least one value of a CPQ Attribute has an assigned product
     *
     * @param {Cpq.Value[]} attributeValues - CPQ Attribute values
     * @returns {boolean} - true, if at least one value of a CPQ Attribute has an assigned product
     */
    hasAnyProducts(attributeValues) {
        return attributeValues.some((value) => value === null || value === void 0 ? void 0 : value.productSystemId);
    }
    /**
     * Convert attribute label
     *
     * @param {attribute: Cpq.Attribute} attribute - CPQ Attribute
     * @returns {string} - attribute label
     */
    convertAttributeLabel(attribute) {
        return attribute.label
            ? attribute.label
            : attribute.name
                ? attribute.name
                : '';
    }
    /**
     * Gets the current language.
     *
     * @return {string} - current language
     */
    getLanguage() {
        const lang = this.getActiveLanguage();
        try {
            getLocaleId(lang);
            return lang;
        }
        catch (_a) {
            this.reportMissingLocaleData(lang);
            return 'en';
        }
    }
    /**
     * Gets the active language.
     *
     * @return {string} - active language
     */
    getActiveLanguage() {
        let result;
        this.languageService
            .getActive()
            .subscribe((lang) => (result = lang))
            .unsubscribe();
        return result !== null && result !== void 0 ? result : 'en';
    }
    /**
     * Logs the message for the missing local data.
     *
     * @param {string} lang - Active language
     */
    reportMissingLocaleData(lang) {
        if (isDevMode()) {
            this.logger.warn(`CpqConfiguratorNormalizerUtilsService: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`);
        }
    }
}
CpqConfiguratorNormalizerUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorNormalizerUtilsService, deps: [{ token: i2.LanguageService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorNormalizerUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorNormalizerUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorNormalizerUtilsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i2.LanguageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CpqConfiguratorNormalizer {
    constructor(cpqConfiguratorNormalizerUtilsService, translation) {
        this.cpqConfiguratorNormalizerUtilsService = cpqConfiguratorNormalizerUtilsService;
        this.translation = translation;
    }
    convert(source, target) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const resultTarget = Object.assign(Object.assign({}, target), { configId: source.configurationId ? source.configurationId : '', complete: !((_a = source.incompleteAttributes) === null || _a === void 0 ? void 0 : _a.length), consistent: !((_b = source.invalidMessages) === null || _b === void 0 ? void 0 : _b.length) &&
                !((_c = source.failedValidations) === null || _c === void 0 ? void 0 : _c.length) &&
                !((_d = source.incompleteMessages) === null || _d === void 0 ? void 0 : _d.length) &&
                !((_e = source.errorMessages) === null || _e === void 0 ? void 0 : _e.length), totalNumberOfIssues: this.generateTotalNumberOfIssues(source), productCode: source.productSystemId, priceSummary: this.cpqConfiguratorNormalizerUtilsService.convertPriceSummary(source), groups: [], flatGroups: [], owner: ConfiguratorModelUtils.createInitialOwner(), interactionState: {}, errorMessages: this.generateErrorMessages(source), warningMessages: this.generateWarningMessages(source), pricingEnabled: true });
        (_f = source.tabs) === null || _f === void 0 ? void 0 : _f.forEach((tab) => { var _a; return this.convertGroup(tab, (_a = source.attributes) !== null && _a !== void 0 ? _a : [], source.currencyISOCode, resultTarget.groups, resultTarget.flatGroups); });
        if (!resultTarget.groups || resultTarget.groups.length === 0) {
            this.convertGenericGroup((_g = source.attributes) !== null && _g !== void 0 ? _g : [], (_h = source.incompleteAttributes) !== null && _h !== void 0 ? _h : [], source.currencyISOCode, resultTarget.groups, resultTarget.flatGroups);
        }
        return resultTarget;
    }
    generateTotalNumberOfIssues(source) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const numberOfIssues = ((_b = (_a = source.incompleteAttributes) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) +
            ((_d = (_c = source.incompleteMessages) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) +
            ((_f = (_e = source.invalidMessages) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : 0) +
            ((_h = (_g = source.failedValidations) === null || _g === void 0 ? void 0 : _g.length) !== null && _h !== void 0 ? _h : 0) +
            ((_k = (_j = source.errorMessages) === null || _j === void 0 ? void 0 : _j.length) !== null && _k !== void 0 ? _k : 0);
        return numberOfIssues;
    }
    generateWarningMessages(source) {
        var _a, _b;
        let warnMsgs = [];
        warnMsgs = warnMsgs.concat((_a = source.failedValidations) !== null && _a !== void 0 ? _a : []);
        warnMsgs = warnMsgs.concat((_b = source.incompleteMessages) !== null && _b !== void 0 ? _b : []);
        return warnMsgs;
    }
    generateErrorMessages(source) {
        var _a, _b;
        let errorMsgs = [];
        errorMsgs = errorMsgs.concat((_a = source.errorMessages) !== null && _a !== void 0 ? _a : []);
        errorMsgs = errorMsgs.concat((_b = source.invalidMessages) !== null && _b !== void 0 ? _b : []);
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
        var _a;
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
            this.cpqConfiguratorNormalizerUtilsService.calculateValuePriceTotal((_a = value.quantity) !== null && _a !== void 0 ? _a : 1, value.valuePrice);
        values.push(value);
    }
    convertAttributeType(sourceAttribute) {
        var _a;
        const displayAs = sourceAttribute.displayAs;
        const displayAsProduct = sourceAttribute.values &&
            this.cpqConfiguratorNormalizerUtilsService.hasAnyProducts(sourceAttribute.values)
            ? true
            : false;
        const isEnabled = (_a = sourceAttribute.isEnabled) !== null && _a !== void 0 ? _a : false;
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
        var _a;
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
                const isOneValueSelected = ((_a = attribute.values) === null || _a === void 0 ? void 0 : _a.find((value) => value.selected)) !== undefined
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
        var _a, _b;
        const selectedValues = (_a = attribute.values) === null || _a === void 0 ? void 0 : _a.map((entry) => entry).filter((entry) => entry.selected && entry.paV_ID !== 0);
        return ((_b = (attribute.displayAs === Cpq.DisplayAs.DROPDOWN &&
            attribute.required &&
            selectedValues &&
            selectedValues.length > 0 &&
            value.paV_ID === 0)) !== null && _b !== void 0 ? _b : false);
    }
}
CpqConfiguratorNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorNormalizer, deps: [{ token: CpqConfiguratorNormalizerUtilsService }, { token: i2.TranslationService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorNormalizer });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorNormalizer, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CpqConfiguratorNormalizerUtilsService }, { type: i2.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const INITIAL_OV_VALUE_ATTRIBUTE_NAME = '';
class CpqConfiguratorOverviewNormalizer {
    constructor(cpqConfiguratorNormalizerUtilsService, translation) {
        this.cpqConfiguratorNormalizerUtilsService = cpqConfiguratorNormalizerUtilsService;
        this.translation = translation;
        this.NO_OPTION_SELECTED = 0;
    }
    convert(source, target) {
        var _a;
        const resultTarget = Object.assign(Object.assign({}, target), { configId: source.configurationId ? source.configurationId : '', productCode: source.productSystemId, priceSummary: this.cpqConfiguratorNormalizerUtilsService.convertPriceSummary(source), groups: (_a = source.tabs) === null || _a === void 0 ? void 0 : _a.flatMap((tab) => this.convertTab(tab, source.currencyISOCode)).filter((tab) => tab.attributes && tab.attributes.length > 0), totalNumberOfIssues: this.calculateTotalNumberOfIssues(source) });
        return resultTarget;
    }
    convertTab(tab, currency) {
        var _a;
        let ovAttributes = [];
        (_a = tab.attributes) === null || _a === void 0 ? void 0 : _a.forEach((attr) => {
            ovAttributes = ovAttributes.concat(this.convertAttribute(attr, currency));
        });
        const groupOverview = {
            id: tab.id.toString(),
            groupDescription: tab.displayName,
            attributes: ovAttributes,
        };
        if (groupOverview.id === '0') {
            this.translation
                .translate('configurator.group.general')
                .pipe(take(1))
                .subscribe((generalText) => (groupOverview.groupDescription = generalText));
        }
        return groupOverview;
    }
    convertAttribute(attr, currency) {
        const attributeOverviewType = (attr === null || attr === void 0 ? void 0 : attr.values) &&
            this.cpqConfiguratorNormalizerUtilsService.hasAnyProducts(attr === null || attr === void 0 ? void 0 : attr.values)
            ? Configurator.AttributeOverviewType.BUNDLE
            : Configurator.AttributeOverviewType.GENERAL;
        const ovAttr = [];
        this.convertAttributeValue(attr, currency).forEach((ovValue) => {
            ovAttr.push(Object.assign(Object.assign({}, ovValue), { type: attributeOverviewType, attribute: this.cpqConfiguratorNormalizerUtilsService.convertAttributeLabel(attr), attributeId: attr.stdAttrCode.toString() }));
        });
        return ovAttr;
    }
    convertAttributeValue(attr, currency) {
        var _a, _b, _c;
        const ovValues = [];
        switch (attr.displayAs) {
            case Cpq.DisplayAs.INPUT:
                if ((attr === null || attr === void 0 ? void 0 : attr.dataType) === Cpq.DataType.INPUT_STRING) {
                    if (attr.userInput && attr.userInput.length > 0) {
                        ovValues.push(this.extractValueUserInput(attr, currency));
                    }
                }
                else {
                    ovValues.push({
                        attribute: INITIAL_OV_VALUE_ATTRIBUTE_NAME,
                        value: 'NOT_IMPLEMENTED',
                    });
                }
                break;
            case Cpq.DisplayAs.RADIO_BUTTON:
            case Cpq.DisplayAs.DROPDOWN:
                const selectedValue = (_a = attr.values) === null || _a === void 0 ? void 0 : _a.find((val) => val.selected && val.paV_ID !== this.NO_OPTION_SELECTED);
                if (selectedValue) {
                    ovValues.push(this.extractValue(selectedValue, attr, currency));
                }
                break;
            case Cpq.DisplayAs.CHECK_BOX:
                (_c = (_b = attr.values) === null || _b === void 0 ? void 0 : _b.filter((val) => val.selected)) === null || _c === void 0 ? void 0 : _c.forEach((valueSelected) => {
                    ovValues.push(this.extractValue(valueSelected, attr, currency));
                });
                break;
            default:
                ovValues.push({
                    attribute: INITIAL_OV_VALUE_ATTRIBUTE_NAME,
                    value: 'NOT_IMPLEMENTED',
                });
        }
        return ovValues;
    }
    extractValue(valueSelected, attr, currency) {
        var _a, _b;
        const ovValue = {
            attribute: INITIAL_OV_VALUE_ATTRIBUTE_NAME,
            value: (_a = valueSelected.valueDisplay) !== null && _a !== void 0 ? _a : valueSelected.paV_ID.toString(),
            valueId: valueSelected.paV_ID.toString(),
            productCode: valueSelected.productSystemId,
            quantity: this.cpqConfiguratorNormalizerUtilsService.convertQuantity(valueSelected, attr),
            valuePrice: this.cpqConfiguratorNormalizerUtilsService.convertValuePrice(valueSelected, currency),
        };
        ovValue.valuePriceTotal =
            this.cpqConfiguratorNormalizerUtilsService.calculateValuePriceTotal((_b = ovValue.quantity) !== null && _b !== void 0 ? _b : 1, ovValue.valuePrice);
        return ovValue;
    }
    extractValueUserInput(attr, currency) {
        var _a, _b;
        const value = attr.values ? attr.values[0] : undefined;
        const ovValue = {
            attribute: INITIAL_OV_VALUE_ATTRIBUTE_NAME,
            value: (_a = attr.userInput) !== null && _a !== void 0 ? _a : attr.stdAttrCode.toString(),
            valueId: value === null || value === void 0 ? void 0 : value.paV_ID.toString(),
            quantity: 1,
        };
        if (value) {
            ovValue.valuePrice =
                this.cpqConfiguratorNormalizerUtilsService.convertValuePrice(value, currency);
            ovValue.valuePriceTotal =
                this.cpqConfiguratorNormalizerUtilsService.calculateValuePriceTotal((_b = ovValue.quantity) !== null && _b !== void 0 ? _b : 1, ovValue.valuePrice);
        }
        return ovValue;
    }
    calculateTotalNumberOfIssues(source) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const numberOfIssues = ((_b = (_a = source.incompleteAttributes) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) +
            ((_d = (_c = source.incompleteMessages) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) +
            ((_f = (_e = source.invalidMessages) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : 0) +
            ((_h = (_g = source.failedValidations) === null || _g === void 0 ? void 0 : _g.length) !== null && _h !== void 0 ? _h : 0) +
            ((_k = (_j = source.errorMessages) === null || _j === void 0 ? void 0 : _j.length) !== null && _k !== void 0 ? _k : 0);
        return numberOfIssues;
    }
}
CpqConfiguratorOverviewNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOverviewNormalizer, deps: [{ token: CpqConfiguratorNormalizerUtilsService }, { token: i2.TranslationService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorOverviewNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOverviewNormalizer });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOverviewNormalizer, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CpqConfiguratorNormalizerUtilsService }, { type: i2.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CpqConfiguratorUtils {
    /**
     * Collects information that we need to fire a CPQ update
     *
     * @param {Configurator.Attribute} attribute Configurator attribute
     * @returns {CpqUpdateInformation} Update information
     */
    static getUpdateInformation(attribute) {
        //attribute code cannot be made mandatory because of VC,
        //but in the CPQ context it is mandatory. The same is true of the group id
        const attributeCode = attribute.attrCode;
        const groupId = attribute.groupId;
        if (attributeCode && groupId) {
            return {
                standardAttributeCode: attributeCode.toString(),
                tabId: groupId,
            };
        }
        else {
            throw new Error('Attribute code of group id not present: ' + JSON.stringify(attribute));
        }
    }
    /**
     * Finds first changed attribute
     * @param {Configurator.Configuration} source Configuration
     * @returns {Configurator.Attribute} First attribute of first group
     */
    static findFirstChangedAttribute(source) {
        const firstGroup = source.groups[0];
        if (firstGroup.attributes) {
            return firstGroup.attributes[0];
        }
        else {
            throw new Error('No changed attributes found');
        }
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const VALUE_SEPARATOR = ',';
class CpqConfiguratorSerializer {
    convert(source) {
        const attribute = CpqConfiguratorUtils.findFirstChangedAttribute(source);
        let updateAttribute;
        if (source.updateType === Configurator.UpdateType.ATTRIBUTE_QUANTITY) {
            updateAttribute = this.convertQuantity(attribute, source.configId);
        }
        else {
            updateAttribute = this.convertAttribute(attribute, source.configId);
        }
        return updateAttribute;
    }
    convertQuantity(attribute, configId) {
        const updateInformation = CpqConfiguratorUtils.getUpdateInformation(attribute);
        const updateAttribute = {
            configurationId: configId,
            standardAttributeCode: updateInformation.standardAttributeCode,
            changeAttributeValue: { quantity: attribute.quantity },
            tabId: updateInformation.tabId,
        };
        return updateAttribute;
    }
    convertAttribute(attribute, configurationId) {
        var _a;
        const updateInformation = CpqConfiguratorUtils.getUpdateInformation(attribute);
        const updateAttribute = {
            configurationId: configurationId,
            standardAttributeCode: updateInformation.standardAttributeCode,
            changeAttributeValue: {},
            tabId: updateInformation.tabId,
        };
        if (attribute.uiType === Configurator.UiType.DROPDOWN ||
            attribute.uiType === Configurator.UiType.DROPDOWN_PRODUCT ||
            attribute.uiType === Configurator.UiType.RADIOBUTTON ||
            attribute.uiType === Configurator.UiType.RADIOBUTTON_PRODUCT ||
            attribute.uiType === Configurator.UiType.SINGLE_SELECTION_IMAGE) {
            updateAttribute.changeAttributeValue.attributeValueIds =
                this.processSelectedSingleValue(attribute.selectedSingleValue);
        }
        else if (attribute.uiType === Configurator.UiType.CHECKBOXLIST ||
            attribute.uiType === Configurator.UiType.CHECKBOXLIST_PRODUCT ||
            attribute.uiType === Configurator.UiType.CHECKBOX ||
            attribute.uiType === Configurator.UiType.MULTI_SELECTION_IMAGE) {
            updateAttribute.changeAttributeValue.attributeValueIds =
                this.prepareValueIds(attribute);
        }
        else if (attribute.uiType === Configurator.UiType.STRING ||
            attribute.uiType === Configurator.UiType.NUMERIC) {
            updateAttribute.changeAttributeValue.userInput = attribute.userInput;
            if (!((_a = updateAttribute.changeAttributeValue) === null || _a === void 0 ? void 0 : _a.userInput)) {
                updateAttribute.changeAttributeValue.userInput = ' ';
            }
        }
        return updateAttribute;
    }
    processValueCode(valueCode) {
        return valueCode && valueCode === Configurator.RetractValueCode
            ? '0'
            : valueCode;
    }
    processSelectedSingleValue(singleValue) {
        let processedValue = this.processValueCode(singleValue);
        if (!processedValue) {
            // Is required to remove the value
            processedValue = VALUE_SEPARATOR;
        }
        return processedValue;
    }
    prepareValueIds(attribute) {
        var _a;
        let valueIds = '';
        const selectedValues = (_a = attribute.values) === null || _a === void 0 ? void 0 : _a.filter((value) => value.selected);
        if (selectedValues && selectedValues.length > 0) {
            selectedValues.forEach((value) => {
                valueIds += value.valueCode + VALUE_SEPARATOR;
            });
        }
        else {
            // Is required to remove the value
            valueIds = VALUE_SEPARATOR;
        }
        return valueIds;
    }
}
CpqConfiguratorSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorSerializer });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorSerializer, decorators: [{
            type: Injectable
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CpqConfiguratorValueSerializer {
    convert(source) {
        const attribute = CpqConfiguratorUtils.findFirstChangedAttribute(source);
        const updateValue = this.convertAttribute(attribute, source.configId);
        return updateValue;
    }
    convertAttribute(attribute, configurationId) {
        var _a;
        const updateInfo = CpqConfiguratorUtils.getUpdateInformation(attribute);
        const value = this.findFirstChangedValue(attribute);
        const updateAttribute = {
            configurationId: configurationId,
            standardAttributeCode: updateInfo.standardAttributeCode,
            attributeValueId: value.valueCode,
            quantity: (_a = value.quantity) !== null && _a !== void 0 ? _a : 1,
            tabId: updateInfo.tabId,
        };
        return updateAttribute;
    }
    findFirstChangedValue(attribute) {
        if (attribute.values && attribute.values.length > 0) {
            return attribute.values[0];
        }
        else {
            throw new Error('No values present');
        }
    }
}
CpqConfiguratorValueSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorValueSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorValueSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorValueSerializer });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorValueSerializer, decorators: [{
            type: Injectable
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CPQ_CONFIGURATOR_NORMALIZER = new InjectionToken('CpqConfiguratorNormalizer');
const CPQ_CONFIGURATOR_SERIALIZER = new InjectionToken('CpqConfiguratorSerializer');
const CPQ_CONFIGURATOR_QUANTITY_SERIALIZER = new InjectionToken('CpqConfiguratorValueSerializer');
const CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER = new InjectionToken('CpqConfiguratorOverviewNormalizer');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CpqConfiguratorCommonModule {
}
CpqConfiguratorCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorCommonModule, imports: [CommonModule] });
CpqConfiguratorCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorCommonModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    //TODO: CXSPA-3392 move converters from cpq-configurator-rest module here
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER = new InjectionToken('CpqConfiguratorAddToCartSerializer');
const CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER = new InjectionToken('CpqConfiguratorUpdateCartEntrySerializer');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorCpqAddToCartSerializer {
    convert(source, target) {
        const resultTarget = Object.assign(Object.assign({}, target), { userId: source.userId, cartId: source.cartId, product: { code: source.productCode }, quantity: source.quantity, configId: source.configId });
        return resultTarget;
    }
}
OccConfiguratorCpqAddToCartSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorCpqAddToCartSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorCpqAddToCartSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorCpqAddToCartSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorCpqAddToCartSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorCpqUpdateCartEntrySerializer {
    convert(source, target) {
        const resultTarget = Object.assign(Object.assign({}, target), { userId: source.userId, cartId: source.cartId, entryNumber: source.cartEntryNumber, configId: source.configuration.configId });
        return resultTarget;
    }
}
OccConfiguratorCpqUpdateCartEntrySerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorCpqUpdateCartEntrySerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorCpqUpdateCartEntrySerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorCpqUpdateCartEntrySerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorCpqUpdateCartEntrySerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function defaultOccCpqConfiguratorConfigFactory() {
    return {
        backend: {
            occ: {
                endpoints: {
                    getCpqAccessData: 'users/${userId}/access/cpqconfigurator',
                    addCpqConfigurationToCart: 'users/${userId}/carts/${cartId}/entries/cpqconfigurator',
                    readCpqConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/cpqconfigurator',
                    readCpqConfigurationForOrderEntry: 'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/cpqconfigurator',
                    updateCpqConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/cpqconfigurator',
                    createCpqConfiguration: 'products/${productCode}/configurators/cpqconfigurator',
                    readCpqConfiguration: 'cpqconfigurator/${configurationId}/configuration?tabId=${tabId}',
                    readCpqConfigurationOverview: 'cpqconfigurator/${configurationId}/configurationOverview',
                    updateCpqAttribute: 'cpqconfigurator/${configurationId}/attributes/${attributeCode}?tabId=${tabId}',
                    updateCpqAttributeValueQuantity: 'cpqconfigurator/${configurationId}/attributes/${attributeCode}/values/${attributeValueId}?tabId=${tabId}',
                    readCpqConfigurationForCartEntryFull: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/cpqconfigurator/configuration',
                    readCpqConfigurationForOrderEntryFull: 'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/cpqconfigurator/configuration',
                },
            },
        },
    };
}

class CpqConfiguratorOccService {
    constructor(http, occEndpointsService, converterService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.converterService = converterService;
    }
    addToCart(parameters) {
        const url = this.occEndpointsService.buildUrl('addCpqConfigurationToCart', {
            urlParams: {
                userId: parameters.userId,
                cartId: parameters.cartId,
            },
        });
        const occAddToCartParameters = this.converterService.convert(parameters, CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER);
        return this.http
            .post(url, occAddToCartParameters)
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
    updateCartEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('updateCpqConfigurationForCartEntry', {
            urlParams: {
                userId: parameters.userId,
                cartId: parameters.cartId,
                cartEntryNumber: parameters.cartEntryNumber,
            },
        });
        const occUpdateCartEntryParameters = this.converterService.convert(parameters, CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER);
        return this.http
            .put(url, occUpdateCartEntryParameters)
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
    getConfigIdForCartEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('readCpqConfigurationForCartEntry', {
            urlParams: {
                userId: parameters.userId,
                cartId: parameters.cartId,
                cartEntryNumber: parameters.cartEntryNumber,
            },
        });
        return this.http.get(url).pipe(map((response) => {
            return response.configId;
        }));
    }
    getConfigIdForOrderEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('readCpqConfigurationForOrderEntry', {
            urlParams: {
                userId: parameters.userId,
                orderId: parameters.orderId,
                orderEntryNumber: parameters.orderEntryNumber,
            },
        });
        return this.http.get(url).pipe(map((response) => {
            return response.configId;
        }));
    }
    /**
     * Creates a new default runtime configuration for the given product id
     * and read it from the CPQ system over OCC.
     *
     * @param {string} productSystemId - Product system ID
     * @returns {Observable<Configurator.Configuration>} - Created configuration
     */
    createConfiguration(productSystemId) {
        return this.callCreateConfiguration(productSystemId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER));
    }
    /**
     * Retrieves a configuration from the CPQ system over OCC by its configuration ID and for a certain tab.
     *
     * @param {string} configId - Configuration ID
     * @param {string} tabId - Tab ID
     * @returns {Observable<Configurator.Configuration>} - Retrieved configuration
     */
    readConfiguration(configId, tabId) {
        return this.callReadConfiguration(configId, tabId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER));
    }
    /**
     * Retrieves a configuration overview from the CPQ system over OCC by its configuration ID.
     *
     * @param {string} configId - Configuration ID
     * @returns {Observable<Configurator.Overview>} - Retrieved overview
     */
    readConfigurationOverview(configId) {
        return this.callReadConfigurationOverview(configId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER));
    }
    /**
     * Updates an attribute of the runtime configuration for the given configuration id and attribute code
     * and read the desired configuration tab from the CPQ system over OCC.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Observable<Configurator.Configuration>} - Updated configuration
     */
    updateAttribute(configuration) {
        const updateAttribute = this.converterService.convert(configuration, CPQ_CONFIGURATOR_SERIALIZER);
        return this.callUpdateAttribute(updateAttribute).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER));
    }
    /**
     * Updates a quantity for an attribute of the runtime configuration for the given configuration id and attribute code
     * and read the desired configuration tab from the CPQ system over OCC.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Observable<Configurator.Configuration>} - Updated configuration
     */
    updateValueQuantity(configuration) {
        const updateValue = this.converterService.convert(configuration, CPQ_CONFIGURATOR_QUANTITY_SERIALIZER);
        return this.callUpdateValue(updateValue).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER));
    }
    /**
     * Retrieves a configuration assigned to a cart entry.
     *
     * @param {CommonConfigurator.ReadConfigurationFromCartEntryParameters} parameters - Cart entry parameters
     * @returns {Observable<Configurator.Configuration>} - Retrieved configuration
     */
    readConfigurationForCartEntry(parameters) {
        return this.callReadConfigurationForCartEntry(parameters).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER));
    }
    /**
     * Retrieves a configuration assigned to an order entry.
     *
     * @param {CommonConfigurator.ReadConfigurationFromOrderEntryParameters} parameters - Order entry parameters
     * @returns {Observable<Configurator.Configuration>} - Retrieved configuration
     */
    readConfigurationForOrderEntry(parameters) {
        return this.callReadConfigurationForOrderEntry(parameters).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER));
    }
    callCreateConfiguration(productSystemId) {
        const url = this.occEndpointsService.buildUrl('createCpqConfiguration', {
            urlParams: {
                productCode: productSystemId,
            },
        });
        return this.http.get(url);
    }
    callReadConfiguration(configId, tabId) {
        const url = this.occEndpointsService.buildUrl('readCpqConfiguration', {
            urlParams: {
                configurationId: configId,
            },
            queryParams: tabId ? { tabId: tabId } : undefined,
        });
        return this.http.get(url);
    }
    callReadConfigurationOverview(configId) {
        const url = this.occEndpointsService.buildUrl('readCpqConfigurationOverview', {
            urlParams: {
                configurationId: configId,
            },
        });
        return this.http.get(url);
    }
    callUpdateAttribute(updateAttribute) {
        const url = this.occEndpointsService.buildUrl('updateCpqAttribute', {
            urlParams: {
                configurationId: updateAttribute.configurationId,
                attributeCode: updateAttribute.standardAttributeCode,
            },
            queryParams: { tabId: updateAttribute.tabId },
        });
        return this.http.patch(url, updateAttribute.changeAttributeValue);
    }
    callUpdateValue(updateValue) {
        const url = this.occEndpointsService.buildUrl('updateCpqAttributeValueQuantity', {
            urlParams: {
                configurationId: updateValue.configurationId,
                attributeCode: updateValue.standardAttributeCode,
                attributeValueId: updateValue.attributeValueId,
            },
            queryParams: { tabId: updateValue.tabId },
        });
        return this.http.patch(url, {
            quantity: updateValue.quantity,
        });
    }
    callReadConfigurationForCartEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('readCpqConfigurationForCartEntryFull', {
            urlParams: {
                userId: parameters.userId,
                cartId: parameters.cartId,
                cartEntryNumber: parameters.cartEntryNumber,
            },
        });
        return this.http.get(url);
    }
    callReadConfigurationForOrderEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('readCpqConfigurationForOrderEntryFull', {
            urlParams: {
                userId: parameters.userId,
                orderId: parameters.orderId,
                orderEntryNumber: parameters.orderEntryNumber,
            },
        });
        return this.http.get(url);
    }
}
CpqConfiguratorOccService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOccService, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorOccService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOccService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOccService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CpqConfiguratorOccAdapter {
    constructor(cpqOccService) {
        this.cpqOccService = cpqOccService;
    }
    getConfiguratorType() {
        return "CLOUDCPQCONFIGURATOR" /* ConfiguratorType.CPQ */;
    }
    supportsCpqOverOcc() {
        return true;
    }
    createConfiguration(owner) {
        // no error handling for missing owner id needed, as it's a
        // mandatory attribute in owner
        return this.cpqOccService.createConfiguration(owner.id).pipe(map((configResponse) => {
            configResponse.owner = owner;
            return configResponse;
        }));
    }
    readConfiguration(configId, groupId, owner) {
        return this.cpqOccService.readConfiguration(configId, groupId).pipe(map((configResponse) => {
            configResponse.owner = owner;
            return configResponse;
        }));
    }
    updateConfiguration(configuration) {
        const updateMethod = configuration.updateType === Configurator.UpdateType.VALUE_QUANTITY
            ? this.cpqOccService.updateValueQuantity
            : this.cpqOccService.updateAttribute;
        return updateMethod.call(this.cpqOccService, configuration).pipe(map((configResponse) => {
            configResponse.owner = configuration.owner;
            return configResponse;
        }));
    }
    updateConfigurationOverview() {
        throw new Error('Update the configuration overview is not supported for the CPQ configurator');
    }
    addToCart(parameters) {
        return this.cpqOccService.addToCart(parameters);
    }
    readConfigurationForCartEntry(parameters) {
        return this.cpqOccService.readConfigurationForCartEntry(parameters).pipe(map((configResponse) => {
            configResponse.owner = parameters.owner;
            return configResponse;
        }));
    }
    updateConfigurationForCartEntry(parameters) {
        return this.cpqOccService.updateCartEntry(parameters);
    }
    readConfigurationForOrderEntry(parameters) {
        return this.cpqOccService.readConfigurationForOrderEntry(parameters).pipe(map((configResponse) => {
            configResponse.owner = parameters.owner;
            return configResponse;
        }));
    }
    readPriceSummary(configuration) {
        return of(configuration); // so that UI does not run into exception
    }
    getConfigurationOverview(configId) {
        return this.cpqOccService.readConfigurationOverview(configId);
    }
    searchVariants() {
        throw new Error('searchVariants is not supported for the CPQ configurator');
    }
}
CpqConfiguratorOccAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOccAdapter, deps: [{ token: CpqConfiguratorOccService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorOccAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOccAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOccAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CpqConfiguratorOccService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CpqConfiguratorOccModule {
}
CpqConfiguratorOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOccModule, imports: [CommonModule] });
CpqConfiguratorOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOccModule, providers: [
        provideDefaultConfigFactory(defaultOccCpqConfiguratorConfigFactory),
        {
            provide: CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
            useExisting: OccConfiguratorCpqAddToCartSerializer,
            multi: true,
        },
        {
            provide: CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
            useExisting: OccConfiguratorCpqUpdateCartEntrySerializer,
            multi: true,
        },
        {
            provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
            useClass: CpqConfiguratorOccAdapter,
            multi: true,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfigFactory(defaultOccCpqConfiguratorConfigFactory),
                        {
                            provide: CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
                            useExisting: OccConfiguratorCpqAddToCartSerializer,
                            multi: true,
                        },
                        {
                            provide: CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
                            useExisting: OccConfiguratorCpqUpdateCartEntrySerializer,
                            multi: true,
                        },
                        {
                            provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
                            useClass: CpqConfiguratorOccAdapter,
                            multi: true,
                        },
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CpqConfiguratorEndpointConfig {
}
CpqConfiguratorEndpointConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorEndpointConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorEndpointConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorEndpointConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorEndpointConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CpqConfiguratorEndpointService {
    constructor(config) {
        this.config = config;
        this.logger = inject(LoggerService);
        /**
         * header attribute to a mark cpq related requests, so that they can be picked up by the {@link CpqConfiguratorRestInterceptor}
         */
        this.CPQ_MARKER_HEADER = {
            headers: new HttpHeaders({
                [MARKER_HEADER_CPQ_CONFIGURATOR]: 'x',
            }),
        };
    }
    buildUrl(endpointName, urlParams, queryParams) {
        var _a, _b, _c, _d;
        const endpoints = (_b = (_a = this.config.backend) === null || _a === void 0 ? void 0 : _a.cpq) === null || _b === void 0 ? void 0 : _b.endpoints;
        let endpoint;
        switch (endpointName) {
            case 'configurationInit':
                endpoint = endpoints === null || endpoints === void 0 ? void 0 : endpoints.configurationInit;
                break;
            case 'configurationDisplay':
                endpoint = endpoints === null || endpoints === void 0 ? void 0 : endpoints.configurationDisplay;
                break;
            case 'attributeUpdate':
                endpoint = endpoints === null || endpoints === void 0 ? void 0 : endpoints.attributeUpdate;
                break;
            case 'valueUpdate':
                endpoint = endpoints === null || endpoints === void 0 ? void 0 : endpoints.valueUpdate;
        }
        if (!endpoint) {
            endpoint = 'configurations';
            this.logger.warn(`${endpointName} endpoint configuration missing for cpq backend, please provide it via key: "backend.cpq.endpoints.${endpointName}"`);
        }
        let url = ((_d = (_c = this.config.backend) === null || _c === void 0 ? void 0 : _c.cpq) === null || _d === void 0 ? void 0 : _d.prefix) + endpoint;
        url = urlParams ? StringTemplate.resolve(url, urlParams) : url;
        url = queryParams ? this.appendQueryParameters(url, queryParams) : url;
        return url;
    }
    appendQueryParameters(url, parameters) {
        let urlWithParameters = url + '?';
        parameters.forEach((param, idx) => {
            urlWithParameters = idx > 0 ? urlWithParameters + '&' : urlWithParameters;
            urlWithParameters = `${urlWithParameters}${param.name}=${param.value}`;
        });
        return urlWithParameters;
    }
}
CpqConfiguratorEndpointService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorEndpointService, deps: [{ token: CpqConfiguratorEndpointConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorEndpointService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorEndpointService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorEndpointService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: CpqConfiguratorEndpointConfig }]; } });

class CpqConfiguratorRestService {
    constructor(http, converterService, endpointService) {
        this.http = http;
        this.converterService = converterService;
        this.endpointService = endpointService;
    }
    /**
     * Creates a new runtime configuration for the given product id
     * and read this default configuration from the CPQ system.
     *
     * @param {string} productSystemId - Product system ID
     * @returns {Observable<Configurator.Configuration>} - Created configuration
     */
    createConfiguration(productSystemId) {
        return this.callConfigurationInit(productSystemId).pipe(switchMap((configCreatedResponse) => {
            return this.callConfigurationDisplay(configCreatedResponse.configurationId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
                return Object.assign(Object.assign({}, resultConfiguration), { configId: configCreatedResponse.configurationId });
            }));
        }));
    }
    /**
     * Retrieves a configuration from the CPQ system by its configuration ID and for a certain tab.
     *
     * @param {string} configId - Configuration ID
     * @param {string} tabId - Tab ID
     * @returns {Observable<Configurator.Configuration>} - Retrieved configuration
     */
    readConfiguration(configId, tabId) {
        return this.callConfigurationDisplay(configId, tabId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
            return Object.assign(Object.assign({}, resultConfiguration), { configId: configId });
        }));
    }
    /**
     * Retrieves an overview for a certain configuration by its configuration ID.
     *
     * @param {string} configId - Configuration ID
     * @returns {Observable<Configurator.Overview>} - Retrieved overview
     */
    readConfigurationOverview(configId) {
        return this.getConfigurationWithAllTabsAndAttributes(configId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER), map((resultConfiguration) => {
            return Object.assign(Object.assign({}, resultConfiguration), { configId: configId });
        }));
    }
    /**
     * This method is actually a workaround until CPQ provides and API to fetch
     * all selected attributes / attribute values grouped by all tabs.
     * It will fire a request for each tab to collect all required data.
     */
    getConfigurationWithAllTabsAndAttributes(configId) {
        return this.callConfigurationDisplay(configId).pipe(switchMap((currentTab) => {
            const tabRequests = [];
            if (currentTab.tabs && currentTab.tabs.length > 0) {
                // prepare requests for remaining tabs
                currentTab.tabs.forEach((tab) => {
                    if (tab.isSelected) {
                        // details of the currently selected tab are already fetched
                        tabRequests.push(of(currentTab));
                    }
                    else {
                        tabRequests.push(this.callConfigurationDisplay(configId, tab.id.toString()));
                    }
                });
            }
            else {
                // tabs are not defined in model, general tab is used
                tabRequests.push(of(currentTab));
            }
            // fire requests for remaining tabs and wait until all are finished
            return forkJoin(tabRequests);
        }), map(this.mergeTabResults));
    }
    mergeTabResults(tabReqResultList) {
        const config = Object.assign({}, tabReqResultList[tabReqResultList.length - 1]);
        config.attributes = undefined;
        config.tabs = [];
        tabReqResultList.forEach((tabReqResult) => {
            var _a, _b;
            let tab;
            const currentTab = (_a = tabReqResult.tabs) === null || _a === void 0 ? void 0 : _a.find((tabEl) => tabEl.isSelected);
            if (currentTab && tabReqResult.tabs && tabReqResult.tabs.length > 0) {
                tab = Object.assign({}, currentTab);
            }
            else {
                tab = {
                    id: 0,
                };
            }
            tab.attributes = tabReqResult.attributes;
            (_b = config.tabs) === null || _b === void 0 ? void 0 : _b.push(tab);
        });
        return config;
    }
    /**
     * Updates an attribute of the runtime configuration for the given configuration id and attribute code
     * and read this default configuration from the CPQ system.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Observable<Configurator.Configuration>} - Updated configuration
     */
    updateAttribute(configuration) {
        const updateAttribute = this.converterService.convert(configuration, CPQ_CONFIGURATOR_SERIALIZER);
        return this.callUpdateAttribute(updateAttribute).pipe(switchMap(() => {
            return this.callConfigurationDisplay(configuration.configId, updateAttribute.tabId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
                return Object.assign(Object.assign({}, resultConfiguration), { configId: configuration.configId });
            }));
        }));
    }
    /**
     * Updates a quantity for an attribute of the runtime configuration for the given configuration id and attribute code
     * and read this default configuration from the CPQ system.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Observable<Configurator.Configuration>} - Updated configuration
     */
    updateValueQuantity(configuration) {
        const updateValue = this.converterService.convert(configuration, CPQ_CONFIGURATOR_QUANTITY_SERIALIZER);
        return this.callUpdateValue(updateValue).pipe(switchMap(() => {
            return this.callConfigurationDisplay(configuration.configId, updateValue.tabId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
                return Object.assign(Object.assign({}, resultConfiguration), { configId: configuration.configId });
            }));
        }));
    }
    callUpdateValue(updateValue) {
        return this.http.patch(this.endpointService.buildUrl('valueUpdate', {
            configId: updateValue.configurationId,
            attributeCode: updateValue.standardAttributeCode,
            valueCode: updateValue.attributeValueId,
        }), {
            Quantity: updateValue.quantity,
        }, this.endpointService.CPQ_MARKER_HEADER);
    }
    callConfigurationInit(productSystemId) {
        return this.http.post(this.endpointService.buildUrl('configurationInit'), {
            ProductSystemId: productSystemId,
        }, this.endpointService.CPQ_MARKER_HEADER);
    }
    callConfigurationDisplay(configId, tabId) {
        return this.http.get(this.endpointService.buildUrl('configurationDisplay', { configId: configId }, tabId ? [{ name: 'tabId', value: tabId }] : undefined), this.endpointService.CPQ_MARKER_HEADER);
    }
    callUpdateAttribute(updateAttribute) {
        return this.http.patch(this.endpointService.buildUrl('attributeUpdate', {
            configId: updateAttribute.configurationId,
            attributeCode: updateAttribute.standardAttributeCode,
        }), updateAttribute.changeAttributeValue, this.endpointService.CPQ_MARKER_HEADER);
    }
}
CpqConfiguratorRestService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestService, deps: [{ token: i1.HttpClient }, { token: i2.ConverterService }, { token: CpqConfiguratorEndpointService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorRestService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.ConverterService }, { type: CpqConfiguratorEndpointService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CpqConfiguratorRestAdapter {
    constructor(cpqRestService, cpqOccService) {
        this.cpqRestService = cpqRestService;
        this.cpqOccService = cpqOccService;
    }
    getConfiguratorType() {
        return "CLOUDCPQCONFIGURATOR" /* ConfiguratorType.CPQ */;
    }
    supportsCpqOverOcc() {
        return false;
    }
    createConfiguration(owner) {
        // no error handling for missing owner id needed, as it's a
        // mandatory attribute in owner
        return this.cpqRestService.createConfiguration(owner.id).pipe(map((configResponse) => {
            configResponse.owner = owner;
            return configResponse;
        }));
    }
    readConfiguration(configId, groupId, owner) {
        return this.cpqRestService.readConfiguration(configId, groupId).pipe(map((configResponse) => {
            configResponse.owner = owner;
            return configResponse;
        }));
    }
    updateConfiguration(configuration) {
        const updateMethod = configuration.updateType === Configurator.UpdateType.VALUE_QUANTITY
            ? this.cpqRestService.updateValueQuantity
            : this.cpqRestService.updateAttribute;
        return updateMethod.call(this.cpqRestService, configuration).pipe(map((configResponse) => {
            configResponse.owner = configuration.owner;
            return configResponse;
        }));
    }
    updateConfigurationOverview() {
        throw new Error('Update the configuration overview is not supported for the CPQ configurator');
    }
    addToCart(parameters) {
        return this.cpqOccService.addToCart(parameters);
    }
    readConfigurationForCartEntry(parameters) {
        return this.cpqOccService.getConfigIdForCartEntry(parameters).pipe(switchMap((configId) => {
            return this.cpqRestService.readConfiguration(configId).pipe(map((configResponse) => {
                configResponse.owner = parameters.owner;
                return configResponse;
            }));
        }));
    }
    updateConfigurationForCartEntry(parameters) {
        return this.cpqOccService.updateCartEntry(parameters);
    }
    readConfigurationForOrderEntry(parameters) {
        return this.cpqOccService.getConfigIdForOrderEntry(parameters).pipe(switchMap((configId) => {
            return this.cpqRestService.readConfiguration(configId).pipe(map((configResponse) => {
                configResponse.owner = parameters.owner;
                return configResponse;
            }));
        }));
    }
    readPriceSummary(configuration) {
        return of(configuration); // so that UI does not run into exception
    }
    getConfigurationOverview(configId) {
        return this.cpqRestService.readConfigurationOverview(configId);
    }
    searchVariants() {
        throw new Error('searchVariants is not supported for the CPQ configurator');
    }
}
CpqConfiguratorRestAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestAdapter, deps: [{ token: CpqConfiguratorRestService }, { token: CpqConfiguratorOccService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorRestAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CpqConfiguratorRestService }, { type: CpqConfiguratorOccService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultCpqConfiguratorEndpointConfig = {
    backend: {
        cpq: {
            endpoints: {
                configurationInit: 'configurations',
                configurationDisplay: 'configurations/${configId}/display',
                attributeUpdate: 'configurations/${configId}/attributes/${attributeCode}',
                valueUpdate: 'configurations/${configId}/attributes/${attributeCode}/attributeValues/${valueCode}',
            },
            prefix: '/api/configuration/v1/',
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CpqConfiguratorRestModule {
}
CpqConfiguratorRestModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorRestModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestModule, imports: [CommonModule] });
CpqConfiguratorRestModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestModule, providers: [
        {
            provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
            useClass: CpqConfiguratorRestAdapter,
            multi: true,
        },
        //TODO: CXSPA-3392 move converters from here to cpq-configurator-common module
        {
            provide: CPQ_CONFIGURATOR_NORMALIZER,
            useClass: CpqConfiguratorNormalizer,
            multi: true,
        },
        {
            provide: CPQ_CONFIGURATOR_SERIALIZER,
            useClass: CpqConfiguratorSerializer,
            multi: true,
        },
        {
            provide: CPQ_CONFIGURATOR_QUANTITY_SERIALIZER,
            useClass: CpqConfiguratorValueSerializer,
            multi: true,
        },
        {
            provide: CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER,
            useClass: CpqConfiguratorOverviewNormalizer,
            multi: true,
        },
        provideDefaultConfig(defaultCpqConfiguratorEndpointConfig),
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        {
                            provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
                            useClass: CpqConfiguratorRestAdapter,
                            multi: true,
                        },
                        //TODO: CXSPA-3392 move converters from here to cpq-configurator-common module
                        {
                            provide: CPQ_CONFIGURATOR_NORMALIZER,
                            useClass: CpqConfiguratorNormalizer,
                            multi: true,
                        },
                        {
                            provide: CPQ_CONFIGURATOR_SERIALIZER,
                            useClass: CpqConfiguratorSerializer,
                            multi: true,
                        },
                        {
                            provide: CPQ_CONFIGURATOR_QUANTITY_SERIALIZER,
                            useClass: CpqConfiguratorValueSerializer,
                            multi: true,
                        },
                        {
                            provide: CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER,
                            useClass: CpqConfiguratorOverviewNormalizer,
                            multi: true,
                        },
                        provideDefaultConfig(defaultCpqConfiguratorEndpointConfig),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Exposes the CPQ flavor of rulebase configurator, which connects to CPQ directly via
 * REST APIs and to commerce via OCC
 */
class RulebasedCpqConfiguratorModule {
}
RulebasedCpqConfiguratorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedCpqConfiguratorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedCpqConfiguratorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RulebasedCpqConfiguratorModule, imports: [CpqConfiguratorCommonModule,
        CpqConfiguratorOccModule,
        CpqConfiguratorRestModule] });
RulebasedCpqConfiguratorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedCpqConfiguratorModule, imports: [CpqConfiguratorCommonModule,
        CpqConfiguratorOccModule,
        CpqConfiguratorRestModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedCpqConfiguratorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CpqConfiguratorCommonModule,
                        CpqConfiguratorOccModule,
                        CpqConfiguratorRestModule,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER, CPQ_CONFIGURATOR_NORMALIZER, CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER, CPQ_CONFIGURATOR_QUANTITY_SERIALIZER, CPQ_CONFIGURATOR_SERIALIZER, CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER, Cpq, CpqConfiguratorCommonModule, CpqConfiguratorEndpointConfig, CpqConfiguratorEndpointService, CpqConfiguratorNormalizer, CpqConfiguratorNormalizerUtilsService, CpqConfiguratorOccAdapter, CpqConfiguratorOccModule, CpqConfiguratorOccService, CpqConfiguratorOverviewNormalizer, CpqConfiguratorRestAdapter, CpqConfiguratorRestModule, CpqConfiguratorRestService, CpqConfiguratorSerializer, CpqConfiguratorUtils, CpqConfiguratorValueSerializer, OccConfiguratorCpqAddToCartSerializer, OccConfiguratorCpqUpdateCartEntrySerializer, RulebasedCpqConfiguratorModule };
//# sourceMappingURL=spartacus-product-configurator-rulebased-cpq.mjs.map
