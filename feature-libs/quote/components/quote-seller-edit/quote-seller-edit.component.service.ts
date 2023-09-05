/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CurrencyService, LanguageService, TimeUtils } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NumberSymbol, getLocaleNumberSymbol } from '@angular/common';
import { Quote, QuoteState } from '@spartacus/quote/root';

export type LocalizationElements = {
  locale: string;
  formatter: Intl.NumberFormat;
  /**
   * A currency symbol where that is available, currency ISO code otherwise
   */
  currencySymbol: string;
};

/**
 * Provides validation and formatting of numeric input
 */
@Injectable({ providedIn: 'root' })
export class QuoteSellerEditComponentService {
  constructor(
    protected currencyService: CurrencyService,
    protected languageService: LanguageService
  ) {}

  /**
   * Parses a discount value to numeric format
   * @param input Discount as string, can include currency symbol, decimal and grouping separators
   * @returns Observable of discount as number
   */
  parseDiscountValue(input: string | undefined | null): Observable<number> {
    return this.getLocalizationElements().pipe(
      map((localizationElements) => {
        if (input) {
          input = input.replace(localizationElements.currencySymbol, '');
          return this.parseInput(input, localizationElements.locale);
        } else {
          return 0;
        }
      })
    );
  }

  /**
   * Retrieves formatter according to current locale and currency
   * @returns Observable of formatters
   */
  getFormatter(): Observable<Intl.NumberFormat> {
    return this.getLocalizationElements().pipe(
      map((localizationElements) => localizationElements.formatter)
    );
  }
  /**
   * Retrieves localization elements according to current locale and currency
   * @returns Observables of localization elements
   */
  getLocalizationElements(): Observable<LocalizationElements> {
    return combineLatest([
      this.currencyService.getActive(),
      this.languageService.getActive(),
    ]).pipe(
      map(([currency, locale]) => {
        const formatter = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency,
          currencyDisplay: 'narrowSymbol',
        });
        //Symbol for currencies with symbol available, currency ISO code otherwise
        const symbol = formatter
          .formatToParts(0)
          .find((x) => x.type === 'currency');
        return this.checkAndReportCurrencyIfMissing(
          locale,
          formatter,
          symbol?.value
        );
      })
    );
  }

  /**
   * Retrieves number format validator according to inputs
   * @param locale Current locale
   * @param currency Currency
   * @param numberTotalPlaces Number of maximum total places
   * @returns Formatter that can be attached to a form control
   */
  getNumberFormatValidator(
    locale: string,
    currency: string,
    numberTotalPlaces: number
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const input = control.value?.trim();
      if (input) {
        return this.getValidationErrorsNumericFormat(
          input,
          locale,
          currency,
          numberTotalPlaces
        );
      }
      return null;
    };
  }

  /**
   * Adds current time and time zone to a date. Result is a timestamp string that can be handed over to OCC
   * @param date Date as string
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
   * Removes time portion from timestamp
   * @param timestamp Timestamp as string
   * @returns Date portion of timestamp
   */
  removeTimeFromDate(timestamp?: string): string | undefined {
    return timestamp?.toString().substring(0, 10);
  }

  /**
   * Verify if quote state belongs to seller and can be edited
   * @param quoteState
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

  /**
   * Retrieve maximum number of decimal places. This supports validation, but it is not sufficient to do a complete validation,
   * cases where the granted discount exceeds the total quote value by 1 are not covered (covered in OCC call).
   * Still we want to inform the user as early as possible.
   * Note that we assume currencies always come with 2 decimal places. In case this is not desired, this service can be overriden.
   * @param quote Quote
   * @returns Maximum number of places, including 2 decimal places
   */
  getMaximumNumberOfTotalPlaces(quote: Quote): number {
    const numberOfDecimalPlaces = 2;
    const maximum = Math.max(
      quote.totalPrice.value ?? 1,
      quote.quoteDiscounts?.value ?? 1
    );
    return Math.floor(Math.log10(maximum)) + 1 + numberOfDecimalPlaces;
  }

  protected checkAndReportCurrencyIfMissing(
    locale: string,
    formatter: Intl.NumberFormat,
    currency?: string
  ): LocalizationElements {
    if (currency) {
      return { locale, formatter, currencySymbol: currency };
    } else {
      throw new Error('Currency must have symbol or ISO code');
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
    currency: string,
    numberTotalPlaces: number
  ): { [key: string]: any } | null {
    input = input.replace(currency, '').trim();

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
      this.performValidationAccordingToMetaData(
        input,
        groupingSeparator,
        decimalSeparator,
        numberTotalPlaces
      )
    );
  }

  protected createValidationError(
    isError: boolean
  ): { [key: string]: any } | null {
    return isError ? { wrongFormat: {} } : null;
  }

  protected performValidationAccordingToMetaData(
    input: string,
    groupingSeparator: string,
    decimalSeparator: string,
    numberTotalPlaces: number
  ): boolean {
    const numberDecimalPlaces = 2;
    const regexEscape = '\\';
    const search: RegExp = new RegExp(regexEscape + groupingSeparator, 'g');
    const woGrouping = input.replace(search, '');
    const splitParts = woGrouping.split(decimalSeparator);

    if (splitParts.length > 2) {
      return true;
    }
    if (splitParts.length === 1) {
      return woGrouping.length > numberTotalPlaces - numberDecimalPlaces;
    }

    return (
      splitParts[0].length > numberTotalPlaces - numberDecimalPlaces ||
      splitParts[1].length > numberDecimalPlaces
    );
  }
}
