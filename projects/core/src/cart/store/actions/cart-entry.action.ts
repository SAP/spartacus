import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderSuccessAction,
} from '../../../state/utils/loader/loader.action';
import { CART_DATA } from '../cart-state';

export const CART_ADD_ENTRY = '[Cart-entry] Add Entry';
export const CART_ADD_ENTRY_SUCCESS = '[Cart-entry] Add Entry Success';
export const CART_ADD_ENTRY_FAIL = '[Cart-entry] Add Entry Fail';

export const CART_REMOVE_ENTRY = '[Cart-entry] Remove Entry';
export const CART_REMOVE_ENTRY_SUCCESS = '[Cart-entry] Remove Entry Success';
export const CART_REMOVE_ENTRY_FAIL = '[Cart-entry] Remove Entry Fail';

export const CART_UPDATE_ENTRY = '[Cart-entry] Update Entry';
export const CART_UPDATE_ENTRY_SUCCESS = '[Cart-entry] Update Entry Success';
export const CART_UPDATE_ENTRY_FAIL = '[Cart-entry] Update Entry Fail';

export class CartAddEntry extends LoaderLoadAction {
  readonly type = CART_ADD_ENTRY;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class CartAddEntrySuccess extends LoaderSuccessAction {
  readonly type = CART_ADD_ENTRY_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class CartAddEntryFail extends LoaderFailAction {
  readonly type = CART_ADD_ENTRY_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class CartRemoveEntry extends LoaderLoadAction {
  readonly type = CART_REMOVE_ENTRY;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class CartRemoveEntrySuccess extends LoaderSuccessAction {
  readonly type = CART_REMOVE_ENTRY_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class CartRemoveEntryFail extends LoaderFailAction {
  readonly type = CART_REMOVE_ENTRY_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class CartUpdateEntry extends LoaderLoadAction {
  readonly type = CART_UPDATE_ENTRY;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class CartUpdateEntrySuccess extends LoaderSuccessAction {
  readonly type = CART_UPDATE_ENTRY_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class CartUpdateEntryFail extends LoaderFailAction {
  readonly type = CART_UPDATE_ENTRY_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export type CartEntryAction =
  | CartAddEntry
  | CartAddEntrySuccess
  | CartAddEntryFail
  | CartRemoveEntry
  | CartRemoveEntrySuccess
  | CartRemoveEntryFail
  | CartUpdateEntry
  | CartUpdateEntrySuccess
  | CartUpdateEntryFail;
