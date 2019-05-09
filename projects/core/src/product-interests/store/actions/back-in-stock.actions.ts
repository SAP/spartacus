import { Action } from '@ngrx/store';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state';
import {
  CREATE_BACK_IN_STOCK_PROCESS_ID,
  DELETE_BACK_IN_STOCK_PROCESS_ID,
} from '../product-interests-state';

export const LOAD_BACK_IN_STOCK = 'Load Back In Stock';
export const LOAD_BACK_IN_STOCK_FAIL = 'Load Back In Stock Fail';
export const LOAD_BACK_IN_STOCK_SUCCESS = 'Load Back In Stock Success';

export const DELETE_BACK_IN_STOCK = 'Delete Back In Stock';
export const DELETE_BACK_IN_STOCK_FAIL = 'Delete Back In Stock Fail';
export const DELETE_BACK_IN_STOCK_SUCCESS = 'Delete Back In Stock Success';

export const CREATE_BACK_IN_STOCK = 'Create Back In Stock';
export const CREATE_BACK_IN_STOCK_FAIL = 'Create Back In Stock Fail';
export const CREATE_BACK_IN_STOCK_SUCCESS = 'Create Back In Stock Success';

export const RESET_BACK_IN_STOCK = 'Reset Back In Stock';

export class LoadBackInStock implements Action {
  readonly type = LOAD_BACK_IN_STOCK;
  constructor(
    public payload: {
      userId: string;
      productCode: string;
      notificationType: string;
    }
  ) {}
}

export class LoadBackInStockFail implements Action {
  readonly type = LOAD_BACK_IN_STOCK_FAIL;
  constructor(public payload: any) {}
}

export class LoadBackInStockSuccess implements Action {
  readonly type = LOAD_BACK_IN_STOCK_SUCCESS;
  constructor(public payload: boolean) {}
}

export class DeleteBackInStock extends EntityLoadAction {
  readonly type = DELETE_BACK_IN_STOCK;
  constructor(
    public payload: {
      userId: string;
      productCode: string;
      notificationType: string;
    }
  ) {
    super(PROCESS_FEATURE, DELETE_BACK_IN_STOCK_PROCESS_ID);
  }
}

export class DeleteBackInStockFail extends EntityFailAction {
  readonly type = DELETE_BACK_IN_STOCK_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, DELETE_BACK_IN_STOCK_PROCESS_ID, payload);
  }
}

export class DeleteBackInStockSuccess extends EntitySuccessAction {
  readonly type = DELETE_BACK_IN_STOCK_SUCCESS;
  constructor(public payload: boolean) {
    super(PROCESS_FEATURE, DELETE_BACK_IN_STOCK_PROCESS_ID);
  }
}

export class CreateBackInStock extends EntityLoadAction {
  readonly type = CREATE_BACK_IN_STOCK;
  constructor(
    public payload: {
      userId: string;
      productCode: string;
      notificationType: string;
    }
  ) {
    super(PROCESS_FEATURE, CREATE_BACK_IN_STOCK_PROCESS_ID);
  }
}

export class CreateBackInStockFail extends EntityFailAction {
  readonly type = CREATE_BACK_IN_STOCK_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, CREATE_BACK_IN_STOCK_PROCESS_ID, payload);
  }
}

export class CreateBackInStockSuccess extends EntitySuccessAction {
  readonly type = CREATE_BACK_IN_STOCK_SUCCESS;
  constructor(public payload: boolean) {
    super(PROCESS_FEATURE, CREATE_BACK_IN_STOCK_PROCESS_ID);
  }
}

export class ResetBackInStock implements Action {
  readonly type = RESET_BACK_IN_STOCK;
}

export type BackInStockAction =
  | LoadBackInStock
  | LoadBackInStockFail
  | LoadBackInStockSuccess
  | DeleteBackInStock
  | DeleteBackInStockFail
  | DeleteBackInStockSuccess
  | CreateBackInStock
  | CreateBackInStockFail
  | CreateBackInStockSuccess
  | ResetBackInStock;
