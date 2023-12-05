/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { formatNumber, getLocaleNumberSymbol, NumberSymbol, } from '@angular/common';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Provides validation and formatting of numeric input
 */
export class ConfiguratorAttributeNumericInputFieldService {
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
    performValidationAccordingToMetaData(input, groupingSeparator, decimalSeparator, numberTotalPlaces, numberDecimalPlaces) {
        const regexEscape = '\\';
        const search = new RegExp(regexEscape + groupingSeparator, 'g');
        const woGrouping = input.replace(search, '');
        const splitParts = woGrouping.split(decimalSeparator);
        if (splitParts.length > 2) {
            return true;
        }
        if (splitParts.length === 1) {
            return woGrouping.length > numberTotalPlaces - numberDecimalPlaces;
        }
        return (splitParts[0].length > numberTotalPlaces - numberDecimalPlaces ||
            splitParts[1].length > numberDecimalPlaces);
    }
    formatIntervalValue(intervalValue, decimalPlaces, locale) {
        if (decimalPlaces === undefined) {
            decimalPlaces = 0;
        }
        const formatted = formatNumber(intervalValue, locale, '1.' + decimalPlaces + '-' + decimalPlaces);
        return formatted;
    }
    /**
     * Parses the value names and returns the intervals.
     *
     * @param values values of the attribute
     * @returns {ConfiguratorAttributeNumericInterval[]} parsed intervals
     */
    getIntervals(values) {
        const intervals = [];
        if (values && values.length > 0) {
            values.forEach((value) => {
                const interval = this.getInterval(value);
                if (interval && Object.keys(interval).length !== 0) {
                    intervals.push(interval);
                }
            });
        }
        return intervals;
    }
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
    getInterval(value) {
        const interval = {
            minValue: undefined,
            maxValue: undefined,
            minValueIncluded: false,
            maxValueIncluded: false,
        };
        if (!value || !value.name || value.selected) {
            return undefined;
        }
        let minVal;
        let maxVal;
        // standard interval a - b
        if (value.name.includes(' - ')) {
            ({ minVal, maxVal } = this.handleStandardInterval(value.name, interval));
            // infinite interval or single value
        }
        else {
            ({ minVal, maxVal } = this.handleSingleOrInfinite(value.name, interval));
        }
        if (minVal && minVal.length > 0) {
            interval.minValue = +minVal;
        }
        if (maxVal && maxVal.length > 0) {
            interval.maxValue = +maxVal;
        }
        return interval;
    }
    handleSingleOrInfinite(valueName, interval) {
        let minVal = '';
        let maxVal = '';
        if (valueName.includes('>')) {
            minVal = valueName;
            interval.minValueIncluded = false;
            minVal = minVal.replace('>', '');
        }
        if (valueName.includes('<')) {
            maxVal = valueName;
            interval.maxValueIncluded = false;
            maxVal = maxVal.replace('<', '');
        }
        if (valueName.includes('≥')) {
            minVal = valueName;
            interval.minValueIncluded = true;
            minVal = minVal.replace('≥', '');
        }
        if (valueName.includes('≤')) {
            maxVal = valueName;
            interval.maxValueIncluded = true;
            maxVal = maxVal.replace('≤', '');
        }
        if (!valueName.includes('>') &&
            !valueName.includes('<') &&
            !valueName.includes('≤') &&
            !valueName.includes('≥')) {
            minVal = valueName;
            maxVal = valueName;
            interval.maxValueIncluded = true;
            interval.minValueIncluded = true;
        }
        return { minVal, maxVal };
    }
    handleStandardInterval(valueName, interval) {
        const index = valueName.indexOf(' - ');
        let minVal = valueName.substring(0, index);
        let maxVal = valueName.substring(index + 3, valueName.length);
        interval.minValueIncluded = true;
        interval.maxValueIncluded = true;
        if (minVal.includes('>')) {
            interval.minValueIncluded = false;
            minVal = minVal.replace('>', '');
        }
        if (maxVal.includes('<')) {
            interval.maxValueIncluded = false;
            maxVal = maxVal.replace('<', '');
        }
        return { minVal, maxVal };
    }
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
    getPatternForValidationMessage(decimalPlaces, totalLength, negativeAllowed, locale) {
        let input = (10 ** totalLength - 1).toString();
        if (decimalPlaces > 0) {
            input =
                input.substring(0, totalLength - decimalPlaces) +
                    '.' +
                    input.substring(totalLength - decimalPlaces, totalLength);
        }
        const inputAsNumber = Number(input);
        let formatted = formatNumber(inputAsNumber, locale, '1.' + decimalPlaces + '-' + decimalPlaces).replace(/9/g, '#');
        if (negativeAllowed) {
            formatted = '-' + formatted;
        }
        return formatted;
    }
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
    getNumberFormatValidator(locale, numberDecimalPlaces, numberTotalPlaces, negativeAllowed) {
        return (control) => {
            const input = control.value?.trim();
            if (input) {
                return this.getValidationErrorsNumericFormat(input, locale, numberDecimalPlaces, numberTotalPlaces, negativeAllowed);
            }
            return null;
        };
    }
    getValidationErrorsNumericFormat(input, locale, numberDecimalPlaces, numberTotalPlaces, negativeAllowed) {
        //allowed: only numbers and separators
        const groupingSeparator = getLocaleNumberSymbol(locale, NumberSymbol.Group);
        const decimalSeparator = getLocaleNumberSymbol(locale, NumberSymbol.Decimal);
        const expressionPrefix = negativeAllowed ? '^-?' : '^';
        const expressionOnlyNumericalInput = new RegExp(expressionPrefix +
            '[0123456789' +
            groupingSeparator +
            decimalSeparator +
            ']*$');
        if (!expressionOnlyNumericalInput.test(input)) {
            return this.createValidationError(true);
        }
        return this.createValidationError(this.performValidationAccordingToMetaData(input, groupingSeparator, decimalSeparator, numberTotalPlaces + (input.includes('-') ? 1 : 0), numberDecimalPlaces));
    }
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
    getIntervalValidator(locale, numberDecimalPlaces, numberTotalPlaces, negativeAllowed, intervals, currentValue) {
        return (control) => {
            const input = control.value?.trim();
            if (input &&
                input !== currentValue && //this is to ensure that selected interval consisting of only one value will not lead to a validation error
                // in the next roundtrip, when this value has been removed from the list of intervals
                intervals.length !== 0 && // perform validation only if intervals exist
                this.getValidationErrorsNumericFormat(input, locale, numberDecimalPlaces, numberTotalPlaces, negativeAllowed) == null) {
                return this.createIntervalValidationError(!this.checkIfPartOfIntervals(input, locale, intervals));
            }
            return null;
        };
    }
    checkIfPartOfIntervals(input, locale, intervals) {
        return (intervals.find((interval) => this.inputMatchesInterval(input, locale, interval)) !== undefined);
    }
    inputMatchesInterval(input, locale, interval) {
        const inputNum = this.parseInput(input, locale);
        let matchesLower = true;
        if (interval.minValue) {
            matchesLower = interval.minValueIncluded
                ? interval.minValue <= inputNum
                : interval.minValue < inputNum;
        }
        let matchesHigher = true;
        if (interval.maxValue) {
            matchesHigher = interval.maxValueIncluded
                ? interval.maxValue >= inputNum
                : interval.maxValue > inputNum;
        }
        return matchesLower && matchesHigher;
    }
    parseInput(input, locale) {
        const groupingSeparator = getLocaleNumberSymbol(locale, NumberSymbol.Group);
        const decimalSeparator = getLocaleNumberSymbol(locale, NumberSymbol.Decimal);
        return this.parseInputForSeparators(input, groupingSeparator, decimalSeparator);
    }
    parseInputForSeparators(input, groupingSeparator, decimalSeparator) {
        const escapeString = '\\';
        const search = new RegExp(escapeString + groupingSeparator, 'g');
        const normalizedInput = input
            .replace(search, '')
            .replace(decimalSeparator, '.');
        return parseFloat(normalizedInput);
    }
    createValidationError(isError) {
        return isError ? { wrongFormat: {} } : null;
    }
    createIntervalValidationError(isError) {
        return isError ? { intervalNotMet: {} } : null;
    }
}
ConfiguratorAttributeNumericInputFieldService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorAttributeNumericInputFieldService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1udW1lcmljLWlucHV0LWZpZWxkLmNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS90eXBlcy9udW1lcmljLWlucHV0LWZpZWxkL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtbnVtZXJpYy1pbnB1dC1maWVsZC5jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLFlBQVksRUFDWixxQkFBcUIsRUFDckIsWUFBWSxHQUNiLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFXM0M7O0dBRUc7QUFFSCxNQUFNLE9BQU8sNkNBQTZDO0lBQ3hEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILG9DQUFvQyxDQUNsQyxLQUFhLEVBQ2IsaUJBQXlCLEVBQ3pCLGdCQUF3QixFQUN4QixpQkFBeUIsRUFDekIsbUJBQTJCO1FBRTNCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQztRQUN6QixNQUFNLE1BQU0sR0FBVyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEdBQUcsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEUsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXRELElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVB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LEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNqRCxDQUFDOzswSUFsYVUsNkNBQTZDOzhJQUE3Qyw2Q0FBNkMsY0FEaEMsTUFBTTsyRkFDbkIsNkNBQTZDO2tCQUR6RCxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIGZvcm1hdE51bWJlcixcbiAgZ2V0TG9jYWxlTnVtYmVyU3ltYm9sLFxuICBOdW1iZXJTeW1ib2wsXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIFZhbGlkYXRvckZuIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9tb2RlbC9jb25maWd1cmF0b3IubW9kZWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnRlcnZhbCB7XG4gIG1pblZhbHVlPzogbnVtYmVyO1xuICBtYXhWYWx1ZT86IG51bWJlcjtcbiAgbWluVmFsdWVJbmNsdWRlZDogYm9vbGVhbjtcbiAgbWF4VmFsdWVJbmNsdWRlZDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBQcm92aWRlcyB2YWxpZGF0aW9uIGFuZCBmb3JtYXR0aW5nIG9mIG51bWVyaWMgaW5wdXRcbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JBdHRyaWJ1dGVOdW1lcmljSW5wdXRGaWVsZFNlcnZpY2Uge1xuICAvKipcbiAgICogVmFsaWRhdGVzIG51bWVyaWMgaW5wdXQgYWNjb3JkaW5nIHRvIHNldHRpbmdzIHRoYXQgYXJlIG5vdCBkZXJpdmVkIGZyb20gdGhlIGxvY2FsZSBidXQgZnJvbSB0aGUgYXR0cmlidXRlXG4gICAqIG1ldGEgZGF0YSBsaWtlIHRoZSB0b3RhbCBudW1iZXIgb2YgZGlnaXRzIGFuZCB0aGUgbWF4aW11bSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMuXG4gICAqXG4gICAqIEBwYXJhbSBpbnB1dCBOdW1lcmljIHVzZXIgaW5wdXQsIGZvcm1hdHRlZCBhY2NvcmRpbmcgdG8gc2Vzc2lvbiBsb2NhbGVcbiAgICogQHBhcmFtIGdyb3VwaW5nU2VwYXJhdG9yIFNlcGFyYXRvciBmb3IgZ3JvdXBpbmcsIGUuZy4gJywnIGZvciAnZW4nIGxvY2FsZS4gV2UgYWxsb3cgdGhlIGdyb3VwaW5nIHNlcGFyYXRvciBidXRcbiAgICogICBkbyBub3QgY2hlY2sgZXhhY3RseSBvbiB0aGUgcG9zaXRpb24gb2YgaXQgaW4gdGhlIG51bWVyaWNhbCBpbnB1dC4gVGhpcyBlLmcuIGlzIG9rOiAnMTIsMTIsMTInLCB3aWxsIGJlIGNvbnZlcnRlZFxuICAgKiAgIHRvICcxMjEsMjEyJyBhZnRlciB0aGUgbmV4dCByb3VuZHRyaXBcbiAgICogQHBhcmFtIGRlY2ltYWxTZXBhcmF0b3IgIERlY2ltYWwgc2VwYXJhdG9yLCBlLmcuICcuJyBmb3IgJ2VuJyBsb2NhbGUuIE11c3Qgbm90IG9jY3VyIG1vcmUgdGhhdCAxIHRpbWUgaW4gdGhlIGlucHV0LlxuICAgKiBAcGFyYW0gbnVtYmVyVG90YWxQbGFjZXMgIFRvdGFsIG51bWJlciBvZiBwbGFjZXMgZS5nLiAxMFxuICAgKiBAcGFyYW0gbnVtYmVyRGVjaW1hbFBsYWNlcyAgTnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIGUuZy4gMlxuICAgKiAgQHJldHVybnMge2Jvb2xlYW59IERpZCB3ZSBzZWUgYSB2YWxpZGF0aW9uIGVycm9yP1xuICAgKi9cbiAgcGVyZm9ybVZhbGlkYXRpb25BY2NvcmRpbmdUb01ldGFEYXRhKFxuICAgIGlucHV0OiBzdHJpbmcsXG4gICAgZ3JvdXBpbmdTZXBhcmF0b3I6IHN0cmluZyxcbiAgICBkZWNpbWFsU2VwYXJhdG9yOiBzdHJpbmcsXG4gICAgbnVtYmVyVG90YWxQbGFjZXM6IG51bWJlcixcbiAgICBudW1iZXJEZWNpbWFsUGxhY2VzOiBudW1iZXJcbiAgKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmVnZXhFc2NhcGUgPSAnXFxcXCc7XG4gICAgY29uc3Qgc2VhcmNoOiBSZWdFeHAgPSBuZXcgUmVnRXhwKHJlZ2V4RXNjYXBlICsgZ3JvdXBpbmdTZXBhcmF0b3IsICdnJyk7XG4gICAgY29uc3Qgd29Hcm91cGluZyA9IGlucHV0LnJlcGxhY2Uoc2VhcmNoLCAnJyk7XG4gICAgY29uc3Qgc3BsaXRQYXJ0cyA9IHdvR3JvdXBpbmcuc3BsaXQoZGVjaW1hbFNlcGFyYXRvcik7XG5cbiAgICBpZiAoc3BsaXRQYXJ0cy5sZW5ndGggPiAyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHNwbGl0UGFydHMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gd29Hcm91cGluZy5sZW5ndGggPiBudW1iZXJUb3RhbFBsYWNlcyAtIG51bWJlckRlY2ltYWxQbGFjZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIHNwbGl0UGFydHNbMF0ubGVuZ3RoID4gbnVtYmVyVG90YWxQbGFjZXMgLSBudW1iZXJEZWNpbWFsUGxhY2VzIHx8XG4gICAgICBzcGxpdFBhcnRzWzFdLmxlbmd0aCA+IG51bWJlckRlY2ltYWxQbGFjZXNcbiAgICApO1xuICB9XG5cbiAgZm9ybWF0SW50ZXJ2YWxWYWx1ZShcbiAgICBpbnRlcnZhbFZhbHVlOiBudW1iZXIsXG4gICAgZGVjaW1hbFBsYWNlczogbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGxvY2FsZTogc3RyaW5nXG4gICk6IHN0cmluZyB7XG4gICAgaWYgKGRlY2ltYWxQbGFjZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVjaW1hbFBsYWNlcyA9IDA7XG4gICAgfVxuICAgIGNvbnN0IGZvcm1hdHRlZCA9IGZvcm1hdE51bWJlcihcbiAgICAgIGludGVydmFsVmFsdWUsXG4gICAgICBsb2NhbGUsXG4gICAgICAnMS4nICsgZGVjaW1hbFBsYWNlcyArICctJyArIGRlY2ltYWxQbGFjZXNcbiAgICApO1xuICAgIHJldHVybiBmb3JtYXR0ZWQ7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHRoZSB2YWx1ZSBuYW1lcyBhbmQgcmV0dXJucyB0aGUgaW50ZXJ2YWxzLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVzIHZhbHVlcyBvZiB0aGUgYXR0cmlidXRlXG4gICAqIEByZXR1cm5zIHtDb25maWd1cmF0b3JBdHRyaWJ1dGVOdW1lcmljSW50ZXJ2YWxbXX0gcGFyc2VkIGludGVydmFsc1xuICAgKi9cbiAgZ2V0SW50ZXJ2YWxzKFxuICAgIHZhbHVlczogQ29uZmlndXJhdG9yLlZhbHVlW10gfCB1bmRlZmluZWRcbiAgKTogQ29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0ludGVydmFsW10ge1xuICAgIGNvbnN0IGludGVydmFsczogQ29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0ludGVydmFsW10gPSBbXTtcbiAgICBpZiAodmFsdWVzICYmIHZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSB0aGlzLmdldEludGVydmFsKHZhbHVlKTtcbiAgICAgICAgaWYgKGludGVydmFsICYmIE9iamVjdC5rZXlzKGludGVydmFsKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBpbnRlcnZhbHMucHVzaChpbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gaW50ZXJ2YWxzO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgdmFsdWUgbmFtZSBhbmQgcmV0dXJucyB0aGUgaW50ZXJ2YWwgc3RydWN0dXJlLlxuICAgKiBWYWxpZCBpbnRlcnZhbCBzdHJpbmdzOlxuICAgKiBTdGFuZGFyZCBJbnRlcnZhbFxuICAgKiA1IC0gMTBcbiAgICogNSAtIDwxMFxuICAgKiA+NSAtIDEwXG4gICAqID41IC0gPDEwXG4gICAqIC0xMCAtIC01XG4gICAqIDEuMjUgLSAxLjM1XG4gICAqXG4gICAqIEluZmluaXRlIEludGVydmFsXG4gICAqID41XG4gICAqID49NVxuICAgKiA8NVxuICAgKiA8PTVcbiAgICogPi01XG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSB2YWx1ZSB3aGljaCB3aWxsIGJlIHBhcnNlZFxuICAgKiBAcmV0dXJucyB7Q29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0ludGVydmFsfSBwYXJzZWQgaW50ZXJ2YWxcbiAgICovXG4gIGdldEludGVydmFsKFxuICAgIHZhbHVlOiBDb25maWd1cmF0b3IuVmFsdWVcbiAgKTogQ29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0ludGVydmFsIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBpbnRlcnZhbDogQ29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0ludGVydmFsID0ge1xuICAgICAgbWluVmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgIG1heFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBtaW5WYWx1ZUluY2x1ZGVkOiBmYWxzZSxcbiAgICAgIG1heFZhbHVlSW5jbHVkZWQ6IGZhbHNlLFxuICAgIH07XG5cbiAgICBpZiAoIXZhbHVlIHx8ICF2YWx1ZS5uYW1lIHx8IHZhbHVlLnNlbGVjdGVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGxldCBtaW5WYWw6IHN0cmluZztcbiAgICBsZXQgbWF4VmFsOiBzdHJpbmc7XG5cbiAgICAvLyBzdGFuZGFyZCBpbnRlcnZhbCBhIC0gYlxuICAgIGlmICh2YWx1ZS5uYW1lLmluY2x1ZGVzKCcgLSAnKSkge1xuICAgICAgKHsgbWluVmFsLCBtYXhWYWwgfSA9IHRoaXMuaGFuZGxlU3RhbmRhcmRJbnRlcnZhbCh2YWx1ZS5uYW1lLCBpbnRlcnZhbCkpO1xuXG4gICAgICAvLyBpbmZpbml0ZSBpbnRlcnZhbCBvciBzaW5nbGUgdmFsdWVcbiAgICB9IGVsc2Uge1xuICAgICAgKHsgbWluVmFsLCBtYXhWYWwgfSA9IHRoaXMuaGFuZGxlU2luZ2xlT3JJbmZpbml0ZSh2YWx1ZS5uYW1lLCBpbnRlcnZhbCkpO1xuICAgIH1cblxuICAgIGlmIChtaW5WYWwgJiYgbWluVmFsLmxlbmd0aCA+IDApIHtcbiAgICAgIGludGVydmFsLm1pblZhbHVlID0gK21pblZhbDtcbiAgICB9XG4gICAgaWYgKG1heFZhbCAmJiBtYXhWYWwubGVuZ3RoID4gMCkge1xuICAgICAgaW50ZXJ2YWwubWF4VmFsdWUgPSArbWF4VmFsO1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcnZhbDtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVTaW5nbGVPckluZmluaXRlKFxuICAgIHZhbHVlTmFtZTogc3RyaW5nLFxuICAgIGludGVydmFsOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVOdW1lcmljSW50ZXJ2YWxcbiAgKSB7XG4gICAgbGV0IG1pblZhbCA9ICcnO1xuICAgIGxldCBtYXhWYWwgPSAnJztcbiAgICBpZiAodmFsdWVOYW1lLmluY2x1ZGVzKCc+JykpIHtcbiAgICAgIG1pblZhbCA9IHZhbHVlTmFtZTtcbiAgICAgIGludGVydmFsLm1pblZhbHVlSW5jbHVkZWQgPSBmYWxzZTtcbiAgICAgIG1pblZhbCA9IG1pblZhbC5yZXBsYWNlKCc+JywgJycpO1xuICAgIH1cbiAgICBpZiAodmFsdWVOYW1lLmluY2x1ZGVzKCc8JykpIHtcbiAgICAgIG1heFZhbCA9IHZhbHVlTmFtZTtcbiAgICAgIGludGVydmFsLm1heFZhbHVlSW5jbHVkZWQgPSBmYWxzZTtcbiAgICAgIG1heFZhbCA9IG1heFZhbC5yZXBsYWNlKCc8JywgJycpO1xuICAgIH1cbiAgICBpZiAodmFsdWVOYW1lLmluY2x1ZGVzKCfiiaUnKSkge1xuICAgICAgbWluVmFsID0gdmFsdWVOYW1lO1xuICAgICAgaW50ZXJ2YWwubWluVmFsdWVJbmNsdWRlZCA9IHRydWU7XG4gICAgICBtaW5WYWwgPSBtaW5WYWwucmVwbGFjZSgn4omlJywgJycpO1xuICAgIH1cbiAgICBpZiAodmFsdWVOYW1lLmluY2x1ZGVzKCfiiaQnKSkge1xuICAgICAgbWF4VmFsID0gdmFsdWVOYW1lO1xuICAgICAgaW50ZXJ2YWwubWF4VmFsdWVJbmNsdWRlZCA9IHRydWU7XG4gICAgICBtYXhWYWwgPSBtYXhWYWwucmVwbGFjZSgn4omkJywgJycpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAhdmFsdWVOYW1lLmluY2x1ZGVzKCc+JykgJiZcbiAgICAgICF2YWx1ZU5hbWUuaW5jbHVkZXMoJzwnKSAmJlxuICAgICAgIXZhbHVlTmFtZS5pbmNsdWRlcygn4omkJykgJiZcbiAgICAgICF2YWx1ZU5hbWUuaW5jbHVkZXMoJ+KJpScpXG4gICAgKSB7XG4gICAgICBtaW5WYWwgPSB2YWx1ZU5hbWU7XG4gICAgICBtYXhWYWwgPSB2YWx1ZU5hbWU7XG4gICAgICBpbnRlcnZhbC5tYXhWYWx1ZUluY2x1ZGVkID0gdHJ1ZTtcbiAgICAgIGludGVydmFsLm1pblZhbHVlSW5jbHVkZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4geyBtaW5WYWwsIG1heFZhbCB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZVN0YW5kYXJkSW50ZXJ2YWwoXG4gICAgdmFsdWVOYW1lOiBzdHJpbmcsXG4gICAgaW50ZXJ2YWw6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnRlcnZhbFxuICApIHtcbiAgICBjb25zdCBpbmRleCA9IHZhbHVlTmFtZS5pbmRleE9mKCcgLSAnKTtcbiAgICBsZXQgbWluVmFsID0gdmFsdWVOYW1lLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgbGV0IG1heFZhbCA9IHZhbHVlTmFtZS5zdWJzdHJpbmcoaW5kZXggKyAzLCB2YWx1ZU5hbWUubGVuZ3RoKTtcbiAgICBpbnRlcnZhbC5taW5WYWx1ZUluY2x1ZGVkID0gdHJ1ZTtcbiAgICBpbnRlcnZhbC5tYXhWYWx1ZUluY2x1ZGVkID0gdHJ1ZTtcbiAgICBpZiAobWluVmFsLmluY2x1ZGVzKCc+JykpIHtcbiAgICAgIGludGVydmFsLm1pblZhbHVlSW5jbHVkZWQgPSBmYWxzZTtcbiAgICAgIG1pblZhbCA9IG1pblZhbC5yZXBsYWNlKCc+JywgJycpO1xuICAgIH1cblxuICAgIGlmIChtYXhWYWwuaW5jbHVkZXMoJzwnKSkge1xuICAgICAgaW50ZXJ2YWwubWF4VmFsdWVJbmNsdWRlZCA9IGZhbHNlO1xuICAgICAgbWF4VmFsID0gbWF4VmFsLnJlcGxhY2UoJzwnLCAnJyk7XG4gICAgfVxuICAgIHJldHVybiB7IG1pblZhbCwgbWF4VmFsIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHBhdHRlcm4gZm9yIHRoZSBtZXNzYWdlIHRoYXQgaXMgZGlzcGxheWVkIHdoZW4gdGhlIHZhbGlkYXRpb24gZmFpbHMuIFRoaXMgbWVzc2FnZSBlLmcuIGxvb2tzIGxpa2VcbiAgICogJ0VudGVyIHRoZSBudW1iZXIgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6ICMjLCMjIywjIyMuIyMnXG4gICAqIGZvciB0aGUgJ2VuJyBsb2NhbGUgZm9yIGFuIGF0dHJpYnV0ZSB3aXRoIHRvdGFsIGxlbmd0aCBvZiAxMCBhbmQgMiBkZWNpbWFsIHBsYWNlcy5cbiAgICpcbiAgICogQHBhcmFtIGRlY2ltYWxQbGFjZXMgTnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzXG4gICAqIEBwYXJhbSB0b3RhbExlbmd0aCBUb3RhbCBudW1iZXIgb2YgZGlnaXRzXG4gICAqIEBwYXJhbSBuZWdhdGl2ZUFsbG93ZWQgRG8gd2UgYWxsb3cgbmVnYXRpdmUgaW5wdXQ/XG4gICAqIEBwYXJhbSBsb2NhbGUgIExvY2FsZVxuICAgKiAgQHJldHVybnMge3N0cmluZ30gVGhlIHBhdHRlcm4gdGhhdCB3ZSBkaXNwbGF5IGluIHRoZSB2YWxpZGF0aW9uIG1lc3NhZ2VcbiAgICovXG4gIGdldFBhdHRlcm5Gb3JWYWxpZGF0aW9uTWVzc2FnZShcbiAgICBkZWNpbWFsUGxhY2VzOiBudW1iZXIsXG4gICAgdG90YWxMZW5ndGg6IG51bWJlcixcbiAgICBuZWdhdGl2ZUFsbG93ZWQ6IGJvb2xlYW4sXG4gICAgbG9jYWxlOiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICBsZXQgaW5wdXQ6IHN0cmluZyA9ICgxMCAqKiB0b3RhbExlbmd0aCAtIDEpLnRvU3RyaW5nKCk7XG4gICAgaWYgKGRlY2ltYWxQbGFjZXMgPiAwKSB7XG4gICAgICBpbnB1dCA9XG4gICAgICAgIGlucHV0LnN1YnN0cmluZygwLCB0b3RhbExlbmd0aCAtIGRlY2ltYWxQbGFjZXMpICtcbiAgICAgICAgJy4nICtcbiAgICAgICAgaW5wdXQuc3Vic3RyaW5nKHRvdGFsTGVuZ3RoIC0gZGVjaW1hbFBsYWNlcywgdG90YWxMZW5ndGgpO1xuICAgIH1cbiAgICBjb25zdCBpbnB1dEFzTnVtYmVyOiBudW1iZXIgPSBOdW1iZXIoaW5wdXQpO1xuICAgIGxldCBmb3JtYXR0ZWQgPSBmb3JtYXROdW1iZXIoXG4gICAgICBpbnB1dEFzTnVtYmVyLFxuICAgICAgbG9jYWxlLFxuICAgICAgJzEuJyArIGRlY2ltYWxQbGFjZXMgKyAnLScgKyBkZWNpbWFsUGxhY2VzXG4gICAgKS5yZXBsYWNlKC85L2csICcjJyk7XG4gICAgaWYgKG5lZ2F0aXZlQWxsb3dlZCkge1xuICAgICAgZm9ybWF0dGVkID0gJy0nICsgZm9ybWF0dGVkO1xuICAgIH1cbiAgICByZXR1cm4gZm9ybWF0dGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbGlkYXRvciBmb3IgdGhlIGlucHV0IGNvbXBvbmVudCB0aGF0IHJlcHJlc2VudHMgbnVtZXJpYyBpbnB1dC5cbiAgICogVGhlIHZhbGlkYXRvciBvbmx5IGFsbG93cyB0aGUgZ3JvdXBpbmcgc2VwYXJhdG9yLCB0aGUgZGVjaW1hbCBzZXBhcmF0b3IsIGFuIG9wdGlvbmFsICctJyBzaWduLFxuICAgKiBhbmQgdGhlIGRpZ2l0cyBiZXR3ZWVuIDAuLjkuIFRoaXMgdmFsaWRhdG9yIGRvZXMgbm90IHN1cHBvcnQgdGhlIHNjaWVudGlmaWMgbm90YXRpb24gb2ZcbiAgICogYXR0cmlidXRlcy5cbiAgICpcbiAgICogQHBhcmFtIGxvY2FsZSBUaGUgbG9jYWxlXG4gICAqIEBwYXJhbSBudW1iZXJEZWNpbWFsUGxhY2VzIE51bWJlciBvZiBkZWNpbWFsIHBsYWNlc1xuICAgKiBAcGFyYW0gbnVtYmVyVG90YWxQbGFjZXMgIFRvdGFsIG51bWJlciBvZiBkaWdpdHNcbiAgICogQHBhcmFtIG5lZ2F0aXZlQWxsb3dlZDogRG8gd2UgYWxsb3cgbmVnYXRpdmUgaW5wdXQ/XG4gICAqIEByZXR1cm5zIHtWYWxpZGF0b3JGbn0gVGhlIHZhbGlkYXRvclxuICAgKi9cblxuICBnZXROdW1iZXJGb3JtYXRWYWxpZGF0b3IoXG4gICAgbG9jYWxlOiBzdHJpbmcsXG4gICAgbnVtYmVyRGVjaW1hbFBsYWNlczogbnVtYmVyLFxuICAgIG51bWJlclRvdGFsUGxhY2VzOiBudW1iZXIsXG4gICAgbmVnYXRpdmVBbGxvd2VkOiBib29sZWFuXG4gICk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0gY29udHJvbC52YWx1ZT8udHJpbSgpO1xuICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFZhbGlkYXRpb25FcnJvcnNOdW1lcmljRm9ybWF0KFxuICAgICAgICAgIGlucHV0LFxuICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICBudW1iZXJEZWNpbWFsUGxhY2VzLFxuICAgICAgICAgIG51bWJlclRvdGFsUGxhY2VzLFxuICAgICAgICAgIG5lZ2F0aXZlQWxsb3dlZFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRWYWxpZGF0aW9uRXJyb3JzTnVtZXJpY0Zvcm1hdChcbiAgICBpbnB1dDogc3RyaW5nLFxuICAgIGxvY2FsZTogc3RyaW5nLFxuICAgIG51bWJlckRlY2ltYWxQbGFjZXM6IG51bWJlcixcbiAgICBudW1iZXJUb3RhbFBsYWNlczogbnVtYmVyLFxuICAgIG5lZ2F0aXZlQWxsb3dlZDogYm9vbGVhblxuICApOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHwgbnVsbCB7XG4gICAgLy9hbGxvd2VkOiBvbmx5IG51bWJlcnMgYW5kIHNlcGFyYXRvcnNcblxuICAgIGNvbnN0IGdyb3VwaW5nU2VwYXJhdG9yID0gZ2V0TG9jYWxlTnVtYmVyU3ltYm9sKGxvY2FsZSwgTnVtYmVyU3ltYm9sLkdyb3VwKTtcbiAgICBjb25zdCBkZWNpbWFsU2VwYXJhdG9yID0gZ2V0TG9jYWxlTnVtYmVyU3ltYm9sKFxuICAgICAgbG9jYWxlLFxuICAgICAgTnVtYmVyU3ltYm9sLkRlY2ltYWxcbiAgICApO1xuICAgIGNvbnN0IGV4cHJlc3Npb25QcmVmaXggPSBuZWdhdGl2ZUFsbG93ZWQgPyAnXi0/JyA6ICdeJztcbiAgICBjb25zdCBleHByZXNzaW9uT25seU51bWVyaWNhbElucHV0OiBSZWdFeHAgPSBuZXcgUmVnRXhwKFxuICAgICAgZXhwcmVzc2lvblByZWZpeCArXG4gICAgICAgICdbMDEyMzQ1Njc4OScgK1xuICAgICAgICBncm91cGluZ1NlcGFyYXRvciArXG4gICAgICAgIGRlY2ltYWxTZXBhcmF0b3IgK1xuICAgICAgICAnXSokJ1xuICAgICk7XG5cbiAgICBpZiAoIWV4cHJlc3Npb25Pbmx5TnVtZXJpY2FsSW5wdXQudGVzdChpbnB1dCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVZhbGlkYXRpb25FcnJvcih0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlVmFsaWRhdGlvbkVycm9yKFxuICAgICAgdGhpcy5wZXJmb3JtVmFsaWRhdGlvbkFjY29yZGluZ1RvTWV0YURhdGEoXG4gICAgICAgIGlucHV0LFxuICAgICAgICBncm91cGluZ1NlcGFyYXRvcixcbiAgICAgICAgZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgbnVtYmVyVG90YWxQbGFjZXMgKyAoaW5wdXQuaW5jbHVkZXMoJy0nKSA/IDEgOiAwKSxcbiAgICAgICAgbnVtYmVyRGVjaW1hbFBsYWNlc1xuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaW50ZXJ2YWwgdmFsaWRhdG9yIGZvciB0aGUgaW5wdXQgY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBudW1lcmljIGlucHV0LlxuICAgKiBJdCBiZWNvbWVzIGFjdGl2ZSBvbmx5IGlmIGludGVydmFscyBhcmUgcHJvdmlkZWQgKHRoZXkgb3JpZ2luYXRlIGZyb20gdGhlIGF0dHJpYnV0ZSdzIHZhbHVlcyksXG4gICAqIGFuZCBtYXRjaGVzIHRoZSBpbnB1dCB3aXRoIHRoZSBsaXN0IG9mIGludGVydmFscy5cbiAgICogSXQgYWxzbyBiZWNvbWVzIGFjdGl2ZSBvbmx5IGlmIHRoZSB2YWxpZGF0aW9uIGZvciB0aGUgbnVtZXJpYyBmb3JtYXQgaXRzZWxmIGlzIGZpbmUsIGluIG9yZGVyXG4gICAqIHRvIGF2b2lkIG11bHRpcGxlIHZhbGlkYXRpb24gbWVzc2FnZXMuXG4gICAqXG4gICAqIEBwYXJhbSBsb2NhbGUgVGhlIGxvY2FsZVxuICAgKiBAcGFyYW0gbnVtYmVyRGVjaW1hbFBsYWNlcyBOdW1iZXIgb2YgZGVjaW1hbCBwbGFjZXNcbiAgICogQHBhcmFtIG51bWJlclRvdGFsUGxhY2VzICBUb3RhbCBudW1iZXIgb2YgZGlnaXRzXG4gICAqIEBwYXJhbSBuZWdhdGl2ZUFsbG93ZWQ6IERvIHdlIGFsbG93IG5lZ2F0aXZlIGlucHV0P1xuICAgKiBAcmV0dXJucyB7VmFsaWRhdG9yRm59IFRoZSB2YWxpZGF0b3JcbiAgICovXG5cbiAgZ2V0SW50ZXJ2YWxWYWxpZGF0b3IoXG4gICAgbG9jYWxlOiBzdHJpbmcsXG4gICAgbnVtYmVyRGVjaW1hbFBsYWNlczogbnVtYmVyLFxuICAgIG51bWJlclRvdGFsUGxhY2VzOiBudW1iZXIsXG4gICAgbmVnYXRpdmVBbGxvd2VkOiBib29sZWFuLFxuICAgIGludGVydmFsczogQ29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0ludGVydmFsW10sXG4gICAgY3VycmVudFZhbHVlPzogc3RyaW5nXG4gICk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0gY29udHJvbC52YWx1ZT8udHJpbSgpO1xuICAgICAgaWYgKFxuICAgICAgICBpbnB1dCAmJlxuICAgICAgICBpbnB1dCAhPT0gY3VycmVudFZhbHVlICYmIC8vdGhpcyBpcyB0byBlbnN1cmUgdGhhdCBzZWxlY3RlZCBpbnRlcnZhbCBjb25zaXN0aW5nIG9mIG9ubHkgb25lIHZhbHVlIHdpbGwgbm90IGxlYWQgdG8gYSB2YWxpZGF0aW9uIGVycm9yXG4gICAgICAgIC8vIGluIHRoZSBuZXh0IHJvdW5kdHJpcCwgd2hlbiB0aGlzIHZhbHVlIGhhcyBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgbGlzdCBvZiBpbnRlcnZhbHNcbiAgICAgICAgaW50ZXJ2YWxzLmxlbmd0aCAhPT0gMCAmJiAvLyBwZXJmb3JtIHZhbGlkYXRpb24gb25seSBpZiBpbnRlcnZhbHMgZXhpc3RcbiAgICAgICAgdGhpcy5nZXRWYWxpZGF0aW9uRXJyb3JzTnVtZXJpY0Zvcm1hdChcbiAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgbnVtYmVyRGVjaW1hbFBsYWNlcyxcbiAgICAgICAgICBudW1iZXJUb3RhbFBsYWNlcyxcbiAgICAgICAgICBuZWdhdGl2ZUFsbG93ZWRcbiAgICAgICAgKSA9PSBudWxsXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlSW50ZXJ2YWxWYWxpZGF0aW9uRXJyb3IoXG4gICAgICAgICAgIXRoaXMuY2hlY2tJZlBhcnRPZkludGVydmFscyhpbnB1dCwgbG9jYWxlLCBpbnRlcnZhbHMpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGNoZWNrSWZQYXJ0T2ZJbnRlcnZhbHMoXG4gICAgaW5wdXQ6IHN0cmluZyxcbiAgICBsb2NhbGU6IHN0cmluZyxcbiAgICBpbnRlcnZhbHM6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnRlcnZhbFtdXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBpbnRlcnZhbHMuZmluZCgoaW50ZXJ2YWwpID0+XG4gICAgICAgIHRoaXMuaW5wdXRNYXRjaGVzSW50ZXJ2YWwoaW5wdXQsIGxvY2FsZSwgaW50ZXJ2YWwpXG4gICAgICApICE9PSB1bmRlZmluZWRcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlucHV0TWF0Y2hlc0ludGVydmFsKFxuICAgIGlucHV0OiBzdHJpbmcsXG4gICAgbG9jYWxlOiBzdHJpbmcsXG4gICAgaW50ZXJ2YWw6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnRlcnZhbFxuICApOiBib29sZWFuIHtcbiAgICBjb25zdCBpbnB1dE51bTogbnVtYmVyID0gdGhpcy5wYXJzZUlucHV0KGlucHV0LCBsb2NhbGUpO1xuXG4gICAgbGV0IG1hdGNoZXNMb3dlcjogYm9vbGVhbiA9IHRydWU7XG4gICAgaWYgKGludGVydmFsLm1pblZhbHVlKSB7XG4gICAgICBtYXRjaGVzTG93ZXIgPSBpbnRlcnZhbC5taW5WYWx1ZUluY2x1ZGVkXG4gICAgICAgID8gaW50ZXJ2YWwubWluVmFsdWUgPD0gaW5wdXROdW1cbiAgICAgICAgOiBpbnRlcnZhbC5taW5WYWx1ZSA8IGlucHV0TnVtO1xuICAgIH1cblxuICAgIGxldCBtYXRjaGVzSGlnaGVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICBpZiAoaW50ZXJ2YWwubWF4VmFsdWUpIHtcbiAgICAgIG1hdGNoZXNIaWdoZXIgPSBpbnRlcnZhbC5tYXhWYWx1ZUluY2x1ZGVkXG4gICAgICAgID8gaW50ZXJ2YWwubWF4VmFsdWUgPj0gaW5wdXROdW1cbiAgICAgICAgOiBpbnRlcnZhbC5tYXhWYWx1ZSA+IGlucHV0TnVtO1xuICAgIH1cblxuICAgIHJldHVybiBtYXRjaGVzTG93ZXIgJiYgbWF0Y2hlc0hpZ2hlcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUlucHV0KGlucHV0OiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBncm91cGluZ1NlcGFyYXRvciA9IGdldExvY2FsZU51bWJlclN5bWJvbChsb2NhbGUsIE51bWJlclN5bWJvbC5Hcm91cCk7XG4gICAgY29uc3QgZGVjaW1hbFNlcGFyYXRvciA9IGdldExvY2FsZU51bWJlclN5bWJvbChcbiAgICAgIGxvY2FsZSxcbiAgICAgIE51bWJlclN5bWJvbC5EZWNpbWFsXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZUlucHV0Rm9yU2VwYXJhdG9ycyhcbiAgICAgIGlucHV0LFxuICAgICAgZ3JvdXBpbmdTZXBhcmF0b3IsXG4gICAgICBkZWNpbWFsU2VwYXJhdG9yXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUlucHV0Rm9yU2VwYXJhdG9ycyhcbiAgICBpbnB1dDogc3RyaW5nLFxuICAgIGdyb3VwaW5nU2VwYXJhdG9yOiBzdHJpbmcsXG4gICAgZGVjaW1hbFNlcGFyYXRvcjogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IGVzY2FwZVN0cmluZyA9ICdcXFxcJztcbiAgICBjb25zdCBzZWFyY2g6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoZXNjYXBlU3RyaW5nICsgZ3JvdXBpbmdTZXBhcmF0b3IsICdnJyk7XG4gICAgY29uc3Qgbm9ybWFsaXplZElucHV0ID0gaW5wdXRcbiAgICAgIC5yZXBsYWNlKHNlYXJjaCwgJycpXG4gICAgICAucmVwbGFjZShkZWNpbWFsU2VwYXJhdG9yLCAnLicpO1xuICAgIHJldHVybiBwYXJzZUZsb2F0KG5vcm1hbGl6ZWRJbnB1dCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlVmFsaWRhdGlvbkVycm9yKFxuICAgIGlzRXJyb3I6IGJvb2xlYW5cbiAgKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB8IG51bGwge1xuICAgIHJldHVybiBpc0Vycm9yID8geyB3cm9uZ0Zvcm1hdDoge30gfSA6IG51bGw7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlSW50ZXJ2YWxWYWxpZGF0aW9uRXJyb3IoXG4gICAgaXNFcnJvcjogYm9vbGVhblxuICApOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHwgbnVsbCB7XG4gICAgcmV0dXJuIGlzRXJyb3IgPyB7IGludGVydmFsTm90TWV0OiB7fSB9IDogbnVsbDtcbiAgfVxufVxuIl19