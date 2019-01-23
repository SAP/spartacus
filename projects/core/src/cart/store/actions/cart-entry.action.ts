import {
  LoaderLoadAction,
  LoaderFailAction,
  LoaderSuccessAction
} from '../../../state/utils/loader/loader.action';
import { CART_DATA } from '../cart-state';

export const ADD_ENTRY = '[Cart-entry] Add Entry';
export const ADD_ENTRY_SUCCESS = '[Cart-entry] Add Entry Success';
export const ADD_ENTRY_FAIL = '[Cart-entry] Add Entry Fail';

export const REMOVE_ENTRY = '[Cart-entry] Remove Entry';
export const REMOVE_ENTRY_SUCCESS = '[Cart-entry] Remove Entry Success';
export const REMOVE_ENTRY_FAIL = '[Cart-entry] Remove Entry Fail';

export const UPDATE_ENTRY = '[Cart-entry] Update Entry';
export const UPDATE_ENTRY_SUCCESS = '[Cart-entry] Update Entry Success';
export const UPDATE_ENTRY_FAIL = '[Cart-entry] Update Entry Fail';

export class AddEntry extends LoaderLoadAction {
  readonly type = ADD_ENTRY;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class AddEntrySuccess extends LoaderSuccessAction {
  readonly type = ADD_ENTRY_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class AddEntryFail extends LoaderFailAction {
  readonly type = ADD_ENTRY_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class RemoveEntry extends LoaderLoadAction {
  readonly type = REMOVE_ENTRY;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class RemoveEntrySuccess extends LoaderSuccessAction {
  readonly type = REMOVE_ENTRY_SUCCESS;
  constructor() {
    super(CART_DATA);
  }
}

export class RemoveEntryFail extends LoaderFailAction {
  readonly type = REMOVE_ENTRY_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export class UpdateEntry extends LoaderLoadAction {
  readonly type = UPDATE_ENTRY;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class UpdateEntrySuccess extends LoaderSuccessAction {
  readonly type = UPDATE_ENTRY_SUCCESS;
  constructor() {
    super(CART_DATA);
  }
}

export class UpdateEntryFail extends LoaderFailAction {
  readonly type = UPDATE_ENTRY_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }
}

export type CartEntryAction =
  | AddEntry
  | AddEntrySuccess
  | AddEntryFail
  | RemoveEntry
  | RemoveEntrySuccess
  | RemoveEntryFail
  | UpdateEntry
  | UpdateEntrySuccess
  | UpdateEntryFail;
