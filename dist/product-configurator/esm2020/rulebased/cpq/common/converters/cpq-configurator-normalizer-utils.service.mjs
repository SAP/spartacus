/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { formatCurrency, getCurrencySymbol, getLocaleId, } from '@angular/common';
import { Injectable, inject, isDevMode } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Cpq } from '../cpq.models';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Utilities for CPQ configuration
 */
export class CpqConfiguratorNormalizerUtilsService {
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
        const priceTotal = attribute.values
            ?.filter((entry) => entry.selected && entry.valuePriceTotal)
            .reduce((total, item) => total + (item.valuePriceTotal?.value ?? 0), 0);
        const attributePriceTotal = {
            currencyIso: currency,
            value: priceTotal ?? 0,
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
        const priceSummary = {};
        if (cpqConfiguration.currencyISOCode) {
            const currency = cpqConfiguration.currencyISOCode;
            if (cpqConfiguration?.responder?.totalPrice &&
                cpqConfiguration?.currencySign) {
                const currencySign = cpqConfiguration?.currencySign;
                const totalPriceAsString = cpqConfiguration.responder.totalPrice.replace(currencySign, '');
                const totalPrice = {
                    currencyIso: currency,
                    value: parseFloat(totalPriceAsString),
                };
                this.formatPriceForLocale(totalPrice, this.getLanguage());
                priceSummary.currentTotal = totalPrice;
            }
            if (cpqConfiguration?.responder?.baseProductPrice) {
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
        return attributeValues.some((value) => value?.productSystemId);
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
        catch {
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
        return result ?? 'en';
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
CpqConfiguratorNormalizerUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorNormalizerUtilsService, deps: [{ token: i1.LanguageService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorNormalizerUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorNormalizerUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorNormalizerUtilsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.LanguageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1ub3JtYWxpemVyLXV0aWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NwcS9jb21tb24vY29udmVydGVycy9jcHEtY29uZmlndXJhdG9yLW5vcm1hbGl6ZXItdXRpbHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsV0FBVyxHQUNaLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBbUIsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUVwQzs7R0FFRztBQUVILE1BQU0sT0FBTyxxQ0FBcUM7SUFFaEQsWUFBc0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRDVDLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDZ0IsQ0FBQztJQUUxRDs7Ozs7O09BTUc7SUFDSCxlQUFlLENBQ2IsS0FBZ0IsRUFDaEIsU0FBd0I7UUFFeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDbkIsT0FBTyxTQUFTLENBQUM7U0FDbEI7UUFDRCxNQUFNLG9CQUFvQixHQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksUUFBUSxDQUFDO1FBQ2IsUUFBUSxvQkFBb0IsRUFBRTtZQUM1QixLQUFLLFlBQVksQ0FBQyxRQUFRLENBQUMsa0NB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TSxDQUFDO1FBQ1gsSUFBSSxDQUFDLGVBQWU7YUFDakIsU0FBUyxFQUFFO2FBQ1gsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQzthQUNwQyxXQUFXLEVBQUUsQ0FBQztRQUVqQixPQUFPLE1BQU0sSUFBSSxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyx1QkFBdUIsQ0FBQyxJQUFZO1FBQzVDLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZCx5RUFBeUUsSUFBSSwyREFBMkQsQ0FDekksQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7a0lBOVJVLHFDQUFxQztzSUFBckMscUNBQXFDLGNBRHhCLE1BQU07MkZBQ25CLHFDQUFxQztrQkFEakQsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBmb3JtYXRDdXJyZW5jeSxcbiAgZ2V0Q3VycmVuY3lTeW1ib2wsXG4gIGdldExvY2FsZUlkLFxufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0LCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSwgTG9nZ2VyU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZCc7XG5pbXBvcnQgeyBDcHEgfSBmcm9tICcuLi9jcHEubW9kZWxzJztcblxuLyoqXG4gKiBVdGlsaXRpZXMgZm9yIENQUSBjb25maWd1cmF0aW9uXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQ3BxQ29uZmlndXJhdG9yTm9ybWFsaXplclV0aWxzU2VydmljZSB7XG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSkge31cblxuICAvKipcbiAgICogQ29udmVydHMgcXVhbnRpdHkgdG8gYmUgc2hvd24gaW4gdGhlIG92ZXJ2aWV3IHBhZ2VcbiAgICpcbiAgICogQHBhcmFtIHtDcHEuVmFsdWV9IHZhbHVlIC0gQ1BRIFZhbHVlXG4gICAqIEBwYXJhbSB7Q3BxLkF0dHJpYnV0ZX0gYXR0cmlidXRlIC0gQ1BRIEF0dHJpYnV0ZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSAtIFF1YW50aXR5XG4gICAqL1xuICBjb252ZXJ0UXVhbnRpdHkoXG4gICAgdmFsdWU6IENwcS5WYWx1ZSxcbiAgICBhdHRyaWJ1dGU6IENwcS5BdHRyaWJ1dGVcbiAgKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXZhbHVlLnNlbGVjdGVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCBjb25maWd1cmF0b3JEYXRhVHlwZTogQ29uZmlndXJhdG9yLkRhdGFUeXBlID1cbiAgICAgIHRoaXMuY29udmVydERhdGFUeXBlKGF0dHJpYnV0ZSk7XG4gICAgbGV0IHF1YW50aXR5O1xuICAgIHN3aXRjaCAoY29uZmlndXJhdG9yRGF0YVR5cGUpIHtcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLkRhdGFUeXBlLlVTRVJfU0VMRUNUSU9OX1FUWV9BVFRSSUJVVEVfTEVWRUw6XG4gICAgICAgIHF1YW50aXR5ID0gTnVtYmVyKGF0dHJpYnV0ZS5xdWFudGl0eSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDb25maWd1cmF0b3IuRGF0YVR5cGUuVVNFUl9TRUxFQ1RJT05fUVRZX1ZBTFVFX0xFVkVMOlxuICAgICAgICBxdWFudGl0eSA9IE51bWJlcih2YWx1ZS5xdWFudGl0eSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcXVhbnRpdHkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBxdWFudGl0eTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyB2YWx1ZSBwcmljZVxuICAgKlxuICAgKiBAcGFyYW0geyBDcHEuVmFsdWV9IHZhbHVlIC0gQ1BRIFZhbHVlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW5jeSAtIEN1cnJlbmN5IGNvZGUgSVNPXG4gICAqIEByZXR1cm5zIHtDb25maWd1cmF0b3IuUHJpY2VEZXRhaWxzfVxuICAgKi9cbiAgY29udmVydFZhbHVlUHJpY2UoXG4gICAgdmFsdWU6IENwcS5WYWx1ZSxcbiAgICBjdXJyZW5jeTogc3RyaW5nXG4gICk6IENvbmZpZ3VyYXRvci5QcmljZURldGFpbHMgfCB1bmRlZmluZWQge1xuICAgIGxldCBwcmljZTtcbiAgICBpZiAodmFsdWUucHJpY2UpIHtcbiAgICAgIHByaWNlID0ge1xuICAgICAgICBjdXJyZW5jeUlzbzogY3VycmVuY3ksXG4gICAgICAgIHZhbHVlOiBwYXJzZUZsb2F0KHZhbHVlLnByaWNlKSxcbiAgICAgIH07XG4gICAgICB0aGlzLmZvcm1hdFByaWNlRm9yTG9jYWxlKHByaWNlLCB0aGlzLmdldExhbmd1YWdlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gcHJpY2U7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0b3RhbCB2YWx1ZSBwcmljZVxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcXVhbnRpdHkgLSBRdWFudGl0eVxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5QcmljZURldGFpbHN9IHZhbHVlUHJpY2UgLSBQcmljZURldGFpbHMgb2YgdGhlIHNpbmdsZSB2YWx1ZSBwcmljZVxuICAgKiBAcmV0dXJucyB7Q29uZmlndXJhdG9yLlByaWNlRGV0YWlscyB9IC0gdG90YWwgdmFsdWUgcHJpY2VcbiAgICovXG4gIGNhbGN1bGF0ZVZhbHVlUHJpY2VUb3RhbChcbiAgICBxdWFudGl0eTogbnVtYmVyLFxuICAgIHZhbHVlUHJpY2U/OiBDb25maWd1cmF0b3IuUHJpY2VEZXRhaWxzXG4gICk6IENvbmZpZ3VyYXRvci5QcmljZURldGFpbHMgfCB1bmRlZmluZWQge1xuICAgIGxldCB2YWx1ZVByaWNlVG90YWw7XG4gICAgaWYgKHZhbHVlUHJpY2UpIHtcbiAgICAgIGNvbnN0IGNhbGN1bGF0aW9uUXVhbnRpdHk6IG51bWJlciA9IHF1YW50aXR5ID8gcXVhbnRpdHkgOiAxO1xuICAgICAgdmFsdWVQcmljZVRvdGFsID0ge1xuICAgICAgICBjdXJyZW5jeUlzbzogdmFsdWVQcmljZS5jdXJyZW5jeUlzbyxcbiAgICAgICAgdmFsdWU6IGNhbGN1bGF0aW9uUXVhbnRpdHkgKiB2YWx1ZVByaWNlLnZhbHVlLFxuICAgICAgfTtcbiAgICAgIHRoaXMuZm9ybWF0UHJpY2VGb3JMb2NhbGUodmFsdWVQcmljZVRvdGFsLCB0aGlzLmdldExhbmd1YWdlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVQcmljZVRvdGFsO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdG90YWwgYXR0cmlidXRlIHByaWNlXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkF0dHJpYnV0ZX0gYXR0cmlidXRlIC0gQ29uZmlndXJhdG9yIEF0dHJpYnV0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVuY3kgLSBDdXJyZW5jeVxuICAgKiBAcmV0dXJucyB7Q29uZmlndXJhdG9yLlByaWNlRGV0YWlsc30gLSB0b3RhbCBhdHRyaWJ1dGUgcHJpY2VcbiAgICovXG4gIGNhbGN1bGF0ZUF0dHJpYnV0ZVByaWNlVG90YWwoXG4gICAgYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlLFxuICAgIGN1cnJlbmN5OiBzdHJpbmdcbiAgKTogQ29uZmlndXJhdG9yLlByaWNlRGV0YWlscyB7XG4gICAgY29uc3QgcHJpY2VUb3RhbCA9IGF0dHJpYnV0ZS52YWx1ZXNcbiAgICAgID8uZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuc2VsZWN0ZWQgJiYgZW50cnkudmFsdWVQcmljZVRvdGFsKVxuICAgICAgLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+IHRvdGFsICsgKGl0ZW0udmFsdWVQcmljZVRvdGFsPy52YWx1ZSA/PyAwKSwgMCk7XG4gICAgY29uc3QgYXR0cmlidXRlUHJpY2VUb3RhbDogQ29uZmlndXJhdG9yLlByaWNlRGV0YWlscyA9IHtcbiAgICAgIGN1cnJlbmN5SXNvOiBjdXJyZW5jeSxcbiAgICAgIHZhbHVlOiBwcmljZVRvdGFsID8/IDAsXG4gICAgfTtcbiAgICB0aGlzLmZvcm1hdFByaWNlRm9yTG9jYWxlKGF0dHJpYnV0ZVByaWNlVG90YWwsIHRoaXMuZ2V0TGFuZ3VhZ2UoKSk7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZVByaWNlVG90YWw7XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0cyBwcmljZSBmb3IgZ2l2ZW4gUHJpY2VEZXRhaWxzIG9iamVjdCBhbmQgTG9jYWxlXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLlByaWNlRGV0YWlsc30gcHJpY2UgLSBQcmljZSBkZXRhaWxzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdmFpbGFibGVMb2NhbGUgLSBPcmlnaW5hbCBsb2NhbGVcbiAgICovXG4gIHByb3RlY3RlZCBmb3JtYXRQcmljZUZvckxvY2FsZShcbiAgICBwcmljZTogQ29uZmlndXJhdG9yLlByaWNlRGV0YWlscyxcbiAgICBhdmFpbGFibGVMb2NhbGU6IHN0cmluZ1xuICApOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW5jeVN5bWJvbDogc3RyaW5nID0gZ2V0Q3VycmVuY3lTeW1ib2woXG4gICAgICBwcmljZS5jdXJyZW5jeUlzbyxcbiAgICAgICduYXJyb3cnLFxuICAgICAgYXZhaWxhYmxlTG9jYWxlXG4gICAgKTtcbiAgICBwcmljZS5mb3JtYXR0ZWRWYWx1ZSA9IGZvcm1hdEN1cnJlbmN5KFxuICAgICAgcHJpY2UudmFsdWUsXG4gICAgICBhdmFpbGFibGVMb2NhbGUsXG4gICAgICBjdXJyZW5jeVN5bWJvbCxcbiAgICAgIHByaWNlLmN1cnJlbmN5SXNvXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyB0aGUgQ1BRIEF0dHJpYnV0ZSBkYXRhIHR5cGUgaW50byB0aGUgQ29uZmlndXJhdG9yIEF0dHJpYnV0ZSBkYXRhIHR5cGVcbiAgICpcbiAgICogQHBhcmFtIHtDcHEuQXR0cmlidXRlfSBjcHFBdHRyaWJ1dGUgLSBDUFEgQXR0cmlidXRlXG4gICAqIEByZXR1cm5zIHtDb25maWd1cmF0b3IuRGF0YVR5cGV9IERhdGEgdHlwZSBvZiB0aGUgY29uZmlndXJhdG9yIGF0dHJpYnV0ZVxuICAgKi9cbiAgY29udmVydERhdGFUeXBlKGNwcUF0dHJpYnV0ZTogQ3BxLkF0dHJpYnV0ZSk6IENvbmZpZ3VyYXRvci5EYXRhVHlwZSB7XG4gICAgbGV0IGRhdGFUeXBlOiBDb25maWd1cmF0b3IuRGF0YVR5cGU7XG4gICAgc3dpdGNoIChjcHFBdHRyaWJ1dGUuZGF0YVR5cGUpIHtcbiAgICAgIGNhc2UgQ3BxLkRhdGFUeXBlLklOUFVUX1NUUklORzoge1xuICAgICAgICBkYXRhVHlwZSA9IENvbmZpZ3VyYXRvci5EYXRhVHlwZS5JTlBVVF9TVFJJTkc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBDcHEuRGF0YVR5cGUuSU5QVVRfTlVNQkVSOiB7XG4gICAgICAgIGRhdGFUeXBlID0gQ29uZmlndXJhdG9yLkRhdGFUeXBlLklOUFVUX05VTUJFUjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIENwcS5EYXRhVHlwZS5OX0E6IHtcbiAgICAgICAgZGF0YVR5cGUgPSBDb25maWd1cmF0b3IuRGF0YVR5cGUuVVNFUl9TRUxFQ1RJT05fTk9fUVRZO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQ3BxLkRhdGFUeXBlLlFUWV9BVFRSSUJVVEVfTEVWRUw6IHtcbiAgICAgICAgZGF0YVR5cGUgPSBDb25maWd1cmF0b3IuRGF0YVR5cGUuVVNFUl9TRUxFQ1RJT05fUVRZX0FUVFJJQlVURV9MRVZFTDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIENwcS5EYXRhVHlwZS5RVFlfVkFMVUVfTEVWRUw6IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNwcUF0dHJpYnV0ZS5kaXNwbGF5QXMgPT09IENwcS5EaXNwbGF5QXMuUkFESU9fQlVUVE9OIHx8XG4gICAgICAgICAgY3BxQXR0cmlidXRlLmRpc3BsYXlBcyA9PT0gQ3BxLkRpc3BsYXlBcy5EUk9QRE9XTlxuICAgICAgICApIHtcbiAgICAgICAgICBkYXRhVHlwZSA9IENvbmZpZ3VyYXRvci5EYXRhVHlwZS5VU0VSX1NFTEVDVElPTl9OT19RVFk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgY3BxQXR0cmlidXRlLmRpc3BsYXlBcyA9PT0gQ3BxLkRpc3BsYXlBcy5DSEVDS19CT1ggJiZcbiAgICAgICAgICAhY3BxQXR0cmlidXRlLmlzTGluZUl0ZW1cbiAgICAgICAgKSB7XG4gICAgICAgICAgZGF0YVR5cGUgPSBDb25maWd1cmF0b3IuRGF0YVR5cGUuVVNFUl9TRUxFQ1RJT05fTk9fUVRZO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRhdGFUeXBlID0gQ29uZmlndXJhdG9yLkRhdGFUeXBlLlVTRVJfU0VMRUNUSU9OX1FUWV9WQUxVRV9MRVZFTDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgZGF0YVR5cGUgPSBDb25maWd1cmF0b3IuRGF0YVR5cGUuTk9UX0lNUExFTUVOVEVEO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YVR5cGU7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgcHJpY2Ugc3VtbWFyeVxuICAgKlxuICAgKiBAcGFyYW0ge2NwcUNvbmZpZ3VyYXRpb246IENwcS5Db25maWd1cmF0aW9ufSBjcHFDb25maWd1cmF0aW9uIC0gQ1BRIGNvbmZpZ3VyYXRpb25cbiAgICogQHJldHVybnMge0NvbmZpZ3VyYXRvci5QcmljZVN1bW1hcnl9IC0gcHJpY2Ugc3VtbWFyeVxuICAgKi9cbiAgY29udmVydFByaWNlU3VtbWFyeShcbiAgICBjcHFDb25maWd1cmF0aW9uOiBDcHEuQ29uZmlndXJhdGlvblxuICApOiBDb25maWd1cmF0b3IuUHJpY2VTdW1tYXJ5IHtcbiAgICBjb25zdCBwcmljZVN1bW1hcnk6IENvbmZpZ3VyYXRvci5QcmljZVN1bW1hcnkgPSB7fTtcbiAgICBpZiAoY3BxQ29uZmlndXJhdGlvbi5jdXJyZW5jeUlTT0NvZGUpIHtcbiAgICAgIGNvbnN0IGN1cnJlbmN5OiBzdHJpbmcgPSBjcHFDb25maWd1cmF0aW9uLmN1cnJlbmN5SVNPQ29kZTtcbiAgICAgIGlmIChcbiAgICAgICAgY3BxQ29uZmlndXJhdGlvbj8ucmVzcG9uZGVyPy50b3RhbFByaWNlICYmXG4gICAgICAgIGNwcUNvbmZpZ3VyYXRpb24/LmN1cnJlbmN5U2lnblxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbmN5U2lnbjogc3RyaW5nID0gY3BxQ29uZmlndXJhdGlvbj8uY3VycmVuY3lTaWduO1xuICAgICAgICBjb25zdCB0b3RhbFByaWNlQXNTdHJpbmc6IHN0cmluZyA9XG4gICAgICAgICAgY3BxQ29uZmlndXJhdGlvbi5yZXNwb25kZXIudG90YWxQcmljZS5yZXBsYWNlKGN1cnJlbmN5U2lnbiwgJycpO1xuICAgICAgICBjb25zdCB0b3RhbFByaWNlOiBDb25maWd1cmF0b3IuUHJpY2VEZXRhaWxzID0ge1xuICAgICAgICAgIGN1cnJlbmN5SXNvOiBjdXJyZW5jeSxcbiAgICAgICAgICB2YWx1ZTogcGFyc2VGbG9hdCh0b3RhbFByaWNlQXNTdHJpbmcpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZvcm1hdFByaWNlRm9yTG9jYWxlKHRvdGFsUHJpY2UsIHRoaXMuZ2V0TGFuZ3VhZ2UoKSk7XG4gICAgICAgIHByaWNlU3VtbWFyeS5jdXJyZW50VG90YWwgPSB0b3RhbFByaWNlO1xuICAgICAgfVxuICAgICAgaWYgKGNwcUNvbmZpZ3VyYXRpb24/LnJlc3BvbmRlcj8uYmFzZVByb2R1Y3RQcmljZSkge1xuICAgICAgICBjb25zdCBiYXNlUHJpY2VBc1N0cmluZzogc3RyaW5nID1cbiAgICAgICAgICBjcHFDb25maWd1cmF0aW9uLnJlc3BvbmRlci5iYXNlUHJvZHVjdFByaWNlO1xuICAgICAgICBjb25zdCBiYXNlUHJpY2U6IENvbmZpZ3VyYXRvci5QcmljZURldGFpbHMgPSB7XG4gICAgICAgICAgY3VycmVuY3lJc286IGN1cnJlbmN5LFxuICAgICAgICAgIHZhbHVlOiBwYXJzZUZsb2F0KGJhc2VQcmljZUFzU3RyaW5nKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mb3JtYXRQcmljZUZvckxvY2FsZShiYXNlUHJpY2UsIHRoaXMuZ2V0TGFuZ3VhZ2UoKSk7XG4gICAgICAgIHByaWNlU3VtbWFyeS5iYXNlUHJpY2UgPSBiYXNlUHJpY2U7XG4gICAgICB9XG4gICAgICBpZiAocHJpY2VTdW1tYXJ5LmN1cnJlbnRUb3RhbCAmJiBwcmljZVN1bW1hcnkuYmFzZVByaWNlKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uc1ByaWNlOiBDb25maWd1cmF0b3IuUHJpY2VEZXRhaWxzID0ge1xuICAgICAgICAgIGN1cnJlbmN5SXNvOiBjdXJyZW5jeSxcbiAgICAgICAgICB2YWx1ZTogcHJpY2VTdW1tYXJ5LmN1cnJlbnRUb3RhbC52YWx1ZSAtIHByaWNlU3VtbWFyeS5iYXNlUHJpY2UudmFsdWUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZm9ybWF0UHJpY2VGb3JMb2NhbGUoc2VsZWN0ZWRPcHRpb25zUHJpY2UsIHRoaXMuZ2V0TGFuZ3VhZ2UoKSk7XG4gICAgICAgIHByaWNlU3VtbWFyeS5zZWxlY3RlZE9wdGlvbnMgPSBzZWxlY3RlZE9wdGlvbnNQcmljZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByaWNlU3VtbWFyeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIGF0IGxlYXN0IG9uZSB2YWx1ZSBvZiBhIENQUSBBdHRyaWJ1dGUgaGFzIGFuIGFzc2lnbmVkIHByb2R1Y3RcbiAgICpcbiAgICogQHBhcmFtIHtDcHEuVmFsdWVbXX0gYXR0cmlidXRlVmFsdWVzIC0gQ1BRIEF0dHJpYnV0ZSB2YWx1ZXNcbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0gdHJ1ZSwgaWYgYXQgbGVhc3Qgb25lIHZhbHVlIG9mIGEgQ1BRIEF0dHJpYnV0ZSBoYXMgYW4gYXNzaWduZWQgcHJvZHVjdFxuICAgKi9cbiAgaGFzQW55UHJvZHVjdHMoYXR0cmlidXRlVmFsdWVzOiBDcHEuVmFsdWVbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBhdHRyaWJ1dGVWYWx1ZXMuc29tZSgodmFsdWU6IENwcS5WYWx1ZSkgPT4gdmFsdWU/LnByb2R1Y3RTeXN0ZW1JZCk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhdHRyaWJ1dGUgbGFiZWxcbiAgICpcbiAgICogQHBhcmFtIHthdHRyaWJ1dGU6IENwcS5BdHRyaWJ1dGV9IGF0dHJpYnV0ZSAtIENQUSBBdHRyaWJ1dGVcbiAgICogQHJldHVybnMge3N0cmluZ30gLSBhdHRyaWJ1dGUgbGFiZWxcbiAgICovXG4gIGNvbnZlcnRBdHRyaWJ1dGVMYWJlbChhdHRyaWJ1dGU6IENwcS5BdHRyaWJ1dGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBhdHRyaWJ1dGUubGFiZWxcbiAgICAgID8gYXR0cmlidXRlLmxhYmVsXG4gICAgICA6IGF0dHJpYnV0ZS5uYW1lXG4gICAgICA/IGF0dHJpYnV0ZS5uYW1lXG4gICAgICA6ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGN1cnJlbnQgbGFuZ3VhZ2UuXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gLSBjdXJyZW50IGxhbmd1YWdlXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0TGFuZ3VhZ2UoKTogc3RyaW5nIHtcbiAgICBjb25zdCBsYW5nID0gdGhpcy5nZXRBY3RpdmVMYW5ndWFnZSgpO1xuICAgIHRyeSB7XG4gICAgICBnZXRMb2NhbGVJZChsYW5nKTtcbiAgICAgIHJldHVybiBsYW5nO1xuICAgIH0gY2F0Y2gge1xuICAgICAgdGhpcy5yZXBvcnRNaXNzaW5nTG9jYWxlRGF0YShsYW5nKTtcbiAgICAgIHJldHVybiAnZW4nO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBhY3RpdmUgbGFuZ3VhZ2UuXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gLSBhY3RpdmUgbGFuZ3VhZ2VcbiAgICovXG4gIHByb3RlY3RlZCBnZXRBY3RpdmVMYW5ndWFnZSgpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQ7XG4gICAgdGhpcy5sYW5ndWFnZVNlcnZpY2VcbiAgICAgIC5nZXRBY3RpdmUoKVxuICAgICAgLnN1YnNjcmliZSgobGFuZykgPT4gKHJlc3VsdCA9IGxhbmcpKVxuICAgICAgLnVuc3Vic2NyaWJlKCk7XG5cbiAgICByZXR1cm4gcmVzdWx0ID8/ICdlbic7XG4gIH1cblxuICAvKipcbiAgICogTG9ncyB0aGUgbWVzc2FnZSBmb3IgdGhlIG1pc3NpbmcgbG9jYWwgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmcgLSBBY3RpdmUgbGFuZ3VhZ2VcbiAgICovXG4gIHByb3RlY3RlZCByZXBvcnRNaXNzaW5nTG9jYWxlRGF0YShsYW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgIGBDcHFDb25maWd1cmF0b3JOb3JtYWxpemVyVXRpbHNTZXJ2aWNlOiBObyBsb2NhbGUgZGF0YSByZWdpc3RlcmVkIGZvciAnJHtsYW5nfScgKHNlZSBodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvbW1vbi9yZWdpc3RlckxvY2FsZURhdGEpLmBcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=