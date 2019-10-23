import {
  StateLoaderActions,
  StateEntityLoaderActions,
} from '../../../state/utils/index';
import { CART_DATA, ADD_ENTRY_PROCESS_ID } from '../cart-state';
import { Action } from '@ngrx/store';
import { PROCESS_FEATURE } from '../../../process/store/process-state';

export const CART_ADD_ENTRY = '[Cart-entry] Add Entry';
export const CART_ADD_ENTRY_SUCCESS = '[Cart-entry] Add Entry Success';
export const CART_ADD_ENTRY_FAIL = '[Cart-entry] Add Entry Fail';

export const CART_ADD_ENTRIES = '[Cart-entry] Add Entries';
export const CART_ADD_ENTRIES_SUCCESS = '[Cart-entry] Add Entries Success';
export const CART_ADD_ENTRIES_FAIL = '[Cart-entry] Add Entries Fail';

export const CART_REMOVE_ENTRY = '[Cart-entry] Remove Entry';
export const CART_REMOVE_ENTRY_SUCCESS = '[Cart-entry] Remove Entry Success';
export const CART_REMOVE_ENTRY_FAIL = '[Cart-entry] Remove Entry Fail';

export const CART_UPDATE_ENTRY = '[Cart-entry] Update Entry';
export const CART_UPDATE_ENTRY_SUCCESS = '[Cart-entry] Update Entry Success';
export const CART_UPDATE_ENTRY_FAIL = '[Cart-entry] Update Entry Fail';

export const CART_START_ADD_ENTRIES_PROCESS =
  '[Cart-entry] Start Add Entries Process';
export const CART_SUCCESS_ADD_ENTRIES_PROCESS =
  '[Cart-entry] Success Add Entries Process';
export const CART_FAIL_ADD_ENTRIES_PROCESS =
  '[Cart-entry] Fail Add Entries Process';

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

export class CartAddEntries implements Action {
  readonly type = CART_ADD_ENTRIES;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      products: Array<{ productCode: string; quantity: number }>;
    }
  ) {}
}

export class CartAddEntriesSuccess implements Action {
  readonly type = CART_ADD_ENTRIES_SUCCESS;
  constructor(public payload: any) {}
}

export class CartAddEntriesFail implements Action {
  readonly type = CART_ADD_ENTRIES_FAIL;
  constructor(public payload: any) {}
}

export class CartStartAddEntriesProcess extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = CART_START_ADD_ENTRIES_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, ADD_ENTRY_PROCESS_ID);
  }
}

export class CartSuccessAddEntriesProcess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = CART_SUCCESS_ADD_ENTRIES_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, ADD_ENTRY_PROCESS_ID);
  }
}

export class CartFailAddEntriesProcess extends StateEntityLoaderActions.EntityFailAction {
  readonly type = CART_FAIL_ADD_ENTRIES_PROCESS;
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
  | CartUpdateEntryFail;
