import { Action } from '@ngrx/store';

export const LOAD_ORDER_DETAILS = '[User] Load Order Details';
export const LOAD_ORDER_DETAILS_FAIL = '[User] Load Order Details Fail';
export const LOAD_ORDER_DETAILS_SUCCESS = '[User] Load Order Details Success';

export class LoadOrderDetails implements Action {
  readonly type = LOAD_ORDER_DETAILS;
  constructor(
    public payload: {
      userId: string;
      orderCode: string;
    }
  ) {}
}

export class LoadOrderDetailsFail implements Action {
  readonly type = LOAD_ORDER_DETAILS_FAIL;
  constructor(public payload: any) {}
}

export class LoadOrderDetailsSuccess implements Action {
  readonly type = LOAD_ORDER_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}

export type OrderDetailsAction =
  | LoadOrderDetails
  | LoadOrderDetailsFail
  | LoadOrderDetailsSuccess;
