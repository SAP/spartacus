import { LanguageService, LoggerService } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Cpq } from '../cpq.models';
import * as i0 from "@angular/core";
/**
 * Utilities for CPQ configuration
 */
export declare class CpqConfiguratorNormalizerUtilsService {
    protected languageService: LanguageService;
    protected logger: LoggerService;
    constructor(languageService: LanguageService);
    /**
     * Converts quantity to be shown in the overview page
     *
     * @param {Cpq.Value} value - CPQ Value
     * @param {Cpq.Attribute} attribute - CPQ Attribute
     * @returns {number} - Quantity
     */
    convertQuantity(value: Cpq.Value, attribute: Cpq.Attribute): number | undefined;
    /**
     * Converts value price
     *
     * @param { Cpq.Value} value - CPQ Value
     * @param {string} currency - Currency code ISO
     * @returns {Configurator.PriceDetails}
     */
    convertValuePrice(value: Cpq.Value, currency: string): Configurator.PriceDetails | undefined;
    /**
     * Calculates total value price
     *
     * @param {number} quantity - Quantity
     * @param {Configurator.PriceDetails} valuePrice - PriceDetails of the single value price
     * @returns {Configurator.PriceDetails } - total value price
     */
    calculateValuePriceTotal(quantity: number, valuePrice?: Configurator.PriceDetails): Configurator.PriceDetails | undefined;
    /**
     * Calculates total attribute price
     *
     * @param {Configurator.Attribute} attribute - Configurator Attribute
     * @param {string} currency - Currency
     * @returns {Configurator.PriceDetails} - total attribute price
     */
    calculateAttributePriceTotal(attribute: Configurator.Attribute, currency: string): Configurator.PriceDetails;
    /**
     * Formats price for given PriceDetails object and Locale
     *
     * @param {Configurator.PriceDetails} price - Price details
     * @param {string} availableLocale - Original locale
     */
    protected formatPriceForLocale(price: Configurator.PriceDetails, availableLocale: string): void;
    /**
     * Converts the CPQ Attribute data type into the Configurator Attribute data type
     *
     * @param {Cpq.Attribute} cpqAttribute - CPQ Attribute
     * @returns {Configurator.DataType} Data type of the configurator attribute
     */
    convertDataType(cpqAttribute: Cpq.Attribute): Configurator.DataType;
    /**
     * Converts price summary
     *
     * @param {cpqConfiguration: Cpq.Configuration} cpqConfiguration - CPQ configuration
     * @returns {Configurator.PriceSummary} - price summary
     */
    convertPriceSummary(cpqConfiguration: Cpq.Configuration): Configurator.PriceSummary;
    /**
     * Verifies whether at least one value of a CPQ Attribute has an assigned product
     *
     * @param {Cpq.Value[]} attributeValues - CPQ Attribute values
     * @returns {boolean} - true, if at least one value of a CPQ Attribute has an assigned product
     */
    hasAnyProducts(attributeValues: Cpq.Value[]): boolean;
    /**
     * Convert attribute label
     *
     * @param {attribute: Cpq.Attribute} attribute - CPQ Attribute
     * @returns {string} - attribute label
     */
    convertAttributeLabel(attribute: Cpq.Attribute): string;
    /**
     * Gets the current language.
     *
     * @return {string} - current language
     */
    protected getLanguage(): string;
    /**
     * Gets the active language.
     *
     * @return {string} - active language
     */
    protected getActiveLanguage(): string;
    /**
     * Logs the message for the missing local data.
     *
     * @param {string} lang - Active language
     */
    protected reportMissingLocaleData(lang: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorNormalizerUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqConfiguratorNormalizerUtilsService>;
}
