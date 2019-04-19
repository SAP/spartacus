import { PRODUCT_INTERESTS } from '../user-state';
import { ProductInterestList } from '../../model/product-interest.model';
import {
  LoaderLoadAction,
  LoaderFailAction,
  LoaderSuccessAction,
} from '../../../state/utils/loader/loader.action';

export const LOAD_PRODUCT_INTERESTS = 'Load Product Interests';
export const LOAD_PRODUCT_INTERESTS_FAIL = 'Load Product Interests Fail';
export const LOAD_PRODUCT_INTERESTS_SUCCESS = 'Load Product Interests Success';
export const CLEAR_PRODUCT_INTERESTS = 'Clear Product Interests';

export class LoadProductInterests extends LoaderLoadAction {
  readonly type = LOAD_PRODUCT_INTERESTS;
  constructor(
    public payload: {
      userId: string;
      pageSize: number;
      currentPage?: number;
      sort?: string;
    }
  ) {
    super(PRODUCT_INTERESTS);
  }
}

export class LoadProductInterestsFail extends LoaderFailAction {
  readonly type = LOAD_PRODUCT_INTERESTS_FAIL;
  constructor(public payload: any) {
    super(PRODUCT_INTERESTS, payload);
  }
}

export class LoadProductInterestsSuccess extends LoaderSuccessAction {
  readonly type = LOAD_PRODUCT_INTERESTS_SUCCESS;
  constructor(public payload: ProductInterestList) {
    super(PRODUCT_INTERESTS);
  }
}

export class ClearProductInterests {
  readonly type = CLEAR_PRODUCT_INTERESTS;
  constructor() { }
}

export type ProductInterestsAction =
  | LoadProductInterests
  | LoadProductInterestsFail
  | LoadProductInterestsSuccess
  | ClearProductInterests;
