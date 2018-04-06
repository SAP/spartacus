import { Action } from '@ngrx/store';

export const LOAD_SUGGESTED_ADDRESSES = '[Checkout] Load Suggested Addresses';
export const LOAD_SUGGESTED_ADDRESSES_FAIL =
  '[Checkout] Load Suggested Addresses Fail';
export const LOAD_SUGGESTED_ADDRESSES_SUCCESS =
  '[Checkout] Load Suggested Addresses Success';

export const CLEAR_SUGGESTED_ADDRESSES = '[Checkout] Clear Suggested Addresses';

export class LoadSuggestedAddresses implements Action {
  readonly type = LOAD_SUGGESTED_ADDRESSES;
  constructor(public payload: { userId: string; address: string }) {}
}

export class LoadSuggestedAddressesFail implements Action {
  readonly type = LOAD_SUGGESTED_ADDRESSES_FAIL;
  constructor(public payload: any) {}
}

export class LoadSuggestedAddressesSuccess implements Action {
  readonly type = LOAD_SUGGESTED_ADDRESSES_SUCCESS;
  constructor(public payload: any) {}
}

export class ClearSuggestedAddresses implements Action {
  readonly type = CLEAR_SUGGESTED_ADDRESSES;
  constructor() {}
}

export type SuggestedAddressesAction =
  | LoadSuggestedAddresses
  | LoadSuggestedAddressesFail
  | LoadSuggestedAddressesSuccess
  | ClearSuggestedAddresses;
