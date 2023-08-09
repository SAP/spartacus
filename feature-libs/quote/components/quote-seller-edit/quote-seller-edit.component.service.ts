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
import { QuoteState } from '@spartacus/quote/root';

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

  parseDiscountValue(input: string): Observable<number> {
    return this.getLocalizationElements().pipe(
      map((localizationElements) => {
        input = input.replace(localizationElements.currencySymbol, '');

        return this.parseInput(input, localizationElements.locale);
      })
    );
  }

  getFormatter(): Observable<Intl.NumberFormat> {
    return this.getLocalizationElements().pipe(
      map((localizationElements) => localizationElements.formatter)
    );
  }

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

  protected checkAndReportCurrencyIfMissing(
    locale: string,
    formatter: Intl.NumberFormat,
    currency?: string
  ): LocalizationElements {
    if (currency) {
      return { locale, currencySymbol: currency, formatter };
    } else throw new Error('Currency must have symbol or ISO code');
  }

  getNumberFormatValidator(locale: string, currency: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const input = control.value?.trim();
      if (input) {
        return this.getValidationErrorsNumericFormat(input, locale, currency);
      }
      return null;
    };
  }

  addTimeToDate(date: string): string {
    const localTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    });
    return `${date}T${localTime}:00${TimeUtils.getLocalTimezoneOffset()}`;
  }

  removeTimeFromDate(date?: string): string | undefined {
    return date?.toString().substring(0, 10);
  }

  isSeller(quoteState: QuoteState): boolean {
    return (
      quoteState === QuoteState.SELLER_DRAFT ||
      quoteState === QuoteState.SELLER_REQUEST
    );
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
  ) {
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
    currency: string
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
        10,
        2
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
    numberTotalPlaces: number,
    numberDecimalPlaces: number
  ): boolean {
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
