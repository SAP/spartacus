import {
  EntityProcessesDecrementAction,
  EntityProcessesIncrementAction,
} from '../../../state/utils/entity-processes-loader/entity-processes-loader.action';
import { StateLoaderActions } from '../../../state/utils/index';
import { CART_DATA } from '../cart-state';
import { MULTI_CART_FEATURE } from '../multi-cart-state';

export const CART_ADD_ENTRY = '[Cart-entry] Add Entry';
export const CART_ADD_ENTRY_SUCCESS = '[Cart-entry] Add Entry Success';
export const CART_ADD_ENTRY_FAIL = '[Cart-entry] Add Entry Fail';
export const CART_REMOVE_ENTRY = '[Cart-entry] Remove Entry';
export const CART_REMOVE_ENTRY_SUCCESS = '[Cart-entry] Remove Entry Success';
export const CART_REMOVE_ENTRY_FAIL = '[Cart-entry] Remove Entry Fail';

export const CART_REMOVE_ENTRY_BY_KEY = '[Cart-entry] Remove Entry By Key';
export const CART_REMOVE_ENTRY_BY_KEY_SUCCESS =
  '[Cart-entry] Remove Entry By Key Success';
export const CART_REMOVE_ENTRY_BY_KEY_FAIL =
  '[Cart-entry] Remove Entry By Key Fail';

export const CART_UPDATE_ENTRY = '[Cart-entry] Update Entry';
export const CART_UPDATE_ENTRY_SUCCESS = '[Cart-entry] Update Entry Success';
export const CART_UPDATE_ENTRY_FAIL = '[Cart-entry] Update Entry Fail';

export const CART_UPDATE_ENTRY_BY_KEY = '[Cart-entry] Update Entry By Key';
export const CART_UPDATE_ENTRY_BY_KEY_SUCCESS =
  '[Cart-entry] Update Entry By Key Success';
export const CART_UPDATE_ENTRY_BY_KEY_FAIL =
  '[Cart-entry] Update Entry By Key Fail';

export class CartAddEntry extends StateLoaderActions.LoaderLoadAction {
  readonly type = CART_ADD_ENTRY;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class CartAddEntrySuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = CART_ADD_ENTRY_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class CartAddEntryFail extends StateLoaderActions.LoaderFailAction {
  readonly type = CART_ADD_ENTRY_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class CartRemoveEntry extends StateLoaderActions.LoaderLoadAction {
  readonly type = CART_REMOVE_ENTRY;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class CartRemoveEntrySuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = CART_REMOVE_ENTRY_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class CartRemoveEntryFail extends StateLoaderActions.LoaderFailAction {
  readonly type = CART_REMOVE_ENTRY_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class CartRemoveEntryByKey extends EntityProcessesIncrementAction {
  readonly type = CART_REMOVE_ENTRY_BY_KEY;
  constructor(public payload: { cartId: string; userId: string; key: string }) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class CartRemoveEntryByKeySuccess extends EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_ENTRY_BY_KEY_SUCCESS;
  constructor(public payload: { cartId: string; userId: string; key: string }) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class CartRemoveEntryByKeyFail extends EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_ENTRY_BY_KEY_FAIL;
  constructor(
    public payload: { cartId: string; userId: string; key: string; error: any }
  ) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class CartUpdateEntry extends StateLoaderActions.LoaderLoadAction {
  readonly type = CART_UPDATE_ENTRY;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class CartUpdateEntrySuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = CART_UPDATE_ENTRY_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class CartUpdateEntryFail extends StateLoaderActions.LoaderFailAction {
  readonly type = CART_UPDATE_ENTRY_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class CartUpdateEntryByKey extends EntityProcessesIncrementAction {
  readonly type = CART_UPDATE_ENTRY_BY_KEY;
  constructor(
    public payload: {
      cartId: string;
      userId: string;
      key: string;
      quantity: number;
    }
  ) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class CartUpdateEntryByKeySuccess extends EntityProcessesDecrementAction {
  readonly type = CART_UPDATE_ENTRY_BY_KEY_SUCCESS;
  constructor(
    public payload: {
      cartId: string;
      userId: string;
      key: string;
      quantity: number;
    }
  ) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class CartUpdateEntryByKeyFail extends EntityProcessesDecrementAction {
  readonly type = CART_UPDATE_ENTRY_BY_KEY_FAIL;
  constructor(
    public payload: {
      cartId: string;
      userId: string;
      key: string;
      quantity: number;
      error: any;
    }
  ) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export type CartEntryAction =
  | CartAddEntry
  | CartAddEntrySuccess
  | CartAddEntryFail
  | CartRemoveEntry
  | CartRemoveEntrySuccess
  | CartRemoveEntryFail
  | CartRemoveEntryByKey
  | CartRemoveEntryByKeySuccess
  | CartRemoveEntryByKeyFail
  | CartUpdateEntry
  | CartUpdateEntrySuccess
  | CartUpdateEntryFail
  | CartUpdateEntryByKey
  | CartUpdateEntryByKeySuccess
  | CartUpdateEntryByKeyFail;
