/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import {
  ActionErrorProperty,
  ErrorAction,
} from '../../../error-handling/effects-error-handler/error-action';
import { Currency } from '../../../model/misc.model';

export const LOAD_CURRENCIES = '[Site-context] Load Currencies';
export const LOAD_CURRENCIES_FAIL = '[Site-context] Load Currencies Fail';
export const LOAD_CURRENCIES_SUCCESS = '[Site-context] Load Currencies Success';
export const SET_ACTIVE_CURRENCY = '[Site-context] Set Active Currency';
export const CURRENCY_CHANGE = '[Site-context] Currency Change';

export class LoadCurrencies implements Action {
  readonly type = LOAD_CURRENCIES;
}

export class LoadCurrenciesFail implements ErrorAction {
  readonly type = LOAD_CURRENCIES_FAIL;

  constructor(error: ActionErrorProperty);
  /**
   * @deprecated Please use `error` parameter other than `null` or `undefined`.
   *
   *             Note: Allowing for `null` or `undefined` will be removed in future versions
   *             together with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   **/
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures -- for distinguishing deprecated constructor
    error: any
  );
  constructor(public error: any) {}
}

export class LoadCurrenciesSuccess implements Action {
  readonly type = LOAD_CURRENCIES_SUCCESS;
  constructor(public payload: Currency[]) {}
}

export class SetActiveCurrency implements Action {
  readonly type = SET_ACTIVE_CURRENCY;
  constructor(public payload: string) {}
}

export class CurrencyChange implements Action {
  readonly type = CURRENCY_CHANGE;
  constructor(
    public payload: { previous: string | null; current: string | null }
  ) {}
}

// action types
export type CurrenciesAction =
  | LoadCurrencies
  | LoadCurrenciesFail
  | LoadCurrenciesSuccess
  | SetActiveCurrency
  | CurrencyChange;
