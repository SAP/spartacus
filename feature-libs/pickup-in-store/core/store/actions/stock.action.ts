import { StateUtils } from '@spartacus/core';
import { STOCK_DATA } from '../stock-state';

export const STOCK_LEVEL = '[Stock] Get Stock Level';
export const STOCK_LEVEL_ON_HOLD = '[Stock] On Hold';
export const STOCK_LEVEL_FAIL = '[Stock] Get Stock Level Fail';
export const STOCK_LEVEL_SUCCESS = '[Stock] Get Stock Level Success';
export const CLEAR_STOCK_DATA = '[Stock] Clear Data';

export class StockLevel extends StateUtils.LoaderLoadAction {
  readonly type = STOCK_LEVEL;
  constructor(
    // TODO replace any with real type
    public payload: {
      productCode: string;
      latitude?: number;
      longitude?: number;
      location?: string;
    }
  ) {
    super(STOCK_DATA);
  }
}

export class StockLevelOnHold extends StateUtils.LoaderLoadAction {
  readonly type = STOCK_LEVEL_ON_HOLD;
  constructor() {
    super(STOCK_DATA);
  }
}

export class StockLevelFail extends StateUtils.LoaderFailAction {
  readonly type = STOCK_LEVEL_FAIL;
  constructor(public payload: any) {
    super(STOCK_DATA, payload);
  }
}

export class StockLevelSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = STOCK_LEVEL_SUCCESS;
  constructor(public payload: any) {
    super(STOCK_DATA);
  }
}

export class ClearStockData extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_STOCK_DATA;
  constructor() {
    super(STOCK_DATA);
  }
}

export type StockLevelAction =
  | StockLevel
  | StockLevelOnHold
  | StockLevelFail
  | StockLevelSuccess
  | ClearStockData;
