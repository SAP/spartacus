import { Action } from '@ngrx/store';
import { CardType } from '@spartacus/core';

export const LOAD_CARD_TYPES = '[Checkout] Load Card Types';
export const LOAD_CARD_TYPES_FAIL = '[Checkout] Load Card Fail';
export const LOAD_CARD_TYPES_SUCCESS = '[Checkout] Load Card Success';

export class LoadCardTypes implements Action {
  readonly type = LOAD_CARD_TYPES;
  constructor() {}
}

export class LoadCardTypesFail implements Action {
  readonly type = LOAD_CARD_TYPES_FAIL;
  constructor(public payload: any) {}
}

export class LoadCardTypesSuccess implements Action {
  readonly type = LOAD_CARD_TYPES_SUCCESS;
  constructor(public payload: CardType[]) {}
}

export type CardTypesAction =
  | LoadCardTypes
  | LoadCardTypesFail
  | LoadCardTypesSuccess;
