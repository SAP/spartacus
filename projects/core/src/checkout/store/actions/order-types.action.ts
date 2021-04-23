import { Action } from '@ngrx/store';
import { ORDER_TYPE } from '../../../model/replenishment-order.model';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const SET_ORDER_TYPE = '[Checkout] Set Order Type';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class SetOrderType implements Action {
  readonly type = SET_ORDER_TYPE;
  constructor(public payload: ORDER_TYPE) {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export type OrderTypesActions = SetOrderType;
