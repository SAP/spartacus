import { StateUtils } from '../../../state/utils/index';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../../models/asm.models';
import { CUSTOMER_SEARCH_DATA } from '../asm-state';

/**
 * @deprecated since 3.2, use asm lib instead
 */
export const CUSTOMER_SEARCH = '[Asm] Customer Search';
/**
 * @deprecated since 3.2, use asm lib instead
 */
export const CUSTOMER_SEARCH_FAIL = '[Asm] Customer Search Fail';
/**
 * @deprecated since 3.2, use asm lib instead
 */
export const CUSTOMER_SEARCH_SUCCESS = '[Asm] Customer Search Success';
/**
 * @deprecated since 3.2, use asm lib instead
 */
export const CUSTOMER_SEARCH_RESET = '[Asm] Customer Search Reset';

/**
 * @deprecated since 3.2, use asm lib instead
 */
export class CustomerSearch extends StateUtils.LoaderLoadAction {
  readonly type = CUSTOMER_SEARCH;
  constructor(public payload: CustomerSearchOptions) {
    super(CUSTOMER_SEARCH_DATA);
  }
}

/**
 * @deprecated since 3.2, use asm lib instead
 */
export class CustomerSearchFail extends StateUtils.LoaderFailAction {
  readonly type = CUSTOMER_SEARCH_FAIL;
  constructor(public payload: any) {
    super(CUSTOMER_SEARCH_DATA);
  }
}

/**
 * @deprecated since 3.2, use asm lib instead
 */
export class CustomerSearchSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = CUSTOMER_SEARCH_SUCCESS;
  constructor(public payload: CustomerSearchPage) {
    super(CUSTOMER_SEARCH_DATA);
  }
}

/**
 * @deprecated since 3.2, use asm lib instead
 */
export class CustomerSearchReset extends StateUtils.LoaderResetAction {
  readonly type = CUSTOMER_SEARCH_RESET;
  constructor() {
    super(CUSTOMER_SEARCH_DATA);
  }
}

/**
 * @deprecated since 3.2, use asm lib instead
 */
// action types
export type CustomerAction =
  | CustomerSearch
  | CustomerSearchFail
  | CustomerSearchSuccess
  | CustomerSearchReset;
