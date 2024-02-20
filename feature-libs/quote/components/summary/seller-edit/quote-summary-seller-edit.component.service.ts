/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { LanguageService, TimeUtils } from '@spartacus/core';
import { Quote, QuoteState } from '@spartacus/quote/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuoteUIConfig } from '../../config/quote-ui.config';

export type LocalizationElements = {
  locale: string;
  formatter: Intl.NumberFormat;
  percentageSign: string;
};

/**
 * Provides validation and formatting of numeric input.
 */
@Injectable({ providedIn: 'root' })
export class QuoteSummarySellerEditComponentService {
  protected languageService = inject(LanguageService);
  protected quoteUIConfig = inject(QuoteUIConfig);
  private readonly maximumDecimalsForPercentageDiscountDefault = 8;

  /**
   * Parses a discount value to numeric format.
   *
   * @param input - Discount as string, can include unit symbol, decimal and grouping separators
   * @returns Observable of discount as number
   */
  parseDiscountValue(input: string | undefined | null): Observable<number> {
    return this.getLocalizationElements().pipe(
      map((localizationElements) => {
        if (input) {
          input = input.replace(localizationElements.percentageSign, '');
          return this.parseInput(input, localizationElements.locale);
        } else {
          return 0;
        }
      })
    );
  }

  /**
   * Retrieves formatter according to current locale and unit.
   *
   * @returns Observable of formatters
   */
  getFormatter(): Observable<Intl.NumberFormat> {
    return this.getLocalizationElements().pipe(
      map((localizationElements) => localizationElements.formatter)
    );
  }

  /**
   * Retrieves localization elements according to current locale and unit.
   *
   * @returns Observables of localization elements
   */
  getLocalizationElements(): Observable<LocalizationElements> {
    return this.languageService.getActive().pipe(
      map((locale) => {
        const formatter = new Intl.NumberFormat(locale, {
          style: 'percent',
          maximumFractionDigits: this.retrieveMaxNumberOfDecimalPlaces(),
        });
        const symbol = formatter
          .formatToParts(0)
          .find((x) => x.type === 'percentSign');
        return this.checkAndReportMissingPercentageSign(
          locale,
          formatter,
          symbol?.value
        );
      })
    );
  }

  /**
   * Retrieves number format validator according to inputs.
   *
   * @param locale - Current locale
   * @param unit - Unit
   * @returns Formatter that can be attached to a form control
   */
  getNumberFormatValidator(locale: string, unit: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const input = control.value?.trim();
      if (input) {
        return this.getValidationErrorsNumericFormat(input, locale, unit);
      }
      return null;
    };
  }

  /**
   * Adds current time and time zone to a date. Result is a timestamp string that can be handed over to OCC.
   *
   * @param date - Date as string
   * @returns Timestamp as string
   */
  addTimeToDate(date: string): string {
    const localTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    });
    return `${date}T${localTime}:00${TimeUtils.getLocalTimezoneOffset()}`;
  }

  /**
   * Removes time portion from timestamp.
   *
   * @param timestamp - Timestamp as string
   * @returns Date portion of timestamp
   */
  removeTimeFromDate(timestamp?: string): string | undefined {
    return timestamp?.toString().substring(0, 10);
  }

  /**
   * Verifies if quote state belongs to seller and can be edited.
   *
   * @param quote - Quote
   * @returns Is it for seller?
   */
  isEditable(quote: Quote): boolean {
    const quoteState = quote.state;
    return (
      (quoteState === QuoteState.SELLER_REQUEST ||
        quoteState === QuoteState.SELLER_DRAFT) &&
      quote.isEditable
    );
  }

  protected checkAndReportMissingPercentageSign(
    locale: string,
    formatter: Intl.NumberFormat,
    percentageSign?: string
  ): LocalizationElements {
    if (percentageSign) {
      return { locale, formatter, percentageSign: percentageSign };
    } else {
      throw new Error('No percentage sign present');
    }
  }

  protected parseInput(input: string, locale: string): number {
    const groupingSeparator = getLocaleNumberSymbol(locale, NumberSymbol.Group);
    const decimalSeparator = getLocaleNumberSymbol(
      locale,
      NumberSymbol.Decimal
    );
    return this.parseInputForSeparators(
      input,
      groupingSeparator,
      decimalSeparator
    );
  }

  protected parseInputForSeparators(
    input: string,
    groupingSeparator: string,
    decimalSeparator: string
  ): number {
    const escapeString = '\\';
    const search: RegExp = new RegExp(escapeString + groupingSeparator, 'g');
    const normalizedInput = input
      .replace(search, '')
      .replace(decimalSeparator, '.');
    return parseFloat(normalizedInput);
  }

  protected getValidationErrorsNumericFormat(
    input: string,
    locale: string,
    unit: string
  ): { [key: string]: any } | null {
    input = input.replace(unit, '').trim();

    const groupingSeparator = getLocaleNumberSymbol(locale, NumberSymbol.Group);
    const decimalSeparator = getLocaleNumberSymbol(
      locale,
      NumberSymbol.Decimal
    );
    const expressionPrefix = '^';
    const expressionOnlyNumericalInput: RegExp = new RegExp(
      expressionPrefix +
        '[0123456789' +
        groupingSeparator +
        decimalSeparator +
        ']*$'
    );

    if (!expressionOnlyNumericalInput.test(input)) {
      return this.createValidationError(true);
    }
    return this.createValidationError(
      this.performValidationForPercentageValue(
        input,
        groupingSeparator,
        decimalSeparator
      )
    );
  }

  protected createValidationError(
    isError: boolean
  ): { [key: string]: any } | null {
    return isError ? { wrongFormat: {} } : null;
  }

  /**
   * Returns maximum number of decimal places for the percentage discount.
   * The value is read from the configuration, refer to attribute quote/maximumDecimalsForPercentageDiscount.
   * In case this configuration is not present, default value is 8.
   *
   * @returns Maximum number of decimal places for percentage discount
   * @protected
   */
  protected retrieveMaxNumberOfDecimalPlaces() {
    return (
      this.quoteUIConfig?.quote?.maximumDecimalsForPercentageDiscount ??
      this.maximumDecimalsForPercentageDiscountDefault
    );
  }

  protected performValidationForPercentageValue(
    input: string,
    groupingSeparator: string,
    decimalSeparator: string
  ): boolean {
    const numberOfDecimalPlaces = this.retrieveMaxNumberOfDecimalPlaces();
    const regexEscape = '\\';
    const search: RegExp = new RegExp(regexEscape + groupingSeparator, 'g');
    const withoutGroupingSeparator = input.replace(search, '');
    const splitParts = withoutGroupingSeparator.split(decimalSeparator);

    if (splitParts.length > 2) {
      return true;
    }
    if (splitParts.length === 1) {
      return Number.parseFloat(withoutGroupingSeparator) > 100;
    }

    return (
      Number.parseFloat(splitParts[0]) > 100 ||
      splitParts[1].length > numberOfDecimalPlaces
    );
  }
}
