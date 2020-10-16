import { Action } from '@ngrx/store';
import { Currency } from '../../../model/misc.model';

export const LOAD_CURRENCIES = '[Site-context] Load Currencies';
export const LOAD_CURRENCIES_FAIL = '[Site-context] Load Currencies Fail';
export const LOAD_CURRENCIES_SUCCESS = '[Site-context] Load Currencies Success';
export const SET_ACTIVE_CURRENCY = '[Site-context] Set Active Currency';
export const CURRENCY_CHANGE = '[Site-context] Currency Change';

export class LoadCurrencies implements Action {
  readonly type = LOAD_CURRENCIES;
}

export class LoadCurrenciesFail implements Action {
  readonly type = LOAD_CURRENCIES_FAIL;
  constructor(public payload: any) {}
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
  constructor(public payload: { previous: string; current: string }) {}
}

// action types
export type CurrenciesAction =
  | LoadCurrencies
  | LoadCurrenciesFail
  | LoadCurrenciesSuccess
  | SetActiveCurrency
  | CurrencyChange;
