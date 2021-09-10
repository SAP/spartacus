import { Action } from '@ngrx/store';
import { CardType } from '@spartacus/core';

// TODO: Remove this file in 5.0 after full switch to query for card types

/**
 * @deprecated since 4.3.0. Card types are now handled with Query in CheckoutPaymentService.
 */
export const LOAD_CARD_TYPES = '[Checkout] Load Card Types';
/**
 * @deprecated since 4.3.0. Card types are now handled with Query in CheckoutPaymentService.
 */
export const LOAD_CARD_TYPES_FAIL = '[Checkout] Load Card Fail';
/**
 * @deprecated since 4.3.0. Card types are now handled with Query in CheckoutPaymentService.
 */
export const LOAD_CARD_TYPES_SUCCESS = '[Checkout] Load Card Success';

/**
 * @deprecated since 4.3.0. Card types are now handled with Query in CheckoutPaymentService.
 */
export class LoadCardTypes implements Action {
  readonly type = LOAD_CARD_TYPES;
  constructor() {}
}

/**
 * @deprecated since 4.3.0. Card types are now handled with Query in CheckoutPaymentService.
 */
export class LoadCardTypesFail implements Action {
  readonly type = LOAD_CARD_TYPES_FAIL;
  constructor(public payload: any) {}
}

/**
 * @deprecated since 4.3.0. Card types are now handled with Query in CheckoutPaymentService.
 */
export class LoadCardTypesSuccess implements Action {
  readonly type = LOAD_CARD_TYPES_SUCCESS;
  constructor(public payload: CardType[]) {}
}

/**
 * @deprecated since 4.3.0. Card types are now handled with Query in CheckoutPaymentService.
 */
export type CardTypesAction =
  | LoadCardTypes
  | LoadCardTypesFail
  | LoadCardTypesSuccess;
