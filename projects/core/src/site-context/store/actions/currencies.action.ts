import { Action } from '@ngrx/store';
import { Currency } from '../../../occ/occ-models/occ.models';
import { failMeta, LoaderAction, LoaderMeta, loadMeta, successMeta } from '../../../store-entities/loader.action';
import { CURRENCIES_ENTITY } from '../reducers';

export const LOAD_CURRENCIES = '[Site-context] Load Currencies';
export const LOAD_CURRENCIES_FAIL = '[Site-context] Load Currencies Fail';
export const LOAD_CURRENCIES_SUCCESS = '[Site-context] Load Currencies Success';
export const SET_ACTIVE_CURRENCY = '[Site-context] Set Active Currency';
export const CURRENCY_CHANGE = '[Site-context] Currency Change';

export class LoadCurrencies implements LoaderAction {
  readonly type = LOAD_CURRENCIES;
  readonly meta = loadMeta(CURRENCIES_ENTITY);
}

export class LoadCurrenciesFail implements LoaderAction {
  readonly type = LOAD_CURRENCIES_FAIL;
  readonly meta = failMeta(CURRENCIES_ENTITY);
  constructor(public payload: any) {}
}

export class LoadCurrenciesSuccess implements Action {
  readonly type = LOAD_CURRENCIES_SUCCESS;
  readonly meta = successMeta(CURRENCIES_ENTITY);
  constructor(public payload: Currency[]) {}
}

export class SetActiveCurrency implements Action {
  readonly type = SET_ACTIVE_CURRENCY;
  constructor(public payload: string) {}
}

export class CurrencyChange implements Action {
  readonly type = CURRENCY_CHANGE;
}

// action types
export type CurrenciesAction =
  | LoadCurrencies
  | LoadCurrenciesFail
  | LoadCurrenciesSuccess
  | SetActiveCurrency
  | CurrencyChange;
