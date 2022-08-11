import {
  PRODUCT_INTERESTS,
  REMOVE_PRODUCT_INTERESTS_PROCESS_ID,
  ADD_PRODUCT_INTEREST_PROCESS_ID,
} from '../user-state';
import {
  ProductInterestSearchResult,
  ProductInterestEntryRelation,
  NotificationType,
} from '../../../model/product-interest.model';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  LoaderLoadAction,
  LoaderFailAction,
  LoaderSuccessAction,
  LoaderResetAction,
} from '../../../state/utils/loader/loader.action';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
  EntityLoaderResetAction,
} from '../../../state/utils/entity-loader/entity-loader.action';

export const LOAD_PRODUCT_INTERESTS = 'Load Product Interests';
export const LOAD_PRODUCT_INTERESTS_FAIL = 'Load Product Interests Fail';
export const LOAD_PRODUCT_INTERESTS_SUCCESS = 'Load Product Interests Success';

export const REMOVE_PRODUCT_INTEREST = 'Remove Product Interest';
export const REMOVE_PRODUCT_INTEREST_SUCCESS =
  'Remove Product Interest Success';
export const REMOVE_PRODUCT_INTEREST_FAIL = 'Remove Product Interest Fail';

export const ADD_PRODUCT_INTEREST = 'Add Product Interest';
export const ADD_PRODUCT_INTEREST_FAIL = 'Add Product Interest Fail';
export const ADD_PRODUCT_INTEREST_SUCCESS = 'Add Product Interest Success';

export const ADD_PRODUCT_INTEREST_RESET = 'Add Product Interest Reset';
export const REMOVE_PRODUCT_INTEREST_RESET = 'Remove Product Interest Reset';

export const CLEAR_PRODUCT_INTERESTS = 'Clear Product Interests';

export class LoadProductInterests extends LoaderLoadAction {
  readonly type = LOAD_PRODUCT_INTERESTS;
  constructor(
    public payload: {
      userId: string;
      pageSize?: number;
      currentPage?: number;
      sort?: string;
      productCode?: string;
      notificationType?: NotificationType;
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
  constructor(public payload: ProductInterestSearchResult) {
    super(PRODUCT_INTERESTS);
  }
}

export class RemoveProductInterest extends EntityLoadAction {
  readonly type = REMOVE_PRODUCT_INTEREST;
  constructor(
    public payload: {
      userId: string;
      item: ProductInterestEntryRelation;
      singleDelete?: boolean;
    }
  ) {
    super(PROCESS_FEATURE, REMOVE_PRODUCT_INTERESTS_PROCESS_ID);
  }
}

export class RemoveProductInterestSuccess extends EntitySuccessAction {
  readonly type = REMOVE_PRODUCT_INTEREST_SUCCESS;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, REMOVE_PRODUCT_INTERESTS_PROCESS_ID);
  }
}

export class RemoveProductInterestFail extends EntityFailAction {
  readonly type = REMOVE_PRODUCT_INTEREST_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, REMOVE_PRODUCT_INTERESTS_PROCESS_ID, payload);
  }
}

export class AddProductInterest extends EntityLoadAction {
  readonly type = ADD_PRODUCT_INTEREST;
  constructor(
    public payload: {
      userId: string;
      productCode: string;
      notificationType: NotificationType;
    }
  ) {
    super(PROCESS_FEATURE, ADD_PRODUCT_INTEREST_PROCESS_ID);
  }
}

export class AddProductInterestSuccess extends EntitySuccessAction {
  readonly type = ADD_PRODUCT_INTEREST_SUCCESS;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, ADD_PRODUCT_INTEREST_PROCESS_ID);
  }
}

export class AddProductInterestFail extends EntityFailAction {
  readonly type = ADD_PRODUCT_INTEREST_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, ADD_PRODUCT_INTEREST_PROCESS_ID, payload);
  }
}

export class ResetAddInterestState extends EntityLoaderResetAction {
  readonly type = ADD_PRODUCT_INTEREST_RESET;
  constructor() {
    super(PROCESS_FEATURE, ADD_PRODUCT_INTEREST_PROCESS_ID);
  }
}

export class ResetRemoveInterestState extends EntityLoaderResetAction {
  readonly type = REMOVE_PRODUCT_INTEREST_RESET;
  constructor() {
    super(PROCESS_FEATURE, REMOVE_PRODUCT_INTERESTS_PROCESS_ID);
  }
}

export class ClearProductInterests extends LoaderResetAction {
  readonly type = CLEAR_PRODUCT_INTERESTS;
  constructor() {
    super(PRODUCT_INTERESTS);
  }
}

export type ProductInterestsAction =
  | LoadProductInterests
  | LoadProductInterestsFail
  | LoadProductInterestsSuccess
  | RemoveProductInterest
  | RemoveProductInterestSuccess
  | RemoveProductInterestFail
  | AddProductInterest
  | AddProductInterestFail
  | AddProductInterestSuccess
  | ResetAddInterestState
  | ResetRemoveInterestState
  | ClearProductInterests;
