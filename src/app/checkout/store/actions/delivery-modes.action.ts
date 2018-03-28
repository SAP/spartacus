import { Action } from '@ngrx/store';

export const LOAD_DELIVERY_MODES = '[Checkout] Load Delivery Modes';
export const LOAD_DELIVERY_MODES_FAIL = '[Checkout] Load Delivery Modes Fail';
export const LOAD_DELIVERY_MODES_SUCCESS =
  '[Checkout] Load Delivery Modes Success';

export class LoadDeliveryModes implements Action {
  readonly type = LOAD_DELIVERY_MODES;
  constructor(public payload: { userId: string; cartId: string }) {}
}

export class LoadDeliveryModesFail implements Action {
  readonly type = LOAD_DELIVERY_MODES_FAIL;
  constructor(public payload: any) {}
}

export class LoadDeliveryModesSuccess implements Action {
  readonly type = LOAD_DELIVERY_MODES_SUCCESS;
  constructor(public payload: any) {}
}

export type DeliveryModesAction =
  | LoadDeliveryModes
  | LoadDeliveryModesFail
  | LoadDeliveryModesSuccess;
