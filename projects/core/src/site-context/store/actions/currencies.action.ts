import { Action } from '@ngrx/store';
import { Currency } from '../../../occ/occ-models/occ.models';
import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderSuccessAction
} from '../../../state/utils/loader/loader.action';
import { CURRENCIES_ENTITY } from '../state';

export const LOAD_CURRENCIES = '[Site-context] Load Currencies';
export const LOAD_CURRENCIES_FAIL = '[Site-context] Load Currencies Fail';
export const LOAD_CURRENCIES_SUCCESS = '[Site-context] Load Currencies Success';
export const SET_ACTIVE_CURRENCY = '[Site-context] Set Active Currency';
export const CURRENCY_CHANGE = '[Site-context] Currency Change';

export class LoadCurrencies extends LoaderLoadAction {
  readonly type = LOAD_CURRENCIES;
  constructor() {
    super(CURRENCIES_ENTITY);
  }
}

export class LoadCurrenciesFail extends LoaderFailAction {
  readonly type = LOAD_CURRENCIES_FAIL;
  constructor(public payload: any) {
    super(CURRENCIES_ENTITY, payload);
  }
}

export class LoadCurrenciesSuccess extends LoaderSuccessAction {
  readonly type = LOAD_CURRENCIES_SUCCESS;
  constructor(public payload: Currency[]) {
    super(CURRENCIES_ENTITY);
  }
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
