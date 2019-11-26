import { Action } from '@ngrx/store';
import {
  ReturnRequest,
  ReturnRequestEntryInputList,
} from '../../../model/order.model';

export const CREATE_ORDER_RETURN_REQUEST = '[User] Create Order Return Request';
export const CREATE_ORDER_RETURN_REQUEST_FAIL =
  '[User] Create Order Return Request Fail';
export const CREATE_ORDER_RETURN_REQUEST_SUCCESS =
  '[User] Create Order Return Request Success';

export class CreateOrderReturnRequest implements Action {
  readonly type = CREATE_ORDER_RETURN_REQUEST;
  constructor(
    public payload: {
      userId: string;
      returnRequestInput: ReturnRequestEntryInputList;
    }
  ) {}
}

export class CreateOrderReturnRequestFail implements Action {
  readonly type = CREATE_ORDER_RETURN_REQUEST_FAIL;
  constructor(public payload: any) {}
}

export class CreateOrderReturnRequestSuccess implements Action {
  readonly type = CREATE_ORDER_RETURN_REQUEST_SUCCESS;
  constructor(public payload: ReturnRequest) {}
}

export type OrderReturnRequestAction =
  | CreateOrderReturnRequest
  | CreateOrderReturnRequestFail
  | CreateOrderReturnRequestSuccess;
