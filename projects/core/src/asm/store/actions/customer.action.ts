import { StateLoaderActions } from '../../../state/utils/index';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../../models/asm.models';
import { CUSTOMER_SEARCH_DATA } from '../asm-state';

export const CUSTOMER_SEARCH = '[Asm] Customer Search';
export const CUSTOMER_SEARCH_FAIL = '[Asm] Customer Search Fail';
export const CUSTOMER_SEARCH_SUCCESS = '[Asm] Customer Search Success';
export const CUSTOMER_SEARCH_RESET = '[Asm] Customer Search Reset';

export class CustomerSearch extends StateLoaderActions.LoaderLoadAction {
  readonly type = CUSTOMER_SEARCH;
  constructor(public payload: CustomerSearchOptions) {
    super(CUSTOMER_SEARCH_DATA);
  }
}

export class CustomerSearchFail extends StateLoaderActions.LoaderFailAction {
  readonly type = CUSTOMER_SEARCH_FAIL;
  constructor(public payload: any) {
    super(CUSTOMER_SEARCH_DATA);
  }
}

export class CustomerSearchSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = CUSTOMER_SEARCH_SUCCESS;
  constructor(public payload: CustomerSearchPage) {
    super(CUSTOMER_SEARCH_DATA);
  }
}

export class CustomerSearchReset extends StateLoaderActions.LoaderResetAction {
  readonly type = CUSTOMER_SEARCH_RESET;
  constructor() {
    super(CUSTOMER_SEARCH_DATA);
  }
}

// action types
export type CustomerAction =
  | CustomerSearch
  | CustomerSearchFail
  | CustomerSearchSuccess
  | CustomerSearchReset;
