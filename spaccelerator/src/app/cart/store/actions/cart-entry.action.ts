import { Action } from '@ngrx/store';

export const ADD_ENTRY = '[Cart-entry] Add Entry';
export const ADD_ENTRY_SUCCESS = '[Cart-entry] Add Entry Success';
export const ADD_ENTRY_FAIL = '[Cart-entry] Add Entry Fail';

export const REMOVE_ENTRY = '[Cart-entry] Remove Entry';
export const REMOVE_ENTRY_SUCCESS = '[Cart-entry] Remove Entry Success';
export const REMOVE_ENTRY_FAIL = '[Cart-entry] Remove Entry Fail';

export const UPDATE_ENTRY = '[Cart-entry] Update Entry';
export const UPDATE_ENTRY_SUCCESS = '[Cart-entry] Update Entry Success';
export const UPDATE_ENTRY_FAIL = '[Cart-entry] Update Entry Fail';

export class AddEntry implements Action {
  readonly type = ADD_ENTRY;
  constructor(public payload: any) {}
}

export class AddEntrySuccess implements Action {
  readonly type = ADD_ENTRY_SUCCESS;
  constructor(public payload: any) {}
}

export class AddEntryFail implements Action {
  readonly type = ADD_ENTRY_FAIL;
  constructor(public payload: any) {}
}

export class RemoveEntry implements Action {
  readonly type = REMOVE_ENTRY;
  constructor(public payload: any) {}
}

export class RemoveEntrySuccess implements Action {
  readonly type = REMOVE_ENTRY_SUCCESS;
  constructor() {}
}

export class RemoveEntryFail implements Action {
  readonly type = REMOVE_ENTRY_FAIL;
  constructor(public payload: any) {}
}

export class UpdateEntry implements Action {
  readonly type = UPDATE_ENTRY;
  constructor(public payload: any) {}
}

export class UpdateEntrySuccess implements Action {
  readonly type = UPDATE_ENTRY_SUCCESS;
  constructor() {}
}

export class UpdateEntryFail implements Action {
  readonly type = UPDATE_ENTRY_FAIL;
  constructor(public payload: any) {}
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
