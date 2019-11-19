import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  StateEntityLoaderActions,
  StateLoaderActions,
} from '../../../state/utils/index';
import { ADD_ENTRY_PROCESS_ID, CART_DATA } from '../cart-state';

export const CART_ADD_ENTRY = '[Cart-entry] Add Entry';
export const CART_ADD_ENTRY_SUCCESS = '[Cart-entry] Add Entry Success';
export const CART_ADD_ENTRY_FAIL = '[Cart-entry] Add Entry Fail';
export const CART_REMOVE_ENTRY = '[Cart-entry] Remove Entry';
export const CART_REMOVE_ENTRY_SUCCESS = '[Cart-entry] Remove Entry Success';
export const CART_REMOVE_ENTRY_FAIL = '[Cart-entry] Remove Entry Fail';

export const CART_UPDATE_ENTRY = '[Cart-entry] Update Entry';
export const CART_UPDATE_ENTRY_SUCCESS = '[Cart-entry] Update Entry Success';
export const CART_UPDATE_ENTRY_FAIL = '[Cart-entry] Update Entry Fail';

export const CART_START_ADD_ENTRY_PROCESS =
  '[Cart-entry] Start Add Entry Process';
export const CART_SUCCESS_ADD_ENTRY_PROCESS =
  '[Cart-entry] Success Add Entry Process';
export const CART_FAIL_ADD_ENTRY_PROCESS =
  '[Cart-entry] Fail Add Entry Process';

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

export class CartStartAddEntryProcess extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = CART_START_ADD_ENTRY_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, ADD_ENTRY_PROCESS_ID);
  }
}

export class CartSuccessAddEntryProcess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = CART_SUCCESS_ADD_ENTRY_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, ADD_ENTRY_PROCESS_ID);
  }
}

export class CartFailAddEntryProcess extends StateEntityLoaderActions.EntityFailAction {
  readonly type = CART_FAIL_ADD_ENTRY_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, ADD_ENTRY_PROCESS_ID);
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

export type CartEntryAction =
  | CartAddEntry
  | CartAddEntrySuccess
  | CartAddEntryFail
  | CartRemoveEntry
  | CartRemoveEntrySuccess
  | CartRemoveEntryFail
  | CartUpdateEntry
  | CartUpdateEntrySuccess
  | CartUpdateEntryFail
  | CartStartAddEntryProcess
  | CartSuccessAddEntryProcess
  | CartFailAddEntryProcess;
