import { Action } from '@ngrx/store';
import { CardType } from '../../../model/cart.model';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const LOAD_CARD_TYPES = '[Checkout] Load Card Types';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const LOAD_CARD_TYPES_FAIL = '[Checkout] Load Card Fail';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const LOAD_CARD_TYPES_SUCCESS = '[Checkout] Load Card Success';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class LoadCardTypes implements Action {
  readonly type = LOAD_CARD_TYPES;
  constructor() {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class LoadCardTypesFail implements Action {
  readonly type = LOAD_CARD_TYPES_FAIL;
  constructor(public payload: any) {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class LoadCardTypesSuccess implements Action {
  readonly type = LOAD_CARD_TYPES_SUCCESS;
  constructor(public payload: CardType[]) {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export type CardTypesAction =
  | LoadCardTypes
  | LoadCardTypesFail
  | LoadCardTypesSuccess;
