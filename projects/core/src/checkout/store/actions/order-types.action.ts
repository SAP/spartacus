import { Action } from '@ngrx/store';
import { ORDER_TYPE } from '../../../model/replenishment-order.model';

export const SET_ORDER_TYPE = '[Checkout] Set Order Type';

export class SetOrderType implements Action {
  readonly type = SET_ORDER_TYPE;
  constructor(public payload: ORDER_TYPE) {}
}

export type OrderTypesActions = SetOrderType;
