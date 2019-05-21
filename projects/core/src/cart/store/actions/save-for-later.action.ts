// import { Action } from '@ngrx/store';
import {
  LoaderLoadAction,
  LoaderFailAction,
  LoaderSuccessAction,
} from '../../../state/utils/loader/loader.action';
import { CART_DATA } from '../cart-state';

export const CREATE_SAVE_FOR_LATER = '[Cart] Create Save For Later';
export const CREATE_SAVE_FOR_LATER_FAIL = '[Cart] Create Save For Later Fail';
export const CREATE_SAVE_FOR_LATER_SUCCESS =
  '[Cart] Create Save For Later Success';

export const LOAD_SAVE_FOR_LATER = '[Cart] Load Save For Later';
export const LOAD_SAVE_FOR_LATER_FAIL = '[Cart] Load Save For Later Fail';
export const LOAD_SAVE_FOR_LATER_SUCCESS = '[Cart] Load Save For Later Success';

export class CreateSaveForLater extends LoaderLoadAction {
  readonly type = CREATE_SAVE_FOR_LATER;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class CreateSaveForLaterFail extends LoaderFailAction {
  readonly type = CREATE_SAVE_FOR_LATER_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class CreateSaveForLaterSuccess extends LoaderSuccessAction {
  readonly type = CREATE_SAVE_FOR_LATER_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class LoadSaveForLater extends LoaderLoadAction {
  readonly type = LOAD_SAVE_FOR_LATER;
  constructor(
    public payload: { userId: string; cartId: string; details?: boolean }
  ) {
    super(CART_DATA);
  }
}

export class LoadSaveForLaterFail extends LoaderFailAction {
  readonly type = LOAD_SAVE_FOR_LATER_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class LoadSaveForLaterSuccess extends LoaderSuccessAction {
  readonly type = LOAD_SAVE_FOR_LATER_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export type SaveForLaterAction =
  | CreateSaveForLater
  | CreateSaveForLaterFail
  | CreateSaveForLaterSuccess
  | LoadSaveForLater
  | LoadSaveForLaterFail
  | LoadSaveForLaterSuccess;
