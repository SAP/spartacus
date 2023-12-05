import { ValidatorFn } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import * as i0 from "@angular/core";
export interface ConfiguratorAttributeNumericInterval {
    minValue?: number;
    maxValue?: number;
    minValueIncluded: boolean;
    maxValueIncluded: boolean;
}
/**
 * Provides validation and formatting of numeric input
 */
export declare class ConfiguratorAttributeNumericInputFieldService {
    /**
     * Validates numeric input according to settings that are not derived from the locale but from the attribute
     * meta data like the total number of digits and the maximum number of decimal places.
     *
     * @param input Numeric user input, formatted according to session locale
     * @param groupingSeparator Separator for grouping, e.g. ',' for 'en' locale. We allow the grouping separator but
     *   do not check exactly on the position of it in the numerical input. This e.g. is ok: '12,12,12', will be converted
     *   to '121,212' after the next roundtrip
     * @param decimalSeparator  Decimal separator, e.g. '.' for 'en' locale. Must not occur more that 1 time in the input.
     * @param numberTotalPlaces  Total number of places e.g. 10
     * @param numberDecimalPlaces  Number of decimal places e.g. 2
     *  @returns {boolean} Did we see a validation error?
     */
    performValidationAccordingToMetaData(input: string, groupingSeparator: string, decimalSeparator: string, numberTotalPlaces: number, numberDecimalPlaces: number): boolean;
    formatIntervalValue(intervalValue: number, decimalPlaces: number | undefined, locale: string): string;
    /**
     * Parses the value names and returns the intervals.
     *
     * @param values values of the attribute
     * @returns {ConfiguratorAttributeNumericInterval[]} parsed intervals
     */
    getIntervals(values: Configurator.Value[] | undefined): ConfiguratorAttributeNumericInterval[];
    /**
     * Parses the value name and returns the interval structure.
     * Valid interval strings:
     * Standard Interval
     * 5 - 10
     * 5 - <10
     * >5 - 10
     * >5 - <10
     * -10 - -5
     * 1.25 - 1.35
     *
     * Infinite Interval
     * >5
     * >=5
     * <5
     * <=5
     * >-5
     *
     * @param value value which will be parsed
     * @returns {ConfiguratorAttributeNumericInterval} parsed interval
     */
    getInterval(value: Configurator.Value): ConfiguratorAttributeNumericInterval | undefined;
    protected handleSingleOrInfinite(valueName: string, interval: ConfiguratorAttributeNumericInterval): {
        minVal: string;
        maxVal: string;
    };
    protected handleStandardInterval(valueName: string, interval: ConfiguratorAttributeNumericInterval): {
        minVal: string;
        maxVal: string;
    };
    /**
     * Get pattern for the message that is displayed when the validation fails. This message e.g. looks like
     * 'Enter the number in the following format: ##,###,###.##'
     * for the 'en' locale for an attribute with total length of 10 and 2 decimal places.
     *
     * @param decimalPlaces Number of decimal places
     * @param totalLength Total number of digits
     * @param negativeAllowed Do we allow negative input?
     * @param locale  Locale
     *  @returns {string} The pattern that we display in the validation message
     */
    getPatternForValidationMessage(decimalPlaces: number, totalLength: number, negativeAllowed: boolean, locale: string): string;
    /**
     * Returns the validator for the input component that represents numeric input.
     * The validator only allows the grouping separator, the decimal separator, an optional '-' sign,
     * and the digits between 0..9. This validator does not support the scientific notation of
     * attributes.
     *
     * @param locale The locale
     * @param numberDecimalPlaces Number of decimal places
     * @param numberTotalPlaces  Total number of digits
     * @param negativeAllowed: Do we allow negative input?
     * @returns {ValidatorFn} The validator
     */
    getNumberFormatValidator(locale: string, numberDecimalPlaces: number, numberTotalPlaces: number, negativeAllowed: boolean): ValidatorFn;
    protected getValidationErrorsNumericFormat(input: string, locale: string, numberDecimalPlaces: number, numberTotalPlaces: number, negativeAllowed: boolean): {
        [key: string]: any;
    } | null;
    /**
     * Returns the interval validator for the input component that represents numeric input.
     * It becomes active only if intervals are provided (they originate from the attribute's values),
     * and matches the input with the list of intervals.
     * It also becomes active only if the validation for the numeric format itself is fine, in order
     * to avoid multiple validation messages.
     *
     * @param locale The locale
     * @param numberDecimalPlaces Number of decimal places
     * @param numberTotalPlaces  Total number of digits
     * @param negativeAllowed: Do we allow negative input?
     * @returns {ValidatorFn} The validator
     */
    getIntervalValidator(locale: string, numberDecimalPlaces: number, numberTotalPlaces: number, negativeAllowed: boolean, intervals: ConfiguratorAttributeNumericInterval[], currentValue?: string): ValidatorFn;
    protected checkIfPartOfIntervals(input: string, locale: string, intervals: ConfiguratorAttributeNumericInterval[]): boolean;
    protected inputMatchesInterval(input: string, locale: string, interval: ConfiguratorAttributeNumericInterval): boolean;
    protected parseInput(input: string, locale: string): number;
    protected parseInputForSeparators(input: string, groupingSeparator: string, decimalSeparator: string): number;
    protected createValidationError(isError: boolean): {
        [key: string]: any;
    } | null;
    protected createIntervalValidationError(isError: boolean): {
        [key: string]: any;
    } | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeNumericInputFieldService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorAttributeNumericInputFieldService>;
}
